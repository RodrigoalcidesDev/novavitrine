import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <Icon className="h-10 w-10 text-gray-400" aria-hidden />
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="max-w-sm text-sm text-gray-500">{description}</p>}
      {action}
    </div>
  )
}
