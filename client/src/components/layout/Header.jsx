/**
 * Composant Header - Barre de navigation principale de l'application
 * @returns {JSX.Element} En-tête de l'application
 */
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="bg-white border-b border-[#E5E5E5] fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo et titre */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#013EC0] hover:text-[#2C5BA6] transition-colors logo">
             Pigment
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {/* Bouton créer - Version mobile */}
            <Button
              as={Link}
              to="/create"
              variant="primary"
              size="sm"
              className="sm:hidden p-2 rounded-full"
              aria-label="Créer une palette"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m6-6H6" />
              </svg>
            </Button>
            
            {/* Bouton créer - Version desktop */}
            <Button
              as={Link}
              to="/create"
              variant="primary"
              className="hidden sm:block"
            >
              Créer une palette
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
