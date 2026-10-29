import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { useToast } from '@/context/ToastContext'
import { getOrderById, updateOrderStatus } from '@/services/orderService'
import { orderStatusFlow, orderStatusLabels, orderStatusStyles } from '@/utils/labels'
import { formatBRL, formatDateTime } from '@/utils/format'
import type { Order } from '@/types'

export function OrderDetail() {
  const { id } = useParams()
  const { settings } = useStoreConfig()
  const { showToast } = useToast()
  const [order, setOrder] = useState<Order | undefined>(() => (id ? getOrderById(id) : undefined))

  if (!order) {
    return <Navigate to="/admin/pedidos" replace />
  }

  const unit = settings.units.find((u) => u.id === order.unitId)

  function handleStatusChange(status: Order['status']) {
    if (!id) return
    const updated = updateOrderStatus(id, status)
    if (updated) {
      setOrder(updated)
      showToast(`Status atualizado para "${orderStatusLabels[status]}".`, 'success')
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/admin/pedidos" className="focus-ring mb-4 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand-700">
        <ArrowLeft className="h-4 w-4" /> Voltar aos pedidos
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pedido #{order.number}</h1>
          <p className="text-sm text-gray-500">{formatDateTime(order.createdAt)}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${orderStatusStyles[order.status]}`}>
          {orderStatusLabels[order.status]}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 font-semibold text-gray-900">Cliente</h2>
          <p className="text-sm text-gray-700">{order.customerName}</p>
          <p className="text-sm text-gray-500">{order.customerEmail}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 font-semibold text-gray-900">Entrega</h2>
          {order.deliveryMethod === 'retirada' ? (
            <p className="text-sm text-gray-700">Retirada em {unit?.name} — {unit?.address}</p>
          ) : (
            <p className="text-sm text-gray-700">
              {order.address?.street}, {order.address?.number} {order.address?.complement} — {order.address?.neighborhood}, {order.address?.city}/{order.address?.state}
            </p>
          )}
          <p className="mt-1 text-xs capitalize text-gray-500">Pagamento: {order.paymentMethod}</p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-semibold text-gray-900">Itens do pedido</h2>
        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">Qtd: {item.quantity} × {formatBRL(item.price)}</p>
              </div>
              <span className="text-sm font-semibold text-gray-900">{formatBRL(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-1.5 border-t border-gray-100 pt-4 text-sm text-gray-600">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatBRL(order.subtotal)}</span></div>
          <div className="flex justify-between"><span>Frete</span><span>{order.shippingCost === 0 ? 'Grátis' : formatBRL(order.shippingCost)}</span></div>
          <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900"><span>Total</span><span>{formatBRL(order.total)}</span></div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-semibold text-gray-900">Atualizar status (demonstrativo)</h2>
        <div className="flex flex-wrap gap-2">
          {orderStatusFlow.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`focus-ring rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                order.status === status ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {orderStatusLabels[status]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
