import { AtSign, Globe, Mail, MapPin, Phone, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import { useStoreConfig } from '@/context/StoreConfigContext'

export function Footer() {
  const { settings } = useStoreConfig()

  return (
    <footer className="mt-auto border-t border-gray-200 bg-brand-950 text-gray-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
              <Store className="h-4 w-4" />
            </span>
            <span className="text-lg font-bold">{settings.storeName}</span>
          </div>
          <p className="mt-3 text-sm text-gray-400">{settings.tagline}. Protótipo demonstrativo de e-commerce.</p>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="Instagram" className="focus-ring rounded-full bg-white/10 p-2 hover:bg-white/20">
              <AtSign className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Site" className="focus-ring rounded-full bg-white/10 p-2 hover:bg-white/20">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Categorias</h4>
          <ul className="flex flex-col gap-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/produtos?categoria=${cat.id}`} className="focus-ring rounded hover:text-white">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Atendimento</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link to="/produtos" className="focus-ring rounded hover:text-white">Como comprar</Link></li>
            <li><Link to="/conta/pedidos" className="focus-ring rounded hover:text-white">Meus pedidos</Link></li>
            <li><Link to="/login" className="focus-ring rounded hover:text-white">Trocas e devoluções (demonstrativo)</Link></li>
            <li><Link to="/produtos" className="focus-ring rounded hover:text-white">Perguntas frequentes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">Fale com a gente</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {settings.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" /> {settings.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" /> {settings.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-gray-500">
        <p>
          {settings.storeName} · CNPJ {settings.cnpj} — Dados fictícios para fins de demonstração comercial.
        </p>
        <p className="mt-1">© {new Date().getFullYear()} {settings.storeName}. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
