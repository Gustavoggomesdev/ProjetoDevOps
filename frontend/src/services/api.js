import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Injeta o token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tenta renovar o token quando recebe 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem('refresh_token');

      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/token/refresh/`, { refresh });
          localStorage.setItem('access_token', data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return api(original);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth
export const authService = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (data) => api.post('/auth/register/', data),
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

// Filmes
export const moviesService = {
  getAll: (params) => api.get('/movies/', { params }),
  getById: (id) => api.get(`/movies/${id}/`),
  create: (data) => api.post('/movies/', data),
  update: (id, data) => api.put(`/movies/${id}/`, data),
  delete: (id) => api.delete(`/movies/${id}/`),
};

// Séries
export const seriesService = {
  getAll: (params) => api.get('/series/', { params }),
  getById: (id) => api.get(`/series/${id}/`),
  create: (data) => api.post('/series/', data),
  update: (id, data) => api.put(`/series/${id}/`, data),
  delete: (id) => api.delete(`/series/${id}/`),
};

// Jogos
export const gamesService = {
  getAll: (params) => api.get('/games/', { params }),
  getById: (id) => api.get(`/games/${id}/`),
  create: (data) => api.post('/games/', data),
  update: (id, data) => api.put(`/games/${id}/`, data),
  delete: (id) => api.delete(`/games/${id}/`),
};

// Ratings
export const ratingsService = {
  create: (data) => api.post('/ratings/', data),
  update: (id, data) => api.put(`/ratings/${id}/`, data),
};

export default api;
