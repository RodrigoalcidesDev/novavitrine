import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import type { Product } from '@/types'

export function ProductSection({ title, products, viewAllHref }: { title: string; products: Product[]; viewAllHref: string }) {
  if (products.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{title}</h2>
        <Link to={viewAllHref} className="focus-ring flex items-center gap-1 rounded text-sm font-semibold text-brand-700 hover:text-brand-800">
          Ver tudo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  )
}
