import React from 'react'
import { motion } from 'framer-motion'
import { ProductCard3D } from './ProductCard3D'
import { products } from '@/constants/products'

export const ProductShowcase: React.FC = () => {
  return (
    <section className="min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal via-neon-mango/5 to-deep-charcoal" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-white to-neon-mango bg-clip-text text-transparent">
            Our Flavors
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard3D key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}