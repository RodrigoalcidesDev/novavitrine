import { BenefitsBar } from '@/components/home/BenefitsBar'
import { CategoryShowcase } from '@/components/home/CategoryShowcase'
import { HeroBanner } from '@/components/home/HeroBanner'
import { PickupCta } from '@/components/home/PickupCta'
import { ProductSection } from '@/components/home/ProductSection'
import { PromoStrip } from '@/components/home/PromoStrip'
import { useProducts } from '@/context/ProductsContext'

export function Home() {
  const { products } = useProducts()

  const featured = products.filter((p) => p.rating >= 4.5).slice(0, 8)
  const bestSellers = products.filter((p) => p.tags.includes('mais-vendido')).slice(0, 8)
  const newest = [...products]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 8)

  return (
    <div>
      <HeroBanner />
      <CategoryShowcase />
      <ProductSection title="Produtos em destaque" products={featured} viewAllHref="/produtos" />
      <PromoStrip />
      <ProductSection title="Mais vendidos" products={bestSellers} viewAllHref="/produtos" />
      <ProductSection title="Novidades" products={newest} viewAllHref="/produtos" />
      <BenefitsBar />
      <PickupCta />
    </div>
  )
}
