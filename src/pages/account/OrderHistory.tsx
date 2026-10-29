import { Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'
import { useAuth } from '@/context/AuthContext'
import { getOrdersByCustomerEmail } from '@/services/orderService'
import { orderStatusLabels, orderStatusStyles } from '@/utils/labels'
import { formatBRL, formatDate } from '@/utils/format'

export function OrderHistory() {
  const { user } = useAuth()
  const orders = user ? getOrdersByCustomerEmail(user.email) : []

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhum pedido ainda"
        description="Quando você finalizar uma compra, seus pedidos aparecerão aqui."
        action={
          <Link to="/produtos" className="focus-ring text-sm font-semibold text-brand-700 hover:underline">
            Ver produtos
          </Link>
        }
      />
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <div key={order.id} className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-gray-900">Pedido #{order.number}</p>
              <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${orderStatusStyles[order.status]}`}>
              {orderStatusLabels[order.status]}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 overflow-hidden">
            {order.items.slice(0, 5).map((item) => (
              <img key={item.productId} src={item.image} alt={item.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
            <span className="text-gray-500">{order.items.length} item(ns)</span>
            <span className="font-bold text-gray-900">{formatBRL(order.total)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
