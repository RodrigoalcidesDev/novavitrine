import { Heart, Minus, PackageX, Plus, ShoppingCart, Store, Truck } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { PriceTag } from '@/components/product/PriceTag'
import { RatingStars } from '@/components/product/RatingStars'
import { StockBadge } from '@/components/product/StockBadge'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { getCategoryById } from '@/data/categories'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useProducts } from '@/context/ProductsContext'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { useToast } from '@/context/ToastContext'
import { discountPercent } from '@/utils/format'

export function ProductDetail() {
  const { slug } = useParams()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const { settings } = useStoreConfig()
  const navigate = useNavigate()

  const foundProduct = products.find((p) => p.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!foundProduct) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <EmptyState
          icon={PackageX}
          title="Produto não encontrado"
          description="O produto que você procura não existe ou foi removido."
          action={
            <Link to="/produtos">
              <Button>Ver todos os produtos</Button>
            </Link>
          }
        />
      </div>
    )
  }

  const product = foundProduct
  const category = getCategoryById(product.category)
  const discount = discountPercent(product.price, product.promoPrice)
  const outOfStock = product.stock <= 0
  const favorite = isFavorite(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  const mainUnit = settings.units.find((u) => u.isMain) ?? settings.units[0]

  function handleAddToCart() {
    const result = addToCart(product.id, quantity)
    showToast(result.message ?? 'Produto adicionado ao carrinho.', result.success ? 'success' : 'error')
  }

  function handleBuyNow() {
    const result = addToCart(product.id, quantity)
    if (result.success) navigate('/checkout')
    else showToast(result.message ?? 'Não foi possível continuar.', 'error')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-5 text-sm text-gray-500">
        <Link to="/" className="hover:text-brand-700">Início</Link> {' / '}
        <Link to={`/produtos?categoria=${product.category}`} className="hover:text-brand-700">{category?.name}</Link> {' / '}
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
            {discount && (
              <span className="absolute left-3 top-3">
                <Badge tone="accent">-{discount}%</Badge>
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`focus-ring h-16 w-16 overflow-hidden rounded-lg border-2 ${i === activeImage ? 'border-brand-600' : 'border-gray-200'}`}
                  aria-label={`Ver imagem ${i + 1}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <Badge tone="neutral">{category?.name}</Badge>
          <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>
          <div className="mt-2">
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} size={16} />
          </div>

          <div className="mt-4">
            <PriceTag price={product.price} promoPrice={product.promoPrice} size="lg" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>

          <div className="mt-4">
            <StockBadge stock={product.stock} />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Diminuir quantidade"
                className="focus-ring p-2.5 text-gray-600 disabled:text-gray-300"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                aria-label="Aumentar quantidade"
                className="focus-ring p-2.5 text-gray-600 disabled:text-gray-300"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => toggleFavorite(product.id)}
              aria-pressed={favorite}
              className="focus-ring flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600"
            >
              <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
              {favorite ? 'Favoritado' : 'Favoritar'}
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" size="lg" fullWidth disabled={outOfStock} onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" /> Adicionar ao carrinho
            </Button>
            <Button size="lg" fullWidth disabled={outOfStock} onClick={handleBuyNow}>
              {outOfStock ? 'Indisponível' : 'Comprar agora'}
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand-700" /> Entrega estimada em 3 a 7 dias úteis para todo o Brasil.
            </div>
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-brand-700" /> Retire grátis em {mainUnit?.name} — {mainUnit?.address}.
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold text-gray-900">Produtos relacionados</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
