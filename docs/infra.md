# Infrastructure

Covers database setup, environment variables, and deployment.

---

## Environment Variables

Defined and validated in `src/env.js` using `@t3-oss/env-nextjs` + Zod.

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string — `postgresql://user:pass@host:5432/dbname` |
| `AUTH_SECRET` | Production only | Random secret for signing NextAuth session tokens — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Production only | Full public URL of the app — e.g. `https://promocode.vercel.app` |

Copy `.env.example` → `.env` and fill in values before running locally.

---

## Database

**Engine:** PostgreSQL  
**ORM:** Drizzle ORM  
**Schema file:** `src/server/db/schema.ts`  
**Table prefix:** `promocode_`

### Local setup options

**Option A — Docker (recommended)**
```bash
docker run --name promocode-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=promocode \
  -p 5432:5432 -d postgres:16
```
Then set: `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/promocode`

**Option B — Cloud (no local install)**
- [Neon](https://neon.tech) — free serverless Postgres, generous free tier
- [Supabase](https://supabase.com) — free tier, includes auth UI if needed later

### Database commands
```bash
pnpm db:push        # push schema directly (dev only — no migration files)
pnpm db:generate    # generate migration SQL files
pnpm db:migrate     # run pending migrations (use in production)
pnpm db:studio      # open Drizzle Studio at http://localhost:4983
```

> Use `db:push` in development. Switch to `db:generate` + `db:migrate` before first production deploy.

---

## Deployment

### Vercel _(recommended for Next.js)_

1. Push repo to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `NEXTAUTH_URL` → your Vercel deployment URL
4. Vercel auto-deploys on every push to `main`

### Railway _(alternative — DB + app together)_
Railway can host both the app and a Postgres instance in one project, simplifying `DATABASE_URL` setup.

---

## Not yet configured

- [ ] Production DB provisioned
- [ ] Vercel project linked to GitHub repo
- [ ] GitHub Actions secrets set (`DATABASE_URL`, `AUTH_SECRET`)
- [ ] `db:migrate` added to deploy script (replace `db:push`)
