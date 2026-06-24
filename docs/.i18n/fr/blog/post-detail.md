---
title: "Page d'article"
order: 20
summary: "Lit un article par son slug de nom de fichier ; les slugs manquants retournent un 404."
---

Chaque article a sa propre page, accessible par le nom de fichier de l'article
dans l'adresse (par exemple `/hello`). La page trouve le fichier Markdown
correspondant, le rend via la mise en page partagée [[article-display]], et
affiche l'article complet. Si l'adresse pointe vers un article qui n'existe pas,
le visiteur obtient une page **404 Non trouvé** plutôt qu'un écran vide.

Comme le reste du site, chaque page d'article est générée à l'avance en tant
que HTML statique.

```gherkin
Feature: Page d'article

  Scenario: Ouverture d'un article existant
    Given un article nommé « hello » existe dans le dossier de contenu
    When un visiteur ouvre la page pour « hello »
    Then le titre, la description et le corps de l'article s'affichent

  Scenario: Ouverture d'un article qui n'existe pas
    Given aucun article nommé « missing » n'existe
    When un visiteur ouvre la page pour « missing »
    Then une page 404 Non trouvé s'affiche
```

