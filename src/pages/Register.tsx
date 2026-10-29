import { UserPlus } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

export function Register() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (password !== confirmPassword) {
      showToast('As senhas não coincidem.', 'error')
      return
    }
    setLoading(true)
    try {
      register({ name, email, phone, password })
      showToast('Cadastro realizado com sucesso!', 'success')
      navigate('/conta')
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível concluir o cadastro.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
            <UserPlus className="h-6 w-6" />
          </span>
          <h1 className="mt-3 text-xl font-bold text-gray-900">Criar minha conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            required
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
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
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <input
            required
            type="password"
            placeholder="Senha (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <input
            required
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          />
          <Button type="submit" fullWidth size="lg" disabled={loading} className="mt-1">
            Criar conta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Já tem conta?{' '}
          <Link to="/login" className="font-semibold text-brand-700 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
