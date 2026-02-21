import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12)
      cursorY.set(e.clientY - 15)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', moveCursor)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999] mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <svg width="30" height="38" viewBox="0 0 24 30">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          <circle cx="12" cy="12" r="10" fill="#ffb347" opacity="0.9">
            <animate
              attributeName="r"
              values="10;12;10"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <path d="M12 22 L6 30 L18 30 Z" fill="#ffb347" opacity="0.9">
            <animate
              attributeName="d"
              values="M12 22 L6 30 L18 30 Z; M12 20 L4 30 L20 30 Z; M12 22 L6 30 L18 30 Z"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </svg>
    </motion.div>
  )
}