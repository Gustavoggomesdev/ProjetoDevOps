import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { confirmPasswordReset } from '../api/auth'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const uid = searchParams.get('uid') || ''
  const token = searchParams.get('token') || ''

  const [form, setForm] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function validate() {
    const errs = {}
    if (!form.password) {
      errs.password = 'Nova senha é obrigatória.'
    } else if (form.password.length < 8) {
      errs.password = 'A senha deve ter pelo menos 8 caracteres.'
    }
    if (!form.confirm) {
      errs.confirm = 'Confirme a nova senha.'
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

    if (!uid || !token) {
      setApiError('Link de recuperação inválido. Solicite um novo.')
      return
    }

    setLoading(true)
    try {
      await confirmPasswordReset(uid, token, form.password)
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setApiError(err.message || 'Link inválido ou expirado. Solicite um novo.')
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
        </div>

        {success ? (
          <>
            <div className="alert alert-success">
              <span>✓</span> Senha redefinida com sucesso! Redirecionando para o login...
            </div>
            <div className="auth-footer" style={{ marginTop: 8 }}>
              <Link to="/login">Ir para o login agora</Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="form-title">Redefinir senha</h2>
            <p className="form-subtitle">Escolha uma nova senha para sua conta.</p>

            {apiError && (
              <div className="alert alert-error">
                <span>⚠</span> {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="password">Nova senha</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete="new-password"
                  autoFocus
                />
                {errors.password
                  ? <span className="field-error">⚠ {errors.password}</span>
                  : <span className="password-hint">Mínimo 8 caracteres</span>
                }
              </div>

              <div className="form-group">
                <label htmlFor="confirm">Confirmar nova senha</label>
                <input
                  id="confirm"
                  type="password"
                  name="confirm"
                  placeholder="Repita a nova senha"
                  value={form.confirm}
                  onChange={handleChange}
                  className={errors.confirm ? 'input-error' : ''}
                  autoComplete="new-password"
                />
                {errors.confirm && <span className="field-error">⚠ {errors.confirm}</span>}
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && <span className="spinner" />}
                {loading ? 'Redefinindo...' : 'Redefinir senha'}
              </button>
            </form>

            <div className="divider" />

            <div className="auth-footer">
              <Link to="/login">← Voltar para o login</Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
