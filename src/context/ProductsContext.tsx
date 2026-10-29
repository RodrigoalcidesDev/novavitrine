import { createContext, useContext, useState, type ReactNode } from 'react'
import * as productService from '@/services/productService'
import type { Product } from '@/types'

interface ProductsContextValue {
  products: Product[]
  createProduct: (input: productService.ProductInput) => void
  updateProduct: (id: string, patch: Partial<Omit<Product, 'id'>>) => void
  removeProduct: (id: string) => void
  refresh: () => void
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => productService.getAllProducts())

  function refresh() {
    setProducts(productService.getAllProducts())
  }

  function createProduct(input: productService.ProductInput) {
    productService.createProduct(input)
    refresh()
  }

  function updateProduct(id: string, patch: Partial<Omit<Product, 'id'>>) {
    productService.updateProduct(id, patch)
    refresh()
  }

  function removeProduct(id: string) {
    productService.removeProduct(id)
    refresh()
  }

  return (
    <ProductsContext.Provider value={{ products, createProduct, updateProduct, removeProduct, refresh }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts deve ser usado dentro de ProductsProvider')
  return ctx
}
