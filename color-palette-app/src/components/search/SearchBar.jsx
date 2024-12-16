import { useState, useEffect } from 'react';
import { paletteService } from '../../services/api';
import Button from '../ui/Button';

/**
 * Composant de barre de recherche réutilisable avec suggestions de tags
 * @param {Object} props - Propriétés du composant
 * @param {string} props.searchTerm - Terme de recherche actuel
 * @param {function} props.onSearchChange - Fonction appelée lors du changement de la recherche
 * @param {string} [props.placeholder="Rechercher..."] - Texte placeholder de l'input
 */
export default function SearchBar({ searchTerm, onSearchChange, placeholder = "Rechercher..." }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      const tags = await paletteService.getAllTags();
      setSuggestions(tags);
    };
    loadTags();
  }, []);

  const filteredSuggestions = searchTerm
    ? suggestions.filter(tag => 
        tag && typeof tag === 'string' && tag.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full 
                 focus:outline-none focus:border-[#1B3A6B] focus:ring-2 focus:ring-[#1B3A6B] focus:ring-opacity-50"
      />
      <Button
        type="submit"
        variant="primary"
        className="absolute right-0 top-0 h-full px-4"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </Button>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {filteredSuggestions.map((tag) => (
            <button
              key={tag}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                onSearchChange(tag);
                setShowSuggestions(false);
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
