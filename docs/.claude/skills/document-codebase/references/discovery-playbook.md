# Discovery playbook

How to enumerate **every** feature in a codebase. The principle: sweep through
several independent **lenses**, because each one surfaces capabilities the others
miss. A route list misses cron jobs; a model list misses integrations; the
README misses everything that was built after it. Run them all, then merge.

Record findings as you go into the inventory: `module → feature → source files`.

## Orientation (do this first)

- Read build/manifest files for the stack and entry points: `package.json`,
  `Cargo.toml`, `go.mod`, `pom.xml`, `requirements.txt`/`pyproject.toml`,
  `Gemfile`, `composer.json`, `*.csproj`.
- Map the top-level source tree — top-level directories are usually your first
  guess at modules.
- Note the README/docs as **claims to verify**, not ground truth.

## The lenses

### 1. Routes & pages (what users open)
- File-based routers: `app/`, `pages/`, `routes/`, `src/routes/` (Next.js,
  SvelteKit, Remix, Nuxt), `*.controller.*`, `urls.py`, `routes.rb`,
  `config/routes`, `@RequestMapping`/`@GetMapping`.
- Each page/flow is usually a feature; a route *group* is often a module.

### 2. API endpoints (what clients call)
- REST handlers, `@app.route`, `router.get/post`, gRPC services, GraphQL
  resolvers/schema (`*.graphql`, `typeDefs`), OpenAPI/Swagger specs.
- Cluster related endpoints (CRUD over one resource) into one feature.

### 3. Background work (what runs without a user)
- Cron/scheduled tasks, queues/workers (BullMQ, Sidekiq, Celery, SQS consumers),
  `cron`, `schedule`, `@Scheduled`, serverless scheduled triggers.
- Each job is typically its own feature; note its trigger and effect.

### 4. Data model (what the system knows)
- ORM models, schema/migration files, `*.sql`, Prisma/Drizzle schema, entity
  classes. Use these to confirm which capabilities exist and to find features
  with no obvious UI (e.g. audit logs, soft-deletes).

### 5. Integrations (what it talks to)
- SDK imports and clients: payments (Stripe), email/SMS, storage (S3/R2), auth
  providers (OAuth), analytics, AI/LLM providers, webhooks (incoming and
  outgoing). Search for API keys/env var names and `https://` base URLs.
- An integration is often a feature; mark anything whose logic lives in an
  **external** service as a known gap rather than guessing its behaviour.

### 6. Auth, roles & permissions
- Login/signup/reset flows, session/token handling, middleware/guards, role
  checks, RBAC tables. Roles often explain why a page behaves differently — note
  per-role variations as scenarios, not separate features.

### 7. CLI & admin tooling
- `bin/`, `cmd/`, `scripts/`, console commands, management commands, Makefile
  targets. Each command a user runs is a feature.

### 8. Config & feature flags
- Flag systems and env-gated branches reveal features that are **off**,
  **partial**, or experimental → candidates for `canceled`/`deleted` or for a
  scenario noting the flag.

### 9. Events & realtime
- WebSocket/SSE handlers, pub/sub topics, domain events, polling loops.

### 10. Tests as a behaviour source
- Existing tests (unit/e2e) often document intended behaviour and edge cases
  precisely. Mine them for scenario wording — but still confirm against the
  implementation.

## Detecting lifecycle (canceled / deleted)

- **deleted** — code/routes removed (check git history or commented-out blocks),
  endpoints that 404/410, models with `dropped`/`legacy` markers.
- **canceled** — stubs, `TODO`/`not implemented`, flags permanently off, designs
  in docs with no implementation.
- When in doubt, ask the maintainer rather than guessing the status.

## Fanning out (medium+ codebases)

Spawn parallel **`Explore`** subagents (read-only), one per top-level area or per
lens. Their combined output is the dominant token cost of this phase, so
constrain it hard: each agent returns **one line per capability** and nothing
else — no prose write-ups, no per-file walkthroughs, no re-quoted code. Paste
this brief verbatim (swap in `<area>`):

> "Explore `<area>` of this codebase (read-only). Return ONLY a flat list, one
> line per distinct user- or system-facing capability, in this exact shape:
>
>     <slug> — <one-line behaviour> — <file1, file2> — <up to 2 key strings/ids>
>
> Cluster CRUD-over-one-resource into a single line. Note triggers, roles,
> external services, and anything dead/disabled inline. Hard limit ~40 lines /
> ~800 words total. Do NOT write paragraphs, reproduce code, or be 'exhaustive'
> in prose — the one line per capability IS the deliverable."

Then merge results, de-duplicate (the same feature shows up under several
lenses), and group into modules. For very large repos, run one explorer per
package/service. If an agent returns prose dumps anyway, don't read them in
full — ask it to re-emit as the flat list.

## Output of this phase

A reviewable inventory the user signs off on, e.g.:

```
billing/ (Billing, order 20)
  checkout         — Stripe Checkout session + redirect   [src/billing/checkout.ts]
  webhooks         — Stripe webhook → subscription state   [src/billing/hook.ts]
  invoices         — PDF invoice list & download           [src/billing/invoices.ts]
  trials  (canceled '2026-02-01') — was planned, never built  [docs only]
```
