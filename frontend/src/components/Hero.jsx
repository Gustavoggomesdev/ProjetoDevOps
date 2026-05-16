import React from 'react';
import '../styles/hero.css';
import { Button } from '../design-system';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Bem-vindo ao Katalog</h1>
        <p className="hero-subtitle">
          Organize, avalie e descubra filmes, séries e jogos que você ama
        </p>
        <div className="hero-actions">
          <Button variant="primary" size="lg" className="hero-btn">Explorar Agora</Button>
          <Button variant="secondary" size="lg" className="hero-btn hero-btn--secondary">Minha Lista</Button>
        </div>
      </div>
      <div className="hero-background">
        {/* Imagem de fundo ou gradiente */}
      </div>
    </section>
  );
};

export default Hero;
