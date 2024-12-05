import mongoose from 'mongoose';

const paletteSchema = new mongoose.Schema({
  colors: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 3 && v.length <= 5;
      },
      message: 'Palette must have between 3 and 5 colors'
    }
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const PaletteModel = mongoose.model('Palette', paletteSchema);
