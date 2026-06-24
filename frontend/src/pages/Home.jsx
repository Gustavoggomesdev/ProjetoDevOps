import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { EmptyState } from '../components/LoadingState';
import { mockItems } from '../data/mockData';
import useSearch from '../hooks/useSearch';

const Home = () => {
  const movieItems = mockItems.filter((i) => i.type === 'movie');
  const seriesItems = mockItems.filter((i) => i.type === 'series');
  const gameItems = mockItems.filter((i) => i.type === 'game');

  const trending = [...mockItems].sort((a, b) => b.votes - a.votes).slice(0, 10);

  const { filtered, setQuery, query, handleFilter } = useSearch(mockItems, ['title']);

  return (
    <div className="home-page">
      <Header onSearch={setQuery} onFilter={handleFilter} />
      <Hero />
      <main className="content-main">
        {query ? (
          filtered.length > 0 ? (
            <Carousel title={`Resultados para "${query}"`} items={filtered} />
          ) : (
            <EmptyState message={`Nenhum item encontrado para "${query}".`} icon="🔍" />
          )
        ) : (
          <>
            <Carousel title="Em Alta" items={trending} />
            <Carousel title="Filmes" items={movieItems} />
            <Carousel title="Séries" items={seriesItems} />
            <Carousel title="Jogos" items={gameItems} />
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
