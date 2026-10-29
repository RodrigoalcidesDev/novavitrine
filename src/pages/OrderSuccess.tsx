import { CheckCircle2, MapPin, Store, Truck } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { getOrderById } from '@/services/orderService'
import { orderStatusLabels } from '@/utils/labels'
import { formatBRL, formatDateTime } from '@/utils/format'

export function OrderSuccess() {
  const { orderId } = useParams()
  const { settings } = useStoreConfig()
  const order = orderId ? getOrderById(orderId) : undefined

  if (!order) {
    return <Navigate to="/" replace />
  }

  const unit = settings.units.find((u) => u.id === order.unitId)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Pedido realizado com sucesso!</h1>
        <p className="mt-2 text-sm text-gray-500">
          Pedido demonstrativo <strong>#{order.number}</strong> — {formatDateTime(order.createdAt)}
        </p>
        <p className="mt-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          Simulação: nenhuma cobrança real foi realizada
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Resumo do pedido</h2>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800">{orderStatusLabels[order.status]}</span>
        </div>
        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="line-clamp-1 text-sm font-medium text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">Qtd: {item.quantity}</p>
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

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
          {order.deliveryMethod === 'retirada' ? (
            <>
              <Store className="h-4 w-4 shrink-0 text-brand-700" /> Retirada em {unit?.name} — {unit?.address}
            </>
          ) : (
            <>
              <Truck className="h-4 w-4 shrink-0 text-brand-700" /> Entrega em {order.address?.street}, {order.address?.number} — {order.address?.city}/{order.address?.state}
            </>
          )}
        </div>
        {order.deliveryMethod === 'retirada' && unit && (
          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5" /> Leve um documento com foto e o número do pedido na retirada.
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link to="/conta/pedidos" className="flex-1">
          <Button variant="outline" fullWidth>Ver meus pedidos</Button>
        </Link>
        <Link to="/produtos" className="flex-1">
          <Button fullWidth>Continuar comprando</Button>
        </Link>
      </div>
    </div>
  )
}
