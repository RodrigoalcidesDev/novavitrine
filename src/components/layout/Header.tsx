import { Heart, Menu, Search, ShoppingCart, Store, User, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { CategoryNav } from '@/components/layout/CategoryNav'

export function Header() {
  const { settings } = useStoreConfig()
  const { itemCount } = useCart()
  const { favoriteIds } = useFavorites()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    navigate(`/produtos?${params.toString()}`)
    setMobileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button
          className="focus-ring rounded p-1 text-gray-700 md:hidden"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="focus-ring flex shrink-0 items-center gap-2 rounded">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Store className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight text-brand-900">{settings.storeName}</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden flex-1 items-center md:flex">
          <div className="relative w-full">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
              className="focus-ring w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-sm outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-500 hover:text-brand-700"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            to="/favoritos"
            className="focus-ring relative hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 sm:block"
            aria-label="Favoritos"
          >
            <Heart className="h-5 w-5" />
            {favoriteIds.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[10px] font-bold text-white">
                {favoriteIds.length}
              </span>
            )}
          </Link>

          <Link
            to={user ? '/conta' : '/login'}
            className="focus-ring flex items-center gap-1.5 rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            <span className="hidden text-sm font-medium lg:inline">{user ? user.name.split(' ')[0] : 'Entrar'}</span>
          </Link>

          <Link to="/carrinho" className="focus-ring relative rounded-lg p-2 text-gray-700 hover:bg-gray-100" aria-label="Carrinho">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <form onSubmit={handleSearch} className="border-t border-gray-100 px-4 py-2 md:hidden">
        <div className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produtos..."
            aria-label="Buscar produtos"
            className="focus-ring w-full rounded-full border border-gray-300 bg-gray-50 px-4 py-2 pr-10 text-sm outline-none focus:border-brand-500"
          />
          <button type="submit" aria-label="Buscar" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-500">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </form>

      <CategoryNav mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
    </header>
  )
}
