import type { StoreSettings } from '@/types'

export const defaultStoreSettings: StoreSettings = {
  storeName: 'NovaVitrine',
  tagline: 'Sua loja, online e na vida real',
  email: 'contato@novavitrine.com.br',
  phone: '(11) 4002-8922',
  whatsapp: '(11) 98888-1234',
  address: 'Av. das Nações, 1200 — Centro, São Paulo - SP',
  cnpj: '00.000.000/0001-00 (demonstrativo)',
  instagram: '@novavitrine',
  units: [
    {
      id: 'unidade-centro',
      name: 'NovaVitrine Centro (Loja Matriz)',
      address: 'Av. das Nações, 1200 — Centro, São Paulo - SP',
      phone: '(11) 4002-8922',
      isMain: true,
      stockNote: 'Estoque completo — retirada em até 2h',
    },
    {
      id: 'unidade-norte',
      name: 'NovaVitrine Zona Norte (em expansão)',
      address: 'Rua das Palmeiras, 455 — Santana, São Paulo - SP',
      phone: '(11) 4002-7711',
      isMain: false,
      stockNote: 'Unidade demonstrativa — abertura prevista',
    },
  ],
}
