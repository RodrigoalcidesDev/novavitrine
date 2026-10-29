import { Link, useLocation } from 'react-router-dom'
import { categories } from '@/data/categories'

interface CategoryNavProps {
  mobileOpen?: boolean
  onNavigate?: () => void
}

function linkClass(active: boolean) {
  return `focus-ring whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    active ? 'bg-brand-50 text-brand-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }`
}

export function CategoryNav({ mobileOpen, onNavigate }: CategoryNavProps) {
  const { pathname, search } = useLocation()
  const params = new URLSearchParams(search)
  const activeCategory = params.get('categoria')
  const isPromo = params.get('promocao') === '1'
  const isCatalogRoot = pathname === '/produtos' && !activeCategory && !isPromo

  return (
    <nav aria-label="Categorias" className={`border-t border-gray-100 bg-white ${mobileOpen ? 'block' : 'hidden'} md:block`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-2 md:flex-row md:items-center md:gap-2 md:overflow-x-auto">
        <Link to="/produtos" className={linkClass(isCatalogRoot)} onClick={onNavigate}>
          Todos os produtos
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/produtos?categoria=${cat.id}`}
            className={linkClass(activeCategory === cat.id)}
            onClick={onNavigate}
          >
            {cat.name}
          </Link>
        ))}
        <Link to="/produtos?promocao=1" className={linkClass(isPromo)} onClick={onNavigate}>
          Ofertas
        </Link>
      </div>
    </nav>
  )
}
