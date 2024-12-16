/**
 * Page de création d'une nouvelle palette de couleurs
 * Permet aux utilisateurs de créer une palette personnalisée avec des couleurs et des tags
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorPicker from '../components/palette/ColorPicker';
import { paletteService } from '../services/api';
import Button from '../components/ui/Button';

const CreatePalette = () => {
  const [colors, setColors] = useState(['#FFFFFF']);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [allTags, setAllTags] = useState([]);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les tags existants au chargement
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const tags = await paletteService.getAllTags();
      setAllTags(tags);
    } catch (err) {
      console.error('Erreur lors de la récupération des tags:', err);
    }
  };

  const handleAddColor = () => {
    if (colors.length < 8) {
      setColors([...colors, '#FFFFFF']);
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleRemoveColor = (index) => {
    if (colors.length > 1) {
      const newColors = colors.filter((_, i) => i !== index);
      setColors(newColors);
    }
  };

  const handleTagInputChange = (e) => {
    const input = e.target.value;
    setTagInput(input);

    // Filtrer les suggestions de tags
    if (input.trim()) {
      const suggestions = allTags.filter(tag => 
        tag && typeof tag === 'string' && 
        tag.toLowerCase().includes(input.toLowerCase()) &&
        !tags.includes(tag)
      ).slice(0, 5);
      setSuggestedTags(suggestions);
    } else {
      setSuggestedTags([]);
    }
  };

  const handleAddTag = (tag = tagInput.trim()) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
      setSuggestedTags([]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await paletteService.createPalette({ colors, tags });
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la création de la palette:', err);
    }
  };

  return (
    <div className="pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1B3A6B] mb-8">Créer une nouvelle palette</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section des couleurs */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Couleurs</h2>
            <div className="space-y-4">
              {colors.map((color, index) => (
                <ColorPicker
                  key={index}
                  color={color}
                  onChange={(color) => handleColorChange(index, color)}
                  onRemove={() => handleRemoveColor(index)}
                  showRemove={colors.length > 1}
                />
              ))}
            </div>
            {colors.length < 8 && (
              <Button
                type="button"
                onClick={handleAddColor}
                variant="outline"
                className="mt-4"
              >
                Ajouter une couleur
              </Button>
            )}
          </div>

          {/* Section des tags */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
            
            <div className="relative flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Ajouter un tag..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3A6B] focus:border-transparent"
                />
                
                {/* Suggestions de tags */}
                {suggestedTags.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {suggestedTags.map((tag, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAddTag(tag)}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="button"
                onClick={() => handleAddTag()}
                disabled={!tagInput.trim()}
                variant="outline"
                className="shrink-0"
              >
                Ajouter
              </Button>
            </div>

            {/* Liste des tags sélectionnés */}
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={tags.length === 0}
          >
            {tags.length === 0 ? "Ajoutez au moins 1 tag" : "Créer la palette"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePalette;
