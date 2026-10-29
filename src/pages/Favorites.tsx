import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useFavorites } from '@/context/FavoritesContext'
import { useProducts } from '@/context/ProductsContext'

export function Favorites() {
  const { favoriteIds } = useFavorites()
  const { products } = useProducts()
  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Meus favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Você ainda não tem favoritos"
          description="Toque no coração dos produtos que você gostar para encontrá-los aqui depois."
          action={
            <Link to="/produtos">
              <Button>Explorar produtos</Button>
            </Link>
          }
        />
      ) : (
        <ProductGrid products={favoriteProducts} />
      )}
    </div>
  )
}
