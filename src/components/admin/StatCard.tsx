import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  tone?: 'brand' | 'accent' | 'neutral' | 'danger'
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  brand: 'bg-brand-50 text-brand-700',
  accent: 'bg-accent-50 text-accent-700',
  neutral: 'bg-gray-100 text-gray-700',
  danger: 'bg-red-50 text-red-700',
}

export function StatCard({ icon: Icon, label, value, tone = 'brand' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${toneClasses[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}
