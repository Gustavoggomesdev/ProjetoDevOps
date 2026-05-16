import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { getItemsByType } from '../data/mockData';

const Series = () => {
  const seriesItems = getItemsByType('series');

  return (
    <div className="series-page">
      <Header />
      <main className="content-main">
        <div className="page-header">
          <h1>Séries</h1>
        </div>
        <Carousel title="Todas as Séries" items={seriesItems} />
      </main>
    </div>
  );
};

export default Series;
