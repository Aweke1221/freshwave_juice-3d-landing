import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/types/product.types'

interface ProductModalProps {
  product: Product
  onClose: () => void
  isOpen?: boolean
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  // Prevent scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-dark-surface rounded-3xl p-8 max-w-lg w-full border border-neon-mango/20 shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-neon-mango bg-clip-text text-transparent">
              {product.name}
            </h2>
            <p className="text-neon-mango text-sm mt-1">${product.price}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Description */}
        <p className="text-white/70 mb-6 leading-relaxed">{product.description}</p>
        
        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-white/90">Ingredients</h3>
          <div className="space-y-3">
            {product.ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center"
              >
                <span className="text-white/80">{ingredient.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-deep-charcoal rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ingredient.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-neon-mango rounded-full"
                    />
                  </div>
                  <span className="text-neon-mango font-medium w-12 text-right">
                    {ingredient.percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Nutrition Facts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-white/90">Nutrition Facts</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Calories', value: product.nutrition.calories, unit: '' },
              { label: 'Sugar', value: product.nutrition.sugar, unit: 'g' },
              { label: 'Vitamin C', value: product.nutrition.vitaminC, unit: '%' },
              { label: 'Energy', value: product.nutrition.energy, unit: '%' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-4 bg-deep-charcoal rounded-xl border border-neon-mango/10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  className="text-2xl font-bold text-neon-mango"
                >
                  {item.value}{item.unit}
                </motion.div>
                <div className="text-sm text-white/60 mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-neon-mango to-liquid-glow text-deep-charcoal rounded-full font-semibold transition-all shadow-lg shadow-neon-mango/20"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// Also export as default if needed
export default ProductModal