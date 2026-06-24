import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { EmptyState } from '../components/LoadingState';
import { mockItems } from '../data/mockData';
import { useLibrary } from '../context/LibraryContext';
import useSearch from '../hooks/useSearch';

const Favorites = () => {
  const { library } = useLibrary();
  const items = mockItems.filter((i) => library.favorites.includes(i.id));
  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title']);

  return (
    <div className="favorites-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Favoritos</h1>
        </div>
        {items.length === 0 ? (
          <EmptyState
            message="Você ainda não tem favoritos. Clique no ícone de coração em qualquer card para adicionar!"
            icon="⭐"
          />
        ) : filtered.length > 0 ? (
          <Carousel title="Meus Favoritos" items={filtered} />
        ) : (
          <EmptyState message={`Nenhum favorito encontrado para "${query}".`} icon="🔍" />
        )}
      </main>
    </div>
  );
};

export default Favorites;
