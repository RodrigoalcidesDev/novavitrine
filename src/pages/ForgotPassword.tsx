import { CheckCircle2, KeyRound } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/context/ToastContext'
import { requestPasswordReset } from '@/services/authService'

export function ForgotPassword() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      requestPasswordReset(email)
      setSent(true)
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Não foi possível processar o pedido.', 'error')
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
        {sent ? (
          <div className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <h1 className="mt-3 text-xl font-bold text-gray-900">Verifique seu e-mail</h1>
            <p className="mt-2 text-sm text-gray-500">
              Simulação: em um ambiente real, enviaríamos um link de redefinição de senha para <strong>{email}</strong>.
            </p>
            <Link to="/login" className="mt-6">
              <Button>Voltar ao login</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <KeyRound className="h-6 w-6" />
              </span>
              <h1 className="mt-3 text-xl font-bold text-gray-900">Recuperar senha</h1>
              <p className="mt-1 text-xs text-gray-500">Informe seu e-mail cadastrado (fluxo demonstrativo)</p>
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
              <Button type="submit" fullWidth size="lg">
                Enviar link de recuperação
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              <Link to="/login" className="font-semibold text-brand-700 hover:underline">
                Voltar ao login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
