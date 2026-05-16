import React from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';

const Favorites = () => {
  // TODO: Integrar com API para obter favoritos do usuário
  const favoriteItems = [];

  return (
    <div className="favorites-page">
      <Header />
      <main className="content-main">
        <div className="page-header">
          <h1>Favoritos</h1>
        </div>
        {favoriteItems.length > 0 ? (
          <Carousel title="Meus Favoritos" items={favoriteItems} />
        ) : (
          <div className="empty-state">
            <p>Você ainda não tem favoritos. Comece a adicionar!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
