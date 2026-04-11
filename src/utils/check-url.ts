// ---------------------------------------------------------------------------
// SSRF protection — block private/internal hosts
// ---------------------------------------------------------------------------
const BLOCKED_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^::1$/,
  /metadata\.google\.internal/i,
];

export function isBlockedHost(hostname: string): boolean {
  return BLOCKED_HOST_PATTERNS.some((p) => p.test(hostname));
}

// ---------------------------------------------------------------------------
// URL check result type
// ---------------------------------------------------------------------------
export type UrlCheckError =
  | "missing_url"
  | "invalid_syntax"
  | "invalid_protocol"
  | "blocked_host"
  | "not_found"
  | "domain_not_found"
  | "blocked_by_site"
  | "timeout"
  | "site_error";

export type UrlCheckResult =
  | { ok: true; store: string }
  | { ok: false; error: UrlCheckError };

// ---------------------------------------------------------------------------
// checkUrl — validates syntax then checks existence via HEAD request
// ---------------------------------------------------------------------------
export async function checkUrl(raw: string | null): Promise<UrlCheckResult> {
  if (!raw) return { ok: false, error: "missing_url" };

  // Normalize: prepend https:// if no protocol given
  if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;

  // 1. Syntax check (WHATWG URL API)
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, error: "invalid_syntax" };
  }

  // 2. Protocol check
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return { ok: false, error: "invalid_protocol" };
  }

  // 3. SSRF check
  if (isBlockedHost(parsed.hostname)) {
    return { ok: false, error: "blocked_host" };
  }

  // 4. Existence check via HEAD request
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(parsed.toString(), {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PromoCodeBot/1.0)" },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (response.status === 404) return { ok: false, error: "not_found" };
    if (response.status === 403 || response.status === 401) return { ok: false, error: "blocked_by_site" };
    if (!response.ok) return { ok: false, error: "site_error" };

    const store = parsed.hostname.replace(/^www\./, "");
    return { ok: true, store };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      return { ok: false, error: "timeout" };
    }
    return { ok: false, error: "domain_not_found" };
  }
}
