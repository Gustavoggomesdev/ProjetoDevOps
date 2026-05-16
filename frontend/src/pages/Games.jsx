import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { getItemsByType } from '../data/mockData';

const Games = () => {
  const gameItems = getItemsByType('game');

  return (
    <div className="games-page">
      <Header />
      <main className="content-main">
        <div className="page-header">
          <h1>Jogos</h1>
        </div>
        <Carousel title="Todos os Jogos" items={gameItems} />
      </main>
    </div>
  );
};

export default Games;
