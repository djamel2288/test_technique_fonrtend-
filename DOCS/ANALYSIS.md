# Analyse et Diagnostic UX - Gestion de Recrutement

## 1. Problématiques Identifiées

Le flux de tri actuel présente plusieurs points de friction pour les recruteurs :

*   **Surcharge Cognitive** : Le volume important de candidatures rend difficile l'identification des profils prioritaires.
*   **Recherche Fastidieuse** : L'absence de filtres multicritères performants oblige les recruteurs à parcourir manuellement chaque CV.
*   **Manque de Visibilité (KPIs)** : Difficulté à avoir une vue d'ensemble du funnel de recrutement (Hires vs Pipeline).
*   **Perte de Contexte** : Passer d'une liste à un détail de candidature puis revenir en arrière casse le flux de travail.

## 2. Approche Technique et Solutions UX

Pour résoudre ces problèmes, l'application implémente les solutions suivantes :

### A. Interface "Luxe" & Performance
*   **Dashboard KPI** : Offrir une vision stratégique immédiate (Total, Entretiens en cours, Recrutements effectués).
*   **Modern Table** : Une table épurée avec tri dynamique et pagination pour gérer les volumes importants sans ralentissement.
*   **Filtres de Période** : Ajout d'une sélection par plage de dates pour isoler rapidement les candidatures d'une session de recrutement spécifique.

### B. Navigation & Collaboration
*   **Drawer de Détails** : L'utilisation d'un volet latéral (Drawer) pour le détail d'un candidat permet de consulter les informations sans quitter la liste de recherche. Cela préserve les filtres actifs et la position du scroll.
*   **Système de Commentaires** : Pour résoudre le problème de collaboration, chaque fiche dispose d'un espace de notes permettant aux recruteurs de partager leur avis sur un profil.
*   **Recherche & Filtres Avancés** : Implémentation d'un "Filter Drawer" pour les filtres secondaires (postes, statuts) et d'une barre de recherche "Live" (nom, compétences) pour des résultats immédiats.

### C. Stack Technique Scalable
*   **Pinia Store** : Gestion centralisée de l'état pour assurer une synchronisation parfaite entre la liste, les filtres et les détails.
*   **API Service Layer** : Séparation stricte de la logique métier et des appels HTTP (Axios) pour faciliter la maintenance et les tests.
*   **Optimistic UI** : Mise à jour immédiate de l'interface lors du changement de statut, avec rollback en cas d'erreur API, pour une sensation de rapidité maximale.

## 3. Stratégie de Communication avec l'API
Pour maximiser la performance et la fiabilité, nous utilisons les opérateurs avancés de `json-server` :
*   `nom:contains` : Pour une recherche textuelle fiable sur les noms.
*   `competences_like` : Pour le filtrage précis par compétences.
*   `dateCandidature_gte/lte` : Pour le filtrage par plage de dates.
*   `_page` & `_limit` : Pour une pagination fluide.
*   `_sort` & `_order` : Pour le tri dynamique.
*   **Isolation du Dashboard** : Les requêtes KPI sont effectuées sans paramètres de filtrage pour garantir des statistiques globales immuables par l'utilisateur.
