# SIG Service - Recruit Admin (Test Technique)

Une application moderne de gestion de recrutements développée avec **Vue 3**, **TypeScript**, et **Tailwind CSS**.

![Aperçu](https://generate-image-placeholder-url.com) <!-- Je suggérerai au client de rajouter un screenshot ici -->

## 🚀 Fonctionnalités

- **Tableau de Bord Premium** : KPIs dynamiques (Total, En attente, Entretiens, Embauches) avec visualisation de la répartition par poste.
- **Gestion des Candidats** :
  - Recherche plein texte débouncée.
  - Multi-tris (Nom, Poste, Statut, Date).
  - Filtres avancés (Statut, Poste) via drawer.
  - Pagination fluide avec `json-server`.
- **Détails & Actions** : Volet latéral pour le suivi détaillé et la mise à jour du statut en temps réel (Optimistic UI).
- **Design "Luxe"** : Interface soignée avec glassmorphism, animations fluides (Vue Transitions) et respect de la charte graphique SIG Service (Purple).
- **Developer Experience** : Intégration de Vue DevTools pour faciliter la revue technique.

## 🛠 Stack Technique

- **Frontend** : Vue 3 (Composition API), Vite, TypeScript.
- **Style** : Tailwind CSS (Thème personnalisé).
- **État** : Pinia (Gestion globale et filtres).
- **API** : Axios (Couche service découplée).
- **Mock Server** : JSON Server.

## 📦 Installation & Démarrage

### 1. Installation
```bash
npm install
```

### 2. Lancement (Simultané)
La méthode recommandée est d'utiliser le script combiné qui lance l'API et le Frontend ensemble :
```bash
npm run start
```

- **Frontend** : `http://localhost:3005`
- **API (json-server)** : `http://localhost:3001`

---

## 🛠 Dépannage (Troubleshooting)

### ❌ "json-server: command not found"
Si vous essayez de lancer `json-server` directement et qu'il n'est pas installé globalement, utilisez les scripts npm déjà configurés :
- Utilisez `npm run server` au lieu de `json-server ...`
- Ou utilisez `npx json-server ...`

### ⚠️ Conflit de Port
Par défaut, le test demande le port 3000. Si celui-ci est occupé (cas fréquent sur Windows), l'application est configurée pour basculer sur le port **3001**. La configuration est automatiquement gérée dans `src/services/api.ts` et `package.json`.

---

## 🌍 Déploiement & Environnements

L'application est conçue pour être testée dans deux environnements distincts :

### 1. Environnement Local (Recommandé pour la revue)
*   **Pourquoi** : C'est le seul environnement qui permet une **persistance réelle** des données (ajout de candidats, commentaires, changements de statut) directement dans le fichier `db.json`.
*   **Lancement** : `npm run start`.

### 2. Environnement Serveur (Vercel)
*   **Pourquoi** : Offre une démo "Live" immédiate sans installation pour le recruteur.
*   **Différence Technique** : Sur Vercel, l'API tourne via une **Serverless Function** (`api/server.js`). Le système de fichiers étant éphémère, les modifications de données sont visibles pendant la session mais ne sont pas sauvegardées de manière permanente sur le serveur.
*   **URL de démo** : _(À compléter après votre déploiement Vercel)_

---

## 💡 Pourquoi ces technologies ?

*   **Vue 3 & Pinia** : Pour la réactivité et la gestion d'état moderne. Bien que mon expertise principale soit Angular, Vue 3 a été choisi pour ce test afin de démontrer une capacité d'adaptation rapide à une nouvelle stack "on-the-fly".
*   **Tailwind CSS** : Utilisé pour garantir un design "Premium" et responsive en un temps record, tout en respectant une cohérence visuelle stricte.
*   **IA-Assisted Workflow** : L'usage d'outils d'IA nous a permis de livrer en 48h un projet qui en nécessiterait normalement 72h+, sans sacrifier la qualité architecturale (découplage des services, typage TypeScript).

---

## 📂 Structure du Projet

- `src/services/` : Abstraction API (Axios).
- `src/stores/` : État global (Pinia).
- `src/components/` : Composants UI et métier.
- `DOCS/` : Documentation détaillée demandée par le test.

## 📝 Livrables (Vérifiés)
- [✓] Analyse technique et UX (`DOCS/ANALYSIS.md`)
- [✓] Décisions d'architecture (`DOCS/DECISIONS.md`)
- [✓] Fonctionnalités obligatoires (Liste, Détails, Filtres, Recherche, État, Pagination, **Commentaires**)
- [✓] Bonus Mid-Level (Optimistic UI, TypeScript, Design "Luxe", Filtres avancés)
