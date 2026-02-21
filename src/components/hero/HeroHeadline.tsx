import React from 'react'
import { motion } from 'framer-motion'

const words = ['Taste.', 'Energy.', 'Freshness.']

export const HeroHeadline: React.FC = () => {
  return (
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.3,
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block mr-4 last:mr-0 bg-gradient-to-r from-white via-neon-mango to-white bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}