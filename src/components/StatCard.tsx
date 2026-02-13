import { motion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LucideIcon } from 'lucide-react'
import { GlassCard } from './GlassCard'

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  color?: 'cyan' | 'purple'
  suffix?: string
}

export const StatCard = ({ title, value, icon: Icon, color = 'cyan', suffix = '' }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const spring = useSpring(0, { damping: 30, stiffness: 100 })
  const rounded = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [rounded])

  const colorClasses = {
    cyan: 'text-neon-cyan',
    purple: 'text-neon-purple',
  }

  return (
    <GlassCard>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <motion.p
            className={`text-3xl font-bold ${colorClasses[color]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {displayValue}{suffix}
          </motion.p>
        </div>
        <motion.div
          className={`${colorClasses[color]} opacity-80`}
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      </div>
    </GlassCard>
  )
}
