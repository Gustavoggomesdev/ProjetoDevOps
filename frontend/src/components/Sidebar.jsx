import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../design-system';
import '../styles/sidebar.css';

const menuItems = [
  { id: 'home',      label: 'Início',    path: '/',          iconName: 'home' },
  { id: 'movies',    label: 'Filmes',    path: '/movies',    iconName: 'movie' },
  { id: 'series',    label: 'Séries',    path: '/series',    iconName: 'series' },
  { id: 'games',     label: 'Jogos',     path: '/games',     iconName: 'game' },
  { id: 'favorites', label: 'Favoritos', path: '/favorites', iconName: 'heart' },
  { id: 'watchlist', label: 'Watchlist', path: '/watchlist', iconName: 'bookmark' },
];

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose} aria-hidden="true" />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Toggle desktop */}
        <button
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir' : 'Recolher'}
          aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
        >
          <Icon name={isCollapsed ? 'menu' : 'close'} />
        </button>

        {/* Logo */}
        <NavLink to="/" className="sidebar-logo" onClick={onMobileClose}>
          <span className="logo-icon">🎬</span>
          {!isCollapsed && <span className="logo-text">Katalog</span>}
        </NavLink>

        {/* Menu */}
        <nav className="sidebar-nav" aria-label="Navegação principal">
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `menu-item ${isActive ? 'menu-item--active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                  onClick={onMobileClose}
                >
                  <span className="menu-icon">
                    <Icon name={item.iconName} />
                  </span>
                  {!isCollapsed && <span className="menu-label">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
