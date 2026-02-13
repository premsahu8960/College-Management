import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Users, MapPin } from 'lucide-react'
import { GlassCard } from './GlassCard'

interface SocietyCardProps {
  id: number
  name: string
  description: string
  members: number
  category: string
  location: string
  image?: string
}

export const SocietyCard = ({ name, description, members, category, location }: SocietyCardProps) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
    
    const rotateXValue = (y.get() / (rect.height / 2)) * -10
    const rotateYValue = (x.get() / (rect.width / 2)) * 10
    
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className="perspective-1000"
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="transform-gpu"
      >
        <GlassCard className="h-full">
          <div className="space-y-4">
            {/* Category Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-neon-cyan to-neon-purple text-white">
                {category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gradient">{name}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm font-medium">{members} members</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-purple" />
                <span className="text-sm">{location}</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}
