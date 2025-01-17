/**
 * Composant d'affichage et de gestion des tags
 * @param {Object} props - Propriétés du composant
 * @param {string[]} props.tags - Liste des tags
 * @param {function} [props.onTagRemove] - Fonction appelée lors de la suppression d'un tag
 * @param {boolean} [props.readonly=false] - Si true, les tags ne peuvent pas être supprimés
 */
export default function TagList({ tags, onTagRemove, readonly = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#D1E8FF] text-[#1B3A6B]"
        >
          {tag}
          {!readonly && onTagRemove && (
            <button
              onClick={() => onTagRemove(index)}
              className="ml-2 focus:outline-none hover:text-[#FF4E0D] transition-colors"
              aria-label={`Supprimer le tag ${tag}`}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
