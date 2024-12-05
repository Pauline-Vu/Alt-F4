/**
 * Service pour gérer les appels API liés aux palettes de couleurs
 * Centralise toutes les requêtes vers le backend
 */

// URL de base de l'API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Classe regroupant toutes les méthodes d'appel à l'API
 */
export const api = {
  /**
   * Récupère toutes les palettes
   * @returns {Promise<Array>} Liste des palettes
   * @throws {Error} En cas d'erreur de requête
   */
  getPalettes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/palettes`);
      if (!response.ok) throw new Error('Erreur lors de la récupération des palettes');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Crée une nouvelle palette
   * @param {Object} palette - Données de la palette
   * @param {string[]} palette.colors - Liste des couleurs
   * @param {string[]} palette.tags - Liste des tags
   * @returns {Promise<Object>} Palette créée
   * @throws {Error} En cas d'erreur de requête
   */
  createPalette: async (palette) => {
    try {
      const response = await fetch(`${API_BASE_URL}/palettes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(palette),
      });
      if (!response.ok) throw new Error('Erreur lors de la création de la palette');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Recherche des palettes par tags
   * @param {string[]} tags - Liste des tags à rechercher
   * @returns {Promise<Array>} Liste des palettes correspondantes
   * @throws {Error} En cas d'erreur de requête
   */
  searchPalettes: async (tags) => {
    try {
      const queryString = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
      const response = await fetch(`${API_BASE_URL}/palettes/search?${queryString}`);
      if (!response.ok) throw new Error('Erreur lors de la recherche des palettes');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};
