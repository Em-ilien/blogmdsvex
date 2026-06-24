---
title: "Mise en page et style"
order: 20
summary: "Le cadre de page partagé enveloppe chaque page ; Tailwind fournit le style."
---

Chaque page partage un cadre commun. Une mise en page racine enveloppe le
contenu de chaque page pour que la configuration à l'échelle du site — y
compris la feuille de style — soit appliquée partout de manière cohérente. Le
style visuel est fourni par **Tailwind**, chargé une fois via la feuille de
style partagée, qui donne l'espacement, le type et les couleurs utilisés dans
la liste d'accueil et les pages d'articles.

```gherkin
Feature: Mise en page et style

  Scenario: Chargement d'une page quelconque
    Given un visiteur ouvre n'importe quelle page du site
    Then la page est enveloppée dans la mise en page partagée
    And le style du site s'y applique
```

