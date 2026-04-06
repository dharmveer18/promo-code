# Development Process

## Adding a New Feature

Follow this checklist for every feature:

### 1. Schema (if DB change needed)
- [ ] Add/update table in `src/server/db/schema.ts`
- [ ] Add `///` column comments
- [ ] Run `pnpm db:generate` to create migration
- [ ] Run `pnpm db:push` (dev) or `pnpm db:migrate` (prod)

### 2. tRPC Router
- [ ] Create `src/server/api/routers/<feature>.ts`
- [ ] Add JSDoc to every procedure (`@input`, `@returns`, `@throws`)
- [ ] Register router in `src/server/api/root.ts`

### 3. UI
- [ ] Create `src/app/<feature>/` route folder
- [ ] Add `page.tsx` (Server Component)
- [ ] Add `_components/` for local components
- [ ] Use `api.<router>.<procedure>.useQuery()` for data fetching

### 4. Env Vars (if new secrets needed)
- [ ] Add to `.env.example` with placeholder value
- [ ] Add to `src/env.js` with Zod validation
- [ ] Document in `docs/overview.md`

### 5. Documentation
- [ ] Update `docs/overview.md` if stack changes
- [ ] Add/update `docs/features/<feature>.md` with 1-2 line summary
- [ ] JSDoc on all exported functions and tRPC procedures

### 6. Before Committing
- [ ] `pnpm check` passes (lint + typecheck)
- [ ] `pnpm format:write` run
- [ ] Test the feature manually in dev

---

## Adding a New tRPC Router (template)

```ts
// src/server/api/routers/deals.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dealsRouter = createTRPCRouter({
  /**
   * Brief description of what this does.
   * @input - describe inputs
   * @returns - describe return value
   */
  getAll: protectedProcedure
    .input(z.object({ page: z.number().default(1) }))
    .query(async ({ ctx, input }) => {
      // implementation
    }),
});
```

Then register in `src/server/api/root.ts`:
```ts
export const appRouter = createTRPCRouter({
  post: postRouter,
  deals: dealsRouter, // add here
});
```

---

## Adding a New DB Table (template)

```ts
// src/server/db/schema.ts
export const deals = createTable(
  "deal",
  (d) => ({
    /// Auto-incrementing primary key
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    /// Deal title (max 512 chars)
    title: d.varchar({ length: 512 }).notNull(),
    /// FK to users table
    createdById: d.varchar({ length: 255 }).notNull().references(() => users.id),
    createdAt: d.timestamp({ withTimezone: true }).$defaultFn(() => new Date()).notNull(),
  }),
  (t) => [index("deal_created_by_idx").on(t.createdById)],
);
```
