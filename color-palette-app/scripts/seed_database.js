const { MongoClient } = require('mongodb');
const yargs = require('yargs');

// Liste des tags possibles
const possibleTags = [
    'minimaliste', 'coloré', 'sombre', 'clair', 'pastel',
    'vintage', 'moderne', 'élégant', 'fun', 'professionnel',
    'artistique', 'chaleureux', 'froid', 'automne', 'printemps',
    'été', 'blanc'
];

// Fonction pour convertir HSV en RGB puis en Hex
function hsvToHex(h, s, v) {
    let r, g, b;
    
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Fonction pour obtenir des tags aléatoires
function getRandomTags(count) {
    const shuffled = [...possibleTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Générateurs de palettes
function generateMonochromatic() {
    const hue = Math.random();
    const colors = Array.from({ length: 5 }, (_, i) => {
        const value = 0.2 + (i * 0.15);
        return hsvToHex(hue, 0.6, value);
    });

    return {
        colors,
        tags: ['monochrome', ...getRandomTags(1)],
        createdAt: new Date()
    };
}

function generateAnalogous() {
    const baseHue = Math.random();
    const colors = Array.from({ length: 5 }, (_, i) => {
        const hue = (baseHue + ((i - 2) * 0.083)) % 1;
        return hsvToHex(hue, 0.6, 0.7);
    });

    return {
        colors,
        tags: ['analogue', ...getRandomTags(1)],
        createdAt: new Date()
    };
}

function generateComplementary() {
    const baseHue = Math.random();
    const complementHue = (baseHue + 0.5) % 1;
    const colors = [
        ...Array.from({ length: 3 }, (_, i) => {
            const value = 0.3 + (i * 0.2);
            return hsvToHex(baseHue, 0.6, value);
        }),
        ...Array.from({ length: 2 }, (_, i) => {
            const value = 0.4 + (i * 0.2);
            return hsvToHex(complementHue, 0.6, value);
        })
    ];

    return {
        colors,
        tags: ['complémentaire', ...getRandomTags(1)],
        createdAt: new Date()
    };
}

function generateTriadic() {
    const baseHue = Math.random();
    const hue2 = (baseHue + 0.333) % 1;
    const hue3 = (baseHue + 0.666) % 1;
    
    const colors = [baseHue, hue2, hue3].flatMap(hue => 
        Array.from({ length: 2 }, (_, i) => {
            const value = 0.4 + (i * 0.2);
            return hsvToHex(hue, 0.6, value);
        })
    ).slice(0, 5);

    return {
        colors,
        tags: ['triade', ...getRandomTags(1)],
        createdAt: new Date()
    };
}

function generateRandomPalette() {
    const generators = [
        generateMonochromatic,
        generateAnalogous,
        generateComplementary,
        generateTriadic
    ];
    const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
    return randomGenerator();
}

async function seedDatabase(nbPalettes) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connecté à MongoDB');

        const db = client.db('colorpalette');
        const collection = db.collection('palettes');

        // Génère les nouvelles palettes
        const palettes = Array.from({ length: nbPalettes }, () => generateRandomPalette());
        
        // Ajoute les nouvelles palettes
        await collection.insertMany(palettes);
        console.log(`${nbPalettes} nouvelles palettes ont été ajoutées à la base de données`);

    } catch (error) {
        console.error('Erreur lors du seed de la base de données:', error);
    } finally {
        await client.close();
        console.log('Déconnecté de MongoDB');
    }
}

// Configuration des arguments en ligne de commande
const argv = yargs
    .option('nombre', {
        alias: 'n',
        description: 'Nombre de palettes à générer',
        type: 'number',
        default: 20
    })
    .help()
    .argv;

// Lancement du script
seedDatabase(argv.nombre);
