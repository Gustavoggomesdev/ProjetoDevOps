import React, { useState } from 'react';
import { Button } from '../design-system';
import { useLibrary } from '../context/LibraryContext';
import '../styles/rating-modal.css';

const RatingModal = ({ item, onClose }) => {
  const { getRating, setRating } = useLibrary();
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(getRating(item.id) || 0);

  const handleConfirm = () => {
    setRating(item.id, selected);
    onClose();
  };

  return (
    <div className="rating-modal-overlay" onClick={onClose}>
      <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rating-modal-close" onClick={onClose} aria-label="Fechar">×</button>

        <h3 className="rating-modal-title">Avaliar "{item.title}"</h3>
        <p className="rating-modal-subtitle">Toque nas estrelas para escolher sua nota</p>

        <div className="rating-modal-stars" onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="rating-star-btn"
              onMouseEnter={() => setHovered(star)}
              onClick={() => setSelected(star)}
              aria-label={`${star} estrela(s)`}
            >
              {(hovered || selected) >= star ? '⭐' : '☆'}
            </button>
          ))}
        </div>

        <p className="rating-modal-value">
          {selected > 0 ? `Sua nota: ${selected}/5` : 'Nenhuma nota selecionada'}
        </p>

        <div className="rating-modal-actions">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" size="sm" onClick={handleConfirm} disabled={selected === 0}>
            Salvar avaliação
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
