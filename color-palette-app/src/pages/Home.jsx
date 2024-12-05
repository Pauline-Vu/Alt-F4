/**
 * Page d'accueil de l'application
 * Affiche la liste des palettes de couleurs et permet la recherche par tags
 */
import { useState, useEffect } from 'react';
import ColorPaletteCard from '../components/palette/ColorPaletteCard';
import { api } from '../services/api';

export default function Home() {
  // États pour gérer les données et l'interface utilisateur
  const [palettes, setPalettes] = useState([]); // Liste des palettes
  const [loading, setLoading] = useState(true); // État de chargement
  const [searchTags, setSearchTags] = useState([]); // Tags de recherche actifs
  const [searchInput, setSearchInput] = useState(''); // Valeur de l'input de recherche
  const [allTags, setAllTags] = useState([]); // Tous les tags disponibles
  const [showAllTags, setShowAllTags] = useState(false); // État d'affichage de tous les tags
  const [popularTags, setPopularTags] = useState([]); // Tags les plus utilisés

  // Chargement initial des données
  useEffect(() => {
    loadPalettes();
    calculateAllTags();
    calculatePopularTags();
  }, []);

  /**
   * Charge toutes les palettes depuis l'API
   */
  const loadPalettes = async () => {
    try {
      const data = await api.getPalettes();
      setPalettes(data);
    } catch (error) {
      console.error('Erreur lors du chargement des palettes:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calcule tous les tags disponibles
   */
  const calculateAllTags = async () => {
    try {
      const data = await api.getPalettes();
      const tagSet = new Set();
      data.forEach(palette => {
        palette.tags.forEach(tag => tagSet.add(tag));
      });
      const sortedTags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));
      setAllTags(sortedTags);
    } catch (error) {
      console.error('Erreur lors du calcul des tags:', error);
    }
  };

  /**
   * Calcule les tags les plus populaires à partir des palettes existantes
   */
  const calculatePopularTags = async () => {
    try {
      const data = await api.getPalettes();
      const tagCount = {};
      // Compte le nombre d'occurrences de chaque tag
      data.forEach(palette => {
        palette.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      });
      // Trie les tags par popularité et garde les 8 premiers
      const sortedTags = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([tag]) => tag);
      setPopularTags(sortedTags);
    } catch (error) {
      console.error('Erreur lors du calcul des tags populaires:', error);
    }
  };

  /**
   * Gère la soumission du formulaire de recherche
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.trim() && !searchTags.includes(searchInput.trim())) {
      const newTags = [...searchTags, searchInput.trim()];
      setSearchTags(newTags);
      setSearchInput('');
      try {
        const data = await api.searchPalettes(newTags);
        setPalettes(data);
      } catch (error) {
        console.error('Erreur lors de la recherche des palettes:', error);
      }
    }
  };

  /**
   * Ajoute un tag aux filtres de recherche
   */
  const handleTagClick = async (tag) => {
    if (!searchTags.includes(tag)) {
      const newTags = [...searchTags, tag];
      setSearchTags(newTags);
      try {
        const data = await api.searchPalettes(newTags);
        setPalettes(data);
      } catch (error) {
        console.error('Erreur lors de la recherche des palettes:', error);
      }
    }
  };

  /**
   * Retire un tag des filtres de recherche
   */
  const removeTag = async (tagToRemove) => {
    const newTags = searchTags.filter(tag => tag !== tagToRemove);
    setSearchTags(newTags);
    if (newTags.length === 0) {
      loadPalettes();
    } else {
      try {
        const data = await api.searchPalettes(newTags);
        setPalettes(data);
      } catch (error) {
        console.error('Erreur lors de la recherche des palettes:', error);
      }
    }
  };

  // Affiche un état de chargement
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <form onSubmit={handleSearch} className="mb-8 max-w-3xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Rechercher par tag..."
            className="w-full rounded-full px-6 py-3 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap"
          >
            Rechercher
          </button>
        </div>
      </form>

      {/* Tags actifs */}
      {searchTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-500 mr-2">Filtres actifs :</span>
          {searchTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center group"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-indigo-400 group-hover:text-indigo-600 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Liste de tous les tags */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-500">Tags disponibles :</h2>
          <button
            onClick={() => setShowAllTags(!showAllTags)}
            className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {showAllTags ? 'Voir moins' : 'Voir tous'}
          </button>
        </div>
        <div className={`flex flex-wrap gap-2 ${!showAllTags && 'max-h-20 overflow-hidden'}`}>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              disabled={searchTags.includes(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                searchTags.includes(tag)
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des tags populaires */}
      {popularTags.length > 0 && !searchTags.length && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-500 mb-3">Tags populaires :</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Liste des palettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {palettes.map((palette, index) => (
          <ColorPaletteCard
            key={palette._id || index}
            colors={palette.colors}
            tags={palette.tags}
          />
        ))}
      </div>

      {palettes.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">Aucune palette trouvée</h3>
          <p className="text-gray-500 mt-2">Essayez de rechercher avec d'autres tags ou créez une nouvelle palette.</p>
        </div>
      )}
    </div>
  );
}
