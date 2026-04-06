# Promo Code — Project Overview

## Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) | React framework with SSR, routing, and API routes |
| **Language** | TypeScript | Strictly typed across client and server |
| **Database** | PostgreSQL | Relational DB; connection via `postgres` driver |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team) | Type-safe SQL builder; schema defined in `src/server/db/schema.ts` |
| **API** | [tRPC v11](https://trpc.io) | End-to-end typesafe API; routers in `src/server/api/routers/` |
| **Auth** | [NextAuth v5](https://authjs.dev) | Session-based auth; config in `src/server/auth/` |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS |
| **Validation** | [Zod](https://zod.dev) | Schema validation for env vars and tRPC inputs |
| **Env Safety** | `@t3-oss/env-nextjs` | Type-safe environment variables defined in `src/env.js` |

---

## How to Run

### 1. Environment setup
```bash
cp .env.example .env
# Fill in DATABASE_URL and AUTH_SECRET in .env
```

### 2. Push database schema
```bash
pnpm db:push
```

### 3. Start dev server
```bash
pnpm dev
# App runs at http://localhost:3000
```

### Other useful commands
```bash
pnpm db:studio      # Drizzle Studio — visual DB browser
pnpm db:generate    # Generate migration files
pnpm db:migrate     # Run migrations
pnpm check          # Lint + typecheck
pnpm build          # Production build
```

---

## CI Pipeline

File: `.github/workflows/ci.yml`  
Triggers on every push and pull request to `main`.

| Step | Command | Purpose |
|---|---|---|
| Install | `pnpm install --frozen-lockfile` | Installs deps; fails if lockfile is out of sync |
| Lint & Typecheck | `pnpm check` | Runs ESLint + `tsc --noEmit` |
| Build | `pnpm build` | Full Next.js production build |

> Dummy env vars (`DATABASE_URL`, `AUTH_SECRET`) are used at build time to satisfy T3 env validation.  
> Replace with real GitHub Actions secrets once a DB is provisioned.
