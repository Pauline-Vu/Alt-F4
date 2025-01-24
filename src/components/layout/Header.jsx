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
          <div className="flex items-center">
           <img
              src="/public/logo_pigment.svg"
              alt="Logo Pigment"
              className="h-8 w-8 object-contain"
            />
            <Link
              to="/"
              className="text-2xl font-bold text-[#013EC0] hover:text-[#2C5BA6] transition-colors ml-2 logo flex items-center translate-y-[6px]"
            >
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
              className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full"
              aria-label="Créer une palette"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
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
