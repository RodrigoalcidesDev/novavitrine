import { useState } from 'react'
import { getAllCustomers } from '@/services/customerService'
import { formatBRL, formatDate } from '@/utils/format'

export function CustomersList() {
  const [customers] = useState(() => getAllCustomers())

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <p className="text-sm text-gray-500">{customers.length} cliente(s) cadastrado(s)</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs uppercase text-gray-500">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Contato</th>
              <th className="px-4 py-3">Cliente desde</th>
              <th className="px-4 py-3 text-right">Pedidos</th>
              <th className="px-4 py-3 text-right">Total gasto</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">{customer.name}</td>
                <td className="px-4 py-3 text-gray-600">
                  <div>{customer.email}</div>
                  <div className="text-xs text-gray-400">{customer.phone}</div>
                </td>
                <td className="px-4 py-3 text-gray-500">{formatDate(customer.createdAt)}</td>
                <td className="px-4 py-3 text-right text-gray-700">{customer.ordersCount}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">{formatBRL(customer.totalSpent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
