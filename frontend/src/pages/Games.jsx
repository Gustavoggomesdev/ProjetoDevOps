import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { EmptyState } from '../components/LoadingState';
import { mockItems } from '../data/mockData';
import useSearch from '../hooks/useSearch';

const Games = () => {
  const items = mockItems.filter((i) => i.type === 'game');
  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title']);

  return (
    <div className="games-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Jogos</h1>
          {query && (
            <p className="search-result-info">
              {filtered.length} resultado(s) para "{query}"
            </p>
          )}
        </div>
        {filtered.length > 0 ? (
          <Carousel title="Todos os Jogos" items={filtered} />
        ) : (
          <EmptyState
            message={query ? `Nenhum item encontrado para "${query}".` : 'Nenhum item cadastrado ainda.'}
            icon="🎮"
          />
        )}
      </main>
    </div>
  );
};

export default Games;
