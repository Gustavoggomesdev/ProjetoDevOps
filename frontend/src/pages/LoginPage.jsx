import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { useAuth } from '../context/AuthContext'

// AUT-04: validação de formato de e-mail
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { loginSave } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const errs = {}
    if (!form.email) {
      errs.email = 'E-mail é obrigatório.'
    } else if (!isValidEmail(form.email)) {
      errs.email = 'Formato de e-mail inválido.'
    }
    if (!form.password) {
      errs.password = 'Senha é obrigatória.'
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
      // AUT-06: login com e-mail e senha
      const data = await login(form.email, form.password)
      // AUT-08: sessão mantida via tokens no localStorage
      loginSave(data.access, data.refresh)
      navigate('/')
    } catch (err) {
      setApiError(err.message || 'Credenciais inválidas. Verifique e tente novamente.')
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

        <h2 className="form-title">Entrar</h2>
        <p className="form-subtitle">Acesse sua conta para continuar</p>

        {apiError && (
          <div className="alert alert-error">
            <span>⚠</span> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
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
              autoFocus
            />
            {errors.email && <span className="field-error">⚠ {errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              autoComplete="current-password"
            />
            {errors.password && <span className="field-error">⚠ {errors.password}</span>}
          </div>

          {/* AUT-07: link para recuperação de senha */}
          <Link to="/forgot-password" className="forgot-link">
            Esqueci minha senha
          </Link>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="divider" />

        <div className="auth-footer">
          Não tem uma conta?{' '}
          <Link to="/register">Criar conta</Link>
        </div>
      </div>
    </div>
  )
}
