---
title: "Local file access safeguard"
order: 30
summary: "Reading project files is allowed only in development, not production."
---

Because posts are read from local files, the project needs permission to reach
those files while it runs. This permission is deliberately granted **only
during development**. In a production build the allowance is switched off, so the
running site cannot reach beyond its intended files — a safeguard against
exposing local files once the site is deployed.

```gherkin
Feature: Local file access safeguard

  Scenario: Working in development
    Given the project is running in development mode
    Then it is allowed to read the project's local files

  Scenario: Running a production build
    Given the project is built for production
    Then local file access is not granted
```
