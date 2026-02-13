import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Sparkles,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'
import { useSidebar } from '../context/SidebarContext'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/societies', icon: Users, label: 'Societies' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/ai', icon: Sparkles, label: 'AI Assistant' },
]

export const Sidebar = () => {
  const { isCollapsed, setIsCollapsed } = useSidebar()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 glass rounded-card p-3 hover:shadow-glow transition-all"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex fixed left-0 top-0 h-full z-40 flex-col glass border-r border-white/20"
        initial={false}
        animate={{ width: isCollapsed ? '80px' : '280px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <motion.h1
              className="text-2xl font-bold text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              SocietyHub
            </motion.h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="glass rounded-full p-2 hover:shadow-glow transition-all"
          >
            <ChevronLeft
              className={clsx('w-5 h-5 transition-transform duration-300', isCollapsed && 'rotate-180')}
            />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-4 px-4 py-3 rounded-card transition-all duration-200',
                  isActive
                    ? 'glass shadow-glow text-neon-cyan'
                    : 'hover:glass hover:text-neon-cyan text-gray-700 dark:text-gray-300'
                )
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              className="lg:hidden fixed left-0 top-0 h-full w-64 z-50 glass border-r border-white/20"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gradient">SocietyHub</h1>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="glass rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'flex items-center gap-4 px-4 py-3 rounded-card transition-all duration-200',
                        isActive
                          ? 'glass shadow-glow text-neon-cyan'
                          : 'hover:glass hover:text-neon-cyan text-gray-700 dark:text-gray-300'
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Nav for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/20 z-30">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  'flex flex-col items-center gap-1 px-4 py-2 rounded-card transition-all',
                  isActive ? 'text-neon-cyan' : 'text-gray-600 dark:text-gray-400'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
