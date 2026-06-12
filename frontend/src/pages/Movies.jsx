import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/LoadingState';
import { moviesService } from '../services/api';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/useSearch';

const Movies = () => {
  const { data, loading, error, refetch } = useFetch(() => moviesService.getAll(), []);
  const items = data?.results ?? data ?? [];

  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title', 'description']);

  if (loading) return <LoadingSpinner message="Carregando filmes..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="movies-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Filmes</h1>
          {query && (
            <p className="search-result-info">
              {filtered.length} resultado(s) para "{query}"
            </p>
          )}
        </div>
        {filtered.length > 0 ? (
          <Carousel title="Todos os Filmes" items={filtered} />
        ) : (
          <EmptyState
            message={query ? `Nenhum filme encontrado para "${query}".` : 'Nenhum filme cadastrado ainda.'}
            icon="🎬"
          />
        )}
      </main>
    </div>
  );
};

export default Movies;
