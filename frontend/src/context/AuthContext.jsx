import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { refreshAccessToken } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('access_token'))
  const [refreshTk, setRefreshTk] = useState(() => localStorage.getItem('refresh_token'))

  const loginSave = useCallback((access, refresh) => {
    setToken(access)
    setRefreshTk(refresh)
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setRefreshTk(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }, [])

  // AUT-08: manter sessão ativa renovando token automaticamente
  useEffect(() => {
    if (!refreshTk) return

    const refresh = async () => {
      try {
        const data = await refreshAccessToken(refreshTk)
        setToken(data.access)
        localStorage.setItem('access_token', data.access)
      } catch {
        logout()
      }
    }

    // Renovar a cada 50 minutos (token expira em 60 min)
    const interval = setInterval(refresh, 50 * 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshTk, logout])

  return (
    <AuthContext.Provider value={{ token, loginSave, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
