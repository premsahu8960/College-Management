import { motion } from 'framer-motion'
import { SocietyCard } from '../components/SocietyCard'
import { Search } from 'lucide-react'
import { useState } from 'react'

const societies = [
  {
    id: 1,
    name: 'Tech Innovation Society',
    description: 'Exploring cutting-edge technology and innovation in software development, AI, and emerging tech trends.',
    members: 245,
    category: 'Technology',
    location: 'Building A, Room 101',
  },
  {
    id: 2,
    name: 'Arts & Culture Club',
    description: 'Celebrating creativity through painting, music, theater, and cultural exchange programs.',
    members: 189,
    category: 'Arts',
    location: 'Arts Center, Studio 3',
  },
  {
    id: 3,
    name: 'Sports & Fitness Society',
    description: 'Promoting physical wellness through various sports activities, tournaments, and fitness programs.',
    members: 312,
    category: 'Sports',
    location: 'Sports Complex',
  },
  {
    id: 4,
    name: 'Entrepreneurship Hub',
    description: 'Fostering innovation and business acumen through workshops, mentorship, and startup support.',
    members: 156,
    category: 'Business',
    location: 'Business School, Room 205',
  },
  {
    id: 5,
    name: 'Environmental Society',
    description: 'Raising awareness about sustainability and organizing eco-friendly initiatives on campus.',
    members: 203,
    category: 'Environment',
    location: 'Science Building, Room 42',
  },
  {
    id: 6,
    name: 'Music & Performance',
    description: 'Uniting musicians and performers for concerts, jam sessions, and collaborative projects.',
    members: 178,
    category: 'Music',
    location: 'Music Hall',
  },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const Societies = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSocieties = societies.filter((society) =>
    society.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    society.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">Societies</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and join student societies
          </p>
        </div>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search societies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-card glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Societies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSocieties.map((society, index) => (
          <motion.div
            key={society.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SocietyCard {...society} />
          </motion.div>
        ))}
      </div>

      {filteredSocieties.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 dark:text-gray-400">No societies found matching your search.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
