# Content authoring guide

This folder holds product documentation as Markdown. Each doc describes one
module or feature and embeds its behaviour as Gherkin. Follow the conventions
below so docs stay valid and machine-readable.

## Layout

- One folder per **module** (e.g. `billing/`, `reporting/`).
- Each module has an `index.md` (module overview, no Gherkin) plus one `.md`
  per **feature**.
- `.i18n/<lang>/` mirrors the exact folder/file structure with translated
  content. Keep paths identical to the source tree.

## Frontmatter

Every file starts with YAML frontmatter:

```yaml
---
title: Human-readable title   # required; translate in i18n copies
order: 10                     # required; sort order within the folder
summary: One-line gist        # optional; see "Writing a good summary" below
canceled: '2026-01-20'        # optional lifecycle marker (quoted ISO date)
deleted: '2026-04-15'         # optional lifecycle marker (quoted ISO date)
---
```

Lifecycle markers (mutually exclusive, file-level = whole feature/module):

- none — feature is **active**.
- `canceled` — planned but **never built**.
- `deleted` — was built, then **removed**.

In i18n copies, keep `order` and lifecycle dates identical to the source;
translate `title`, `summary`, and the body.

### Writing a good summary

`summary` is an optional one-line description. The renderer shows each feature
as **`Title — summary`** in the auto-generated feature links list, so the
summary text lands right after the title.

- **Never repeat the title.** Since it renders immediately after the title,
  drop any word the title already conveys; write only what the title doesn't.
- **Carry concrete specifics** the title can't — numbers, named
  providers/services, mechanisms, IDs. For example:
  - "Reset via a 6-character code with 1-hour expiry."
  - "Google, Facebook and Twitter OAuth with identity linking."
  - "JWT tokens stored in token_map; idle-timeout auto-logout."
- **Omit it entirely** when, after stripping every title-redundant word,
  nothing of value is left. A summary that merely restates the title is noise.
- **Style:** a short fragment that reads naturally after an em dash; sentence
  case; ends with a period. Not a full "This feature…" sentence.
- **Stay truthful:** only state what the body/Gherkin supports; never invent
  facts to fill a summary.
- **i18n:** mirror the same `summary` in each `.i18n/<lang>/` copy, applying the
  no-title-repetition rule against the *translated* title; keep the meaning
  identical across locales.

## Body

- Short prose describing the feature; use `**bold**` for key terms and the
  lifecycle verb (e.g. "**canceled**", "**removed**").
- Wrap lines at ~78 columns to match existing files.
- Active and historical features alike keep their Gherkin block for the record.

## Gherkin

Feature files live in a fenced ` ```gherkin ` block, one `Feature:` per doc.

- Use standard keywords: `Feature`, `Background`, `Scenario`,
  `Scenario Outline` + `Examples`, `Given`/`When`/`Then`/`And`.
- Scenario-level lifecycle uses tags above the scenario, matching the
  frontmatter dates: `@canceled(2026-02-10)` or `@deleted(2026-04-15)`.
- A file can be active overall while individual scenarios are tagged
  canceled/deleted (see `billing/invoice-export.md`).

## Checklist before saving

1. Valid frontmatter with `title` + `order`.
2. At most one lifecycle marker, date quoted ISO `'YYYY-MM-DD'`.
3. Gherkin parses; tags and dates agree with frontmatter.
4. i18n copy exists at the mirrored path with the same structure.
