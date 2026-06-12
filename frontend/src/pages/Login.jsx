import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Icon } from '../design-system';
import '../styles/auth.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';
  const justRegistered = location.state?.registered === true;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Preencha usuário e senha.');
      return;
    }
    setLoading(true);
    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.non_field_errors?.[0] ||
        'Usuário ou senha incorretos.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span>🎬</span>
          <h1>Katalog</h1>
        </div>

        <h2 className="auth-title">Entrar na sua conta</h2>

        {justRegistered && (
          <div className="auth-success">
            ✅ Conta criada com sucesso! Faça login para continuar.
          </div>
        )}

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Usuário</label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Seu nome de usuário"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              leadingIcon={<Icon name="user" />}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Sua senha"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              leadingIcon={<Icon name="lock" />}
            />
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="auth-footer">
          Não tem conta?{' '}
          <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
