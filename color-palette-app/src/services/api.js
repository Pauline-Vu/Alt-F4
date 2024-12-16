/**
 * Service pour gérer les appels API
 */

// URL de base de l'API
const BASE_URL = 'http://localhost:5003/api';

// Service pour les palettes
export const paletteService = {
  // Créer une nouvelle palette
  createPalette: async (paletteData) => {
    const response = await fetch(`${BASE_URL}/palettes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paletteData),
    });
    if (!response.ok) {
      throw new Error('Failed to create palette');
    }
    return response.json();
  },

  // Récupérer toutes les palettes
  getAllPalettes: async () => {
    try {
      const response = await fetch(`${BASE_URL}/palettes`);
      if (!response.ok) {
        throw new Error('Failed to fetch palettes');
      }
      const data = await response.json();
      console.log('API Response brute:', data);
      const palettes = data.results || [];
      console.log('Palettes formatées:', palettes);
      return palettes;
    } catch (error) {
      console.error('Error fetching palettes:', error);
      throw error;
    }
  },

  // Récupérer tous les tags
  getAllTags: async () => {
    try {
      const response = await fetch(`${BASE_URL}/palettes/tags`);
      if (!response.ok) throw new Error('Failed to fetch tags');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  },
};
