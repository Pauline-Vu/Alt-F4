/**
 * Composant principal de l'application
 * Configure le routage et la structure générale de l'application
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreatePalette from './pages/CreatePalette';
import Header from './components/layout/Header';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
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
