import { LogOut, Package, User } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `focus-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-50 text-brand-800' : 'text-gray-600 hover:bg-gray-100'
  }`

export function AccountLayout() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    showToast('Você saiu da sua conta.', 'info')
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Minha conta</h1>
      <p className="mb-6 text-sm text-gray-500">Olá, {user?.name}</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        <nav className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-2">
          <NavLink to="/conta" end className={linkClass}>
            <User className="h-4 w-4" /> Perfil
          </NavLink>
          <NavLink to="/conta/pedidos" className={linkClass}>
            <Package className="h-4 w-4" /> Meus pedidos
          </NavLink>
          <button
            onClick={handleLogout}
            className="focus-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
