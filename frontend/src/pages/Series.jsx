import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { LoadingSpinner, ErrorState, EmptyState } from '../components/LoadingState';
import { seriesService } from '../services/api';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/useSearch';

const Series = () => {
  const { data, loading, error, refetch } = useFetch(() => seriesService.getAll(), []);
  const items = data?.results ?? data ?? [];

  const { filtered, query, setQuery, handleFilter } = useSearch(items, ['title', 'description']);

  if (loading) return <LoadingSpinner message="Carregando séries..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="series-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <main className="content-main">
        <div className="page-header">
          <h1>Séries</h1>
          {query && (
            <p className="search-result-info">
              {filtered.length} resultado(s) para "{query}"
            </p>
          )}
        </div>
        {filtered.length > 0 ? (
          <Carousel title="Todas as Séries" items={filtered} />
        ) : (
          <EmptyState
            message={query ? `Nenhuma série encontrada para "${query}".` : 'Nenhuma série cadastrada ainda.'}
            icon="📺"
          />
        )}
      </main>
    </div>
  );
};

export default Series;
