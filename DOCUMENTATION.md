# Documentation Color Palette App

Cette documentation détaille le fonctionnement de l'application Color Palette, ses composants, ses pages et son API.

## Table des matières
1. [Structure de l'application](#structure-de-lapplication)
2. [Pages](#pages)
3. [Composants](#composants)
4. [API](#api)
5. [Guide d'utilisation](#guide-dutilisation)

## Structure de l'application

L'application est divisée en deux parties principales :
- Frontend (React + Vite)
- Backend (Node.js + Express + MongoDB)

### Architecture des dossiers
```
color-palette-app/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── pages/         # Pages de l'application
│   ├── services/      # Services (API calls)
│   └── utils/         # Utilitaires
└── server/           # Backend
```

## Pages

### 1. Home (Home.jsx)
- **Fonction** : Page d'accueil affichant toutes les palettes de couleurs
- **Fonctionnalités** :
  - Affichage paginé des palettes
  - Filtrage par tags
  - Recherche de palettes
  - Copie des codes couleur

### 2. Create Palette (CreatePalette.jsx)
- **Fonction** : Création de nouvelles palettes de couleurs
- **Fonctionnalités** :
  - Sélection jusqu'à 5 couleurs
  - Ajout de tags (maximum 3)
  - Prévisualisation en temps réel
  - Validation des entrées

## Composants

### Composants de palette
1. **PaletteCard**
   - Affiche une palette individuelle
   - Permet la copie des codes couleur
   - Affiche les tags associés

2. **PaletteGrid**
   - Grille responsive des palettes
   - Gestion de la pagination
   - Filtrage des palettes

3. **PaletteCreator**
   - Interface de création de palette
   - Validation des couleurs
   - Gestion des tags

### Composants UI
1. **SearchBar**
   - Barre de recherche avec suggestions
   - Filtrage par tags

2. **TagInput**
   - Gestion des tags
   - Auto-complétion
   - Validation

## Composants détaillés

### 1. Composants de Palette

#### PaletteCard
- **Fichier** : `components/palette/PaletteCard.jsx`
- **Description** : Affiche une palette de couleurs individuelle
- **Props** :
  - `colors` : Array des codes couleur
  - `tags` : Array des tags associés
  - `_id` : Identifiant unique de la palette
- **Fonctionnalités** :
  - Affichage des couleurs en bandes
  - Copie du code couleur au clic
  - Affichage des tags avec style
  - Animation au survol
  - Tooltip avec le code couleur

#### PaletteGrid
- **Fichier** : `components/palette/PaletteGrid.jsx`
- **Description** : Grille responsive affichant plusieurs PaletteCard
- **Props** :
  - `palettes` : Array des palettes à afficher
  - `loading` : Boolean pour l'état de chargement
  - `onPageChange` : Fonction pour la pagination
- **Fonctionnalités** :
  - Layout responsive (grid)
  - Gestion du chargement
  - Pagination intégrée
  - Animation d'apparition des palettes

#### PaletteCreator
- **Fichier** : `components/palette/PaletteCreator.jsx`
- **Description** : Interface de création de palette
- **État local** :
  - Liste des couleurs sélectionnées
  - Tags en cours d'édition
  - État de validation
- **Fonctionnalités** :
  - Sélecteur de couleur avec prévisualisation
  - Validation en temps réel
  - Gestion des tags avec auto-complétion
  - Messages d'erreur contextuels

### 2. Composants UI

#### SearchBar
- **Fichier** : `components/search/SearchBar.jsx`
- **Description** : Barre de recherche avancée
- **Props** :
  - `onSearch` : Fonction de callback pour la recherche
  - `suggestions` : Array de suggestions
- **Fonctionnalités** :
  - Recherche en temps réel
  - Suggestions de tags
  - Historique de recherche
  - Filtres avancés

#### TagInput
- **Fichier** : `components/ui/TagInput.jsx`
- **Description** : Gestion des tags avec auto-complétion
- **Props** :
  - `value` : Array des tags actuels
  - `onChange` : Fonction de callback
  - `maxTags` : Nombre maximum de tags
- **Fonctionnalités** :
  - Auto-complétion des tags
  - Validation des tags
  - Suppression facile
  - Limite de tags

### 3. Composants Layout

#### Header
- **Fichier** : `components/layout/Header.jsx`
- **Description** : En-tête de l'application
- **Fonctionnalités** :
  - Navigation principale
  - Bouton de création
  - Thème responsive

## Guide complet des composants

### Composants de palette (palette/)

#### 1. ColorPaletteCard
**Fichier** : `components/palette/ColorPaletteCard.jsx`
```jsx
function ColorPaletteCard({ palette })
```
**Description** : Carte affichant une palette de couleurs complète
- **Props** :
  - `palette: { colors: string[], tags: string[] }`
- **État local** :
  - `copiedColor`: Garde en mémoire la couleur copiée
- **Fonctionnalités** :
  - Affichage des couleurs en bandes
  - Animation au survol
  - Copie au clic avec feedback
  - Affichage des tags
- **Style** :
  - Design responsive
  - Animations fluides
  - Feedback visuel
- **Accessibilité** :
  - Labels pour lecteurs d'écran
  - Focus visible
  - Messages de feedback

#### 2. ColorPicker
**Fichier** : `components/palette/ColorPicker.jsx`
```jsx
function ColorPicker({ color, onChange, onRemove, showRemove })
```
**Description** : Sélecteur de couleur avec prévisualisation
- **Props** :
  - `color`: Code couleur actuel
  - `onChange`: Callback de changement
  - `onRemove`: Callback de suppression
  - `showRemove`: Afficher bouton suppression
- **Fonctionnalités** :
  - Sélecteur natif de couleur
  - Affichage du code hex
  - Option de suppression
- **Style** :
  - Interface intuitive
  - Responsive
  - Feedback visuel

### Composants de recherche (search/)

#### 3. SearchBar
**Fichier** : `components/search/SearchBar.jsx`
```jsx
function SearchBar({ onSearch, suggestions, initialValue })
```
**Description** : Barre de recherche avancée avec suggestions
- **Props** :
  - `onSearch`: Callback de recherche
  - `suggestions`: Tags suggérés
  - `initialValue`: Valeur initiale
- **État local** :
  - `searchTerm`: Terme de recherche
  - `showSuggestions`: Affichage suggestions
- **Fonctionnalités** :
  - Recherche en temps réel
  - Suggestions de tags
  - Auto-complétion
- **Style** :
  - Design moderne
  - Animations fluides
  - États de focus/hover

### Composants UI (ui/)

#### 4. Button
**Fichier** : `components/ui/Button.jsx`
```jsx
function Button({ children, variant, disabled, onClick })
```
**Description** : Bouton réutilisable avec variantes
- **Props** :
  - `children`: Contenu du bouton
  - `variant`: Style du bouton
  - `disabled`: État désactivé
  - `onClick`: Gestionnaire de clic
- **Variantes** :
  - Primary
  - Secondary
  - Danger
- **Style** :
  - États interactifs
  - Animations
  - Accessibilité

#### 5. TagInput
**Fichier** : `components/ui/TagInput.jsx`
```jsx
function TagInput({ tags, onChange, suggestions, maxTags })
```
**Description** : Gestionnaire de tags avec auto-complétion
- **Props** :
  - `tags`: Tags actuels
  - `onChange`: Callback de modification
  - `suggestions`: Suggestions de tags
  - `maxTags`: Limite de tags
- **État local** :
  - `inputValue`: Valeur en cours
  - `showSuggestions`: Affichage suggestions
- **Fonctionnalités** :
  - Ajout/suppression de tags
  - Auto-complétion
  - Validation
- **Style** :
  - Tags avec suppression
  - Suggestions en dropdown
  - Messages d'erreur

### Composants Layout (layout/)

#### 6. Header
**Fichier** : `components/layout/Header.jsx`
```jsx
function Header()
```
**Description** : En-tête de l'application
- **Fonctionnalités** :
  - Navigation principale
  - Logo
  - Actions rapides
- **Style** :
  - Responsive
  - Fixed top
  - Ombre au scroll

### Interactions entre composants

#### Flux de données
```
Layout
└── Header
    └── Navigation

Page
├── SearchBar
│   └── TagInput
└── PaletteGrid
    └── ColorPaletteCard
        └── TagDisplay
```

#### Communication
1. **Props Down** :
   - Données → PaletteCard
   - Callbacks → ColorPicker
   - État → TagInput

2. **Events Up** :
   - ColorPicker → CreatePalette
   - SearchBar → Home
   - TagInput → CreatePalette

#### État partagé
1. **Tags** :
   - Suggestions communes
   - Validation globale
   - Cache des tags

2. **Couleurs** :
   - Validation format
   - Prévisualisation
   - Historique copie

### Bonnes pratiques implémentées

1. **Performance** :
   - Mémoisation des callbacks
   - Lazy loading des composants lourds
   - Optimisation des re-renders

2. **Accessibilité** :
   - ARIA labels
   - Navigation clavier
   - Messages d'état

3. **UX** :
   - Feedback immédiat
   - États de chargement
   - Gestion des erreurs

## Structure détaillée des pages

### 1. Page d'accueil (Home.jsx)

#### Composition
- **Layout principal** : Flexbox avec direction colonne
- **Composants utilisés** :
  1. `SearchBar`
     - Barre de recherche en haut de la page
     - Filtrage des palettes par tags
     - Auto-complétion avec les tags existants
  
  2. `ColorPaletteCard`
     - Affichage des palettes individuelles
     - Grille responsive de cartes
     - Interactions : copie de couleurs, clic sur tags
  
  3. Composants d'état :
     - Indicateur de chargement
     - Messages d'erreur
     - Pagination

#### État local
```javascript
const [palettes, setPalettes] = useState([]);      // Liste des palettes
const [loading, setLoading] = useState(true);      // État de chargement
const [error, setError] = useState(null);          // Gestion des erreurs
const [searchTerm, setSearchTerm] = useState('');  // Terme de recherche
const [allTags, setAllTags] = useState([]);       // Tags disponibles
```

#### Fonctionnalités principales
1. Chargement initial des palettes
2. Filtrage en temps réel
3. Gestion des tags
4. Pagination des résultats
5. Gestion des erreurs et états de chargement

### 2. Page de création (CreatePalette.jsx)

#### Composition
- **Layout principal** : Formulaire avec sections flexibles
- **Composants utilisés** :
  1. `ColorPicker`
     - Interface de sélection de couleurs
     - Prévisualisation en temps réel
     - Validation des codes couleur
  
  2. `Button` (composant UI)
     - Boutons d'action : Ajouter/Supprimer couleur
     - Bouton de sauvegarde
     - Bouton d'annulation
  
  3. Système de tags
     - Input de tags avec auto-complétion
     - Liste des tags sélectionnés
     - Suggestions de tags existants

#### État local
```javascript
const [colors, setColors] = useState(['#FFFFFF']); // Couleurs de la palette
const [tags, setTags] = useState([]);             // Tags sélectionnés
const [tagInput, setTagInput] = useState('');     // Input du tag en cours
const [allTags, setAllTags] = useState([]);       // Tous les tags disponibles
const [suggestedTags, setSuggestedTags] = useState([]); // Suggestions
```

#### Fonctionnalités principales
1. Gestion des couleurs
   - Ajout/suppression de couleurs (max 8)
   - Validation des codes hexadécimaux
   - Prévisualisation en temps réel

2. Gestion des tags
   - Auto-complétion
   - Validation (max 3 tags)
   - Suggestions basées sur les tags existants

3. Sauvegarde et navigation
   - Validation du formulaire
   - Sauvegarde dans la base de données
   - Redirection vers la page d'accueil

### Flux de données entre les composants

1. **Home.jsx**
```
Home
├── SearchBar
│   ├── Props: onSearch, suggestions (allTags)
│   └── Events: handleSearch, handleTagClick
│
└── ColorPaletteCard (multiple)
    ├── Props: colors, tags, id
    └── Events: handleColorCopy, handleTagClick
```

2. **CreatePalette.jsx**
```
CreatePalette
├── ColorPicker (multiple)
│   ├── Props: color, onChange, onRemove
│   └── Events: handleColorChange, handleRemoveColor
│
├── TagInput
│   ├── Props: tags, suggestions, onChange
│   └── Events: handleTagAdd, handleTagRemove
│
└── Button (multiple)
    ├── Props: onClick, disabled, variant
    └── Events: handleSave, handleCancel
```

### Interactions entre les pages

1. **Navigation**
   - Home → Create : Bouton "Create New Palette"
   - Create → Home : Après sauvegarde ou annulation

2. **Partage de données**
   - Tags disponibles synchronisés
   - Palettes mises à jour après création
   - État de chargement global

## API

### Endpoints

1. **GET /api/palettes**
   - Récupère les palettes de couleurs
   - Paramètres de requête :
     - `page` : numéro de page (défaut: 1)
     - `limit` : nombre d'éléments par page (défaut: 12)
     - `tags` : filtrage par tags (optionnel)
   - Réponse :
     ```json
     {
       "results": [...],
       "pagination": {
         "total": number,
         "page": number,
         "pages": number,
         "hasMore": boolean
       }
     }
     ```

2. **GET /api/palettes/tags**
   - Récupère tous les tags uniques
   - Réponse : `string[]`

3. **POST /api/palettes**
   - Crée une nouvelle palette
   - Corps de la requête :
     ```json
     {
       "colors": string[],
       "tags": string[]
     }
     ```
   - Validations :
     - 1 à 5 couleurs
     - Maximum 3 tags
     - Format de couleur valide

## API détaillée

### Configuration du serveur (index.js)

```javascript
// Configuration de base
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Middleware de pagination
const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    // Gestion de la pagination et des filtres
  };
};

// Configuration des routes principales
```

### Endpoints détaillés

#### 1. GET /api/palettes
- **Description** : Récupère les palettes avec pagination et filtres
- **Paramètres URL** :
  ```javascript
  {
    page: number,       // Page actuelle (défaut: 1)
    limit: number,      // Éléments par page (défaut: 12)
    tags: string,       // Tags séparés par virgules
    search: string      // Terme de recherche
  }
  ```
- **Réponse** :
  ```javascript
  {
    results: [{
      _id: string,
      colors: string[],
      tags: string[],
      createdAt: Date
    }],
    pagination: {
      total: number,    // Total des palettes
      page: number,     // Page actuelle
      pages: number,    // Nombre total de pages
      hasMore: boolean  // Plus de résultats disponibles
    }
  }
  ```
- **Gestion d'erreurs** :
  - 400 : Paramètres invalides
  - 500 : Erreur serveur

#### 2. GET /api/palettes/tags
- **Description** : Liste tous les tags uniques
- **Réponse** : `string[]` - Liste des tags
- **Cache** : Mise en cache côté serveur pour optimisation
- **Utilisation** : Auto-complétion et suggestions

#### 3. POST /api/palettes
- **Description** : Crée une nouvelle palette
- **Corps de requête** :
  ```javascript
  {
    colors: string[],   // Array de codes couleur (1-5)
    tags: string[]      // Array de tags (0-3)
  }
  ```
- **Validations** :
  - Couleurs : Format hexadécimal valide
  - Tags : Longueur maximum et caractères autorisés
  - Limites : 1-5 couleurs, 0-3 tags
- **Réponse** :
  ```javascript
  {
    _id: string,
    colors: string[],
    tags: string[],
    createdAt: Date
  }
  ```
- **Gestion d'erreurs** :
  - 400 : Données invalides
  - 500 : Erreur serveur

### Modèle de données (models/palette.js)

```javascript
const PaletteSchema = new mongoose.Schema({
  colors: {
    type: [String],
    required: true,
    validate: {
      validator: (colors) => colors.length >= 1 && colors.length <= 5
    }
  },
  tags: {
    type: [String],
    validate: {
      validator: (tags) => tags.length <= 3
    }
  }
}, { timestamps: true });
```

### Middleware de pagination

Le middleware `paginatedResults` gère :
- Pagination des résultats
- Filtrage par tags
- Tri par date de création
- Calcul des métadonnées de pagination

### Sécurité et Performance

1. **Sécurité** :
   - Validation des entrées
   - Protection CORS
   - Limitation des requêtes

2. **Performance** :
   - Pagination optimisée
   - Index MongoDB
   - Mise en cache des tags

3. **Gestion des erreurs** :
   - Messages d'erreur détaillés
   - Logging des erreurs
   - Réponses appropriées

## Guide d'utilisation

### Création d'une palette
1. Accédez à la page de création via le bouton "Create Palette"
2. Sélectionnez vos couleurs (max 5)
3. Ajoutez des tags descriptifs (max 3)
4. Cliquez sur "Save Palette"

### Navigation et recherche
1. Parcourez les palettes sur la page d'accueil
2. Utilisez la barre de recherche pour filtrer par tags
3. Naviguez entre les pages avec les boutons de pagination
4. Cliquez sur une couleur pour copier son code

### Utilisation des couleurs
1. Cliquez sur n'importe quelle couleur pour copier son code hexadécimal
2. Utilisez les tags pour retrouver facilement des palettes similaires
3. Créez vos propres collections en vous inspirant des palettes existantes

## Démarrage du projet

### Frontend
```bash
cd color-palette-app
npm install
npm run dev
```

### Backend
```bash
cd color-palette-app/server
npm install
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173` et l'API sur `http://localhost:3000`.
