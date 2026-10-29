import { SlidersHorizontal, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { getCategoryById } from '@/data/categories'
import { useProducts } from '@/context/ProductsContext'
import type { SortOption } from '@/types'

const PAGE_SIZE = 12

export function Catalog() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showFilters, setShowFilters] = useState(false)

  const query = searchParams.get('q') ?? ''
  const categoria = searchParams.get('categoria') ?? ''
  const promocao = searchParams.get('promocao') === '1'
  const sort = (searchParams.get('sort') as SortOption) || 'relevancia'
  const minPrice = searchParams.get('min') ?? ''
  const maxPrice = searchParams.get('max') ?? ''

  const [minInput, setMinInput] = useState(minPrice)
  const [maxInput, setMaxInput] = useState(maxPrice)

  useEffect(() => {
    setMinInput(minPrice)
    setMaxInput(maxPrice)
  }, [minPrice, maxPrice])

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const effectivePrice = p.promoPrice ?? p.price
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      if (categoria && p.category !== categoria) return false
      if (promocao && !p.promoPrice) return false
      if (minPrice && effectivePrice < Number(minPrice)) return false
      if (maxPrice && effectivePrice > Number(maxPrice)) return false
      return true
    })

    list = [...list]
    if (sort === 'menor-preco') {
      list.sort((a, b) => (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price))
    } else if (sort === 'maior-preco') {
      list.sort((a, b) => (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price))
    } else {
      list.sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount)
    }
    return list
  }, [products, query, categoria, promocao, minPrice, maxPrice, sort])

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [query, categoria, promocao, minPrice, maxPrice, sort])

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(searchParams)
    if (!value) next.delete(key)
    else next.set(key, value)
    setSearchParams(next)
  }

  function applyPriceRange() {
    const next = new URLSearchParams(searchParams)
    if (minInput) next.set('min', minInput)
    else next.delete('min')
    if (maxInput) next.set('max', maxInput)
    else next.delete('max')
    setSearchParams(next)
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams())
    setMinInput('')
    setMaxInput('')
  }

  const categoryName = categoria ? getCategoryById(categoria)?.name : null
  const hasActiveFilters = !!(query || categoria || promocao || minPrice || maxPrice)
  const visibleProducts = filtered.slice(0, visibleCount)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {query ? `Resultados para "${query}"` : categoryName ?? (promocao ? 'Ofertas' : 'Todos os produtos')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{filtered.length} produto(s) encontrado(s)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="focus-ring flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>
          <label className="hidden items-center gap-2 text-sm text-gray-600 sm:flex">
            Ordenar por
            <select
              value={sort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="focus-ring rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Filtrar por preço</h2>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="focus-ring flex items-center gap-1 text-xs font-medium text-brand-700 hover:underline">
                  <X className="h-3 w-3" /> Limpar
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                placeholder="De"
                value={minInput}
                onChange={(e) => setMinInput(e.target.value)}
                className="focus-ring w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                aria-label="Preço mínimo"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                min={0}
                placeholder="Até"
                value={maxInput}
                onChange={(e) => setMaxInput(e.target.value)}
                className="focus-ring w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                aria-label="Preço máximo"
              />
            </div>
            <Button size="sm" fullWidth className="mt-3" onClick={applyPriceRange}>
              Aplicar
            </Button>

            <div className="mt-5 border-t border-gray-100 pt-4 sm:hidden">
              <h2 className="mb-2 font-semibold text-gray-900">Ordenar por</h2>
              <select
                value={sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="focus-ring w-full rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
              >
                <option value="relevancia">Relevância</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
            </div>
          </div>
        </aside>

        <div>
          <ProductGrid products={visibleProducts} />
          {visibleCount < filtered.length && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                Carregar mais produtos
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
