import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { PaletteModel } from './models/palette.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colorpalette', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.get('/api/palettes', async (req, res) => {
  try {
    const palettes = await PaletteModel.find();
    res.json(palettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/palettes', async (req, res) => {
  try {
    const palette = new PaletteModel(req.body);
    await palette.save();
    res.status(201).json(palette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/palettes/search', async (req, res) => {
  try {
    const { tags } = req.query;
    const query = tags ? { tags: { $in: tags.split(',') } } : {};
    const palettes = await PaletteModel.find(query);
    res.json(palettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
