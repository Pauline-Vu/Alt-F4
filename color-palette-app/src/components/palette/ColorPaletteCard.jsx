import { useState } from 'react';
import { createColorImage } from '../../services/colorService';

/**
 * Carte affichant une palette de couleurs
 */
export default function ColorPaletteCard({ palette }) {
  const [copiedColor, setCopiedColor] = useState(null);
  const [isPaletteHovered, setIsPaletteHovered] = useState(false);

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
    <div 
      className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02] border border-[#E5E5E5] overflow-hidden"
      onMouseEnter={() => setIsPaletteHovered(true)}
      onMouseLeave={() => setIsPaletteHovered(false)}
    >
      {/* Section d'aperçu des couleurs */}
      <div className="flex h-20 sm:h-24 md:h-32">
        {palette.colors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(color)}
            className="flex-1 relative p-0 m-0 cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleColorClick(color)}
            aria-label={`Copier la couleur ${color}`}
          >
            <img 
              src={createColorImage(color)} 
              alt={`Couleur ${color}`}
              className="w-full h-full object-cover"
            />
            {/* Code hex visible uniquement quand la palette est survolée */}
            {isPaletteHovered && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-2 py-1 text-sm font-medium text-white bg-black bg-opacity-50 rounded backdrop-blur-sm">
                  {color}
                </span>
              </div>
            )}
            {/* Overlay de copie */}
            {copiedColor === color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-2 py-1 text-sm font-medium text-white bg-black bg-opacity-50 rounded backdrop-blur-sm">
                  Copié !
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Section des tags */}
      <div className="w-full p-2 sm:p-3 md:p-4 bg-[#F5F5F5]">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {palette.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs sm:text-sm bg-white rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
