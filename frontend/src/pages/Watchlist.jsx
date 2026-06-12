import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/LoadingState';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/useSearch';
import api from '../services/api';

// Busca itens marcados como "pendente" (para assistir/jogar depois)
const fetchWatchlist = () => api.get('/movies/', { params: { status: 'pending' } });

const Watchlist = () => {
  const { data, loading, error, refetch } = useFetch(fetchWatchlist, []);
  const items = data?.results ?? data ?? [];

  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title']);

  if (loading) return <LoadingSpinner message="Carregando watchlist..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="watchlist-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Watchlist</h1>
        </div>
        {items.length === 0 ? (
          <EmptyState
            message="Sua watchlist está vazia. Adicione filmes, séries e jogos que você quer ver mais tarde!"
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
