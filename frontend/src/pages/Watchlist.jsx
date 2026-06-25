import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { EmptyState } from '../components/LoadingState';
import { mockItems } from '../data/mockData';
import { useLibrary } from '../context/LibraryContext';
import useSearch from '../hooks/useSearch';

const Watchlist = () => {
  const { library } = useLibrary();
  const items = mockItems.filter((i) => library.watchlist.includes(i.id));
  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title']);

  return (
    <div className="watchlist-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Watchlist</h1>
        </div>
        {items.length === 0 ? (
          <EmptyState
            message='Sua watchlist está vazia. Clique em "Adicionar à Watchlist" em qualquer card!'
            icon="📋"
          />
        ) : filtered.length > 0 ? (
          <Carousel title="Minha Watchlist" items={filtered} />
        ) : (
          <EmptyState message={`Nenhum item encontrado para "${query}".`} icon="🔍" />
        )}
      </main>
    </div>
  );
};

export default Watchlist;
