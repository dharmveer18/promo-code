# Code Standards

## Language & Types
- **TypeScript strict mode** — no `any`, no `// @ts-ignore` without a comment explaining why
- Prefer `type` over `interface` unless declaration merging is needed
- Use `z.infer<typeof Schema>` to derive types from Zod schemas — don't duplicate

## File & Folder Naming
- **Files**: `kebab-case.ts` (e.g. `deal-router.ts`)
- **React components**: `PascalCase.tsx` (e.g. `DealCard.tsx`)
- **Folders**: `kebab-case/` (e.g. `src/app/deals/`)
- Co-locate components with their route: `src/app/deals/_components/`

## tRPC Routers
- One router per domain (e.g. `deals`, `users`, `comments`)
- Every procedure must have a JSDoc comment with `@input`, `@returns`, and `@throws` where applicable
- Use `protectedProcedure` by default; only use `publicProcedure` when explicitly public

```ts
/**
 * Fetch all active deals, paginated.
 * @input page - Page number (default 1)
 * @returns Paginated list of deals
 * @throws {TRPCError} UNAUTHORIZED if not logged in
 */
getDeals: protectedProcedure
  .input(z.object({ page: z.number().default(1) }))
  .query(async ({ ctx, input }) => { ... }),
```

## Drizzle Schema
- Use `/// Field description` comments on every column for Drizzle Studio visibility
- Table names prefixed with `Ozbargain_` via `createTable` (already configured)
- Add indexes for all foreign keys and frequently queried columns

```ts
export const deals = createTable("deal", (d) => ({
  /// Unique deal ID
  id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
  /// Deal title from OzBargain feed
  title: d.varchar({ length: 512 }).notNull(),
}));
```

## React Components
- Server Components by default; add `"use client"` only when interactivity is needed
- No direct DB or tRPC calls in client components — use tRPC hooks (`api.x.y.useQuery()`)
- Props must be explicitly typed — no implicit `any` from JSX

## Env Variables
- All env vars must be declared and validated in `src/env.js`
- Never access `process.env` directly outside `env.js`

## Formatting & Linting
- Prettier formats on save (config in `prettier.config.js`)
- ESLint runs via `pnpm check` — must pass before committing
- Run `pnpm format:write` before opening a PR
