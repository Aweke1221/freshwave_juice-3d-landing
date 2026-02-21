import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface AnimatedMeterProps {
  label: string
  value: number
  maxValue: number
  color: string
  unit: string
}

export const AnimatedMeter: React.FC<AnimatedMeterProps> = ({
  label,
  value,
  maxValue,
  color,
  unit,
}) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const percentage = (value / maxValue) * 100

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1.5, ease: "easeOut" }
      })
    }
  }, [inView, controls, percentage])

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-white/80">
        <span>{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          {value}{unit}
        </motion.span>
      </div>
      <div className="h-3 bg-dark-surface rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}