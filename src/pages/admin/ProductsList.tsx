import { PackageSearch, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { getCategoryById } from '@/data/categories'
import { useProducts } from '@/context/ProductsContext'
import { useToast } from '@/context/ToastContext'
import { formatBRL } from '@/utils/format'

export function ProductsList() {
  const { products, removeProduct } = useProducts()
  const { showToast } = useToast()
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  )

  function handleDelete(id: string, name: string) {
    if (window.confirm(`Remover "${name}" da demonstração? Esta ação não pode ser desfeita.`)) {
      removeProduct(id)
      showToast('Produto removido.', 'info')
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produtos</h1>
          <p className="text-sm text-gray-500">{products.length} produto(s) cadastrado(s)</p>
        </div>
        <Link to="/admin/produtos/novo">
          <Button>
            <Plus className="h-4 w-4" /> Novo produto
          </Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produto..."
          className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 pl-9 text-sm"
        />
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        {filtered.length === 0 ? (
          <EmptyState icon={PackageSearch} title="Nenhum produto encontrado" />
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500">
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Estoque</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 last:border-0">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img src={product.images[0]} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                    <span className="line-clamp-1 font-medium text-gray-900">{product.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{getCategoryById(product.category)?.name}</td>
                  <td className="px-4 py-3 text-gray-900">{formatBRL(product.promoPrice ?? product.price)}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock === 0 ? 'font-semibold text-red-600' : product.stock <= 5 ? 'font-semibold text-accent-600' : 'text-gray-700'}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Link
                        to={`/admin/produtos/${product.id}/editar`}
                        className="focus-ring rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-700"
                        aria-label="Editar produto"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="focus-ring rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        aria-label="Remover produto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
