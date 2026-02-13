import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { GlassCard } from './GlassCard'
import clsx from 'clsx'

interface EventCardProps {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  registered: number
  status: 'upcoming' | 'ongoing' | 'completed'
  society: string
}

export const EventCard = ({
  title,
  description,
  date,
  time,
  location,
  capacity,
  registered,
  status,
  society,
}: EventCardProps) => {
  const capacityPercentage = (registered / capacity) * 100

  const statusConfig = {
    upcoming: {
      label: 'Upcoming',
      color: 'bg-neon-cyan',
      pulse: true,
    },
    ongoing: {
      label: 'Ongoing',
      color: 'bg-green-500',
      pulse: true,
    },
    completed: {
      label: 'Completed',
      color: 'bg-gray-500',
      pulse: false,
    },
  }

  const config = statusConfig[status]

  return (
    <GlassCard className="h-full hover:border-neon-cyan transition-all duration-300">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gradient mb-1">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{society}</p>
          </div>
          <motion.div
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium text-white',
              config.color
            )}
            animate={
              config.pulse
                ? {
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: config.pulse ? Infinity : 0,
            }}
          >
            {config.label}
          </motion.div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-neon-cyan" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-neon-purple" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-neon-cyan" />
            <span>{location}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium">
                {registered} / {capacity}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(capacityPercentage)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              initial={{ width: 0 }}
              animate={{ width: `${capacityPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
