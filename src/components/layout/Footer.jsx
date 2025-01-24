import { Link } from 'react-router-dom';

export default function Footer() {
    return (
      <footer className="bg-gray-100 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Lien qui ramène vers la page d'accueil*/}
            <Link to="/" className="text-gray-600 hover:text-gray-800 text-sm">
              © {new Date().getFullYear()} Pigment. Tous droits réservés.
            </Link>
  
            {/* Crédit équipe */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">Créé par</span>
              <img
                src='/src/assets/altf4_logo_black.svg'
                alt="Logo Altf4"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </footer>
    );
  }