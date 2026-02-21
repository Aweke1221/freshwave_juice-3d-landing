import React from 'react'
import { motion } from 'framer-motion'

interface ScrollExperienceProps {
  children: React.ReactNode
}

export const ScrollExperience: React.FC<ScrollExperienceProps> = ({ children }) => {
  return (
    <div data-scroll-container className="relative">
      {children}
    </div>
  )
}