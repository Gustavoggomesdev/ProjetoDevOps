import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { mockItems, getItemsByType } from '../data/mockData';

const Home = () => {
  const trendingItems = getItemsByType('trending').slice(0, 10);
  const movieItems = getItemsByType('movie').slice(0, 10);
  const seriesItems = getItemsByType('series').slice(0, 10);
  const gameItems = getItemsByType('game').slice(0, 10);

  return (
    <div className="home-page">
      <Header />
      <Hero />
      
      <main className="content-main">
        <Carousel title="No Momento" items={trendingItems} />
        <Carousel title="Filmes" items={movieItems} />
        <Carousel title="Séries" items={seriesItems} />
        <Carousel title="Jogos" items={gameItems} />
      </main>
    </div>
  );
};

export default Home;
