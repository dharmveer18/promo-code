"use client";

import { env } from "~/env.js";

import { CATEGORIES, URL_ERROR_MESSAGES } from "./deal-data";
import { useDealForm } from "./useDealForm";

export function DealSubmitForm({ onSubmitSuccess }: { onSubmitSuccess?: () => void } = {}) {
  const {
    form,
    urlStatus,
    titleFetch,
    isSubmitting,
    submitError,
    handleChange,
    handleUrlBlur,
    handleAutoFill,
    handleRssImport,
    handleSubmit,
    handleClear,
  } = useDealForm(onSubmitSuccess);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-bold text-gray-800">Submit a Deal</h2>

      {/* Title */}
      <Field label="Deal Title *" hint="Be specific — include brand, model, and key specs">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
          className={inputClass}
        />
      </Field>

      {/* URL */}
      <Field label="Deal URL *" hint="Paste the product URL — we'll verify it exists">
        <div className="relative">
          <input
            name="url"
            type="text"
            value={form.url}
            onChange={handleChange}
            onBlur={handleUrlBlur}
            required
            placeholder="https://www.jbhifi.com.au/products/..."
            className={`${inputClass} ${
              urlStatus === "ok" ? "border-green-400" :
              urlStatus !== "idle" && urlStatus !== "checking" ? "border-red-400" : ""
            }`}
          />
          {urlStatus === "checking" && (
            <span className="absolute right-3 top-2 text-xs text-gray-400 animate-pulse">Checking...</span>
          )}
          {urlStatus === "ok" && (
            <span className="absolute right-3 top-2 text-xs text-green-600">✓ URL found</span>
          )}
        </div>
        {urlStatus !== "idle" && urlStatus !== "checking" && urlStatus !== "ok" && (
          <p className="mt-1 text-xs text-red-500">
            {URL_ERROR_MESSAGES[urlStatus] ?? "Could not verify URL — you can still submit manually"}
          </p>
        )}
        {urlStatus === "ok" && (
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoFill}
              disabled={titleFetch === "fetching"}
              className="text-xs text-orange-500 hover:text-orange-700 underline disabled:opacity-50"
            >
              {titleFetch === "fetching" ? "Fetching title…" : "Auto-fill title from page"}
            </button>
            {titleFetch === "error" && <span className="text-xs text-gray-400">Could not read page title</span>}
            {titleFetch === "done" && <span className="text-xs text-green-600">Title filled ✓</span>}
          </div>
        )}
      </Field>

      {/* Freebie toggle */}
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
        <input
          type="checkbox"
          name="isFreebie"
          checked={form.isFreebie}
          onChange={handleChange}
          className="h-4 w-4 accent-green-500"
        />
        <div>
          <span className="text-sm font-semibold text-green-800">Freebie</span>
          <p className="text-xs text-green-600">Item or service is completely FREE — zero shipping, no strings attached.</p>
        </div>
      </label>

      {/* Price row — hidden when freebie */}
      {!form.isFreebie && (
        <div className="grid grid-cols-2 gap-4">
          <Field label="Deal Price" hint="Current discounted price (optional)">
            <input name="price" value={form.price} onChange={handleChange} placeholder="$299" className={inputClass} />
          </Field>
          <Field label="Original Price" hint="RRP or previous price">
            <input name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="$549" className={inputClass} />
          </Field>
        </div>
      )}

      {/* Store */}
      <Field label="Store *" hint="Retailer name">
        <input name="store" value={form.store} onChange={handleChange} required placeholder="JB Hi-Fi" className={inputClass} />
      </Field>

      {/* Category */}
      <Field label="Category *">
        <select name="category" value={form.category} onChange={handleChange} required className={inputClass}>
          <option value="">Select a category...</option>
          {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </Field>

      {/* Promo code */}
      <Field label="Promo Code" hint="Leave blank if no code needed">
        <input
          name="promoCode"
          value={form.promoCode}
          onChange={handleChange}
          placeholder="e.g. SAVE20"
          className={`${inputClass} font-mono tracking-widest uppercase`}
        />
      </Field>

      {/* Affiliation */}
      <Field label="I am Associated with" hint="Declare if you are a store rep, employee, or affiliate. Leave blank if not associated.">
        <input
          name="affiliation"
          value={form.affiliation}
          onChange={handleChange}
          placeholder="e.g. JB Hi-Fi employee, affiliate partner..."
          className={inputClass}
        />
      </Field>

      {/* Start / Expiry dates */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Start Date" hint="When does the deal go live?">
          <input name="startsAt" type="date" value={form.startsAt} onChange={handleChange} className={inputClass} />
        </Field>
        <Field label="Expiry Date" hint="When does the deal end?">
          <input name="expiresAt" type="date" value={form.expiresAt} onChange={handleChange} className={inputClass} />
        </Field>
      </div>

      {/* Description */}
      <Field label="Description" hint="Any extra context (e.g. how to get the price, membership required)">
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          placeholder="Steps to redeem, exclusions, tips..."
          className={inputClass}
        />
      </Field>

      <div className="flex flex-col gap-2">
        {submitError && (
          <p className="text-xs text-red-500">Failed to submit: {submitError}</p>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting…" : "Submit Deal"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  );
}






