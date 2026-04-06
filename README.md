# Promo Code

A T3 Stack app built with Next.js, tRPC, Drizzle ORM, NextAuth, and Tailwind CSS.

## Quick Start

```bash
cp .env.example .env   # fill in DATABASE_URL and AUTH_SECRET
pnpm install
pnpm db:push
pnpm dev               # http://localhost:3000
```

## Documentation

### Project
| Doc | Description |
|---|---|
| [docs/overview.md](docs/overview.md) | Stack table, run commands, all pnpm scripts |
| [docs/journal.md](docs/journal.md) | Session-by-session log of decisions and why they were made |
| [docs/Features.md](docs/Features.md) | Product feature ideas across 5 categories |
| [docs/marketCompariosn.md](docs/marketCompariosn.md) | Market comparison — OzBargain vs modern peers vs sweet spot |

### Engineering
| Doc | Description |
|---|---|
| [docs/code-standards.md](docs/code-standards.md) | Naming conventions, typing rules, JSDoc, formatting |
| [docs/process.md](docs/developmentProcess.md) | Feature checklist + router/schema copy-paste templates |
| [docs/Codesecurity.md](docs/Codesecurity.md) | Implemented security controls, planned gaps, OWASP Top 10 |

### Infrastructure
| Doc | Description |
|---|---|
| [docs/pipeline.md](docs/pipeline.md) | CI/CD pipeline steps, GitHub Actions config, planned stages |
| [docs/infra.md](docs/infra.md) | DB setup, env vars, deployment (Vercel/Railway) |

## Stack

Next.js 15 · TypeScript · PostgreSQL · Drizzle ORM · tRPC v11 · NextAuth v5 · Tailwind CSS · Zod
