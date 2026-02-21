import React from 'react'
import { ProductCard3D } from './ProductCard3D'
import { products } from '@/constants/products'

export const ProductShowcase: React.FC = () => {
  return (
    <section className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-white to-neon-mango bg-clip-text text-transparent">
            Our Flavors
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard3D key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}