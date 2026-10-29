export type CategoryId =
  | 'eletronicos'
  | 'casa-cozinha'
  | 'acessorios'
  | 'utilidades'
  | 'organizacao'
  | 'outros'

export interface Category {
  id: CategoryId
  name: string
  description: string
  image: string
}

export type ProductTag = 'mais-vendido' | 'novidade' | 'promocao'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: CategoryId
  price: number
  promoPrice?: number
  stock: number
  images: string[]
  tags: ProductTag[]
  rating: number
  reviewsCount: number
  createdAt: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip: string
}

export type DeliveryMethod = 'entrega' | 'retirada'
export type PaymentMethod = 'pix' | 'cartao'
export type OrderStatus = 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado'

export interface OrderItem {
  productId: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  number: string
  customerId?: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
  deliveryMethod: DeliveryMethod
  address?: Address
  paymentMethod: PaymentMethod
  status: OrderStatus
  unitId: string
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  ordersCount: number
  totalSpent: number
}

export interface StoreUnit {
  id: string
  name: string
  address: string
  phone: string
  isMain: boolean
  stockNote: string
}

export interface StoreSettings {
  storeName: string
  tagline: string
  email: string
  phone: string
  whatsapp: string
  address: string
  cnpj: string
  instagram: string
  units: StoreUnit[]
}

export interface AuthUser {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

export type SortOption = 'relevancia' | 'menor-preco' | 'maior-preco'
