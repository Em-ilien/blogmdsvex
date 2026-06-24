---
title: "Post page"
order: 20
summary: "Reads one post by its file-name slug; missing slugs return a 404."
---

Each post has its own page, reached by the post's file name in the address (for
example `/hello`). The page finds the matching Markdown file, renders it through
the shared [[article-display]] layout, and shows the full article. If the
address points at a post that doesn't exist, the visitor gets a **404 Not
Found** page rather than a blank screen.

Like the rest of the site, every post page is generated ahead of time as static
HTML.

```gherkin
Feature: Post page

  Scenario: Opening an existing post
    Given a post named "hello" exists in the content folder
    When a visitor opens the page for "hello"
    Then the post's title, description and body are shown

  Scenario: Opening a post that does not exist
    Given no post named "missing" exists
    When a visitor opens the page for "missing"
    Then a 404 Not Found page is shown
```
