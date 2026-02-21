import React from 'react'
import { motion } from 'framer-motion'
import { Ingredient } from '@/types/product.types'

interface IngredientBreakdownProps {
  ingredient: Ingredient
}

export const IngredientBreakdown: React.FC<IngredientBreakdownProps> = ({ ingredient }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-white/80">{ingredient.name}</span>
        <span className="text-neon-mango">{ingredient.percentage}%</span>
      </div>
      <div className="h-1.5 bg-dark-surface rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${ingredient.percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="h-full bg-neon-mango rounded-full"
        />
      </div>
    </div>
  )
}