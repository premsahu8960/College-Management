import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import clsx from 'clsx'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export const GlassCard = ({ children, className, hover = true }: GlassCardProps) => {
  return (
    <motion.div
      className={clsx(
        'glass rounded-card p-6 shadow-soft',
        hover && 'hover:shadow-glow transition-shadow duration-300',
        className
      )}
      whileHover={hover ? { scale: 1.03, y: -4 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
