import React, { useState } from 'react';
import '../styles/sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 1, label: 'Filmes', path: '/movies' },
    { id: 2, label: 'Séries', path: '/series' },
    { id: 3, label: 'Jogos', path: '/games' },
    { id: 4, label: 'Favoritos', path: '/favorites' },
    { id: 5, label: 'Watchlist', path: '/watchlist' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expandir' : 'Recolher'}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">🎬</span>
        {!isCollapsed && <span className="logo-text">Katalog</span>}
      </div>

      {/* Menu */}
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                className="menu-item"
                onClick={() => handleNavigation(item.path)}
                title={item.label}
              >
                <span className="menu-icon">
                  {item.label === 'Filmes' && '🎥'}
                  {item.label === 'Séries' && '📺'}
                  {item.label === 'Jogos' && '🎮'}
                  {item.label === 'Favoritos' && '⭐'}
                  {item.label === 'Watchlist' && '📋'}
                </span>
                {!isCollapsed && <span className="menu-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="sidebar-profile">
        <button className="profile-button" title="Perfil">
          <span className="profile-avatar">👤</span>
          {!isCollapsed && <span className="profile-text">Perfil</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
