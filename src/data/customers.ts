import type { Customer } from '@/types'

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400000).toISOString()
}

export const customers: Customer[] = [
  { id: 'c01', name: 'Ana Beatriz Souza', email: 'ana.souza@exemplo.com', phone: '(11) 98765-4321', createdAt: daysAgo(210), ordersCount: 5, totalSpent: 1249.5 },
  { id: 'c02', name: 'Carlos Eduardo Lima', email: 'carlos.lima@exemplo.com', phone: '(11) 97654-3210', createdAt: daysAgo(180), ordersCount: 3, totalSpent: 689.7 },
  { id: 'c03', name: 'Fernanda Oliveira', email: 'fernanda.oliveira@exemplo.com', phone: '(21) 96543-2109', createdAt: daysAgo(150), ordersCount: 8, totalSpent: 2310.2 },
  { id: 'c04', name: 'Gustavo Pereira', email: 'gustavo.pereira@exemplo.com', phone: '(31) 95432-1098', createdAt: daysAgo(120), ordersCount: 1, totalSpent: 149.9 },
  { id: 'c05', name: 'Juliana Costa', email: 'juliana.costa@exemplo.com', phone: '(41) 94321-0987', createdAt: daysAgo(95), ordersCount: 4, totalSpent: 920.4 },
  { id: 'c06', name: 'Marcos Vinícius Alves', email: 'marcos.alves@exemplo.com', phone: '(51) 93210-9876', createdAt: daysAgo(60), ordersCount: 2, totalSpent: 419.8 },
  { id: 'c07', name: 'Patrícia Fernandes', email: 'patricia.fernandes@exemplo.com', phone: '(61) 92109-8765', createdAt: daysAgo(30), ordersCount: 1, totalSpent: 289.9 },
  { id: 'c08', name: 'Rafael Santos', email: 'rafael.santos@exemplo.com', phone: '(71) 91098-7654', createdAt: daysAgo(10), ordersCount: 1, totalSpent: 99.9 },
]
