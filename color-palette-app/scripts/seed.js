import mongoose from 'mongoose';
import { PaletteModel } from '../server/models/palette.js';

const palettes = [
  {
    colors: ['#2C3E50', '#E74C3C', '#ECF0F1', '#3498DB'],
    tags: ['professionnel', 'entreprise', 'moderne']
  },
  {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
    tags: ['frais', 'printemps', 'vif']
  },
  {
    colors: ['#FFC300', '#FF5733', '#C70039', '#900C3F'],
    tags: ['chaleureux', 'coucher-de-soleil', 'énergique']
  },
  {
    colors: ['#DAD2D8', '#143642', '#0F8B8D', '#EC9A29'],
    tags: ['rétro', 'vintage', 'élégant']
  },
  {
    colors: ['#A8E6CE', '#DCEDC2', '#FFD3B5', '#FFAAA6'],
    tags: ['pastel', 'doux', 'délicat']
  },
  {
    colors: ['#2C3333', '#395B64', '#A5C9CA', '#E7F6F2'],
    tags: ['minimaliste', 'moderne', 'épuré']
  },
  {
    colors: ['#FAD02E', '#FF6B6B', '#4ECDC4', '#45B7D1'],
    tags: ['ludique', 'amusant', 'créatif']
  },
  {
    colors: ['#222831', '#393E46', '#00ADB5', '#EEEEEE'],
    tags: ['sombre', 'technologique', 'minimal']
  },
  {
    colors: ['#F9ED69', '#F08A5D', '#B83B5E', '#6A2C70'],
    tags: ['audacieux', 'vif', 'artistique']
  },
  {
    colors: ['#F7F7F7', '#EEEEEE', '#393E46', '#929AAB'],
    tags: ['gris', 'minimal', 'épuré']
  },
  {
    colors: ['#9B5DE5', '#F15BB5', '#FEE440', '#00BBF9'],
    tags: ['pop', 'amusant', 'lumineux']
  },
  {
    colors: ['#335C67', '#FFF3B0', '#E09F3E', '#9E2A2B'],
    tags: ['vintage', 'automne', 'chaleureux']
  },
  {
    colors: ['#FFFFFF', '#84DCC6', '#A5FFD6', '#FFA69E'],
    tags: ['frais', 'printemps', 'léger']
  },
  {
    colors: ['#1A1A1D', '#4E4E50', '#6F2232', '#950740'],
    tags: ['sombre', 'dramatique', 'audacieux']
  },
  {
    colors: ['#FFB997', '#F67E7D', '#843B62', '#0B032D'],
    tags: ['coucher-de-soleil', 'dégradé', 'romantique']
  }
];

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect('mongodb://localhost:27017/colorpalette', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connecté à MongoDB');

    // Suppression des données existantes
    await PaletteModel.deleteMany({});
    console.log('Palettes existantes supprimées');

    // Insertion des nouvelles palettes
    await PaletteModel.insertMany(palettes);
    console.log('Base de données remplie avec succès :', palettes.length, 'palettes');

    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du remplissage de la base de données:', error);
    process.exit(1);
  }
}

seedDatabase();
