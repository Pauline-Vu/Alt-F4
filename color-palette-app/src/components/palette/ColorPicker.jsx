/**
 * Composant de sélection de couleur
 */
export default function ColorPicker({ color, onChange, onRemove, showRemove }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-10 rounded cursor-pointer min-w-[12rem] max-w-[24rem]"
        />
        <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-mono uppercase pointer-events-none">
          {color}
        </span>
      </div>
      
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 focus:outline-none text-xl"
          aria-label="Supprimer la couleur"
        >
          ×
        </button>
      )}
    </div>
  );
}
