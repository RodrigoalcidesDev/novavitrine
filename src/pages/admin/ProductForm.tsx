import { Save } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { categories } from '@/data/categories'
import { useProducts } from '@/context/ProductsContext'
import { useToast } from '@/context/ToastContext'
import type { CategoryId, ProductTag } from '@/types'

const allTags: { id: ProductTag; label: string }[] = [
  { id: 'mais-vendido', label: 'Mais vendido' },
  { id: 'novidade', label: 'Novidade' },
  { id: 'promocao', label: 'Promoção' },
]

export function ProductForm() {
  const { id } = useParams()
  const isEditing = !!id
  const { products, createProduct, updateProduct } = useProducts()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const existing = isEditing ? products.find((p) => p.id === id) : undefined

  const [name, setName] = useState(existing?.name ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [category, setCategory] = useState<CategoryId>(existing?.category ?? categories[0].id)
  const [price, setPrice] = useState(String(existing?.price ?? ''))
  const [promoPrice, setPromoPrice] = useState(existing?.promoPrice ? String(existing.promoPrice) : '')
  const [stock, setStock] = useState(String(existing?.stock ?? ''))
  const [image, setImage] = useState(existing?.images[0] ?? '')
  const [tags, setTags] = useState<ProductTag[]>(existing?.tags ?? [])

  if (isEditing && !existing) {
    return <Navigate to="/admin/produtos" replace />
  }

  function toggleTag(tag: ProductTag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !price) {
      showToast('Preencha ao menos nome e preço do produto.', 'error')
      return
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      category,
      price: Number(price),
      promoPrice: promoPrice ? Number(promoPrice) : undefined,
      stock: Number(stock) || 0,
      tags,
      images: image ? [image] : existing?.images,
      rating: existing?.rating ?? 4.5,
      reviewsCount: existing?.reviewsCount ?? 0,
    }

    if (isEditing && existing) {
      updateProduct(existing.id, payload)
      showToast('Produto atualizado com sucesso.', 'success')
    } else {
      createProduct(payload)
      showToast('Produto cadastrado com sucesso.', 'success')
    }
    navigate('/admin/produtos')
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">{isEditing ? 'Editar produto' : 'Novo produto'}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Nome do produto</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryId)}
              className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Estoque</label>
            <input
              required
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Preço (R$)</label>
            <input
              required
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Preço promocional (opcional)</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={promoPrice}
              onChange={(e) => setPromoPrice(e.target.value)}
              className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">URL da imagem (opcional)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-gray-600">Marcadores</label>
          <div className="flex gap-4">
            {allTags.map((tag) => (
              <label key={tag.id} className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={tags.includes(tag.id)} onChange={() => toggleTag(tag.id)} />
                {tag.label}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-2 flex gap-3">
          <Button type="submit">
            <Save className="h-4 w-4" /> Salvar produto
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/produtos')}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
