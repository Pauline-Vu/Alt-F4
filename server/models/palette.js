import mongoose from 'mongoose';

const paletteSchema = new mongoose.Schema({
  colors: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0 && v.length <= 5;
      },
      message: 'Palette must have between 1 and 5 colors'
    }
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.length <= 3;
      },
      message: 'Palette can have at most 3 tags'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index pour améliorer les performances de recherche
paletteSchema.index({ tags: 1 });
paletteSchema.index({ createdAt: -1 });

export const PaletteModel = mongoose.model('Palette', paletteSchema);
