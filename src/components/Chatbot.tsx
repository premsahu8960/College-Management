import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { useState } from 'react'

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help. What can I assist you with today?",
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
        text: "Thanks for your message! I'm processing your request...",
        sender: 'ai',
      },
    ])
    setMessage('')
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full glass border border-neon-cyan shadow-glow flex items-center justify-center hover:shadow-glow-purple transition-all"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-neon-cyan"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <MessageCircle className="w-7 h-7 text-neon-cyan relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[500px] glass rounded-card border border-white/20 shadow-soft flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gradient">AI Assistant</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="glass rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                    className={`max-w-[75%] p-3 rounded-card ${
                      msg.sender === 'user'
                        ? 'bg-neon-cyan/20 border border-neon-cyan/30'
                        : 'glass border border-white/10'
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

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-card glass border border-white/20 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent transition-all text-sm"
              />
              <motion.button
                onClick={handleSend}
                className="px-4 py-2 rounded-card glass border border-neon-cyan bg-neon-cyan/20 hover:bg-neon-cyan/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5 text-neon-cyan" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
