## Frontend - Estrutura e Componentes

### Visão Geral

O frontend foi construído com **React 18** usando uma arquitetura modular e reutilizável, com suporte a roteamento via **React Router v6**.

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Sidebar.jsx     # Sidebar recolhível com navegação
│   ├── Header.jsx      # Header com searchbar e filtros
│   ├── Card.jsx        # Card individual de filme/série/jogo
│   ├── Carousel.jsx    # Carrossel horizontal de cards
│   └── Hero.jsx        # Banner hero da página inicial
│
├── pages/              # Páginas/rotas da aplicação
│   ├── Home.jsx        # Página inicial com carrosséis
│   ├── Movies.jsx      # Página de filmes
│   ├── Series.jsx      # Página de séries
│   ├── Games.jsx       # Página de jogos
│   ├── Favorites.jsx   # Página de favoritos
│   └── Watchlist.jsx   # Página de watchlist
│
├── styles/             # Estilos CSS modulares
│   ├── main.css        # Estilos globais e variáveis
│   ├── sidebar.css     # Estilos da sidebar
│   ├── card.css        # Estilos do card
│   ├── carousel.css    # Estilos do carrossel
│   ├── header.css      # Estilos do header
│   └── hero.css        # Estilos do hero
│
├── data/               # Dados mockados/fixtures
│   └── mockData.js     # Dados para testes
│
├── hooks/              # Hooks customizados (futuro)
│
├── App.jsx             # Componente raiz com roteamento
├── index.jsx           # Arquivo de entrada
└── index.css           # Estilos base
```

### Componentes

#### **Sidebar**
- Recolhível (colapsável)
- Menu com 5 opções: Filmes, Séries, Jogos, Favoritos, Watchlist
- Seção de perfil na parte inferior
- Transition suave ao recolher

#### **Header**
- Searchbar para busca de itens
- Dropdown de filtros (gêneros)
- Sticky (fica no topo ao scroll)

#### **Card**
- Exibe imagem na lateral esquerda (40% da largura)
- Conteúdo na lateral direita: título, avaliações, botões
- Avaliações: 5 estrelas + número + quantidade de votos
- Dois botões: "Avaliar" e "Assistindo/Jogando"
- Ícone do tipo (filme/série/jogo) no canto inferior direito
- Efeito hover com elevation

#### **Carousel**
- Lista horizontal scrollável
- Botões de navegação (anterior/próximo)
- Scroll suave
- Responsivo (adapta quantidade de cards visíveis)

#### **Hero**
- Banner de boas-vindas
- Gradiente de cores
- Botões de ação

### Cores e Variáveis

Definidas em `styles/main.css`:

```css
--primary-color: #6366f1      /* Roxo principal */
--secondary-color: #8b5cf6    /* Roxo secundário */
--dark-bg: #0f172a            /* Fundo escuro */
--darker-bg: #020617          /* Fundo mais escuro */
--card-bg: #1e293b            /* Fundo dos cards */
```

### Como Usar

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Modo desenvolvimento**
   ```bash
   npm start
   ```
   Acessa em `http://localhost:3000`

3. **Build para produção**
   ```bash
   npm run build
   ```

### Dados

Atualmente usa dados mockados de `src/data/mockData.js`. Para integrar com a API:

1. Criar serviço em `src/services/api.js`
2. Usar hooks (useState, useEffect) para carregar dados
3. Substituir mockData pelas chamadas da API

### Próximos Passos

- [ ] Integração com API (backend Django)
- [ ] Autenticação JWT
- [ ] Página de detalhes do filme/série/jogo
- [ ] Modal de avaliação
- [ ] Persistência de favoritos/watchlist
- [ ] Temas (light/dark mode)
- [ ] Testes unitários
- [ ] TypeScript (tipo safety)

### Responsividade

Todos os componentes são responsivos com breakpoints:
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

Teste em diferentes tamanhos com `npm start` e DevTools do navegador (F12).
