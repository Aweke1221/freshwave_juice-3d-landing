import React, { useEffect, useState } from 'react'
import { HeroSection } from '@/components/hero/HeroSection'
import { ProductShowcase } from '@/components/products/ProductShowcase'
import { NutritionSection } from '@/components/sections/NutritionSection'
import { ScrollExperience } from '@/components/scroll/ScrollExperience'
import { CustomCursor } from '@/components/interactions/CustomCursor'
import { LoadingScreen } from '@/components/interactions/LoadingScreen'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useSmoothScroll()

  useEffect(() => {
    // Simulate loading time for premium feel
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <CustomCursor />
          <main className="bg-deep-charcoal text-white overflow-x-hidden">
            <HeroSection />
            
            <ScrollExperience>
              <ProductShowcase />
              <NutritionSection />
              
              {/* Wave Divider */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-neon-mango/5 to-transparent">
                  <svg 
                    className="absolute bottom-0 w-full h-32 text-neon-mango/10"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                      fill="currentColor"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="d"
                        dur="10s"
                        repeatCount="indefinite"
                        values="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;
                              M0,0V15.81C13,21.25,27.93,25.67,44.24,28.45c69.76,11.2,136.88,7.93,204.44-5.7C327.52,7.88,394,2.45,462.35,7.14,550.34,13.51,638.39,37.57,722.52,52.83c81.79,14.82,161.38,9.41,240.56-4.46C1042.23,31.13,1123.81,19.54,1200,24.49V0Z;
                              M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            </ScrollExperience>
          </main>
        </>
      )}
    </>
  )
}

export default App