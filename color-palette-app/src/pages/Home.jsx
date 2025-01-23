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
  
  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPalettes, setTotalPalettes] = useState(0);
  const palettesPerPage = 12;

  useEffect(() => {
    fetchPalettes();
    fetchTags();
  }, [currentPage, selectedTags]); // Recharger quand la page ou les tags changent

  const fetchPalettes = async () => {
    try {
      setLoading(true);
      const data = await paletteService.getAllPalettes(currentPage, palettesPerPage, selectedTags);
      if (!data || !data.results) {
        throw new Error('Les données des palettes sont invalides.');
      }
      setPalettes(data.results);
      setTotalPages(data.pagination.pages);
      setTotalPalettes(data.pagination.total);
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
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
      return newTags;
    });
    setCurrentPage(1); // Retour à la première page lors du changement de filtre
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Composant de pagination
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#1B3A6B] text-white hover:bg-[#2B4A7B]'
          }`}
        >
          «
        </button>
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 rounded ${
              currentPage === number
                ? 'bg-[#1B3A6B] text-white'
                : 'bg-white text-[#1B3A6B] border border-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white'
            }`}
          >
            {number}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#1B3A6B] text-white hover:bg-[#2B4A7B]'
          }`}
        >
          »
        </button>
      </div>
    );
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* En-tête avec la barre de recherche */}
        <div className="mb-8">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={(term) => {
              setSearchTerm(term);
              setCurrentPage(1);
            }}
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
        {palettes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune palette ne correspond à votre recherche
          </div>
        )}

        {/* Grille des palettes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {palettes.map((palette) => (
            <ColorPaletteCard key={palette._id} palette={palette} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination />}

        {/* Information sur le nombre total de palettes */}
        <div className="text-center mt-4 text-gray-600">
          Total : {totalPalettes} palettes
        </div>
      </div>
    </div>
  );
}
