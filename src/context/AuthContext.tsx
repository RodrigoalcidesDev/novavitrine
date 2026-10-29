import { createContext, useContext, useState, type ReactNode } from 'react'
import * as authService from '@/services/authService'
import type { AuthUser } from '@/types'

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => void
  register: (data: { name: string; email: string; phone: string; password: string }) => void
  logout: () => void
  requestPasswordReset: (email: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getSession())

  function login(email: string, password: string) {
    const loggedUser = authService.login(email, password)
    setUser(loggedUser)
  }

  function register(data: { name: string; email: string; phone: string; password: string }) {
    const newUser = authService.register(data)
    setUser(newUser)
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  function requestPasswordReset(email: string) {
    authService.requestPasswordReset(email)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, requestPasswordReset }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
