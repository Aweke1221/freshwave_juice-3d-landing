import { Product } from '@/types/product.types'

export const products: Product[] = [
  {
    id: 'mango-fusion',
    name: 'Mango Fusion',
    flavor: 'mango',
    description: 'Sweet alphonso mangoes blended with a hint of passion fruit',
    price: 6.99,
    color: '#ffb347',
    glowColor: '#ff8c42',
    nutrition: {
      calories: 120,
      sugar: 24,
      vitaminC: 85,
      energy: 95,
    },
    ingredients: [
      { name: 'Mango', percentage: 70 },
      { name: 'Passion Fruit', percentage: 20 },
      { name: 'Orange', percentage: 10 },
    ],
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    flavor: 'berry',
    description: 'Wild berries with a touch of pomegranate',
    price: 7.49,
    color: '#c41e3a',
    glowColor: '#ff6b6b',
    nutrition: {
      calories: 95,
      sugar: 18,
      vitaminC: 70,
      energy: 88,
    },
    ingredients: [
      { name: 'Strawberry', percentage: 40 },
      { name: 'Blueberry', percentage: 35 },
      { name: 'Pomegranate', percentage: 25 },
    ],
  },
]