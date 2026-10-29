import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { unsplashImg } from '@/data/products'

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
        <div className="animate-fade-in text-white">
          <span className="inline-flex items-center rounded-full bg-accent-500 px-3 py-1 text-xs font-bold uppercase tracking-wide">
            Novidade na NovaVitrine
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Tudo o que sua casa precisa, <span className="text-accent-400">em um só lugar</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-brand-100 sm:text-base">
            Eletrônicos, utilidades e muito mais com entrega rápida ou retirada gratuita na loja física.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/produtos"
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              Ver produtos <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/produtos?promocao=1"
              className="focus-ring inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver ofertas
            </Link>
          </div>
        </div>
        <div className="relative">
          <img
            src={unsplashImg('1517705008128-361805f42e86')}
            alt="Produtos em destaque na NovaVitrine"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
