# Example: a module overview and a feature file

A worked model to copy. Note the altitude (plain language), the grounded
scenarios (drawn from real branches), the summary discipline, and the optional
`[dev]` audience tag carrying implementation detail without polluting the
reader-facing prose.

## Module overview — `billing/index.md`

No `summary`, no Gherkin in an index file.

```markdown
---
title: "Billing"
order: 20
---

How customers pay and how their subscription state stays in sync. Checkout is
handled by **Stripe**; the system reacts to Stripe's webhooks to keep each
account's plan, trial, and invoices up to date.

[dev] Code lives under `src/billing/`; Stripe keys come from `STRIPE_*` env vars.
```

## Feature file — `billing/checkout.md`

```markdown
---
title: "Stripe Checkout"
order: 10
summary: "Hosted Stripe Checkout session; returns to a success or cancel page."
---

When a customer chooses a paid plan, the app creates a **Stripe Checkout**
session and sends them to Stripe's hosted payment page. Stripe handles the card
details; the customer returns to a success or cancel page, and the plan only
changes once Stripe confirms payment via [[webhooks]].

[dev] Entry point: `POST /api/checkout` → `createSession()` in
[dev] `src/billing/checkout.ts`.

​```gherkin
Feature: Stripe Checkout

  Background:
    Given a signed-in customer on the pricing page

  Scenario: Starting checkout for a paid plan
    When the customer selects the "Pro" plan
    Then a Stripe Checkout session is created for that plan
    And the customer is redirected to Stripe's hosted payment page

  Scenario: Returning after a successful payment
    Given the customer completed payment on Stripe
    When they return to the success page
    Then they see a confirmation
    But the plan is not upgraded until Stripe confirms it via the webhook

  Scenario: Cancelling at the payment page
    When the customer cancels on Stripe's page
    Then they return to the pricing page with no change to their plan
​```
```

## Summary: good vs bad

- Title "Stripe Checkout", bad summary: *"Checkout with Stripe."* → repeats the
  title, adds nothing → **omit or rewrite**.
- Good: *"Hosted Stripe Checkout session; returns to a success or cancel page."*
  → adds the mechanism and the outcomes the title doesn't state.

## Notes

- The literal `​```gherkin` fences above carry a zero-width marker only to display
  them inside this guide — write plain ` ```gherkin ` fences in real files.
- `[[webhooks]]` is a real cross-link to `billing/webhooks.md`; in your files,
  only use double-bracket links that resolve to a file you actually create.
- The `[dev]` lines vanish from a non-technical build and appear in a
  `--audience dev` build — implementation detail without cluttering the reader's
  view.
