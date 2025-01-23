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
  getAllPalettes: async (page = 1, limit = 12, tags = []) => {
    try {
      const tagsParam = tags.length > 0 ? `&tags=${tags.join(',')}` : '';
      const response = await fetch(`${BASE_URL}/palettes?page=${page}&limit=${limit}${tagsParam}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des palettes');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  },

  // Récupérer tous les tags
  getAllTags: async () => {
    try {
      const response = await fetch(`${BASE_URL}/tags`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tags');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
};
