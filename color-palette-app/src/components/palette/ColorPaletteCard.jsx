/**
 * Composant qui affiche une carte de palette de couleurs
 * @param {string[]} colors - Liste des codes couleur de la palette
 * @param {string[]} tags - Liste des tags associés à la palette
 */
export default function ColorPaletteCard({ colors, tags }) {
  /**
   * Copie un code couleur dans le presse-papier et affiche une notification
   * @param {string} color - Code couleur à copier
   */
  const copyColorToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    // Crée et affiche une notification temporaire
    const notification = document.createElement('div');
    notification.textContent = 'Code couleur copié !';
    notification.className = 'fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 ease-out opacity-0';
    document.body.appendChild(notification);
    
    // Animation d'apparition et de disparition
    setTimeout(() => notification.classList.remove('opacity-0'), 100);
    setTimeout(() => {
      notification.classList.add('opacity-0');
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-40 flex relative group">
        {colors.map((color, index) => (
          <div
            key={index}
            className="flex-1 cursor-pointer relative group"
            style={{ backgroundColor: color }}
            onClick={() => copyColorToClipboard(color)}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30">
              <span className="text-white text-sm font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
                {color}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
        <button 
          className="mt-3 text-gray-400 hover:text-gray-600 transition-colors ml-auto block"
          onClick={() => copyColorToClipboard(colors.join(', '))}
          title="Copier toutes les couleurs"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
