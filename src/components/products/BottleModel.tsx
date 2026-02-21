import React from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/types/product.types'

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-surface rounded-3xl p-8 max-w-lg w-full border border-neon-mango/20"
      >
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-white/70 mb-6">{product.description}</p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
            {product.ingredients.map((ingredient) => (
              <div key={ingredient.name} className="flex justify-between mb-2">
                <span>{ingredient.name}</span>
                <span className="text-neon-mango">{ingredient.percentage}%</span>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Nutrition Facts</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-deep-charcoal rounded-xl">
                <div className="text-2xl font-bold text-neon-mango">
                  {product.nutrition.calories}
                </div>
                <div className="text-sm text-white/60">Calories</div>
              </div>
              <div className="text-center p-3 bg-deep-charcoal rounded-xl">
                <div className="text-2xl font-bold text-neon-mango">
                  {product.nutrition.sugar}g
                </div>
                <div className="text-sm text-white/60">Sugar</div>
              </div>
              <div className="text-center p-3 bg-deep-charcoal rounded-xl">
                <div className="text-2xl font-bold text-neon-mango">
                  {product.nutrition.vitaminC}%
                </div>
                <div className="text-sm text-white/60">Vitamin C</div>
              </div>
              <div className="text-center p-3 bg-deep-charcoal rounded-xl">
                <div className="text-2xl font-bold text-neon-mango">
                  {product.nutrition.energy}%
                </div>
                <div className="text-sm text-white/60">Energy</div>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 bg-neon-mango text-deep-charcoal rounded-full font-semibold hover:bg-liquid-glow transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}