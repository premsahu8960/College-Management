import { motion } from 'framer-motion'
import { Sparkles, Send, Bot } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { useState } from 'react'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const Sparkle = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-neon-cyan rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  )
}

export const AI = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you find the perfect society or event?",
      sender: 'ai',
    },
  ])

  const handleSend = () => {
    if (!message.trim()) return

    setMessages([
      ...messages,
      { id: messages.length + 1, text: message, sender: 'user' },
      {
        id: messages.length + 2,
        text: "That's a great question! Based on your interests, I'd recommend checking out the Tech Innovation Society or the Entrepreneurship Hub. Would you like more details?",
        sender: 'ai',
      },
    ])
    setMessage('')
  }

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
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-2">AI Assistant</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get personalized recommendations for societies and events
        </p>
      </div>

      {/* AI Recommendation Card */}
      <GlassCard className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <Sparkle key={i} delay={i * 0.1} />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="w-8 h-8 text-neon-cyan" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gradient">AI Recommendations</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Based on your interests and activity, here are some personalized recommendations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Tech Innovation Society', match: '95%' },
              { title: 'Entrepreneurship Hub', match: '88%' },
              { title: 'Environmental Society', match: '82%' },
            ].map((rec, index) => (
              <motion.div
                key={rec.title}
                className="p-4 rounded-card glass border border-white/20 hover:border-neon-cyan transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold mb-2">{rec.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                      initial={{ width: 0 }}
                      animate={{ width: rec.match }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-neon-cyan">{rec.match}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Chat Interface */}
      <GlassCard>
        <h2 className="text-xl font-bold mb-4 text-gradient">Chat with AI</h2>
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] p-4 rounded-card glass ${
                  msg.sender === 'user'
                    ? 'bg-neon-cyan/20 border-neon-cyan/30'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">JD</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-card glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all"
          />
          <motion.button
            onClick={handleSend}
            className="px-6 py-3 rounded-card glass border border-neon-cyan bg-neon-cyan/20 hover:bg-neon-cyan/30 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5 text-neon-cyan" />
          </motion.button>
        </div>
      </GlassCard>
    </motion.div>
  )
}
