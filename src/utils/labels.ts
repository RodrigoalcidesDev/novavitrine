import type { OrderStatus } from '@/types'

export const orderStatusLabels: Record<OrderStatus, string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  enviado: 'Enviado',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
}

export const orderStatusStyles: Record<OrderStatus, string> = {
  pendente: 'bg-amber-100 text-amber-800',
  confirmado: 'bg-blue-100 text-blue-800',
  enviado: 'bg-purple-100 text-purple-800',
  entregue: 'bg-brand-100 text-brand-800',
  cancelado: 'bg-red-100 text-red-800',
}

export const orderStatusFlow: OrderStatus[] = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado']
