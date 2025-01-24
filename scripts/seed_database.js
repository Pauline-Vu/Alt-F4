import { MongoClient } from 'mongodb';
import colorsys from 'colorsys';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Connexion à MongoDB
const client = new MongoClient('mongodb://localhost:27017/');
const db = client.db('colorpalette');
const collection = db.collection('palettes');

// Liste des tags possibles
const possibleTags = [
  'minimaliste', 'coloré', 'sombre', 'clair', 'pastel',
  'vintage', 'moderne', 'élégant', 'fun', 'professionnel',
  'artistique', 'chaleureux', 'froid', 'automne', 'printemps',
  'été', 'blanc'
];

function hsvToHex(h, s, v) {
  const { r, g, b } = colorsys.hsvToRgb({ h, s: s * 100, v: v * 100 });
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function getRandomTags(count) {
  const shuffled = possibleTags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateMonochromatic() {
  const hue = Math.random() * 360;
  const colors = [];
  for (let i = 0; i < 5; i++) {
    const value = 0.2 + (i * 0.15); 
    colors.push(hsvToHex(hue, 0.6, value));
  }
  return {
    colors,
    tags: ['monochrome', ...getRandomTags(1)],
    createdAt: new Date(),
  };
}

function generateAnalogous() {
  const baseHue = Math.random() * 360;
  const colors = [];
  for (let i = -2; i <= 2; i++) {
    const hue = (baseHue + i * 30) % 360; // 30 degrés de décalage
    colors.push(hsvToHex(hue, 0.6, 0.7));
  }
  return {
    colors,
    tags: ['analogue', ...getRandomTags(1)],
    createdAt: new Date(),
  };
}

function generateComplementary() {
  const baseHue = Math.random() * 360;
  const complementHue = (baseHue + 180) % 360;
  const colors = [];
  for (let i = 0; i < 3; i++) {
    const value = 0.3 + (i * 0.2);
    colors.push(hsvToHex(baseHue, 0.6, value));
  }
  for (let i = 0; i < 2; i++) {
    const value = 0.4 + (i * 0.2);
    colors.push(hsvToHex(complementHue, 0.6, value));
  }
  return {
    colors,
    tags: ['complémentaire', ...getRandomTags(1)],
    createdAt: new Date(),
  };
}

function generateTriadic() {
  const baseHue = Math.random() * 360;
  const hue2 = (baseHue + 120) % 360;
  const hue3 = (baseHue + 240) % 360;
  const colors = [];
  [baseHue, hue2, hue3].forEach((hue) => {
    for (let i = 0; i < 2; i++) {
      const value = 0.4 + (i * 0.2);
      colors.push(hsvToHex(hue, 0.6, value));
    }
  });
  return {
    colors: colors.slice(0, 5), // On garde 5 couleurs
    tags: ['triade', ...getRandomTags(1)],
    createdAt: new Date(),
  };
}

function generateRandomPalette() {
  const generators = [
    generateMonochromatic,
    generateAnalogous,
    generateComplementary,
    generateTriadic,
  ];
  const randomIndex = Math.floor(Math.random() * generators.length);
  return generators[randomIndex]();
}

async function seedDatabase(nbPalettes) {
  try {
    const palettes = Array.from({ length: nbPalettes }, generateRandomPalette);
    await collection.insertMany(palettes);
    console.log(`${nbPalettes} nouvelles palettes ont été ajoutées à la base de données.`);
  } catch (err) {
    console.error('Erreur lors du seed de la base de données:', err.message);
  } finally {
    await client.close();
  }
}

// Utilisation de Yargs pour gérer les arguments
const args = yargs(hideBin(process.argv))
  .option('nombre', {
    alias: 'n',
    type: 'number',
    description: 'Nombre de palettes à générer',
    default: 20,
  })
  .help()
  .argv;

// Exécution avec le nombre spécifié
await seedDatabase(args.nombre);
