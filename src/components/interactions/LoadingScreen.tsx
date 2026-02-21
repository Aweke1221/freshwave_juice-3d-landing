import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-deep-charcoal flex items-center justify-center"
    >
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffb34720"
              strokeWidth="5"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ffb347"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg width="40" height="50" viewBox="0 0 24 30" className="text-neon-mango">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.8" />
              <path d="M12 22 L6 30 L18 30 Z" fill="currentColor" opacity="0.8" />
            </svg>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-neon-mango rounded-full mx-auto max-w-xs"
        />
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-4 text-neon-mango font-light"
        >
          Pouring Freshness...
        </motion.p>
      </div>
    </motion.div>
  )
}