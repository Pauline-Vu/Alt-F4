import { useState, useEffect } from 'react';
import { paletteService } from '../../services/api';
import SearchBar from '../components/search/SearchBar';
import ColorPaletteCard from '../components/palette/ColorPaletteCard';

export default function Home() {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    setSearchTerm(tag);
  };

  const filteredPalettes = palettes.filter(palette => {
    const searchLower = searchTerm.toLowerCase();
    return palette.tags.some(tag => tag.toLowerCase().includes(searchLower));
  });

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>;

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Rechercher par tag..."
        />

        {/* Liste des tags populaires */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Tags populaires</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors
                  ${searchTerm === tag 
                    ? 'bg-[#1B3A6B] text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPalettes.map((palette) => (
            <ColorPaletteCard 
              key={palette._id} 
              palette={palette}
            />
          ))}
        </div>

        {filteredPalettes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune palette ne correspond à votre recherche
          </div>
        )}
      </div>
    </div>
  );
}
