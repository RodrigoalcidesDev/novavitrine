// Camada de serviço com assinatura preparada para troca futura por chamadas HTTP a uma API real.
import { orders as seedOrders } from '@/data/orders'
import { makeId, readStorage, writeStorage } from '@/services/storage'
import type { Order, OrderStatus } from '@/types'

const KEY = 'orders'

function ensureSeed(): Order[] {
  const existing = readStorage<Order[] | null>(KEY, null)
  if (existing) return existing
  writeStorage(KEY, seedOrders)
  return seedOrders
}

export function getAllOrders(): Order[] {
  return [...ensureSeed()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function getOrderById(id: string): Order | undefined {
  return ensureSeed().find((o) => o.id === id)
}

export function getOrdersByCustomerEmail(email: string): Order[] {
  return getAllOrders().filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase())
}

export type OrderInput = Omit<Order, 'id' | 'number' | 'createdAt' | 'status'>

export function createOrder(input: OrderInput): Order {
  const list = ensureSeed()
  const nextNumber = String(1000 + list.length + 1)
  const order: Order = {
    ...input,
    id: makeId('o'),
    number: nextNumber,
    status: 'confirmado',
    createdAt: new Date().toISOString(),
  }
  writeStorage(KEY, [order, ...list])
  return order
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
  const list = ensureSeed()
  let updated: Order | undefined
  const next = list.map((o) => {
    if (o.id !== id) return o
    updated = { ...o, status }
    return updated
  })
  writeStorage(KEY, next)
  return updated
}
