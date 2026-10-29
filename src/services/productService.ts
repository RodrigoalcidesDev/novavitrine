// Camada de serviço com assinatura preparada para troca futura por chamadas HTTP a uma API real.
import { products as seedProducts } from '@/data/products'
import { makeId, readStorage, slugify, writeStorage } from '@/services/storage'
import type { Product } from '@/types'

const KEY = 'products'

function ensureSeed(): Product[] {
  const existing = readStorage<Product[] | null>(KEY, null)
  if (existing) return existing
  writeStorage(KEY, seedProducts)
  return seedProducts
}

export function getAllProducts(): Product[] {
  return ensureSeed()
}

export function getProductById(id: string): Product | undefined {
  return ensureSeed().find((p) => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return ensureSeed().find((p) => p.slug === slug)
}

export type ProductInput = Omit<Product, 'id' | 'slug' | 'createdAt' | 'images'> & {
  images?: string[]
}

export function createProduct(input: ProductInput): Product {
  const list = ensureSeed()
  const product: Product = {
    ...input,
    id: makeId('p'),
    slug: `${makeId('p')}-${slugify(input.name)}`,
    images: input.images?.length ? input.images : ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=640&h=640&fit=crop&auto=format'],
    createdAt: new Date().toISOString(),
  }
  const next = [product, ...list]
  writeStorage(KEY, next)
  return product
}

export function updateProduct(id: string, patch: Partial<Omit<Product, 'id'>>): Product | undefined {
  const list = ensureSeed()
  let updated: Product | undefined
  const next = list.map((p) => {
    if (p.id !== id) return p
    updated = { ...p, ...patch }
    return updated
  })
  writeStorage(KEY, next)
  return updated
}

export function removeProduct(id: string): void {
  const list = ensureSeed()
  writeStorage(KEY, list.filter((p) => p.id !== id))
}
