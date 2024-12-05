/**
 * Composant principal de l'application
 * Configure le routage et la structure générale de l'application
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import CreatePalette from './pages/CreatePalette';

export default function App() {
  return (
    <Router>
      {/* Layout principal */}
      <div className="min-h-screen bg-gray-50">
        {/* En-tête fixe */}
        <Header />
        
        {/* Contenu principal */}
        <main>
          <Routes>
            {/* Route de la page d'accueil */}
            <Route path="/" element={<Home />} />
            {/* Route de création de palette */}
            <Route path="/create" element={<CreatePalette />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
