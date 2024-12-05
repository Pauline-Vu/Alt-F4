# Application de Palettes de Couleurs

Une application web moderne pour créer, partager et explorer des palettes de couleurs, construite avec React, Node.js, et MongoDB.

## 🎨 Fonctionnalités

- Création de palettes de couleurs (3-5 couleurs)
- Organisation par tags
- Recherche avancée de palettes
- Interface utilisateur intuitive et responsive
- Copie rapide des codes couleur
- Design moderne avec animations fluides

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- npm ou yarn

### Frontend

1. Cloner le repository

```bash
git clone [votre-url-github]
cd color-palette-app
```

2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

3. Lancer l'application en mode développement

```bash
npm run dev
# ou
yarn dev
```

L'application sera accessible à l'adresse : http://localhost:5173

### Backend

1. Naviguer vers le dossier backend

```bash
cd backend
```

2. Installer les dépendances

```bash
npm install
# ou
yarn install
```

3. Créer un fichier .env à la racine du dossier backend avec les variables suivantes :

```env
MONGODB_URI=mongodb://localhost:27017/color-palette
PORT=5000
```

4. Lancer le serveur

```bash
npm start
# ou
yarn start
```

Le serveur sera accessible à l'adresse : http://localhost:5000

## 🛠 Technologies Utilisées

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MongoDB avec Mongoose
- CORS

## 📝 Structure du Projet

```
color-palette-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   └── palette/
│   │       └── ColorPaletteCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── CreatePalette.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## 🌐 API Endpoints

- `GET /api/palettes` : Récupérer toutes les palettes
- `POST /api/palettes` : Créer une nouvelle palette
- `GET /api/palettes/search` : Rechercher des palettes par tags

## 🤝 Contribution
