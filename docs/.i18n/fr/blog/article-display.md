---
title: "Affichage d'article"
order: 30
summary: "Mise en page partagée affichant le titre, la description et le corps d'un article."
---

Une mise en page d'article réutilisable unique affiche un article partout où il
apparaît — à la fois comme une carte dans la [[post-list]] et comme la page
complète [[post-detail]]. Elle affiche le **titre** de l'article comme un
titre, sa **description** comme un sous-titre en dessous, puis le contenu du
**corps** de l'article. Parce que la même mise en page est utilisée aux deux
endroits, un article a une apparence cohérente sur tout le site.

```gherkin
Feature: Affichage d'article

  Scenario: Rendu d'un article
    Given un article avec un titre, une description et un corps
    When la mise en page d'article affiche l'article
    Then le titre s'affiche en tant que titre
    And la description s'affiche sous le titre
    And le contenu du corps s'affiche en dessous
```

