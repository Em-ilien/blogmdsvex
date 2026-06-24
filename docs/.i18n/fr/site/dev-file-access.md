---
title: "Protection d'accès aux fichiers locaux"
order: 30
summary: "La lecture des fichiers du projet n'est autorisée qu'en développement, pas en production."
---

Parce que les articles sont lus à partir de fichiers locaux, le projet a besoin
de permission pour accéder à ces fichiers pendant son exécution. Cette
permission est délibérément accordée **uniquement pendant le développement**. Dans
une compilation de production, l'autorisation est désactivée, donc le site en
cours d'exécution ne peut pas accéder au-delà de ses fichiers prévus — une
protection contre l'exposition des fichiers locaux une fois que le site est
déployé.

```gherkin
Feature: Protection d'accès aux fichiers locaux

  Scenario: Travailler en développement
    Given le projet fonctionne en mode développement
    Then il est autorisé de lire les fichiers locaux du projet

  Scenario: Exécution d'une compilation de production
    Given le projet est compilé pour la production
    Then l'accès aux fichiers locaux n'est pas accordé
```

