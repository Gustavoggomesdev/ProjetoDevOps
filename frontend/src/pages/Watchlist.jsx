import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';

const Watchlist = () => {
  // TODO: Integrar com API para obter watchlist do usuário
  const watchlistItems = [];

  return (
    <div className="watchlist-page">
      <Header />
      <main className="content-main">
        <div className="page-header">
          <h1>Watchlist</h1>
        </div>
        {watchlistItems.length > 0 ? (
          <Carousel title="Minha Watchlist" items={watchlistItems} />
        ) : (
          <div className="empty-state">
            <p>Sua watchlist está vazia. Adicione itens para mais tarde!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Watchlist;
