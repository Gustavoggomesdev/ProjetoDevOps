import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { getItemsByType } from '../data/mockData';

const Movies = () => {
  const movieItems = getItemsByType('movie');

  return (
    <div className="movies-page">
      <Header />
      <main className="content-main">
        <div className="page-header">
          <h1>Filmes</h1>
        </div>
        <Carousel title="Todos os Filmes" items={movieItems} />
      </main>
    </div>
  );
};

export default Movies;
