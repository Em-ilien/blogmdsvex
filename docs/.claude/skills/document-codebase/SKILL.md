---
name: document-codebase
description: Generate complete, exhaustive product documentation from an existing codebase using Shipper (@numinfo/shipper) — a browsable catalogue of modules → features → Gherkin scenarios, built into a static site. Scoped to the Shipper docs folder: it writes the catalogue into this docs/ tree and builds it. Use when the user wants to document a project, produce a feature catalogue or spec from code, reverse-engineer docs from an existing app, or turn a codebase into a docs website. Systematically enumerates every module and feature, writes them in Shipper's Markdown + Gherkin content format grounded in real code, and verifies with shipper lint/build.
---

# Document a codebase with Shipper

Turn an existing codebase into a **complete, accurate, browsable documentation
site** using Shipper. The output is a folder of Markdown — one folder per
**module**, one file per **feature**, each feature's behaviour written as plain
**Given/When/Then** scenarios — that builds into a static HTML catalogue with
`shipper build`.

> Throughout this guide, **`shipper <cmd>`** stands for however Shipper is
> invoked in *this* environment — a `shipper` binary/alias on the PATH, or
> `npx @numinfo/shipper <cmd>`. Phase 0 resolves which; substitute it everywhere.

Your job is not to summarize the README. It is to **read the code and write down
what it actually does**, exhaustively and honestly, at a level the target reader
can follow.

## What "done" means — four bars, all required

1. **Exhaustive** — every meaningful capability in the codebase appears as a
   feature. No silent gaps. Coverage is measured against an inventory you derive
   from the code, not from memory.
2. **Grounded** — every statement traces to real code you read. Unknowns are
   marked as unknown, never invented. The code is the source of truth; READMEs
   and comments are claims to verify, not facts.
3. **Contract-compliant** — passes `shipper lint` with zero errors. The exact
   rules are in [`references/authoring-contract.md`](references/authoring-contract.md).
4. **Verified** — `shipper build` succeeds and the site renders.

If you cannot hit all four, say so explicitly rather than papering over it.

## Operating principles

- **Read, don't assume.** Open the route handler, the job, the model. Do not
  document framework defaults or "typical" behaviour you didn't confirm in this
  repo.
- **Trace, then write.** A feature page describes a real code path: entry point →
  what it does → outcomes, including the error/edge branches the code handles.
- **Honesty over completeness theatre.** A documented gap ("the AI provider is an
  external service not in this repo") is worth more than a confident guess. Mark
  unknowns plainly.
- **Right altitude.** Default reader is non-technical: plain language, no jargon
  dumps, no pasted code. Keep implementation detail (file paths, function names)
  out of the prose — or behind a `[dev]` audience tag if a dev audience is
  wanted (see the authoring contract).
- **Inventory before prose.** The single biggest cause of incomplete docs is
  writing ad hoc. Enumerate first, then write against the list.

## Workflow

Work through these phases in order. Each has a **gate** — don't proceed until
it's met.

### Phase 0 — Setup  ·  gate: scope confirmed

- **Resolve how Shipper is invoked here, and use that form throughout.** It may
  be a `shipper` command on the PATH, a shell **alias**, or the npm package run
  via `npx @numinfo/shipper`. Detect it once:
  - Try `shipper --help`. If it succeeds, use **`shipper`**.
  - Otherwise (or if it's an alias that a non-interactive shell won't expand —
    aliases from the user's shell rc often aren't visible to tool calls), use
    **`npx @numinfo/shipper`**. As a one-off, `command -v shipper` /
    `type shipper` can confirm a real binary; an alias may need
    `shopt -s expand_aliases` first, so don't rely on it — if unsure, ask the
    user or just fall back to `npx @numinfo/shipper`.
  - From here on, **`shipper <cmd>`** in this guide means *that resolved form* —
    substitute whichever one works (`shipper build` ⇒ `npx @numinfo/shipper build`).
  - If neither runs (no Node / no network / not installed), tell the user and
    stop — the skill produces Shipper content and needs the tool to verify it.
- Locate the two folders. This skill is scoped to a **docs folder** — that is
  where the catalogue is written (the current docs tree by default). The
  **codebase to document** is a separate thing: usually the surrounding or
  sibling project. Confirm both paths with the user before starting; if the
  docs folder isn't empty, agree on whether to extend or replace what's there.
  Build output defaults to `./html_output` next to the docs folder.
- Ask only what you can't infer: **target reader** (default non-technical),
  **audiences** (do they want `[dev]`/`[pm]` tagged builds?), **languages**
  (English only, or translate?).
- Detect the stack (languages, frameworks, build files) — it drives discovery.

### Phase 1 — Discovery & inventory  ·  gate: user-approved inventory

Produce a written **module → feature inventory** before writing any docs.

- Sweep the codebase through **multiple lenses** so nothing is missed — routes/
  pages, API endpoints, background jobs/crons, data models, integrations, auth &
  roles, CLI commands, config/feature-flags, events. Each lens finds things the
  others miss. The per-stack playbook is in
  [`references/discovery-playbook.md`](references/discovery-playbook.md).
- **For medium+ codebases, fan out** (small repos under ~30 files: skip this —
  read directly per the size table below). Spawn parallel `Explore`
  subagents (read-only), one per top-level area, each returning a **compact,
  one-line-per-feature list** (slug — gist — files — key strings), never prose
  reports. The playbook's "Fanning out" section has the exact output contract
  and a ready-to-paste brief — use it verbatim; don't ask agents to be
  "exhaustive" or to "quote everything", which is what bloats context. Merge and
  de-duplicate the results. This is faster and more thorough than one linear pass.
- **Trust the agents' file list; re-read sparingly.** Once an area's agent has
  reported, only re-open a file yourself to settle a specific contradiction
  between agents, or to quote an exact string you'll put in a scenario — never
  re-read whole files the subagents already covered.
- Flag **dead/removed/flag-disabled** code as candidate `canceled`/`deleted`
  features — the history matters in Shipper.
- Write the inventory to a scratch file Shipper won't publish (a dotfile like
  `.inventory.md`, or a path outside the docs folder): each module
  (slug, title, order) and under it each feature (slug, title, one-line gist,
  the source files it's drawn from, lifecycle status). This file is your
  coverage contract.
- **Present the inventory to the user and refine it** before drafting. Grouping
  is a judgement call (see Heuristics); their input here prevents a rewrite.

### Phase 2 — Draft  ·  gate: every inventory item written

Follow [`references/authoring-contract.md`](references/authoring-contract.md)
exactly; see [`references/example-feature.md`](references/example-feature.md)
for a model file.

- Write the root `index.md` (project title + a short orientation), then per
  module an `index.md` (overview, **no Gherkin**) and one file per feature.
- For each feature: a few sentences of plain prose, an optional one-line
  `summary` (add what the title can't; otherwise omit), then **one** `​```gherkin`
  block with a single `Feature:` and scenarios drawn from the **actual branches**
  in the code — the happy path plus the notable edge/error cases the code
  handles. Don't invent scenarios the code doesn't support.
- Apply lifecycle markers to dropped/removed features; cross-link related
  features with `[[slug]]`.
- **For large jobs, fan out drafting too**: one subagent per module, each handed
  its inventory slice + the authoring contract, writing that module's files.
  Keep slugs stable so cross-links resolve.

### Phase 3 — Verify  ·  gate: lint and build both clean

- `shipper lint --content <dir>` → fix **every** error. (Common trap: literal
  `[[...]]` in example text counts as a wikilink — the contract explains how to
  show the syntax safely.)
- `shipper build --content <dir> --out <site>` → fix any failure.
- Languages requested? `status` then `translate`, then re-check `status`.
- Optionally `serve` to click through it.

### Phase 4 — Completeness audit  ·  gate: no unexplained gaps

This is what makes the docs *exhaustive* rather than merely *plausible*. For a
**small** repo, fold this into Phase 3 — self-audit your draft against the
inventory, no separate subagent. For **medium+** repos, run the diff-style audit:

- **Run a diff-style coverage audit (medium+ repos).** Hand a fresh subagent (one
  that hasn't seen your draft) the inventory list and ask it to return **only
  what the code contains that is missing from that list** — a short gap list, not
  a fresh re-derivation of every feature. This keeps the audit's output small and
  does the diffing for you. Anything it flags → add it or record why it's out of
  scope.
- Per module, confirm every endpoint / page / job / command has a home.
- **Hunt for unsupported claims**: anything in the prose not backed by code gets
  marked as an assumption or removed.
- **Reconcile the README against the code.** Diff the README/existing docs
  (routes, endpoints, claimed behaviour) against what the code actually does, and
  surface every contradiction in the final report — stale docs are common (e.g. a
  documented `/submit` route or `/success` page that no longer exists). Document
  what the code does, not what the README says.
- Report to the user: modules, feature count, lifecycle counts, and an explicit
  list of known gaps/unknowns.

## Heuristics

| Question | Rule of thumb |
|----------|---------------|
| What's a **module**? | A bounded area / domain — often a top-level source dir, a route group, or a noun like "Billing", "Auth", "Reporting". Aim for ~4–12. |
| What's a **feature**? | One capability an actor can invoke: an endpoint cluster, a page/flow, a job, a CLI command. ~3–10 per module. |
| Too granular? | One feature per function/file is too fine. Group by user-visible capability, not by code unit. |
| Too coarse? | If a feature's scenarios cover three unrelated behaviours, split it. |
| Ordering | `order` in tens (10, 20, 30) so items slot in later. Order modules and features by importance or natural flow. |
| Naming | Folder/file names are kebab-case slugs; `title` is human-readable. |

| Codebase size | Approach |
|---------------|----------|
| **Small** (one app, under ~30 source files) | **No subagents.** Read the source directly, draft directly, and merge Phase 3 + 4 into one self-check against the inventory. Fan-out and an independent audit agent cost more than they return at this size. |
| Medium | Fan out discovery across top-level areas; draft module by module; run the diff-style audit subagent. |
| Large / monorepo | Fan out both discovery and drafting per package/module; if the user opts into a multi-agent **workflow**, pipeline discover → draft → verify per module. |

## Anti-patterns — do not

- Invent behaviour, or pad summaries with words the title already says.
- Document a framework's default behaviour you didn't verify in *this* repo.
- Paste code or transcribe files into prose.
- Skip the inventory and write feature-by-feature off the top of your head
  (guarantees gaps).
- Collapse everything into one module, or explode every helper into its own
  feature.
- Mark lint "good enough" with errors outstanding — the build depends on it.

## References (read on demand)

- [`references/authoring-contract.md`](references/authoring-contract.md) — the
  exact content format and lint rules. **Read before drafting.**
- [`references/discovery-playbook.md`](references/discovery-playbook.md) —
  per-stack enumeration lenses and how to find each. **Read during Phase 1.**
- [`references/example-feature.md`](references/example-feature.md) — a model
  module overview + feature file, with good vs bad summaries and audience tags.
