/**
 * Composant Header de l'application
 * Affiche la barre de navigation principale avec le logo et les liens
 */
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et nom de l'application */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-xl font-bold text-gray-900 ml-3 group-hover:text-gray-700 transition-colors">
                PaletteCouleur
              </span>
            </Link>
          </div>
          
          {/* Bouton de création de palette */}
          <div className="flex items-center">
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Créer une Palette
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
