---
title: "Home page post list"
order: 10
summary: "Lists every post as a clickable card; shows \"Aucun article\" when empty."
---

The home page gathers **every** Markdown post in the content folder and shows
each one as a card built from the shared [[article-display]] layout. Each card
is a link to that post's own page, addressed by the post's file name. When there
are no posts at all, the page shows the placeholder message **"Aucun article"**
instead of an empty list.

The list is assembled at build time, so the home page is plain static HTML with
no loading step for the visitor.

```gherkin
Feature: Home page post list

  Scenario: Several posts exist
    Given the content folder contains two posts
    When a visitor opens the home page
    Then both posts are shown as cards
    And each card shows the post's title and description
    And each card links to that post's own page

  Scenario: Opening a post from the list
    Given the home page is showing a post card
    When the visitor clicks the card
    Then they are taken to that post's page

  Scenario: No posts exist
    Given the content folder contains no posts
    When a visitor opens the home page
    Then the page shows the message "Aucun article"
```
