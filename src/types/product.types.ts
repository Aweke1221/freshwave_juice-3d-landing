export interface Product {
  id: string
  name: string
  flavor: string
  description: string
  price: number
  color: string
  glowColor: string
  nutrition: NutritionInfo
  ingredients: Ingredient[]
}

export interface NutritionInfo {
  calories: number
  sugar: number
  vitaminC: number
  energy: number
}

export interface Ingredient {
  name: string
  percentage: number
  icon?: string
}

export type FlavorType = 'mango' | 'orange' | 'berry' | 'green'