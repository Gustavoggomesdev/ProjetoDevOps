// Mock data para testes - substituir com dados da API
export const mockItems = [
  {
    id: 1,
    title: "Oppenheimer",
    rating: 5.0,
    votes: 250000,
    image: "https://via.placeholder.com/150x225?text=Oppenheimer",
    type: "movie", // 'movie', 'series', 'game'
    status: "watching" // 'watching', 'completed', 'pending'
  },
  {
    id: 2,
    title: "The Last of Us",
    rating: 4.8,
    votes: 180000,
    image: "https://via.placeholder.com/150x225?text=The+Last+of+Us",
    type: "series",
    status: "watching"
  },
  {
    id: 3,
    title: "Elden Ring",
    rating: 4.9,
    votes: 95000,
    image: "https://via.placeholder.com/150x225?text=Elden+Ring",
    type: "game",
    status: "playing"
  },
  {
    id: 4,
    title: "Barbie",
    rating: 4.7,
    votes: 320000,
    image: "https://via.placeholder.com/150x225?text=Barbie",
    type: "movie",
    status: "completed"
  },
  {
    id: 5,
    title: "Breaking Bad",
    rating: 5.0,
    votes: 410000,
    image: "https://via.placeholder.com/150x225?text=Breaking+Bad",
    type: "series",
    status: "completed"
  },
  {
    id: 6,
    title: "Baldur's Gate 3",
    rating: 4.9,
    votes: 85000,
    image: "https://via.placeholder.com/150x225?text=Baldurs+Gate+3",
    type: "game",
    status: "playing"
  },
  {
    id: 7,
    title: "Dune",
    rating: 4.8,
    votes: 195000,
    image: "https://via.placeholder.com/150x225?text=Dune",
    type: "movie",
    status: "pending"
  },
  {
    id: 8,
    title: "Cyberpunk 2077",
    rating: 4.5,
    votes: 120000,
    image: "https://via.placeholder.com/150x225?text=Cyberpunk+2077",
    type: "game",
    status: "watching"
  },
  {
    id: 9,
    title: "Stranger Things",
    rating: 4.7,
    votes: 290000,
    image: "https://via.placeholder.com/150x225?text=Stranger+Things",
    type: "series",
    status: "watching"
  },
  {
    id: 10,
    title: "The Godfather",
    rating: 5.0,
    votes: 500000,
    image: "https://via.placeholder.com/150x225?text=The+Godfather",
    type: "movie",
    status: "completed"
  }
];

// Dados de categorias
export const categories = [
  { id: 1, name: "Filmes", key: "movies", icon: "🎬" },
  { id: 2, name: "Séries", key: "series", icon: "📺" },
  { id: 3, name: "Jogos", key: "games", icon: "🎮" },
  { id: 4, name: "Favoritos", key: "favorites", icon: "⭐" },
  { id: 5, name: "Watchlist", key: "watchlist", icon: "📋" }
];

// Filtrar dados por tipo
export const getItemsByType = (type) => {
  if (type === "trending") {
    return mockItems.sort((a, b) => b.votes - a.votes);
  }
  return mockItems.filter(item => item.type === type);
};
