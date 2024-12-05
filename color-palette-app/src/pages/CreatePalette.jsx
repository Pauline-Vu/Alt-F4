/**
 * Page de création d'une nouvelle palette de couleurs
 * Permet à l'utilisateur de sélectionner 3 à 5 couleurs et d'ajouter des tags
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function CreatePalette() {
  const navigate = useNavigate();
  
  // États pour gérer le formulaire
  const [colors, setColors] = useState(['#FFFFFF', '#FFFFFF', '#FFFFFF']); // Liste des couleurs (3 minimum)
  const [tags, setTags] = useState([]); // Liste des tags
  const [tagInput, setTagInput] = useState(''); // Valeur de l'input pour les tags
  const [error, setError] = useState(''); // Message d'erreur
  const [loading, setLoading] = useState(false); // État de chargement

  /**
   * Met à jour une couleur dans la palette
   * @param {number} index - Index de la couleur à modifier
   * @param {string} color - Nouvelle valeur de la couleur
   */
  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  /**
   * Ajoute une nouvelle couleur à la palette (maximum 5)
   */
  const handleAddColor = () => {
    if (colors.length < 5) {
      setColors([...colors, '#FFFFFF']);
    }
  };

  /**
   * Supprime une couleur de la palette (minimum 3)
   * @param {number} index - Index de la couleur à supprimer
   */
  const handleRemoveColor = (index) => {
    if (colors.length > 3) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
    }
  };

  /**
   * Ajoute un nouveau tag à la palette
   * @param {Event} e - Événement du formulaire
   */
  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  /**
   * Supprime un tag de la palette
   * @param {string} tagToRemove - Tag à supprimer
   */
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  /**
   * Gère la soumission du formulaire
   * Vérifie les données et crée la palette
   * @param {Event} e - Événement du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (tags.length === 0) {
      setError('Veuillez ajouter au moins un tag');
      setLoading(false);
      return;
    }

    try {
      await api.createPalette({ colors, tags });
      navigate('/');
    } catch (error) {
      setError('Une erreur est survenue lors de la création de la palette');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer une Nouvelle Palette</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Couleurs ({colors.length}/5)
            </label>
            <div className="space-y-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative group flex-1">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-full h-12 rounded-lg cursor-pointer border-2 border-gray-200 focus:border-indigo-500 transition-colors"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {color}
                      </span>
                    </div>
                  </div>
                  {colors.length > 3 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {colors.length < 5 && (
              <button
                type="button"
                onClick={handleAddColor}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Ajouter une couleur
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center group"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-indigo-400 group-hover:text-indigo-600 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Ajouter un tag..."
                className="flex-1 rounded-full px-4 py-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Ajouter
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Création...' : 'Créer la Palette'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
