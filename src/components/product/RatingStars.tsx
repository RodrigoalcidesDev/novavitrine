import { Star } from 'lucide-react'

export function RatingStars({ rating, reviewsCount, size = 14 }: { rating: number; reviewsCount?: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Avaliação ${rating} de 5`}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            width={size}
            height={size}
            className={i < Math.round(rating) ? 'fill-accent-500 text-accent-500' : 'fill-gray-200 text-gray-200'}
          />
        ))}
      </div>
      {reviewsCount !== undefined && <span className="text-xs text-gray-500">({reviewsCount})</span>}
    </div>
  )
}
