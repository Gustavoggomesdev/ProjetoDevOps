import React, { useState } from 'react';
import '../styles/card.css';
import { Button, Badge, Icon } from '../design-system';

const Card = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeIcon = () => {
    switch (item.type) {
      case 'movie':
        return 'movie';
      case 'series':
        return 'series';
      case 'game':
        return 'game';
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case 'movie':
        return 'Filme';
      case 'series':
        return 'Série';
      case 'game':
        return 'Jogo';
      default:
        return 'Desconhecido';
    }
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
    <div 
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem lateral esquerda */}
      <div className="card-image">
        <img src={item.image} alt={item.title} />
      </div>

      {/* Conteúdo lateral direito */}
      <div className="card-content">
        {/* Título */}
        <h3 className="card-title">{item.title}</h3>

        {/* Avaliações */}
        <div className="card-rating">
          <div className="stars">
            {renderStars(item.rating)}
          </div>
          <span className="rating-value">{item.rating.toFixed(1)}</span>
          <span className="rating-votes">({(item.votes / 1000).toFixed(0)}K)</span>
        </div>

        {/* Botões */}
        <div className="card-actions">
          <Button variant="primary" size="sm" className="card-action-btn">
            Avaliar
          </Button>
          <Button variant="secondary" size="sm" className="card-action-btn">
            {item.type === 'game' ? 'Jogando' : 'Assistindo'}
          </Button>
        </div>
      </div>

      {/* Ícone de tipo no canto inferior direito */}
      <Badge className="card-type-badge" title={getTypeLabel()}>
        <Icon name={getTypeIcon()} />
      </Badge>
    </div>
  );
};

export default Card;
