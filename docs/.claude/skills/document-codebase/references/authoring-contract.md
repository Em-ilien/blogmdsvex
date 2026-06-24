# Authoring contract

The exact rules Shipper content must follow. Content that violates these fails
`shipper lint` and won't build. If the project has its own `docs/CLAUDE.md`,
that file is authoritative — read it too.

> `shipper <cmd>` here means however Shipper is invoked in this environment (a
> `shipper` binary/alias, or `npx @numinfo/shipper <cmd>`) — see Phase 0 of
> `SKILL.md`.

## Folder layout

- One folder per **module**; the folder name is a kebab-case slug used in URLs.
- Each module folder has an **`index.md`** (the module overview).
- One `.md` file per **feature** in the module folder; filename is the feature
  slug.
- A single **root `index.md`** at the top of the docs folder. Its `title` is
  the name of the whole site and is **mandatory** — the build fails without it.
- Translations live under `.i18n/<locale>/…` mirroring the tree exactly, and are
  **generated** by `shipper translate` — never hand-author them.

## Frontmatter (YAML between `---` fences)

```yaml
---
title: Human-readable title    # REQUIRED on every file
order: 10                      # REQUIRED integer on every file EXCEPT the root index.md
summary: One-line gist.        # optional (feature files); see below
canceled: '2026-01-20'         # optional lifecycle marker (quoted ISO date)
deleted: '2026-04-15'          # optional lifecycle marker (quoted ISO date)
---
```

Rules enforced by the linter:

- `title` required and non-empty everywhere.
- `order` required and an integer everywhere **except** the root `index.md`.
- `deleted` and `canceled` are **mutually exclusive**; each must be a **quoted**
  ISO date `'YYYY-MM-DD'`.
- `spec:` IDs are optional; if present each must match `SHIP-AREA-N` and be
  globally unique. **For documenting an external codebase, omit `spec:`** — it's
  only for projects whose docs are checked against their own source.

## Lifecycle markers (active / canceled / deleted)

- **No marker** → the feature/module is active (the normal case).
- **`canceled`** → planned but never built.
- **`deleted`** → was built, then removed.

A marker on a module's `index.md` applies to the whole module; on a feature file
it applies to that feature. Marked items stay listed and reachable, shown
greyed-out with a badge — Shipper is a historical record, so don't delete files
to represent removal; mark them.

## Body prose

- Short, plain-language description. Use `**bold**` for key terms and the
  lifecycle verb ("**canceled**", "**removed**").
- Wrap lines around ~78 columns to match existing files.
- Keep implementation detail out of reader-facing prose (see audience tags).

## Summary line

Renders as **"Title — summary"** in feature lists, so the summary lands right
after the title.

- **Never repeat the title** — drop any word the title already conveys.
- **Carry specifics** the title can't: numbers, named services, mechanisms
  ("Reset via a 6-character code with 1-hour expiry.").
- **Omit it** when nothing of value remains after removing title-redundant words.
- Style: a sentence-case fragment that reads after an em dash, ending with a
  period. Not a "This feature…" sentence.
- Only state what the body/Gherkin supports.

## Gherkin (feature files only)

- Exactly **one** ` ```gherkin ` fenced block per feature file, containing
  exactly **one** `Feature:` line. Module and root `index.md` carry **no**
  Gherkin block.
- Standard keywords: `Feature`, `Background`, `Scenario`, `Scenario Outline` +
  `Examples`, `Given`/`When`/`Then`/`And`/`But`.
- Scenario-level lifecycle uses a tag on the line above the scenario, matching a
  valid ISO date: `@canceled(2026-02-10)` or `@deleted(2026-04-15)`. A feature
  can be active overall while individual scenarios are tagged.
- A feature with no scenarios yet is allowed (the page shows "no scenarios").

## Cross-links

- Link to another feature by wrapping its **file slug** (not its title) in double
  square brackets: the link points at the feature whose file is `<slug>.md`, in
  any module.
- The linter checks that **every** such link resolves to a real feature file —
  a dangling link fails the lint.
- **Gotcha:** the linter treats *any* double-square-bracket token as a real
  link, including ones inside example text or Gherkin steps. To *show* the link
  syntax without triggering it, describe it in words ("wrap the slug in double
  square brackets") instead of typing a literal example. Reserve real
  double-bracket tokens for genuine links to files that exist.

## Audience tags (conditional content)

- Prefix a **whole line** with `[name]` to keep it out of other audiences'
  builds: `[dev] Implemented in src/jobs/export.ts`. Unmarked lines are shared.
- Names are lowercase slugs; list several with commas: `[dev,qa]`.
- Works in prose and inside Gherkin step lines.
- To start a line with a literal bracket, escape it: `\[not a tag]`.
- Use this to keep developer detail (file paths, function names) available to a
  `dev` build while a non-technical build stays clean. Choose at build time with
  `shipper build --audience <name>`.

## Shipper CLI & gotchas (verified)

Behaviours that aren't obvious and otherwise cost tool calls to rediscover:

- **`lint` is the real gate** (`shipper lint --content <dir>`): it validates
  frontmatter, one-`Feature:`-per-file, and that every `[[link]]` resolves. Run
  it until clean before build.
- **Aliased cross-links work:** `[[slug|shown text]]` resolves and passes lint,
  not only bare `[[slug]]`. The link target is the slug *before* the `|`.
- **Audience builds embed everything.** `build --audience <name>` — and a build
  with no `--audience` — both ship *all* tagged lines into the page bundle;
  audience selection is applied at render time, and the `[name]` prefix is
  stripped from the visible text. So you **cannot** confirm a tag was excluded by
  grepping `html_output`; the raw line is in the bundle regardless. Verify
  tagging by reading the source `.md`, and trust `lint`/`build` for the rest.
- **The built site is client-rendered.** Body prose lives in a JS bundle, not in
  per-page `index.html` — grepping the static HTML for a sentence finds nothing.
  Don't use it to "verify" content rendered.
- **Translation is a separate, paid step.** Target locales are declared in
  `docs/.i18n/manifest.json` (`"targets": [...]`); `shipper status` lists
  stale/missing translations and `shipper translate` generates them (calls an
  LLM — costs tokens), writing per-file hashes back to the manifest for staleness
  tracking. Never hand-edit `.i18n/` files; re-run `translate` after changing a
  source file or `status` will show it stale.

## Pre-save checklist

1. Valid frontmatter: `title` everywhere, `order` everywhere but root index.md.
2. At most one lifecycle marker; dates quoted ISO.
3. Exactly one Gherkin block with one `Feature:` in each feature file; none in
   index files.
4. Every double-bracket link resolves to a real feature slug.
5. `shipper lint` is clean before you consider a module done.
