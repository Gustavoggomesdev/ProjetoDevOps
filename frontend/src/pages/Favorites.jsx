import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/LoadingState';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/useSearch';
import api from '../services/api';

// O backend filtra pelo usuário autenticado via token JWT
const fetchFavorites = () => api.get('/movies/', { params: { status: 'favorite' } });

const Favorites = () => {
  const { data, loading, error, refetch } = useFetch(fetchFavorites, []);
  const items = data?.results ?? data ?? [];

  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title']);

  if (loading) return <LoadingSpinner message="Carregando favoritos..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="favorites-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Favoritos</h1>
        </div>
        {items.length === 0 ? (
          <EmptyState
            message="Você ainda não tem favoritos. Marque itens como favorito nas páginas de filmes, séries ou jogos!"
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
