import React, { useState } from 'react';
import '../styles/card.css';
import { Button, Badge, Icon } from '../design-system';
import { useLibrary } from '../context/LibraryContext';
import RatingModal from './RatingModal';

const Card = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const {
    isFavorite, toggleFavorite,
    isInWatchlist, toggleWatchlist,
    getRating, getStatus, setStatus,
  } = useLibrary();

  const favorited = isFavorite(item.id);
  const inWatchlist = isInWatchlist(item.id);
  const userRating = getRating(item.id);
  const currentStatus = getStatus(item.id, item.status);

  const displayRating = userRating || item.rating;

  const getTypeIcon = () => {
    switch (item.type) {
      case 'movie': return 'movie';
      case 'series': return 'series';
      case 'game': return 'game';
      default: return null;
    }
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case 'movie': return 'Filme';
      case 'series': return 'Série';
      case 'game': return 'Jogo';
      default: return 'Desconhecido';
    }
  };

  const statusLabel = () => {
    if (item.type === 'game') {
      return currentStatus === 'playing' ? 'Jogando' : currentStatus === 'completed' ? 'Concluído' : 'Jogar depois';
    }
    return currentStatus === 'watching' ? 'Assistindo' : currentStatus === 'completed' ? 'Concluído' : 'Ver depois';
  };

  const cycleStatus = () => {
    const order = item.type === 'game'
      ? ['pending', 'playing', 'completed']
      : ['pending', 'watching', 'completed'];
    const idx = order.indexOf(currentStatus);
    const next = order[(idx + 1) % order.length];
    setStatus(item.id, next);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    return (
      <>
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '✨'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <>
      <div
        className={`card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-image">
          <img src={item.image} alt={item.title} />

          <button
            className={`card-favorite-btn ${favorited ? 'active' : ''}`}
            onClick={() => toggleFavorite(item.id)}
            title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Icon name="heart" />
          </button>
        </div>

        <div className="card-content">
          <h3 className="card-title">{item.title}</h3>

          <div className="card-rating">
            <div className="stars">{renderStars(displayRating)}</div>
            <span className="rating-value">{displayRating.toFixed(1)}</span>
            {userRating ? (
              <span className="rating-votes rating-votes--user">(sua nota)</span>
            ) : (
              <span className="rating-votes">({(item.votes / 1000).toFixed(0)}K)</span>
            )}
          </div>

          <div className="card-actions">
            <Button
              variant="primary"
              size="sm"
              className="card-action-btn"
              onClick={() => setShowRatingModal(true)}
            >
              Avaliar
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="card-action-btn"
              onClick={cycleStatus}
              title="Clique para mudar o status"
            >
              {statusLabel()}
            </Button>
          </div>

          <button
            className={`card-watchlist-btn ${inWatchlist ? 'active' : ''}`}
            onClick={() => toggleWatchlist(item.id)}
          >
            <Icon name="bookmark" />
            {inWatchlist ? 'Na Watchlist' : 'Adicionar à Watchlist'}
          </button>
        </div>

        <Badge className="card-type-badge" title={getTypeLabel()}>
          <Icon name={getTypeIcon()} />
        </Badge>
      </div>

      {showRatingModal && (
        <RatingModal item={item} onClose={() => setShowRatingModal(false)} />
      )}
    </>
  );
};

export default Card;
