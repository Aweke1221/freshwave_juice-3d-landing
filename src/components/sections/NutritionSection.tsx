import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AnimatedMeter } from './AnimatedMeter'
import { IngredientBreakdown } from './IngredientBreakdown'
import { products } from '@/constants/products'

export const NutritionSection: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section className="min-h-screen py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal via-neon-mango/5 to-deep-charcoal" />
      
      <motion.div 
        style={{ y }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-white to-neon-mango bg-clip-text text-transparent">
            Pure Energy, Naturally
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left column - Nutrition meters */}
          <div className="space-y-8">
            <AnimatedMeter
              label="Natural Sugar"
              value={24}
              maxValue={30}
              color="#ffb347"
              unit="g"
            />
            <AnimatedMeter
              label="Energy Boost"
              value={95}
              maxValue={100}
              color="#ff8c42"
              unit="%"
            />
            <AnimatedMeter
              label="Vitamin C"
              value={85}
              maxValue={100}
              color="#ff6b2b"
              unit="%"
            />
          </div>

          {/* Right column - Ingredients */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-dark-surface/50 backdrop-blur-lg rounded-3xl p-8 border border-neon-mango/20"
            >
              <h3 className="text-2xl font-bold mb-6">100% Natural</h3>
              <div className="space-y-4">
                {products[0].ingredients.map((ingredient) => (
                  <IngredientBreakdown
                    key={ingredient.name}
                    ingredient={ingredient}
                  />
                ))}
              </div>
            </motion.div>

            {/* Badge animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-neon-mango to-liquid-glow flex items-center justify-center"
                >
                  <span className="text-deep-charcoal font-bold text-center">
                    100%<br/>NATURAL
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}