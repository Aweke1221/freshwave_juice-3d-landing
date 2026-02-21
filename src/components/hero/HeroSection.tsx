import React, { Suspense } from 'react'
import { HeroHeadline } from './HeroHeadline'
import { LiquidBackground } from './LiquidBackground'
import { FloatingFruits } from './FloatingFruits'
import { MagneticButton } from '@/components/interactions/MagneticButton'
import { motion } from 'framer-motion'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-deep-charcoal">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-deep-charcoal to-orange-900/20" />}>
          <LiquidBackground />
        </Suspense>
      </div>

      {/* Floating Fruits Layer */}
      <div className="absolute inset-0">
        <FloatingFruits />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <HeroHeadline />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl"
        >
          Experience liquid energy in its purest form
        </motion.p>

        <MagneticButton>
          <button className="px-12 py-5 bg-neon-mango text-deep-charcoal rounded-full text-lg font-bold hover:bg-liquid-glow transition-all duration-300 shadow-2xl shadow-neon-mango/20">
            Explore Flavors
          </button>
        </MagneticButton>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </section>
  )
}