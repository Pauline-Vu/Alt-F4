import { useState, useEffect } from 'react';
import { paletteService } from '../services/api';
import SearchBar from '../components/search/SearchBar';
import ColorPaletteCard from '../components/palette/ColorPaletteCard';

export default function Home() {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    fetchPalettes();
    fetchTags();
  }, []);

  const fetchPalettes = async () => {
    try {
      const data = await paletteService.getAllPalettes();
      if (!Array.isArray(data)) {
        throw new Error('Les données des palettes doivent être un tableau.');
      }
      setPalettes(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const tags = await paletteService.getAllTags();
      setAllTags(tags);
    } catch (err) {
      console.error('Erreur lors de la récupération des tags:', err);
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  const filteredPalettes = palettes.filter(palette => {
    const matchesSearch = searchTerm === '' || 
      palette.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => palette.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* En-tête avec la barre de recherche */}
        <div className="mb-8">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Rechercher par tag..."
          />
        </div>

        {/* Section des filtres */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filtrer par tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${selectedTags.includes(tag)
                    ? 'bg-[#1B3A6B] text-white'
                    : 'bg-white text-[#1B3A6B] border border-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Message si aucun résultat */}
        {filteredPalettes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune palette ne correspond à votre recherche
          </div>
        )}

        {/* Grille des palettes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPalettes.map((palette, index) => (
            <ColorPaletteCard key={index} palette={palette} />
          ))}
        </div>
      </div>
    </div>
  );
}
