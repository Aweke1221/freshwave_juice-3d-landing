import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSection } from '@/components/hero/HeroSection'
import { ProductShowcase } from '@/components/products/ProductShowcase'
import { NutritionSection } from '@/components/sections/NutritionSection'
import { ScrollExperience } from '@/components/scroll/ScrollExperience'
import { CustomCursor } from '@/components/interactions/CustomCursor'
import { LoadingScreen } from '@/components/interactions/LoadingScreen'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  useSmoothScroll()

  useEffect(() => {
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
            </ScrollExperience>
          </main>
        </>
      )}
    </>
  )
}

export default App