import { Heart, ShoppingCart } from 'lucide-react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { PriceTag } from '@/components/product/PriceTag'
import { RatingStars } from '@/components/product/RatingStars'
import { StockBadge } from '@/components/product/StockBadge'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import { discountPercent } from '@/utils/format'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const favorite = isFavorite(product.id)
  const discount = discountPercent(product.price, product.promoPrice)
  const outOfStock = product.stock <= 0

  function handleAddToCart(e: MouseEvent) {
    e.preventDefault()
    const result = addToCart(product.id, 1)
    showToast(result.message ?? 'Produto adicionado ao carrinho.', result.success ? 'success' : 'error')
  }

  function handleToggleFavorite(e: MouseEvent) {
    e.preventDefault()
    toggleFavorite(product.id)
    showToast(favorite ? 'Removido dos favoritos.' : 'Adicionado aos favoritos.', 'info')
  }

  return (
    <Link
      to={`/produto/${product.slug}`}
      className="group focus-ring relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${outOfStock ? 'opacity-50' : ''}`}
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.tags.includes('mais-vendido') && <Badge tone="brand">Mais vendido</Badge>}
          {product.tags.includes('novidade') && <Badge tone="neutral">Novidade</Badge>}
          {discount && <Badge tone="accent">-{discount}%</Badge>}
        </div>
        <button
          onClick={handleToggleFavorite}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorite}
          className="focus-ring absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </button>
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-900">Esgotado</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <PriceTag price={product.price} promoPrice={product.promoPrice} />
        </div>
        <StockBadge stock={product.stock} />
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="focus-ring mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ShoppingCart className="h-4 w-4" />
          {outOfStock ? 'Indisponível' : 'Adicionar'}
        </button>
      </div>
    </Link>
  )
}
