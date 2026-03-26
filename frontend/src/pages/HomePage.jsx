import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  // AUT-09: logout
  const { logout } = useAuth()

  return (
    <div className="home-wrapper">
      <nav className="home-nav">
        <div className="nav-brand">
          <span>🎬</span>
          KATALOG
        </div>
        {/* AUT-09: botão de logout */}
        <button className="btn-outline" onClick={logout}>
          Sair
        </button>
      </nav>

      <div className="home-content">
        <h2>Bem-vindo ao KATALOG!</h2>
        <p>Explore, avalie e organize seu catálogo de filmes e jogos favoritos.</p>
      </div>
    </div>
  )
}
