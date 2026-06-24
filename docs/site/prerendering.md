---
title: "Prerendering"
order: 10
summary: "Every page is generated as static HTML at build time, server-free."
---

The whole site is **prerendered**: instead of building pages on demand when a
visitor arrives, every page is generated as static HTML when the project is
built. The home listing and each individual post page are all produced ahead of
time. The result is a folder of plain files that can be hosted anywhere, with no
running server needed to serve a reader.

```gherkin
Feature: Prerendering

  Scenario: Building the site
    Given the content folder holds the posts
    When the project is built
    Then a static page is produced for the home listing
    And a static page is produced for each post
    And the finished site can be served as plain files without a server
```
