"use client";

import { useEffect, useState } from "react";

import { api } from "~/trpc/react";

import {
  CATEGORIES,
  EMPTY_FORM,
  type DealFormData,
  type UrlCheckStatus,
} from "./deal-data";

export function useDealForm(onSubmitSuccess?: () => void) {
  const createDeal = api.deal.create.useMutation({
    onSuccess: () => {
      handleClear();
      onSubmitSuccess?.();
    },
  });
  const [form, setForm] = useState<DealFormData>(() => {
    if (typeof window === "undefined") return EMPTY_FORM;
    try {
      const saved = localStorage.getItem("deal-draft");
      if (!saved) return EMPTY_FORM;
      const parsed = JSON.parse(saved) as DealFormData;
      return { ...parsed, timestamp: new Date(parsed.timestamp) };
    } catch {
      return EMPTY_FORM;
    }
  });

  const [urlStatus, setUrlStatus] = useState<UrlCheckStatus>("idle");
  const [titleFetch, setTitleFetch] = useState<"idle" | "fetching" | "done" | "error">("idle");
  const [rssUrl, setRssUrl] = useState("");
  const [rssFetch, setRssFetch] = useState<"idle" | "fetching" | "done" | "error">("idle");

  // Persist draft to localStorage on every change
  useEffect(() => {
    localStorage.setItem("deal-draft", JSON.stringify(form));
  }, [form]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (name === "url") {
      setUrlStatus("idle");
      setTitleFetch("idle");
    }
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "isFreebie" && checked ? { price: "", originalPrice: "" } : {}),
    }));
  }

  async function handleUrlBlur() {
    let raw = form.url.trim();
    if (!raw) return;

    // Normalize: prepend https:// if no protocol given
    if (!/^https?:\/\//i.test(raw)) {
      raw = "https://" + raw;
      setForm((prev) => ({ ...prev, url: raw }));
    }

    // Client-side syntax check
    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      setUrlStatus("invalid_syntax");
      return;
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      setUrlStatus("invalid_protocol");
      return;
    }

    // Server-side existence check
    setUrlStatus("checking");
    try {
      const res = await fetch(`/api/check-url?url=${encodeURIComponent(raw)}`);
      const data = (await res.json()) as { ok: boolean; error?: string; store?: string };
      if (data.ok) {
        setUrlStatus("ok");
        if (!form.store && data.store) {
          setForm((prev) => ({ ...prev, store: data.store! }));
        }
      } else {
        setUrlStatus((data.error ?? "site_error") as UrlCheckStatus);
      }
    } catch {
      setUrlStatus("site_error");
    }
  }

  async function handleAutoFill() {
    setTitleFetch("fetching");
    try {
      const res = await fetch(`/api/fetch-title?url=${encodeURIComponent(form.url)}`);
      const data = (await res.json()) as { ok: boolean; title?: string };
      if (data.ok && data.title) {
        setForm((prev) => ({ ...prev, title: data.title! }));
        setTitleFetch("done");
      } else {
        setTitleFetch("error");
      }
    } catch {
      setTitleFetch("error");
    }
  }

  async function handleRssImport() {
    if (!rssUrl.trim()) return;
    setRssFetch("fetching");
    try {
      const res = await fetch(`/api/fetch-rss?url=${encodeURIComponent(rssUrl.trim())}`);
      const data = (await res.json()) as {
        ok: boolean;
        title?: string | null;
        url?: string | null;
        description?: string | null;
        category?: string | null;
        price?: string | null;
      };
      if (!data.ok) { setRssFetch("error"); return; }
      setForm((prev) => ({
        ...prev,
        ...(data.title ? { title: data.title } : {}),
        ...(data.url ? { url: data.url } : {}),
        ...(data.description ? { description: data.description } : {}),
        ...(data.price ? { price: data.price } : {}),
        ...(data.category && CATEGORIES.includes(data.category) ? { category: data.category } : {}),
      }));
      setRssFetch("done");
    } catch {
      setRssFetch("error");
    }
  }

  function handleClear() {
    setForm(EMPTY_FORM);
    setUrlStatus("idle");
    setTitleFetch("idle");
    setRssUrl("");
    setRssFetch("idle");
    localStorage.removeItem("deal-draft");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createDeal.mutate({
      title: form.title,
      url: form.url,
      price: form.price || undefined,
      originalPrice: form.originalPrice || undefined,
      store: form.store,
      category: form.category,
      description: form.description || undefined,
      promoCode: form.promoCode || undefined,
      isFreebie: form.isFreebie,
      affiliation: form.affiliation || undefined,
      startsAt: form.startsAt || undefined,
      expiresAt: form.expiresAt || undefined,
    });
  }

  return {
    form,
    urlStatus,
    titleFetch,
    rssUrl,
    setRssUrl,
    rssFetch,
    setRssFetch,
    isSubmitting: createDeal.isPending,
    submitError: createDeal.error?.message ?? null,
    handleChange,
    handleUrlBlur,
    handleAutoFill,
    handleRssImport,
    handleSubmit,
    handleClear,
  };
}
