// Camada de serviço com assinatura preparada para troca futura por chamadas HTTP a uma API real.
import { customers as seedCustomers } from '@/data/customers'
import { makeId, readStorage, writeStorage } from '@/services/storage'
import type { Customer } from '@/types'

const KEY = 'customers'

function ensureSeed(): Customer[] {
  const existing = readStorage<Customer[] | null>(KEY, null)
  if (existing) return existing
  writeStorage(KEY, seedCustomers)
  return seedCustomers
}

export function getAllCustomers(): Customer[] {
  return [...ensureSeed()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function findCustomerByEmail(email: string): Customer | undefined {
  return ensureSeed().find((c) => c.email.toLowerCase() === email.toLowerCase())
}

export function registerCustomer(data: { name: string; email: string; phone: string }): Customer {
  const list = ensureSeed()
  const customer: Customer = {
    id: makeId('c'),
    name: data.name,
    email: data.email,
    phone: data.phone,
    createdAt: new Date().toISOString(),
    ordersCount: 0,
    totalSpent: 0,
  }
  writeStorage(KEY, [customer, ...list])
  return customer
}
