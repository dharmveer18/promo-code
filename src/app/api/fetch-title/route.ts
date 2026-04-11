import { type NextRequest, NextResponse } from "next/server";

import { isBlockedHost } from "~/utils/check-url";

export async function GET(req: NextRequest) {
  let raw = req.nextUrl.searchParams.get("url") ?? "";
  if (!raw) return NextResponse.json({ ok: false, error: "missing_url" });

  // Normalize: prepend https:// if no protocol given
  if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_syntax" });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return NextResponse.json({ ok: false, error: "invalid_protocol" });
  }

  if (isBlockedHost(parsed.hostname)) {
    return NextResponse.json({ ok: false, error: "blocked_host" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PromoCodeBot/1.0)" },
    });
    clearTimeout(timeout);

    if (!res.ok) return NextResponse.json({ ok: false, error: "site_error" });

    const html = await res.text();
    const match = /<title[^>]*>([^<]+)<\/title>/i.exec(html);
    const title = match?.[1]?.trim() ?? null;

    return NextResponse.json({ ok: true, title });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json({ ok: false, error: "timeout" });
    }
    return NextResponse.json({ ok: false, error: "fetch_failed" });
  }
}
