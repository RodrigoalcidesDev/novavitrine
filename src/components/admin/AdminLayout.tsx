import { LayoutDashboard, Package, Settings, ShoppingBag, Store, Users } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useStoreConfig } from '@/context/StoreConfigContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/produtos', label: 'Produtos', icon: Package, end: false },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag, end: false },
  { to: '/admin/clientes', label: 'Clientes', icon: Users, end: false },
  { to: '/admin/unidades', label: 'Unidades', icon: Store, end: false },
  { to: '/admin/configuracoes', label: 'Configurações', icon: Settings, end: false },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-brand-600 text-white' : 'text-brand-100 hover:bg-white/10'
  }`

export function AdminLayout() {
  const { settings } = useStoreConfig()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden w-60 shrink-0 flex-col bg-brand-950 p-4 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <Store className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-bold">{settings.storeName}</p>
            <p className="text-[11px] text-brand-200">Painel administrativo</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              <item.icon className="h-4 w-4" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="focus-ring mt-4 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-200 hover:bg-white/10">
          ← Voltar à loja
        </NavLink>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 md:hidden">
          <span className="font-bold text-brand-900">{settings.storeName} · Admin</span>
          <NavLink to="/" className="text-sm font-medium text-brand-700">
            Voltar à loja
          </NavLink>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-gray-200 bg-white px-2 py-2 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ${isActive ? 'bg-brand-600 text-white' : 'text-gray-600'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
