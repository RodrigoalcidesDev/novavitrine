import { AlertTriangle, DollarSign, Package, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MiniBarChart } from '@/components/admin/MiniBarChart'
import { StatCard } from '@/components/admin/StatCard'
import { useProducts } from '@/context/ProductsContext'
import { getAllOrders } from '@/services/orderService'
import { orderStatusLabels, orderStatusStyles } from '@/utils/labels'
import { formatBRL, formatDate } from '@/utils/format'

export function Dashboard() {
  const { products } = useProducts()
  const orders = getAllOrders()

  const validOrders = orders.filter((o) => o.status !== 'cancelado')
  const revenue = validOrders.reduce((sum, o) => sum + o.total, 0)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5)

  const salesByDay = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(Date.now() - (6 - i) * 86400000)
    const label = date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3)
    const total = validOrders
      .filter((o) => new Date(o.createdAt).toDateString() === date.toDateString())
      .reduce((sum, o) => sum + o.total, 0)
    return { label, value: Math.round(total) }
  })

  const soldByProduct = new Map<string, { name: string; quantity: number }>()
  for (const order of validOrders) {
    for (const item of order.items) {
      const entry = soldByProduct.get(item.productId) ?? { name: item.name, quantity: 0 }
      entry.quantity += item.quantity
      soldByProduct.set(item.productId, entry)
    }
  }
  const topProducts = [...soldByProduct.values()].sort((a, b) => b.quantity - a.quantity).slice(0, 5)
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Visão geral demonstrativa da loja</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={DollarSign} label="Faturamento (demonstrativo)" value={formatBRL(revenue)} tone="brand" />
        <StatCard icon={ShoppingBag} label="Pedidos" value={String(orders.length)} tone="accent" />
        <StatCard icon={Package} label="Produtos cadastrados" value={String(products.length)} tone="neutral" />
        <StatCard icon={AlertTriangle} label="Estoque baixo" value={String(lowStock.length)} tone="danger" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-gray-900">Vendas nos últimos 7 dias</h2>
          <MiniBarChart data={salesByDay} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-gray-900">Produtos mais vendidos</h2>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500">Ainda não há vendas registradas.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {topProducts.map((p, i) => (
                <li key={p.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">{i + 1}</span>
                    {p.name}
                  </span>
                  <span className="font-semibold text-gray-900">{p.quantity} un.</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Últimos pedidos</h2>
          <Link to="/admin/pedidos" className="focus-ring text-sm font-medium text-brand-700 hover:underline">Ver todos</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500">
                <th className="py-2">Pedido</th>
                <th className="py-2">Cliente</th>
                <th className="py-2">Data</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5">
                    <Link to={`/admin/pedidos/${order.id}`} className="font-medium text-brand-700 hover:underline">
                      #{order.number}
                    </Link>
                  </td>
                  <td className="py-2.5 text-gray-700">{order.customerName}</td>
                  <td className="py-2.5 text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="py-2.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${orderStatusStyles[order.status]}`}>
                      {orderStatusLabels[order.status]}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-semibold text-gray-900">{formatBRL(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
