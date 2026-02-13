import { motion } from 'framer-motion'
import { Users, Calendar, TrendingUp, Award } from 'lucide-react'
import { StatCard } from '../components/StatCard'
import { GlassCard } from '../components/GlassCard'
import { LineChart, Line, PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

const lineData = [
  { name: 'Jan', members: 120 },
  { name: 'Feb', members: 190 },
  { name: 'Mar', members: 300 },
  { name: 'Apr', members: 280 },
  { name: 'May', members: 390 },
  { name: 'Jun', members: 450 },
]

const doughnutData = [
  { name: 'Tech', value: 35, color: '#00f5ff' },
  { name: 'Arts', value: 25, color: '#a855f7' },
  { name: 'Sports', value: 20, color: '#f59e0b' },
  { name: 'Cultural', value: 20, color: '#10b981' },
]

const recentActivity = [
  { id: 1, action: 'New member joined', society: 'Tech Society', time: '2 mins ago' },
  { id: 2, action: 'Event created', society: 'Arts Club', time: '15 mins ago' },
  { id: 3, action: 'Meeting scheduled', society: 'Sports Club', time: '1 hour ago' },
  { id: 4, action: 'New member joined', society: 'Cultural Society', time: '2 hours ago' },
]

const upcomingEvents = [
  { id: 1, title: 'Tech Workshop', date: 'Feb 20', society: 'Tech Society' },
  { id: 2, title: 'Art Exhibition', date: 'Feb 22', society: 'Arts Club' },
  { id: 3, title: 'Sports Tournament', date: 'Feb 25', society: 'Sports Club' },
]

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const Dashboard = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Societies" value={24} icon={Users} color="cyan" />
        <StatCard title="Active Events" value={12} icon={Calendar} color="purple" />
        <StatCard title="Total Members" value={1248} icon={TrendingUp} color="cyan" />
        <StatCard title="Achievements" value={156} icon={Award} color="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 text-gradient">Member Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <Line
                type="monotone"
                dataKey="members"
                stroke="#00f5ff"
                strokeWidth={3}
                dot={{ fill: '#00f5ff', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Doughnut Chart */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 text-gradient">Society Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={doughnutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {doughnutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {doughnutData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Activity & Events Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 text-gradient">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-card glass border border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2" />
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.society} • {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Upcoming Events */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4 text-gradient">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="p-4 rounded-card glass border border-white/10 hover:border-neon-cyan transition-all cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{event.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.society}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neon-purple">{event.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}
