import { motion } from 'framer-motion'
import { Search, Bell, User, ChevronDown } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

export const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [hasNotifications] = useState(true)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileOpen])

  return (
    <motion.nav
      className="glass border-b border-white/20 sticky top-0 z-30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search societies, events..."
            className="w-full pl-12 pr-4 py-3 rounded-card glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <motion.button
            className="relative glass rounded-card p-3 hover:shadow-glow transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <motion.span
                className="absolute top-1 right-1 w-2 h-2 bg-neon-cyan rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <motion.button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 glass rounded-card px-4 py-2 hover:shadow-glow transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:block font-medium">John Doe</span>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 hidden md:block transition-transform',
                  isProfileOpen && 'rotate-180'
                )}
              />
            </motion.button>

            {isProfileOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 glass rounded-card shadow-soft overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="p-2">
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-red-400">
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
