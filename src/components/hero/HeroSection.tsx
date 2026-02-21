import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { HeroHeadline } from './HeroHeadline'
import { LiquidBackground } from './LiquidBackground'
import { FloatingFruits } from './FloatingFruits'
import { MagneticButton } from '@/components/interactions/MagneticButton'
import { useMousePosition } from '@/hooks/useMousePosition'

export const HeroSection: React.FC = () => {
  const mousePosition = useMousePosition()

  return (
    <section className="relative h-screen w-full overflow-hidden bg-deep-charcoal">
      {/* Single Canvas for all 3D elements */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <LiquidBackground mousePosition={mousePosition} />
          <FloatingFruits mousePosition={mousePosition} />
        </Suspense>
      </Canvas>

      {/* Content Layer - Absolutely positioned above Canvas */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto">
          <HeroHeadline />
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl text-center font-light">
            Experience liquid energy in its purest form
          </p>

          <MagneticButton>
            <button className="px-12 py-5 bg-neon-mango text-deep-charcoal rounded-full text-lg font-bold">
              Explore Flavors
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 z-20">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </section>
  )
}