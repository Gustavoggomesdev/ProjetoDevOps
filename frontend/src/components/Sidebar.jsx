import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

        {/* Perfil + Logout */}
        <div className="sidebar-profile">
          <div className="profile-info" title={user?.username || 'Perfil'}>
            <span className="profile-avatar">
              <Icon name="user" />
            </span>
            {!isCollapsed && (
              <span className="profile-text">{user?.username || 'Usuário'}</span>
            )}
          </div>
          <button
            className="logout-button"
            onClick={handleLogout}
            title="Sair"
            aria-label="Sair da conta"
          >
            <Icon name="logout" />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
