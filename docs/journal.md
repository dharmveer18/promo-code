# Development Journal

A chronological log of decisions, thinking, and what was built each session.

---

## [2026-04-05] Session 1 — Project Setup

**Thinking:**
- Building a promo code / deals aggregator inspired by OzBargain
- Chose T3 Stack (Next.js + tRPC + Drizzle + NextAuth + Tailwind) for end-to-end type safety
- Decided to use pnpm over npm for speed and disk efficiency
- Agreed to document everything as we go — docs/ folder + JSDoc in code

**Built:**
- Scaffolded T3 app with `create-t3-app` (App Router, Drizzle, NextAuth v5)
- Migrated from npm → pnpm
- Created `docs/overview.md` — stack table + run commands
- Created `docs/code-standards.md` — naming, typing, tRPC/Drizzle rules
- Created `docs/process.md` — feature checklist + router/schema templates
- Updated `README.md` — replaced default T3 content with quick start + doc links
- Added JSDoc to example tRPC router procedures as reference
- Created `.github/workflows/ci.yml` — lint + typecheck + build on every push/PR
- Documented CI pipeline in `docs/overview.md`

---

## [2026-04-05] Session 2 — UI First (Outside-In Approach)

**Thinking:**
- Don't know exactly what to build yet → start from what the user sees, not the DB
- Agreed on iteration rule: fake UI → API contract → schema → real data
- Chose to build deal listing page first to answer: "what does a deal card look like?"

**Built:**
- `src/app/_components/deal-data.ts` — `Deal` type + 4 hardcoded sample deals
- `src/app/_components/DealCard.tsx` — card UI with upvotes, discount %, store, category
- `src/app/page.tsx` — home page rendering deal list from sample data
- Renamed app from "OzBargain" → "Promo Code" across all files

---

## [2026-04-05] Session 3 — Submission Form to Discover API Shape

**Thinking:**
- Before defining tRPC API, build the submission form to discover what fields users actually fill in
- Form fields → Zod schema → tRPC input (derive API from real UX, not assumptions)
- Studied OzBargain's actual submit form for inspiration

**Decided fields (from OzBargain research):**
- Title, URL — required
- Price / Original Price — optional (hidden when Freebie)
- Freebie toggle — free items need no price
- Store, Category — required for discovery
- Promo Code — the core feature (multi-code support planned)
- Affiliation disclosure — must declare if store rep/employee
- Start Date / Expiry Date — deal lifecycle
- Description — redemption steps, exclusions

**Built:**
- `src/app/_components/DealSubmitForm.tsx` — full client form, logs to console on submit
  - Freebie checkbox hides price fields dynamically
  - Affiliation field with disclosure hint
  - Start + Expiry dates side by side
- Form wired into `src/app/page.tsx` above the deal listing

---

## [2026-04-06] Session 4 — Market Research & Feature Planning

**Thinking:**
- Analysed OzBargain vs modern peers to find the "sweet spot" to build toward
- Documented 5 feature categories in `docs/Features.md`
- Key insight: the trust/anti-spam layer is what makes or breaks a deals site

**Key product decisions from research:**
1. Smart scraper — paste URL → auto-fill metadata (reduces friction)
2. Weighted voting — senior users' votes count more toward front page
3. Hybrid feed — "New" tab + "Personalized" tab
4. Live price history — verify deals are genuinely discounted
5. Freebie as first-class deal type (not just $0 price)

**Built:**
- `docs/Features.md` — 5 feature categories with detailed breakdown
- `docs/marketCompariosn.md` — comparison table (OzBargain vs modern peers vs sweet spot)

---

## [2026-04-20] Session 5 — Wire Deals to Real Database

**Built:**
- `deals` table in Drizzle schema + `pnpm db:push`
- `dealRouter` — `getAll` and `create` (both public, no login required)
- `docker-compose.yml` — local Postgres 16 on port 5432
- Home page now loads deals from DB

**Debugged:**
- `ECONNRESET` — Windows `localhost` resolves to IPv6; fixed with `127.0.0.1` in `DATABASE_URL`
- `relation does not exist` — ran `pnpm db:push` to create tables
- `UNAUTHORIZED` on create — changed `protectedProcedure` → `publicProcedure`


