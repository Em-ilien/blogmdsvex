---
title: "Layout & styling"
order: 20
summary: "Shared page frame wraps every page; Tailwind provides the styling."
---

Every page shares a common frame. A root layout wraps each page's content so
that site-wide setup — including the stylesheet — is applied everywhere
consistently. Visual styling is provided by **Tailwind**, loaded once through
the shared stylesheet, which gives the spacing, type and colours used across the
home listing and the post pages.

```gherkin
Feature: Layout & styling

  Scenario: Loading any page
    Given a visitor opens any page of the site
    Then the page is wrapped in the shared layout
    And the site's styling is applied to it
```
