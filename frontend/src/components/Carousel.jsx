import React, { useRef } from 'react';
import Card from './Card';
import '../styles/carousel.css';

const Carousel = ({ title, items }) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    const container = carouselRef.current;
    const scrollAmount = 320; // Aproximadamente a largura de um card

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
        <div className="carousel-controls">
          <button 
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scroll('left')}
            title="Anterior"
          >
            ←
          </button>
          <button 
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scroll('right')}
            title="Próximo"
          >
            →
          </button>
        </div>
      </div>

      <div className="carousel-container" ref={carouselRef}>
        {items && items.map(item => (
          <div key={item.id} className="carousel-item">
            <Card item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
