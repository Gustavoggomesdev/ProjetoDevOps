import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/LoadingState';
import { gamesService } from '../services/api';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/useSearch';

const Games = () => {
  const { data, loading, error, refetch } = useFetch(() => gamesService.getAll(), []);
  const items = data?.results ?? data ?? [];

  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title', 'description']);

  if (loading) return <LoadingSpinner message="Carregando jogos..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

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
            message={query ? `Nenhum jogo encontrado para "${query}".` : 'Nenhum jogo cadastrado ainda.'}
            icon="🎮"
          />
        )}
      </main>
    </div>
  );
};

export default Games;
