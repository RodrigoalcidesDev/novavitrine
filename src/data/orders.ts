import { customers } from '@/data/customers'
import { getProductById } from '@/data/products'
import { defaultStoreSettings } from '@/data/store'
import type { Order, OrderItem, OrderStatus } from '@/types'

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400000).toISOString()
}

function buildItems(entries: [string, number][]): OrderItem[] {
  return entries.map(([productId, quantity]) => {
    const product = getProductById(productId)!
    const price = product.promoPrice ?? product.price
    return { productId, name: product.name, image: product.images[0], price, quantity }
  })
}

interface Seed {
  number: string
  customerIndex: number
  items: [string, number][]
  status: OrderStatus
  delivery: Order['deliveryMethod']
  payment: Order['paymentMethod']
  age: number
  shipping: number
}

const seeds: Seed[] = [
  { number: '1001', customerIndex: 0, items: [['p01', 1], ['p04', 1]], status: 'entregue', delivery: 'entrega', payment: 'pix', age: 40, shipping: 19.9 },
  { number: '1002', customerIndex: 1, items: [['p07', 1]], status: 'entregue', delivery: 'retirada', payment: 'cartao', age: 35, shipping: 0 },
  { number: '1003', customerIndex: 2, items: [['p13', 1], ['p15', 1]], status: 'enviado', delivery: 'entrega', payment: 'pix', age: 12, shipping: 14.9 },
  { number: '1004', customerIndex: 2, items: [['p25', 2], ['p23', 1]], status: 'entregue', delivery: 'retirada', payment: 'pix', age: 60, shipping: 0 },
  { number: '1005', customerIndex: 3, items: [['p18', 1]], status: 'confirmado', delivery: 'entrega', payment: 'cartao', age: 4, shipping: 24.9 },
  { number: '1006', customerIndex: 4, items: [['p27', 2], ['p30', 1]], status: 'entregue', delivery: 'entrega', payment: 'pix', age: 50, shipping: 17.9 },
  { number: '1007', customerIndex: 4, items: [['p09', 1]], status: 'pendente', delivery: 'retirada', payment: 'pix', age: 1, shipping: 0 },
  { number: '1008', customerIndex: 5, items: [['p14', 1], ['p17', 1]], status: 'enviado', delivery: 'entrega', payment: 'cartao', age: 6, shipping: 14.9 },
  { number: '1009', customerIndex: 6, items: [['p08', 1]], status: 'cancelado', delivery: 'entrega', payment: 'pix', age: 20, shipping: 19.9 },
  { number: '1010', customerIndex: 7, items: [['p05', 1]], status: 'pendente', delivery: 'retirada', payment: 'pix', age: 0, shipping: 0 },
]

export const orders: Order[] = seeds.map((s, index) => {
  const customer = customers[s.customerIndex]
  const items = buildItems(s.items)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return {
    id: `o${String(index + 1).padStart(2, '0')}`,
    number: s.number,
    customerId: customer.id,
    customerName: customer.name,
    customerEmail: customer.email,
    items,
    subtotal,
    shippingCost: s.shipping,
    total: subtotal + s.shipping,
    deliveryMethod: s.delivery,
    address:
      s.delivery === 'entrega'
        ? { street: 'Rua Exemplo', number: String(100 + index), neighborhood: 'Centro', city: 'São Paulo', state: 'SP', zip: '01000-000' }
        : undefined,
    paymentMethod: s.payment,
    status: s.status,
    unitId: defaultStoreSettings.units[0].id,
    createdAt: daysAgo(s.age),
  }
})
