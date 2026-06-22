import React, { useState } from 'react';
import '../styles/header.css';
import { Button, Input, Icon } from '../design-system';

const Header = ({ onSearch = () => {}, onFilter = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const filters = [
    { id: 1, name: 'Ação' },
    { id: 2, name: 'Aventura' },
    { id: 3, name: 'Comédia' },
    { id: 4, name: 'Drama' },
    { id: 5, name: 'Ficção Científica' },
    { id: 6, name: 'Horror' },
    { id: 7, name: 'Romance' },
    { id: 8, name: 'Thriller' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Searchbar */}
        <div className="search-container">
          <Input
            type="text"
            className="search-input"
            placeholder="Buscar filmes, séries, jogos..."
            value={searchQuery}
            onChange={handleSearch}
            leadingIcon={<Icon name="search" />}
          />
        </div>

        {/* Filtros */}
        <div className="filters-container">
          <Button
            variant="ghost"
            size="md"
            className={`filters-button ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Icon name="filter" />
            <span>Filtros</span>
          </Button>

          {showFilters && (
            <div className="filters-dropdown">
              <h4>Gêneros</h4>
              <div className="filters-list">
                {filters.map(filter => (
                  <label key={filter.id} className="filter-option">
                    <input 
                      type="checkbox" 
                      onChange={(e) => onFilter(filter.name, e.target.checked)}
                    />
                    <span>{filter.name}</span>
                  </label>
                ))}
              </div>
              <div className="filters-actions">
                <Button variant="primary" size="sm" className="btn-apply">Aplicar</Button>
                <Button variant="secondary" size="sm" className="btn-clear" onClick={() => setShowFilters(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
