---
title: "Liste d'articles sur la page d'accueil"
order: 10
summary: "Liste chaque article sous forme de carte cliquable ; affiche « Aucun article » quand vide."
---

La page d'accueil rassemble **chaque** article Markdown du dossier de contenu et
affiche chacun sous forme de carte construite à partir de la mise en page
partagée [[article-display]]. Chaque carte est un lien vers la propre page de
cet article, adressée par le nom de fichier de l'article. Quand il n'y a
aucun article du tout, la page affiche le message d'espace réservé **« Aucun
article »** à la place d'une liste vide.

La liste est assemblée au moment de la compilation, donc la page d'accueil est
du HTML statique ordinaire sans étape de chargement pour le visiteur.

```gherkin
Feature: Liste d'articles sur la page d'accueil

  Scenario: Plusieurs articles existent
    Given le dossier de contenu contient deux articles
    When un visiteur ouvre la page d'accueil
    Then les deux articles s'affichent sous forme de cartes
    And chaque carte affiche le titre et la description de l'article
    And chaque carte renvoie à la propre page de cet article

  Scenario: Ouverture d'un article depuis la liste
    Given la page d'accueil affiche une carte d'article
    When le visiteur clique sur la carte
    Then il est redirigé vers la page de cet article

  Scenario: Aucun article n'existe
    Given le dossier de contenu ne contient aucun article
    When un visiteur ouvre la page d'accueil
    Then la page affiche le message « Aucun article »
```

