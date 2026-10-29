import { unsplashImg } from '@/data/products'
import type { Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'eletronicos',
    name: 'Eletrônicos',
    description: 'Áudio, acessórios de tecnologia e muito mais',
    image: unsplashImg('1572569511254-d8f925fe2cbb'),
  },
  {
    id: 'casa-cozinha',
    name: 'Casa e Cozinha',
    description: 'Eletroportáteis e utensílios para o dia a dia',
    image: unsplashImg('1584269600464-37b1b58a9fe7'),
  },
  {
    id: 'acessorios',
    name: 'Acessórios',
    description: 'Bolsas, relógios e itens de uso pessoal',
    image: unsplashImg('1553062407-98eeb64c6a62'),
  },
  {
    id: 'utilidades',
    name: 'Utilidades',
    description: 'Ferramentas e itens práticos para a casa',
    image: unsplashImg('1572981779307-38b8cabb2407'),
  },
  {
    id: 'organizacao',
    name: 'Organização',
    description: 'Soluções para organizar todos os ambientes',
    image: unsplashImg('1584589167171-541ce45f1eea'),
  },
  {
    id: 'outros',
    name: 'Outros Produtos',
    description: 'Variedades e novidades selecionadas para você',
    image: unsplashImg('1602143407151-7111542de6e8'),
  },
]

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id)
}
