import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../api/auth'

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setEmail(e.target.value)
    setEmailError('')
    setApiError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) {
      setEmailError('E-mail é obrigatório.')
      return
    }
    if (!isValidEmail(email)) {
      setEmailError('Formato de e-mail inválido.')
      return
    }

    setLoading(true)
    try {
      // AUT-07: recuperação de senha por e-mail
      await requestPasswordReset(email)
      setSuccess(true)
    } catch (err) {
      setApiError(err.message || 'Erro ao enviar e-mail. Tente novamente.')
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
              <span>✓</span> E-mail enviado! Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </div>
            <div className="auth-footer" style={{ marginTop: 8 }}>
              <Link to="/login">← Voltar para o login</Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="form-title">Esqueci minha senha</h2>
            <p className="form-subtitle">
              Informe seu e-mail e enviaremos um link para você redefinir sua senha.
            </p>

            {apiError && (
              <div className="alert alert-error">
                <span>⚠</span> {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">E-mail cadastrado</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={handleChange}
                  className={emailError ? 'input-error' : ''}
                  autoComplete="email"
                  autoFocus
                />
                {emailError && <span className="field-error">⚠ {emailError}</span>}
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && <span className="spinner" />}
                {loading ? 'Enviando...' : 'Enviar link de recuperação'}
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
