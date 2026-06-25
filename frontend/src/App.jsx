import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Games from './pages/Games';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import './styles/main.css';

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Botão hamburguer — só aparece no mobile */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
      >
        ☰
      </button>

      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="app-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <LibraryProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/games" element={<Games />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </LibraryProvider>
  );
}

export default App;
