import { LogIn } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      login(email, password)
      showToast('Login realizado com sucesso!', 'success')
      navigate('/conta')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível entrar.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <LogIn className="h-6 w-6" />
          </span>
          <h1 className="mt-3 text-xl font-bold text-gray-900">Entrar na sua conta</h1>
          <p className="mt-1 text-xs text-gray-500">
            Use <strong>demo@novavitrine.com.br</strong> / <strong>demo123</strong> para testar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <input
            required
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <Link to="/recuperar-senha" className="focus-ring self-end text-xs font-medium text-brand-700 hover:underline">
            Esqueci minha senha
          </Link>
          <Button type="submit" fullWidth size="lg" disabled={loading}>
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Ainda não tem conta?{' '}
          <Link to="/cadastro" className="font-semibold text-brand-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
