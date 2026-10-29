import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useLocalStorageState } from '@/hooks/useLocalStorage'
import { getProductById } from '@/services/productService'
import type { CartItem, Product } from '@/types'

export interface CartLine {
  product: Product
  quantity: number
  lineTotal: number
}

export interface AddToCartResult {
  success: boolean
  message?: string
}

interface CartContextValue {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  addToCart: (productId: string, quantity?: number) => AddToCartResult
  updateQuantity: (productId: string, quantity: number) => AddToCartResult
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorageState<CartItem[]>('cart', [])

  const lines = useMemo<CartLine[]>(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId)
        if (!product) return null
        const price = product.promoPrice ?? product.price
        return { product, quantity: item.quantity, lineTotal: price * item.quantity }
      })
      .filter((line): line is CartLine => line !== null)
  }, [items])

  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0)
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0)

  function addToCart(productId: string, quantity = 1): AddToCartResult {
    const product = getProductById(productId)
    if (!product) return { success: false, message: 'Produto não encontrado.' }
    if (product.stock <= 0) return { success: false, message: 'Produto sem estoque disponível no momento.' }

    const existing = items.find((i) => i.productId === productId)
    const desired = (existing?.quantity ?? 0) + quantity

    if (desired > product.stock) {
      const clamped = product.stock
      setItems((prev) => {
        if (existing) {
          return prev.map((i) => (i.productId === productId ? { ...i, quantity: clamped } : i))
        }
        return [...prev, { productId, quantity: clamped }]
      })
      return { success: false, message: `Apenas ${product.stock} unidade(s) em estoque. Quantidade ajustada no carrinho.` }
    }

    setItems((prev) => {
      if (existing) {
        return prev.map((i) => (i.productId === productId ? { ...i, quantity: desired } : i))
      }
      return [...prev, { productId, quantity }]
    })
    return { success: true, message: 'Produto adicionado ao carrinho.' }
  }

  function updateQuantity(productId: string, quantity: number): AddToCartResult {
    const product = getProductById(productId)
    if (!product) return { success: false, message: 'Produto não encontrado.' }

    if (quantity <= 0) {
      removeFromCart(productId)
      return { success: true }
    }

    if (quantity > product.stock) {
      setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity: product.stock } : i)))
      return { success: false, message: `Apenas ${product.stock} unidade(s) em estoque.` }
    }

    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)))
    return { success: true }
  }

  function removeFromCart(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }

  function clearCart() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ lines, itemCount, subtotal, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
