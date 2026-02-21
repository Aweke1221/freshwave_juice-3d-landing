import React, { Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { HeroHeadline } from './HeroHeadline'
import { LiquidBackground } from './LiquidBackground'
import { FloatingFruits } from './FloatingFruits'
import { MagneticButton } from '@/components/interactions/MagneticButton'
import { useMousePosition } from '@/hooks/useMousePosition'
import { ParallaxLayer } from '@/components/scroll/ParallaxLayer'

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const mousePosition = useMousePosition()

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-deep-charcoal"
    >
      {/* 3D Liquid Background */}
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-to-b from-deep-charcoal via-neon-mango/10 to-deep-charcoal animate-pulse" />
        }>
          <LiquidBackground mousePosition={mousePosition} />
        </Suspense>
      </div>

      {/* Floating Fruits with Parallax */}
      <div className="absolute inset-0">
        <FloatingFruits mousePosition={mousePosition} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <HeroHeadline />
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl text-center font-light tracking-wide"
        >
          Experience liquid energy in its purest form
        </motion.p>

        <MagneticButton>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-neon-mango text-deep-charcoal rounded-full text-lg font-bold relative overflow-hidden group"
          >
            <span className="relative z-10">Explore Flavors</span>
            <motion.div
              className="absolute inset-0 bg-liquid-glow"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </MagneticButton>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 cursor-pointer"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-charcoal via-transparent to-deep-charcoal/20 pointer-events-none" />
    </section>
  )
}