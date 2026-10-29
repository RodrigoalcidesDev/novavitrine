import type { Product, ProductTag } from '@/types'

export function unsplashImg(id: string) {
  return `https://images.unsplash.com/photo-${id}?w=640&h=640&fit=crop&auto=format`
}

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400000).toISOString()
}

interface Seed {
  id: string
  name: string
  description: string
  category: Product['category']
  photos: [string, string]
  price: number
  promo?: number
  stock: number
  tags?: ProductTag[]
  rating: number
  reviews: number
  age: number
}

const seeds: Seed[] = [
  // Eletrônicos
  { id: 'p01', name: 'Fone de Ouvido Bluetooth TWS', description: 'Fone sem fio com cancelamento de ruído, estojo de recarga e até 24h de bateria.', category: 'eletronicos', photos: ['1572569511254-d8f925fe2cbb', '1587829741301-dc798b83add3'], price: 149.9, promo: 109.9, stock: 24, tags: ['mais-vendido', 'promocao'], rating: 4.7, reviews: 318, age: 40 },
  { id: 'p02', name: 'Caixa de Som Portátil Bluetooth', description: 'Som potente à prova de respingos, ideal para o dia a dia e viagens.', category: 'eletronicos', photos: ['1484704849700-f032a568e944', '1546435770-a3e426bf472b'], price: 189.9, stock: 15, tags: ['mais-vendido'], rating: 4.5, reviews: 212, age: 55 },
  { id: 'p03', name: 'Smartwatch Esportivo', description: 'Monitor de atividades, notificações do celular e bateria de longa duração.', category: 'eletronicos', photos: ['1588423771073-b8903fbb85b5', '1618005198919-d3d4b5a92ead'], price: 249.9, promo: 199.9, stock: 3, tags: ['promocao'], rating: 4.3, reviews: 97, age: 8 },
  { id: 'p04', name: 'Carregador Turbo 33W USB-C', description: 'Carregamento rápido e seguro para smartphones compatíveis.', category: 'eletronicos', photos: ['1511385348-a52b4a160dc2', '1434494878577-86c23bcb06b9'], price: 69.9, stock: 40, rating: 4.6, reviews: 150, age: 90 },
  { id: 'p05', name: 'Mouse Sem Fio Ergonômico', description: 'Design confortável, sensor de alta precisão e pilha de longa duração.', category: 'eletronicos', photos: ['1593642632823-8f785ba67e45', '1511385348-a52b4a160dc2'], price: 59.9, stock: 0, rating: 4.2, reviews: 64, age: 120 },
  { id: 'p06', name: 'Teclado Mecânico Compacto', description: 'Switches responsivos, iluminação RGB e layout ABNT2.', category: 'eletronicos', photos: ['1511707171634-5f897ff02aa9', '1434494878577-86c23bcb06b9'], price: 219.9, stock: 12, tags: ['novidade'], rating: 4.8, reviews: 41, age: 5 },

  // Casa e Cozinha
  { id: 'p07', name: 'Air Fryer 4L Digital', description: 'Frite com até 90% menos óleo. Painel digital com 8 funções pré-programadas.', category: 'casa-cozinha', photos: ['1584269600464-37b1b58a9fe7', '1556909114-f6e7ad7d3136'], price: 349.9, promo: 289.9, stock: 18, tags: ['mais-vendido', 'promocao'], rating: 4.9, reviews: 540, age: 30 },
  { id: 'p08', name: 'Jogo de Panelas Antiaderente 5 Peças', description: 'Revestimento antiaderente de alta durabilidade, cabo baquelite.', category: 'casa-cozinha', photos: ['1556909114-f6e7ad7d3136', '1495521821757-a1efb6729352'], price: 299.9, stock: 10, rating: 4.6, reviews: 188, age: 75 },
  { id: 'p09', name: 'Liquidificador Multifuncional 1200W', description: 'Copo de vidro resistente e 12 velocidades para o preparo ideal.', category: 'casa-cozinha', photos: ['1495195129352-aeb325a55b65', '1588854337115-1c67d9247e4d'], price: 199.9, stock: 22, rating: 4.4, reviews: 134, age: 60 },
  { id: 'p10', name: 'Cafeteira Elétrica 30 Xícaras', description: 'Prepara café rapidamente com sistema corta-pingos.', category: 'casa-cozinha', photos: ['1495474472287-4d71bcdd2085', '1556909114-f6e7ad7d3136'], price: 129.9, stock: 3, tags: ['promocao'], promo: 99.9, rating: 4.5, reviews: 220, age: 15 },
  { id: 'p11', name: 'Conjunto de Potes Herméticos 10 Peças', description: 'Mantém os alimentos frescos por mais tempo, livre de BPA.', category: 'casa-cozinha', photos: ['1495521821757-a1efb6729352', '1588854337115-1c67d9247e4d'], price: 89.9, stock: 35, tags: ['novidade'], rating: 4.3, reviews: 56, age: 6 },
  { id: 'p12', name: 'Jogo de Facas Inox 6 Peças', description: 'Lâminas de aço inoxidável com suporte em bambu incluso.', category: 'casa-cozinha', photos: ['1588854337115-1c67d9247e4d', '1495521821757-a1efb6729352'], price: 139.9, stock: 14, rating: 4.7, reviews: 98, age: 100 },

  // Acessórios
  { id: 'p13', name: 'Mochila Executiva para Notebook', description: 'Compartimento acolchoado para notebook até 15,6", resistente à água.', category: 'acessorios', photos: ['1553062407-98eeb64c6a62', '1556906781-9a412961c28c'], price: 169.9, stock: 27, tags: ['mais-vendido'], rating: 4.6, reviews: 276, age: 48 },
  { id: 'p14', name: 'Óculos de Sol Polarizado', description: 'Proteção UV400 com armação leve e resistente.', category: 'acessorios', photos: ['1511499767150-a48a237f0083', '1548036328-c9fa89d128fa'], price: 79.9, promo: 59.9, stock: 30, tags: ['promocao'], rating: 4.4, reviews: 112, age: 20 },
  { id: 'p15', name: 'Carteira em Couro Legítimo', description: 'Design slim com múltiplos compartimentos para cartões.', category: 'acessorios', photos: ['1627123424574-724758594e93', '1548036328-c9fa89d128fa'], price: 99.9, stock: 19, rating: 4.5, reviews: 87, age: 65 },
  { id: 'p16', name: 'Relógio Analógico Clássico', description: 'Pulseira em aço inoxidável e resistência à água.', category: 'acessorios', photos: ['1524592094714-0f0654e20314', '1556906781-9a412961c28c'], price: 229.9, stock: 8, tags: ['novidade'], rating: 4.7, reviews: 33, age: 4 },
  { id: 'p17', name: 'Cinto de Couro Reversível', description: 'Dois tons em uma peça só, fivela giratória prática.', category: 'acessorios', photos: ['1548036328-c9fa89d128fa', '1627123424574-724758594e93'], price: 69.9, stock: 24, rating: 4.3, reviews: 45, age: 85 },

  // Utilidades
  { id: 'p18', name: 'Furadeira Parafusadeira 12V', description: 'Bateria de longa duração, acompanha maleta e acessórios.', category: 'utilidades', photos: ['1572981779307-38b8cabb2407', '1558618666-fcd25c85cd64'], price: 249.9, stock: 11, tags: ['mais-vendido'], rating: 4.8, reviews: 164, age: 50 },
  { id: 'p19', name: 'Aspirador de Pó Portátil', description: 'Leve e potente, ideal para carros e ambientes pequenos.', category: 'utilidades', photos: ['1558618666-fcd25c85cd64', '1585515320310-259814833e62'], price: 159.9, promo: 129.9, stock: 16, tags: ['promocao'], rating: 4.4, reviews: 71, age: 12 },
  { id: 'p20', name: 'Ferro de Passar a Vapor', description: 'Base em cerâmica antiaderente e jato de vapor vertical.', category: 'utilidades', photos: ['1585515320310-259814833e62', '1572981779307-38b8cabb2407'], price: 99.9, stock: 0, rating: 4.1, reviews: 58, age: 110 },
  { id: 'p21', name: 'Kit Ferramentas 40 Peças', description: 'Conjunto completo para reparos domésticos, em maleta resistente.', category: 'utilidades', photos: ['1558618666-fcd25c85cd64', '1572981779307-38b8cabb2407'], price: 189.9, stock: 13, rating: 4.6, reviews: 142, age: 70 },
  { id: 'p22', name: 'Extensão Elétrica 5 Tomadas', description: 'Com protetor contra surtos e cabo de 2 metros.', category: 'utilidades', photos: ['1585515320310-259814833e62', '1558618666-fcd25c85cd64'], price: 44.9, stock: 50, tags: ['novidade'], rating: 4.2, reviews: 29, age: 3 },

  // Organização
  { id: 'p23', name: 'Organizador de Gaveta Modular', description: 'Divisórias ajustáveis para talheres, utensílios e acessórios.', category: 'organizacao', photos: ['1584589167171-541ce45f1eea', '1598300042247-d088f8ab3a91'], price: 39.9, stock: 45, rating: 4.3, reviews: 52, age: 95 },
  { id: 'p24', name: 'Cabideiro Multiuso de Parede', description: 'Instalação simples, suporta até 10kg por gancho.', category: 'organizacao', photos: ['1598300042247-d088f8ab3a91', '1600166898405-da9535204843'], price: 49.9, promo: 39.9, stock: 28, tags: ['promocao'], rating: 4.5, reviews: 67, age: 18 },
  { id: 'p25', name: 'Caixa Organizadora 20L', description: 'Empilhável, transparente, ideal para roupas e objetos diversos.', category: 'organizacao', photos: ['1600166898405-da9535204843', '1595428774223-ef52624120d2'], price: 34.9, stock: 60, tags: ['mais-vendido'], rating: 4.6, reviews: 184, age: 38 },
  { id: 'p26', name: 'Porta Trecos Giratório', description: 'Organiza temperos e miudezas com rotação de 360°.', category: 'organizacao', photos: ['1595428774223-ef52624120d2', '1584589167171-541ce45f1eea'], price: 29.9, stock: 33, tags: ['novidade'], rating: 4.4, reviews: 21, age: 7 },

  // Outros
  { id: 'p27', name: 'Garrafa Térmica Inox 1L', description: 'Mantém a temperatura por até 12 horas, livre de vazamentos.', category: 'outros', photos: ['1602143407151-7111542de6e8', '1521656693074-0ef32e80a5d5'], price: 69.9, stock: 42, tags: ['mais-vendido'], rating: 4.7, reviews: 203, age: 44 },
  { id: 'p28', name: 'Luminária de Mesa LED', description: 'Três níveis de intensidade de luz e braço flexível.', category: 'outros', photos: ['1507473885765-e6ed057f782c', '1521656693074-0ef32e80a5d5'], price: 79.9, promo: 64.9, stock: 17, tags: ['promocao'], rating: 4.5, reviews: 76, age: 22 },
  { id: 'p29', name: 'Guarda-chuva Automático', description: 'Abertura automática, estrutura reforçada contra vento.', category: 'outros', photos: ['1534398079543-7ae6d016b86a', '1602143407151-7111542de6e8'], price: 49.9, stock: 3, rating: 4.1, reviews: 39, age: 9 },
  { id: 'p30', name: 'Kit Churrasco 6 Peças', description: 'Conjunto de utensílios em aço inox com estojo para transporte.', category: 'outros', photos: ['1521656693074-0ef32e80a5d5', '1507473885765-e6ed057f782c'], price: 89.9, stock: 20, tags: ['novidade'], rating: 4.6, reviews: 18, age: 2 },
]

export const products: Product[] = seeds.map((s) => ({
  id: s.id,
  slug: `${s.id}-${s.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
  name: s.name,
  description: s.description,
  category: s.category,
  price: s.price,
  promoPrice: s.promo,
  stock: s.stock,
  images: [unsplashImg(s.photos[0]), unsplashImg(s.photos[1])],
  tags: s.tags ?? [],
  rating: s.rating,
  reviewsCount: s.reviews,
  createdAt: daysAgo(s.age),
}))

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}
