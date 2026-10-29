// Autenticação simulada no cliente — nenhuma senha é persistida. A versão definitiva deve
// autenticar contra um backend real, mantendo esta mesma assinatura de funções.
import { registerCustomer } from '@/services/customerService'
import { makeId, readStorage, writeStorage } from '@/services/storage'
import type { AuthUser } from '@/types'

const USERS_KEY = 'auth-users'
const SESSION_KEY = 'auth-session'
const DEMO_EMAIL = 'demo@novavitrine.com.br'
const DEMO_PASSWORD = 'demo123'

function ensureSeed(): AuthUser[] {
  const existing = readStorage<AuthUser[] | null>(USERS_KEY, null)
  if (existing) return existing
  const demoUser: AuthUser = {
    id: makeId('u'),
    name: 'Cliente Demonstração',
    email: DEMO_EMAIL,
    phone: '(11) 90000-0000',
    createdAt: new Date().toISOString(),
  }
  writeStorage(USERS_KEY, [demoUser])
  return [demoUser]
}

export function getSession(): AuthUser | null {
  return readStorage<AuthUser | null>(SESSION_KEY, null)
}

export function login(email: string, password: string): AuthUser {
  const users = ensureSeed()
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
  if (!user) {
    throw new Error('E-mail não encontrado. Verifique ou cadastre-se para continuar.')
  }
  if (user.email === DEMO_EMAIL && password !== DEMO_PASSWORD) {
    throw new Error('Senha incorreta. Use "demo123" para o usuário demonstrativo.')
  }
  if (!password) {
    throw new Error('Informe sua senha para continuar.')
  }
  writeStorage(SESSION_KEY, user)
  return user
}

export function register(data: { name: string; email: string; phone: string; password: string }): AuthUser {
  const users = ensureSeed()
  if (users.some((u) => u.email.toLowerCase() === data.email.trim().toLowerCase())) {
    throw new Error('Este e-mail já está cadastrado. Faça login para continuar.')
  }
  if (!data.password || data.password.length < 6) {
    throw new Error('A senha deve ter ao menos 6 caracteres.')
  }
  const user: AuthUser = {
    id: makeId('u'),
    name: data.name,
    email: data.email.trim(),
    phone: data.phone,
    createdAt: new Date().toISOString(),
  }
  writeStorage(USERS_KEY, [...users, user])
  writeStorage(SESSION_KEY, user)
  registerCustomer({ name: data.name, email: user.email, phone: data.phone })
  return user
}

export function logout(): void {
  writeStorage(SESSION_KEY, null)
}

export function requestPasswordReset(email: string): void {
  const users = ensureSeed()
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
  if (!user) {
    throw new Error('Não encontramos uma conta com este e-mail.')
  }
}
