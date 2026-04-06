# Security

A living document of security decisions, implemented controls, and known gaps.

---

## Implemented

### 1. SSRF Protection — `/api/scrape`
File: `src/app/api/scrape/route.ts`

The URL scraper validates every submitted URL before making a server-side fetch to prevent Server-Side Request Forgery attacks.

**Blocked:**
- `localhost` and `127.x.x.x`
- Private RFC-1918 ranges: `10.x`, `172.16–31.x`, `192.168.x`
- Link-local: `169.254.x` (AWS/GCP metadata address range)
- Cloud metadata endpoint: `metadata.google.internal`
- IPv6 ULA (`fd00::/8`) and loopback (`::1`)
- Non-HTTP protocols — only `http:` and `https:` are accepted

**Additional controls:**
- 8-second fetch timeout (AbortController) — prevents slow-loris / hung connections
- Max 500 KB response read — prevents memory exhaustion from large payloads
- `Content-Type` check — rejects non-`text/html` responses
- Explicit `redirect: follow` with no infinite loop risk (Node fetch limits redirects)

---

### 2. Type-Safe Environment Variables
File: `src/env.js`

All environment variables are validated at build and boot time using `@t3-oss/env-nextjs` + Zod.

- `AUTH_SECRET` — required in production, validated as non-empty string
- `DATABASE_URL` — validated as a proper URL format
- `NODE_ENV` — constrained to `development | test | production`
- `process.env` is never accessed directly outside `env.js` — no accidental exposure of undefined vars

---

### 3. Authentication — NextAuth v5
File: `src/server/auth/config.ts`

- Session-based auth via NextAuth v5 (Auth.js)
- Sessions stored in the database via Drizzle adapter — not in JWTs by default
- `AUTH_SECRET` used to sign/verify session tokens
- `protectedProcedure` in tRPC (`src/server/api/trpc.ts`) — throws `UNAUTHORIZED` TRPCError if no session exists; all write operations must use this procedure type

---

### 4. Input Validation — Zod on all tRPC inputs
All tRPC procedure inputs are validated with Zod schemas before any business logic runs. This prevents malformed data from reaching the database layer.

---

### 5. CI — No secrets in build
File: `.github/workflows/ci.yml`

CI uses dummy placeholder values for `DATABASE_URL` and `AUTH_SECRET` rather than real secrets. Real secrets should be added as GitHub Actions encrypted secrets when deploying.

---

## Planned / Not Yet Implemented

| Control | Priority | Notes |
|---|---|---|
| Rate limiting on `/api/scrape` | High | Prevent abuse — add after DB is connected (store request counts per IP) |
| CSP headers | High | Add `Content-Security-Policy` in `next.config.js` to prevent XSS |
| Affiliate link stripping | Medium | Server-side URL rewriting to remove tracking params before storing |
| Domain blocklist | Medium | Reject submissions from known spam/phishing domains at the API layer |
| IP/fingerprint dedup | Medium | Prevent sock-puppet accounts and vote manipulation |
| Affiliation disclosure enforcement | Medium | Backend validation that `affiliation` field is honest; flag for review |
| `httpOnly` cookie audit | Low | Verify NextAuth session cookie is `httpOnly` + `Secure` + `SameSite=Lax` |
| Dependency scanning | Low | Add `pnpm audit` step to CI pipeline |

---

## OWASP Top 10 Coverage

| Risk | Status | Notes |
|---|---|---|
| A01 Broken Access Control | Partial | `protectedProcedure` guards API; page-level auth not yet enforced |
| A02 Cryptographic Failures | OK | No custom crypto; sessions via NextAuth; secrets via env validation |
| A03 Injection | OK | Drizzle ORM uses parameterised queries — no raw SQL |
| A04 Insecure Design | Partial | SSRF protection in place; rate limiting pending |
| A05 Security Misconfiguration | Partial | Env validated; CSP headers not yet set |
| A06 Vulnerable Components | Partial | No audit step in CI yet |
| A07 Auth Failures | OK | NextAuth v5 handles session lifecycle |
| A08 Software Integrity Failures | OK | `--frozen-lockfile` in CI prevents lockfile tampering |
| A09 Logging & Monitoring | Not started | No structured logging yet |
| A10 SSRF | OK | Blocked in scrape route |
