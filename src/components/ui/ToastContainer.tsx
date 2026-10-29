import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { useToast, type ToastType } from '@/context/ToastContext'

const icons: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

const styles: Record<ToastType, string> = {
  success: 'border-brand-200 bg-brand-50 text-brand-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-gray-200 bg-white text-gray-900',
}

export function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = icons[toast.type]
        return (
          <div
            key={toast.id}
            role="status"
            className={`animate-fade-in flex items-start gap-2 rounded-lg border px-4 py-3 shadow-lg ${styles[toast.type]}`}
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              aria-label="Fechar notificação"
              className="focus-ring rounded text-current/60 hover:text-current"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
