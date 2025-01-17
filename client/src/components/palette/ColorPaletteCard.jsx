import { useState } from 'react';

/**
 * Carte affichant une palette de couleurs
 */
export default function ColorPaletteCard({ palette }) {
  const [copiedColor, setCopiedColor] = useState(null);

  /**
   * Copie une couleur dans le presse-papier au clic
   * @param {string} color - Code couleur à copier
   */
  const handleColorClick = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error('Erreur lors de la copie :', err);
    }
  };

  if (!palette || !palette.colors || !palette.tags) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[#E5E5E5] overflow-hidden">
      {/* Section d'aperçu des couleurs */}
      <div className="flex h-20 sm:h-24 md:h-32">
        {palette.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            className="flex-1 transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B3A6B] focus:ring-inset group relative"
            style={{ backgroundColor: color }}
            aria-label={`Copier la couleur ${color}`}
          >
            {/* Overlay avec feedback de copie */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${copiedColor === color ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <span className="px-2 py-1 text-xs sm:text-sm font-medium text-white bg-black bg-opacity-50 rounded backdrop-blur-sm">
                {copiedColor === color ? 'Copié !' : color}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Section des tags */}
      <div className="p-2 sm:p-3 md:p-4 bg-[#F5F5F5]">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {palette.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs sm:text-sm 
                       bg-white text-gray-700 border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
