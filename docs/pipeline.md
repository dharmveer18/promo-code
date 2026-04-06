# Pipeline

CI/CD configuration for the Promo Code app.

---

## CI — GitHub Actions

File: `.github/workflows/ci.yml`  
Triggers on every push and pull request to `main`.

| Step | Command | Purpose |
|---|---|---|
| Checkout | `actions/checkout@v4` | Clone repo |
| Setup pnpm | `pnpm/action-setup@v4` | Install pnpm 10.7.0 |
| Setup Node | `actions/setup-node@v4` | Node 22 with pnpm cache |
| Install | `pnpm install --frozen-lockfile` | Install deps; fails if lockfile is out of sync |
| Lint & Typecheck | `pnpm check` | Runs ESLint + `tsc --noEmit` |
| Build | `pnpm build` | Full Next.js production build |

### Env vars at CI build time
T3's `@t3-oss/env-nextjs` validates env vars at build time. CI uses dummy placeholders:

```yaml
DATABASE_URL: postgresql://user:pass@localhost:5432/ozbargain
AUTH_SECRET: ci-secret-placeholder
NEXTAUTH_URL: http://localhost:3000
```

Replace these with real [GitHub Actions encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) once a production DB is provisioned.

---

## Planned

| Step | When | Notes |
|---|---|---|
| `pnpm audit` | After DB connected | Catch vulnerable dependencies in CI |
| `pnpm db:generate --check` | Before deploy | Fail CI if schema changes aren't committed |
| Playwright E2E | After first feature complete | Smoke test deal listing + form submission |
| Deploy to Vercel on merge to `main` | When staging env ready | Auto-deploy via Vercel GitHub integration |
