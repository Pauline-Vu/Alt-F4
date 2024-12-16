import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { PaletteModel } from './models/palette.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colorpalette', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Middleware pour la pagination
const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skipIndex = (page - 1) * limit;

    try {
      const query = {};
      
      // Filtre par tags si spécifié
      if (req.query.tags) {
        const tags = req.query.tags.split(',').map(tag => tag.trim());
        query.tags = { $in: tags };
      }

      const total = await model.countDocuments(query);
      const results = await model
        .find(query)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skipIndex);

      res.paginatedResults = {
        results,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          hasMore: skipIndex + results.length < total
        }
      };
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

// Routes
app.get('/api/palettes', paginatedResults(PaletteModel), (req, res) => {
  res.json(res.paginatedResults);
});

// Endpoint pour récupérer tous les tags uniques
app.get('/api/palettes/tags', async (req, res) => {
  try {
    // Récupère tous les tags uniques de toutes les palettes
    const uniqueTags = await PaletteModel.distinct('tags');
    res.json(uniqueTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/palettes', async (req, res) => {
  try {
    const { colors, tags } = req.body;

    // Validation des données
    if (!colors || !Array.isArray(colors)) {
      return res.status(400).json({ message: 'Colors array is required' });
    }

    if (colors.length === 0 || colors.length > 5) {
      return res.status(400).json({ message: 'Palette must have between 1 and 5 colors' });
    }

    if (tags && tags.length > 3) {
      return res.status(400).json({ message: 'Palette can have at most 3 tags' });
    }

    const palette = new PaletteModel({ colors, tags });
    await palette.save();
    res.status(201).json(palette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
