---
title: "Markdown posts"
order: 10
summary: "Posts are .md files with title/description; the file name is the URL."
---

A blog post is a single **Markdown** file placed in the project's content
folder. The top of the file holds a short details block giving the post's
**title** and **description**; everything below it is the post body, written in
ordinary Markdown (headings, paragraphs, and so on).

The file's name — written in lower-case with hyphens, such as
`my-first-post.md` — becomes the post's web address (`/my-first-post`). To
publish a new post an author simply adds a new file; to remove one they delete
the file. The post then appears automatically in the [[post-list]] and gets its
own [[post-detail]] page the next time the site is built.

```gherkin
Feature: Markdown posts

  Scenario: Adding a post
    Given an author creates a Markdown file in the content folder
    And the file starts with a title and a description
    When the site is built
    Then the post appears in the home page list
    And the post has its own page at the address matching the file name

  Scenario: Post details drive what readers see
    Given a post file with a title and a description
    When the post is shown
    Then the title and description come from that details block
    And the rest of the file is shown as the post body
```
