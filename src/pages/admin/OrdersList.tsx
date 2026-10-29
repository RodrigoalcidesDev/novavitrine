import { Eye } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllOrders } from '@/services/orderService'
import { orderStatusLabels, orderStatusStyles } from '@/utils/labels'
import { formatBRL, formatDateTime } from '@/utils/format'
import type { OrderStatus } from '@/types'

export function OrdersList() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'todos'>('todos')
  const orders = useMemo(() => getAllOrders(), [])
  const filtered = statusFilter === 'todos' ? orders : orders.filter((o) => o.status === statusFilter)

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <p className="text-sm text-gray-500">{orders.length} pedido(s) registrado(s)</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['todos', 'pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`focus-ring rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
              statusFilter === status ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'todos' ? 'Todos' : orderStatusLabels[status]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-500">
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Entrega</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">#{order.number}</td>
                <td className="px-4 py-3 text-gray-700">{order.customerName}</td>
                <td className="px-4 py-3 text-gray-500">{formatDateTime(order.createdAt)}</td>
                <td className="px-4 py-3 capitalize text-gray-600">{order.deliveryMethod}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${orderStatusStyles[order.status]}`}>
                    {orderStatusLabels[order.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatBRL(order.total)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/admin/pedidos/${order.id}`}
                    className="focus-ring inline-flex rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-brand-700"
                    aria-label="Ver detalhes"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
