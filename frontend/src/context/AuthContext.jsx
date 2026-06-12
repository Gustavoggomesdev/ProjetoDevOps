import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

// ─── Mock local (usado quando o backend não está rodando) ──────────────────
const MOCK_ENABLED = process.env.REACT_APP_MOCK_AUTH === 'true';

const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');

const mockLogin = (credentials) => {
  const user = mockUsers.find(
    (u) => u.username === credentials.username && u.password === credentials.password
  );
  if (!user) throw new Error('Usuário ou senha incorretos.');
  return { username: user.username, email: user.email };
};

const mockRegister = (data) => {
  if (mockUsers.find((u) => u.username === data.username)) {
    const err = new Error('Usuário já existe.');
    err.response = { data: { username: 'Este nome de usuário já está em uso.' } };
    throw err;
  }
  mockUsers.push({ username: data.username, email: data.email, password: data.password });
  localStorage.setItem('mock_users', JSON.stringify(mockUsers));
};
// ──────────────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');
    if ((token || MOCK_ENABLED) && savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch { localStorage.removeItem('user'); }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    if (MOCK_ENABLED) {
      const userData = mockLogin(credentials);
      localStorage.setItem('user', JSON.stringify(userData));
      // Token fictício para o ProtectedRoute não bloquear
      localStorage.setItem('access_token', 'mock_token');
      setUser(userData);
      return userData;
    }

    const { data } = await authService.login(credentials);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    const userData = data.user || { username: credentials.username };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (formData) => {
    if (MOCK_ENABLED) {
      mockRegister(formData);
      return;
    }
    const { data } = await authService.register(formData);
    return data;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    localStorage.removeItem('user');
    if (MOCK_ENABLED) localStorage.removeItem('access_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      isMockMode: MOCK_ENABLED,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};

export default AuthContext;
