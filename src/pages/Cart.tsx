import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatBRL } from '@/utils/format'

export function Cart() {
  const { lines, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleQuantityChange(productId: string, quantity: number) {
    const result = updateQuantity(productId, quantity)
    if (!result.success && result.message) showToast(result.message, 'error')
  }

  function handleRemove(productId: string, name: string) {
    removeFromCart(productId)
    showToast(`${name} removido do carrinho.`, 'info')
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={ShoppingCart}
          title="Seu carrinho está vazio"
          description="Adicione produtos ao carrinho para continuar sua compra."
          action={
            <Link to="/produtos">
              <Button>Ver produtos</Button>
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Seu carrinho</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4">
          {lines.map(({ product, quantity, lineTotal }) => (
            <div key={product.id} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
              <Link to={`/produto/${product.slug}`} className="focus-ring h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/produto/${product.slug}`} className="focus-ring text-sm font-semibold text-gray-900 hover:text-brand-700">
                    {product.name}
                  </Link>
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    aria-label="Remover produto"
                    className="focus-ring shrink-0 rounded p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-gray-300">
                    <button
                      onClick={() => handleQuantityChange(product.id, quantity - 1)}
                      aria-label="Diminuir quantidade"
                      className="focus-ring p-1.5 text-gray-600"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, quantity + 1)}
                      disabled={quantity >= product.stock}
                      aria-label="Aumentar quantidade"
                      className="focus-ring p-1.5 text-gray-600 disabled:text-gray-300"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{formatBRL(lineTotal)}</span>
                </div>
              </div>
            </div>
          ))}

          <button onClick={clearCart} className="focus-ring self-start text-sm font-medium text-gray-500 hover:text-red-600">
            Limpar carrinho
          </button>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-gray-900">Resumo do pedido</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Frete calculado no checkout</p>
          <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatBRL(subtotal)}</span>
          </div>
          <Button fullWidth size="lg" className="mt-5" onClick={() => navigate('/checkout')}>
            Finalizar compra
          </Button>
          <Link to="/produtos" className="focus-ring mt-3 block text-center text-sm font-medium text-brand-700 hover:underline">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  )
}
