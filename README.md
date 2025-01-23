# 🎨 Projet Pigment

Pigment est une application web qui permet aux utilisateurs de créer, rechercher et partager leurs palettes de couleurs personnalisées. Conçue pour amateurs ou utilisateurs occasionnels, cette application vous permet de travailler avec des palettes de couleurs via une interface intuitive et riche en fonctionnalités.

## ✨ Caractéristiques Principales

- **Création de Palettes**: Créez des palettes personnalisées avec jusqu'à 5 couleurs.
- **Gestion de Tags**: Organisez vos palettes avec des tags personnalisés.
- **Fonctionnalités Avancées**:
  - Sauvegarde automatique et gestion des favoris.
  - Suggestions de palettes harmonieuses.
  - Copie rapide des codes couleur (HEX, RGB, HSL).
- **Interface Moderne**:
  - Design responsive et accessible.
  - Mode sombre et clair.
  - Animations et transitions fluides.

## 🛠️ Technologies Utilisées

### Frontend

- **React 18** avec Vite (pour une gestion rapide du développement frontend)
- **TailwindCSS** pour un style moderne et responsive
- **React Router** pour la gestion de la navigation
- **Axios** pour la gestion des appels API

### Backend

- **Node.js** avec Express
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification sécurisée
- **API RESTful**

## 📦 Installation

### Prérequis

- Node.js version 18 ou supérieure
- Python version 3 ou supérieure
- MongoDB version 4.4 ou supérieure
- npm ou yarn

### Configuration du projet

1. Clonez le repository :
   ```bash
   git clone https://github.com/Pauline-Vu/Alt-F4.git
   ```
2. Créez un fichier `.env` et configurez les variables nécessaires :
   ```env
   MONGODB_URI=mongodb://localhost:27017/color-palette
   PORT=3000
   JWT_SECRET=votre_secret_jwt
   ```

3. Initialisez et remplissez la base de données  :
   ```bash
   node seed.js
   python scripts/seed_database.py --nombre [nombre]
   ```

4. Installez les dépendances avec npm :
   ```bash
   npm install
   ```

5. Démarrez l'application en développement :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

## 🗂️ Structure du Projet

```
├── src/
│   ├── components/        # Composants React réutilisables
│   ├── pages/             # Pages principales
│   └── services/          # Appels API et services externes
├── server/
│   ├── models/            # Modèles MongoDB
└── scripts/                # Scripts utilitaires
```

## 🌍 Fonctionnalités du Backend

L'API RESTful permet de gérer les palettes, de filtrer par tags et d'assurer une gestion des utilisateurs via JWT.

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---
Développé avec ❤️ par l'équipe Alt-F4

--- 
