import type { ReactNode } from 'react'

type Tone = 'brand' | 'accent' | 'neutral' | 'danger'

const toneClasses: Record<Tone, string> = {
  brand: 'bg-brand-100 text-brand-800',
  accent: 'bg-accent-100 text-accent-800',
  neutral: 'bg-gray-100 text-gray-700',
  danger: 'bg-red-100 text-red-700',
}

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{children}</span>
}
