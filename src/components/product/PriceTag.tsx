import { formatBRL } from '@/utils/format'

export function PriceTag({ price, promoPrice, size = 'md' }: { price: number; promoPrice?: number; size?: 'sm' | 'md' | 'lg' }) {
  const hasPromo = !!promoPrice && promoPrice < price
  const mainSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-base' : 'text-lg'

  if (!hasPromo) {
    return <span className={`font-bold text-gray-900 ${mainSize}`}>{formatBRL(price)}</span>
  }

  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-400 line-through">{formatBRL(price)}</span>
      <span className={`font-bold text-brand-700 ${mainSize}`}>{formatBRL(promoPrice)}</span>
    </div>
  )
}
