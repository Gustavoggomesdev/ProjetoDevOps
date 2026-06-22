import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

// ─── Mock local (usado quando o backend não está rodando) ──────────────────
const MOCK_ENABLED = process.env.REACT_APP_MOCK_AUTH === 'true';

const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');

const sanitizeUserForStorage = (candidate) => {
  if (!candidate || typeof candidate !== 'object') return null;
  const {
    password,
    pass,
    pwd,
    secret,
    token,
    refresh,
    access,
    ...safeUser
  } = candidate;
  return safeUser;
};

const sha256 = async (value) => {
  const input = new TextEncoder().encode(String(value ?? ''));
  const digest = await crypto.subtle.digest('SHA-256', input);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const mockLogin = async (credentials) => {
  const passwordHash = await sha256(credentials.password);
  const user = mockUsers.find(
    (u) => u.username === credentials.username && u.passwordHash === passwordHash
  );
  if (!user) throw new Error('Usuário ou senha incorretos.');
  return { username: user.username, email: user.email };
};

const mockRegister = async (data) => {
  if (mockUsers.find((u) => u.username === data.username)) {
    const err = new Error('Usuário já existe.');
    err.response = { data: { username: 'Este nome de usuário já está em uso.' } };
    throw err;
  }
  const passwordHash = await sha256(data.password);
  mockUsers.push({ username: data.username, email: data.email, passwordHash });
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
      const userData = await mockLogin(credentials);
      const safeUserData = sanitizeUserForStorage(userData);
      localStorage.setItem('user', JSON.stringify(safeUserData));
      // Token fictício para o ProtectedRoute não bloquear
      localStorage.setItem('access_token', 'mock_token');
      setUser(safeUserData);
      return safeUserData;
    }

    const { data } = await authService.login(credentials);
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    const userData = data.user || { username: credentials.username };
    const safeUserData = sanitizeUserForStorage(userData);
    localStorage.setItem('user', JSON.stringify(safeUserData));
    setUser(safeUserData);
    return safeUserData;
  }, []);

  const register = useCallback(async (formData) => {
    if (MOCK_ENABLED) {
      await mockRegister(formData);
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
