import { useEffect, useMemo, useRef, useState } from 'react';

const navItems = [
  { label: 'Filmes', icon: '🎬' },
  { label: 'Series', icon: '📺' },
  { label: 'Jogos', icon: '🎮' },
  { label: 'Favoritos', icon: '⭐', badge: 35 },
  { label: 'Watchlist', icon: '☰', badge: 35 }
];

const noMomento = [
  { type: '🎬', title: 'Ate o Ultimo Homem', stars: '★★★★★', rating: '5,0', status: 'Assistindo' },
  { type: '📺', title: 'The Rookie', stars: '★★★★★', rating: '5,0', status: 'Assistindo' },
  { type: '🎮', title: 'Resident Evil: Requiem', stars: '★★★★★', rating: '5,0', status: 'Assistindo' },
  { type: '🎬', title: 'Oppenheimer', stars: '★★★★☆', rating: '4,5', status: 'Quero ver' },
  { type: '📺', title: 'Breaking Bad', stars: '★★★★★', rating: '5,0', status: 'Concluido' }
];

const emAlta = [
  { type: '🎬', title: 'Duna: Parte Dois', stars: '★★★★★', rating: '5,0', status: 'Quero ver' },
  { type: '🎮', title: 'Elden Ring: Nightreign', stars: '★★★★☆', rating: '4,8', status: 'Jogando' },
  { type: '📺', title: 'Severance', stars: '★★★★★', rating: '5,0', status: 'Assistindo' }
];

function MediaCard({ item }) {
  return (
    <article className="card">
      <div className="card-poster">
        <div className="card-poster-placeholder">{item.type}</div>
        <span className="card-type-badge">{item.type}</span>
      </div>

      <div className="card-info">
        <h3 className="card-title">{item.title}</h3>

        <div className="stars" aria-label={`Nota ${item.rating}`}>
          <span>{item.stars}</span>
          <span className="rating-num">{item.rating}</span>
        </div>

        <div className="card-actions">
          <button type="button" className="btn-avaliar">Avaliar</button>
          <button type="button" className="btn-status">{item.status}</button>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [activeNav, setActiveNav] = useState('Filmes');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlides, setMaxSlides] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);

  const viewportRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const calculateCarouselMetrics = () => {
      if (!viewportRef.current || !carouselRef.current) {
        return;
      }

      const firstCard = carouselRef.current.querySelector('.card');

      if (!firstCard) {
        return;
      }

      const carouselStyles = window.getComputedStyle(carouselRef.current);
      const gap = parseFloat(carouselStyles.gap || carouselStyles.columnGap || '0');
      const step = firstCard.offsetWidth + gap;
      const visibleCards = Math.max(1, Math.floor((viewportRef.current.offsetWidth + gap) / step));
      const nextMaxSlides = Math.max(0, noMomento.length - visibleCards);

      setSlideOffset(step);
      setMaxSlides(nextMaxSlides);
      setCurrentSlide((previous) => Math.min(previous, nextMaxSlides));
    };

    calculateCarouselMetrics();
    window.addEventListener('resize', calculateCarouselMetrics);

    return () => {
      window.removeEventListener('resize', calculateCarouselMetrics);
    };
  }, []);

  const dots = useMemo(() => Array.from({ length: maxSlides + 1 }), [maxSlides]);

  const goTo = (index) => {
    const next = Math.max(0, Math.min(maxSlides, index));
    setCurrentSlide(next);
  };

  const slide = (direction) => {
    goTo(currentSlide + direction);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">⭐</div>
          <div className="logo-text">KATA<span>LOG</span></div>
        </div>

        <nav>
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
              className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              <div className="nav-left">
                <span>{item.label}</span>
              </div>

              <div className="nav-right">
                {item.badge ? <span className="badge">{item.badge}</span> : null}
                <span className="nav-icon">{item.icon}</span>
              </div>
            </button>
          ))}
        </nav>

        <button type="button" className="profile-area">
          <div className="profile-avatar">👤</div>
          <span>Perfil</span>
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search-wrap">
            <input type="text" placeholder="Busca" />
            <button type="button" className="search-btn">🔍</button>
          </div>

          <button type="button" className="filter-btn">⚙️ Filtros</button>
        </header>

        <section className="content">
          <div className="hero-placeholder" />

          <h2 className="section-title">No Momento</h2>

          <div className="carousel-wrap">
            <button type="button" className="carousel-nav prev" onClick={() => slide(-1)}>
              &#8249;
            </button>

            <div
              ref={viewportRef}
              className="carousel-viewport"
            >
              <div
                ref={carouselRef}
                className="carousel"
                style={{ transform: `translateX(-${currentSlide * slideOffset}px)` }}
              >
                {noMomento.map((item) => (
                  <MediaCard key={item.title} item={item} />
                ))}
              </div>
            </div>

            <button type="button" className="carousel-nav" onClick={() => slide(1)}>
              &#8250;
            </button>
          </div>

          <div className="dots">
            {dots.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goTo(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="section-spacing">
            <h2 className="section-title">Em Alta</h2>

            <div className="carousel-wrap">
              <div className="carousel static-grid">
                {emAlta.map((item) => (
                  <MediaCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
