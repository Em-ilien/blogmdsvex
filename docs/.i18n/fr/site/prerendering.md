---
title: "Prérendu"
order: 10
summary: "Chaque page est générée en HTML statique au moment de la construction, sans serveur."
---

Le site entier est **prérendu** : au lieu de construire les pages à la demande quand un visiteur arrive, chaque page est générée en HTML statique quand le projet est construit. La page d'accueil et chaque page d'article sont toutes produites à l'avance. Le résultat est un dossier de fichiers simples qui peut être hébergé n'importe où, sans serveur nécessaire pour servir un lecteur.

```gherkin
Feature: Prérendu

  Scenario: Construction du site
    Given le dossier de contenu contient les articles
    When le projet est construit
    Then une page statique est produite pour la page d'accueil
    And une page statique est produite pour chaque article
    And le site terminé peut être servi en tant que fichiers simples sans serveur
```

