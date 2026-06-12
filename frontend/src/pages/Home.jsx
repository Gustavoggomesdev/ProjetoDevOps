import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { LoadingSpinner, ErrorState } from '../components/LoadingState';
import { moviesService, seriesService, gamesService } from '../services/api';
import useFetch from '../hooks/useFetch';
import useSearch from '../hooks/useSearch';

const Home = () => {
  const movies = useFetch(() => moviesService.getAll(), []);
  const series = useFetch(() => seriesService.getAll(), []);
  const games  = useFetch(() => gamesService.getAll(), []);

  const movieItems  = movies.data?.results  ?? movies.data  ?? [];
  const seriesItems = series.data?.results  ?? series.data  ?? [];
  const gameItems   = games.data?.results   ?? games.data   ?? [];

  // Trending = todos os itens ordenados por rating (campo user_rating no backend)
  const trending = [...movieItems, ...seriesItems, ...gameItems]
    .sort((a, b) => (b.user_rating ?? b.rating ?? 0) - (a.user_rating ?? a.rating ?? 0))
    .slice(0, 10);

  const { setQuery, handleFilter } = useSearch([], []);

  const isLoading = movies.loading && series.loading && games.loading;
  const hasError  = movies.error || series.error || games.error;

  if (isLoading) return <LoadingSpinner message="Carregando conteúdo..." />;
  if (hasError)  return (
    <ErrorState
      message="Não foi possível carregar o conteúdo."
      onRetry={() => { movies.refetch(); series.refetch(); games.refetch(); }}
    />
  );

  return (
    <div className="home-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <Hero />
      <main className="content-main">
        {trending.length > 0 && (
          <Carousel title="Em Alta" items={trending} />
        )}
        {movieItems.length > 0 && (
          <Carousel title="Filmes" items={movieItems.slice(0, 10)} />
        )}
        {seriesItems.length > 0 && (
          <Carousel title="Séries" items={seriesItems.slice(0, 10)} />
        )}
        {gameItems.length > 0 && (
          <Carousel title="Jogos" items={gameItems.slice(0, 10)} />
        )}
      </main>
    </div>
  );
};

export default Home;
