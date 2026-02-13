import { motion } from 'framer-motion'
import { EventCard } from '../components/EventCard'
import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

const events = [
  {
    id: 1,
    title: 'Tech Innovation Workshop',
    description: 'Learn about the latest trends in AI, machine learning, and cloud computing from industry experts.',
    date: 'Feb 20, 2024',
    time: '2:00 PM - 5:00 PM',
    location: 'Tech Building, Auditorium A',
    capacity: 200,
    registered: 156,
    status: 'upcoming' as const,
    society: 'Tech Innovation Society',
  },
  {
    id: 2,
    title: 'Art Exhibition Opening',
    description: 'Showcase of student artwork including paintings, sculptures, and digital art pieces.',
    date: 'Feb 22, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Arts Center, Gallery Hall',
    capacity: 150,
    registered: 150,
    status: 'upcoming' as const,
    society: 'Arts & Culture Club',
  },
  {
    id: 3,
    title: 'Basketball Tournament Finals',
    description: 'Championship match between the top two teams. Come support your favorite team!',
    date: 'Feb 18, 2024',
    time: '4:00 PM - 6:00 PM',
    location: 'Sports Complex, Court 1',
    capacity: 500,
    registered: 487,
    status: 'ongoing' as const,
    society: 'Sports & Fitness Society',
  },
  {
    id: 4,
    title: 'Startup Pitch Night',
    description: 'Student entrepreneurs present their business ideas to a panel of investors and mentors.',
    date: 'Feb 15, 2024',
    time: '7:00 PM - 10:00 PM',
    location: 'Business School, Conference Hall',
    capacity: 100,
    registered: 100,
    status: 'completed' as const,
    society: 'Entrepreneurship Hub',
  },
  {
    id: 5,
    title: 'Environmental Awareness Campaign',
    description: 'Workshop on sustainable living practices and campus-wide tree planting initiative.',
    date: 'Feb 25, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Main Campus, Green Area',
    capacity: 300,
    registered: 234,
    status: 'upcoming' as const,
    society: 'Environmental Society',
  },
  {
    id: 6,
    title: 'Jazz Night Concert',
    description: 'Live performance by student jazz band featuring classic and contemporary pieces.',
    date: 'Feb 19, 2024',
    time: '8:00 PM - 11:00 PM',
    location: 'Music Hall',
    capacity: 180,
    registered: 180,
    status: 'upcoming' as const,
    society: 'Music & Performance',
  },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const Events = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'ongoing' | 'completed'>('all')

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.society.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
          <h1 className="text-3xl font-bold text-gradient mb-2">Events</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and register for upcoming events
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-card glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-12 pr-8 py-3 rounded-card glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard {...event} />
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-600 dark:text-gray-400">No events found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
