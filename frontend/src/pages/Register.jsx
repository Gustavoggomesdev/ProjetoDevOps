import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Icon } from '../design-system';
import '../styles/auth.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setGeneralError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.username) errs.username = 'Informe um nome de usuário.';
    if (!form.email) errs.email = 'Informe seu e-mail.';
    if (!form.password) errs.password = 'Informe uma senha.';
    if (form.password !== form.password_confirm)
      errs.password_confirm = 'As senhas não coincidem.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate('/login', { state: { registered: true } }), 2000);
    } catch (err) {
      // Erro de rede: backend offline ou sem conexão
      if (!err.response) {
        setGeneralError('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
        return;
      }

      const data = err.response.data || {};
      const fieldNames = ['username', 'email', 'password', 'password_confirm'];
      const mapped = {};
      let hasFieldError = false;

      Object.entries(data).forEach(([key, val]) => {
        const msg = Array.isArray(val) ? val[0] : String(val);
        if (fieldNames.includes(key)) {
          mapped[key] = msg;
          hasFieldError = true;
        }
      });

      if (hasFieldError) {
        setErrors(mapped);
      } else {
        const msg =
          data.detail ||
          (Array.isArray(data.non_field_errors) ? data.non_field_errors[0] : null) ||
          `Erro ${err.response.status}: Não foi possível criar a conta.`;
        setGeneralError(msg);
      }
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

        <h2 className="auth-title">Criar nova conta</h2>

        {success && (
          <div className="auth-success">
            ✅ Conta criada com sucesso! Redirecionando para o login...
          </div>
        )}

        {generalError && <div className="auth-error">{generalError}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Usuário</label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Escolha um nome de usuário"
              value={form.username}
              onChange={handleChange}
              leadingIcon={<Icon name="user" />}
            />
            {errors.username && <span className="auth-field-error">{errors.username}</span>}
          </div>

          <div className="auth-field">
            <label htmlFor="email">E-mail</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              leadingIcon={<Icon name="mail" />}
            />
            {errors.email && <span className="auth-field-error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <label htmlFor="password">Senha</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={handleChange}
              leadingIcon={<Icon name="lock" />}
            />
            {errors.password && <span className="auth-field-error">{errors.password}</span>}
          </div>

          <div className="auth-field">
            <label htmlFor="password_confirm">Confirmar senha</label>
            <Input
              id="password_confirm"
              name="password_confirm"
              type="password"
              placeholder="Repita sua senha"
              value={form.password_confirm}
              onChange={handleChange}
              leadingIcon={<Icon name="lock" />}
            />
            {errors.password_confirm && <span className="auth-field-error">{errors.password_confirm}</span>}
          </div>

          <Button
            variant="primary"
            size="md"
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <p className="auth-footer">
          Já tem conta?{' '}
          <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
