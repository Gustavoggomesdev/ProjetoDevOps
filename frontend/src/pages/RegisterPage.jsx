import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, register } from '../api/auth'
import { useAuth } from '../context/AuthContext'

// AUT-04: validação de formato de e-mail
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const { loginSave } = useAuth()

  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const errs = {}
    if (!form.username.trim()) {
      errs.username = 'Nome de usuário é obrigatório.'
    } else if (form.username.trim().length < 3) {
      errs.username = 'Mínimo de 3 caracteres.'
    }
    if (!form.email) {
      errs.email = 'E-mail é obrigatório.'
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Formato de e-mail inválido.'
    }
    if (!form.password) {
      errs.password = 'Senha é obrigatória.'
    } else if (form.password.length < 8) {
      errs.password = 'A senha deve ter pelo menos 8 caracteres.'
    }
    if (!form.confirm) {
      errs.confirm = 'Confirme sua senha.'
    } else if (form.password !== form.confirm) {
      errs.confirm = 'As senhas não coincidem.'
    }
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: '' }))
    setApiError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      // AUT-01: cadastro com e-mail e senha
      await register(form.username.trim(), form.email, form.password)
      // Após cadastro, faz login automático
      const tokens = await login(form.email, form.password)
      // AUT-08: sessão mantida via tokens
      loginSave(tokens.access, tokens.refresh)
      navigate('/')
    } catch (err) {
      setApiError(err.message || 'Erro ao criar conta. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="brand">
          <div className="brand-logo">🎬</div>
          <h1>KATALOG</h1>
          <p>Catálogo de filmes e jogos</p>
        </div>

        <h2 className="form-title">Criar conta</h2>
        <p className="form-subtitle">Preencha os dados abaixo para se cadastrar</p>

        {apiError && (
          <div className="alert alert-error">
            <span>⚠</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="seunome"
              value={form.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              autoComplete="username"
              autoFocus
            />
            {errors.username && <span className="field-error">⚠ {errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">⚠ {errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              autoComplete="new-password"
            />
            {errors.password
              ? <span className="field-error">⚠ {errors.password}</span>
              : <span className="password-hint">Mínimo 8 caracteres</span>
            }
          </div>

          <div className="form-group">
            <label htmlFor="confirm">Confirmar senha</label>
            <input
              id="confirm"
              type="password"
              name="confirm"
              placeholder="Repita a senha"
              value={form.confirm}
              onChange={handleChange}
              className={errors.confirm ? 'input-error' : ''}
              autoComplete="new-password"
            />
            {errors.confirm && <span className="field-error">⚠ {errors.confirm}</span>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div className="divider" />

        <div className="auth-footer">
          Já tem uma conta?{' '}
          <Link to="/login">Entrar</Link>
        </div>
      </div>
    </div>
  )
}
