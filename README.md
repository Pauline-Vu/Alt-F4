# 🎨 Color Palette App

Une application web moderne et intuitive pour créer, gérer et partager des palettes de couleurs. Idéale pour les designers, développeurs et passionnés de couleurs.

## ✨ Caractéristiques Principales

- **Création de Palettes**: Créez des palettes personnalisées de 3 à 5 couleurs
- **Gestion Intelligente**: 
  - Organisation par tags
  - Sauvegarde automatique
  - Favoris et collections
- **Fonctionnalités Avancées**:
  - Copie rapide des codes couleur (HEX, RGB, HSL)
  - Suggestions de couleurs harmonieuses
  - Exportation de palettes
- **Interface Moderne**:
  - Design responsive
  - Animations fluides
  - Mode sombre/clair
  - Navigation intuitive

## 🛠️ Technologies

### Frontend
- **React 18** avec Vite
- **TailwindCSS** pour le style
- **React Router** pour la navigation
- **Axios** pour les requêtes API

### Backend
- **Node.js** avec Express
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **API RESTful**

## 📦 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB (v4.4 ou supérieur)
- npm ou yarn

### Configuration du Frontend

1. Clonez le repository
```bash
git clone https://github.com/votre-username/color-palette-app.git
cd color-palette-app
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez l'application en développement
```bash
npm run dev
```
L'application sera accessible sur http://localhost:5173

### Configuration du Backend

1. Naviguez vers le dossier serveur
```bash
cd server
```

2. Installez les dépendances
```bash
npm install
```

3. Créez un fichier `.env` avec les variables suivantes:
```env
MONGODB_URI=mongodb://localhost:27017/color-palette
PORT=3000
JWT_SECRET=votre_secret_jwt
```

4. Démarrez le serveur
```bash
npm start
```

## 🗂️ Structure du Projet

```
color-palette-app/
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/         # Pages principales
│   ├── hooks/         # Hooks personnalisés
│   ├── utils/         # Fonctions utilitaires
│   └── styles/        # Styles globaux
├── server/
│   ├── controllers/   # Logique métier
│   ├── models/        # Modèles MongoDB
│   ├── routes/        # Routes API
│   └── middleware/    # Middleware personnalisé
└── scripts/          # Scripts utilitaires
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout de fonctionnalité'`)
4. Push sur la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙋‍♂️ Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

---
Développé avec ❤️ par l'équipe Alt-F4
