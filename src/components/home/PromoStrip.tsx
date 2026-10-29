import { Link } from 'react-router-dom'
import { Tag } from 'lucide-react'

export function PromoStrip() {
  return (
    <section className="bg-accent-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-white sm:flex-row">
        <p className="flex items-center gap-2 text-sm font-semibold sm:text-base">
          <Tag className="h-5 w-5" /> Semana de ofertas: até 30% de desconto em produtos selecionados
        </p>
        <Link
          to="/produtos?promocao=1"
          className="focus-ring rounded-lg bg-white px-4 py-2 text-sm font-bold text-accent-700 hover:bg-accent-50"
        >
          Aproveitar agora
        </Link>
      </div>
    </section>
  )
}
