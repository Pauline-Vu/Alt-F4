/**
 * Composant de pagination réutilisable
 * @param {Object} props - Propriétés du composant
 * @param {number} props.currentPage - Page actuelle
 * @param {number} props.totalPages - Nombre total de pages
 * @param {function} props.onPageChange - Fonction appelée lors du changement de page
 * @param {Object} [props.labels] - Labels personnalisés pour les boutons
 */
export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  labels = { previous: "Précédent", next: "Suivant" }
}) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-[#1B3A6B] bg-white border border-[#1B3A6B] rounded-full hover:bg-[#D1E8FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {labels.previous}
      </button>
      
      <span className="text-sm text-gray-600">
        Page {currentPage} sur {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-[#1B3A6B] bg-white border border-[#1B3A6B] rounded-full hover:bg-[#D1E8FF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {labels.next}
      </button>
    </div>
  );
}
