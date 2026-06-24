---
title: "Articles Markdown"
order: 10
summary: "Les articles sont des fichiers .md avec titre/description ; le nom du fichier est l'URL."
---

Un article de blog est un seul fichier **Markdown** placé dans le dossier de
contenu du projet. Le haut du fichier contient un petit bloc de détails donnant
le **titre** et la **description** de l'article ; tout ce qui suit est le corps
de l'article, écrit en Markdown ordinaire (titres, paragraphes, etc.).

Le nom du fichier — écrit en minuscules avec des tirets, comme
`my-first-post.md` — devient l'adresse web de l'article (`/my-first-post`).
Pour publier un nouvel article, un auteur ajoute simplement un nouveau fichier ;
pour en supprimer un, il supprime le fichier. L'article apparaît alors
automatiquement dans la [[post-list]] et obtient sa propre page [[post-detail]]
la prochaine fois que le site est compilé.

```gherkin
Feature: Articles Markdown

  Scenario: Ajout d'un article
    Given un auteur crée un fichier Markdown dans le dossier de contenu
    And le fichier commence par un titre et une description
    When le site est compilé
    Then l'article apparaît dans la liste d'articles de la page d'accueil
    And l'article a sa propre page à l'adresse correspondant au nom du fichier

  Scenario: Les détails de l'article déterminent ce que les lecteurs voient
    Given un fichier d'article avec un titre et une description
    When l'article s'affiche
    Then le titre et la description proviennent de ce bloc de détails
    And le reste du fichier s'affiche comme le corps de l'article
```

