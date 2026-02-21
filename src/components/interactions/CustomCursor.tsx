import React, { useEffect, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'

export const CustomCursor: React.FC = () => {
  const { x, y } = useMousePosition()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    document.body.classList.add('custom-cursor')
    
    return () => {
      document.body.classList.remove('custom-cursor')
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        left: x - 12,
        top: y - 15,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <svg width="24" height="30" viewBox="0 0 24 30">
        <circle cx="12" cy="12" r="10" fill="#ffb347" opacity="0.8">
          <animate
            attributeName="r"
            values="10;12;10"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <path d="M12 22 L6 30 L18 30 Z" fill="#ffb347" opacity="0.8">
          <animate
            attributeName="d"
            values="M12 22 L6 30 L18 30 Z; M12 20 L4 30 L20 30 Z; M12 22 L6 30 L18 30 Z"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}