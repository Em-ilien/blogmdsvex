---
title: "Article display"
order: 30
summary: "Shared layout showing a post's title, description and body."
---

A single reusable article layout renders a post wherever it appears — both as a
card in the [[post-list]] and as the full [[post-detail]] page. It shows the
post's **title** as a heading, its **description** as a subtitle underneath, and
then the post's **body** content. Because the same layout is used in both
places, a post looks consistent across the site.

```gherkin
Feature: Article display

  Scenario: Rendering a post
    Given a post with a title, a description and a body
    When the article layout renders the post
    Then the title is shown as a heading
    And the description is shown beneath the title
    And the body content is shown below them
```
