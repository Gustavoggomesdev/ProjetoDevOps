const BASE_URL = 'http://localhost:8000/api'

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message =
      data.detail ||
      Object.values(data).flat().join(' ') ||
      'Ocorreu um erro. Tente novamente.'
    throw new Error(message)
  }
  return data
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse(res)
}

export async function register(username, email, password) {
  const res = await fetch(`${BASE_URL}/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  return handleResponse(res)
}

export async function requestPasswordReset(email) {
  const res = await fetch(`${BASE_URL}/users/password-reset/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  return handleResponse(res)
}

export async function confirmPasswordReset(uid, token, password) {
  const res = await fetch(`${BASE_URL}/users/password-reset/confirm/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, token, password }),
  })
  return handleResponse(res)
}

export async function refreshAccessToken(refresh) {
  const res = await fetch(`${BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  return handleResponse(res)
}
