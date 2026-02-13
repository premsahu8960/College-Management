import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider, useSidebar } from './context/SidebarContext'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { Chatbot } from './components/Chatbot'
import { motion } from 'framer-motion'

const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })))
const Societies = lazy(() => import('./pages/Societies').then(m => ({ default: m.Societies })))
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })))
const AI = lazy(() => import('./pages/AI').then(m => ({ default: m.AI })))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <motion.div
      className="w-16 h-16 rounded-full border-4 border-neon-cyan border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
)

const AppContent = () => {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen">
      <Sidebar />
      <motion.div
        className="hidden lg:block transition-all duration-300"
        style={{ paddingLeft: isCollapsed ? '80px' : '280px' }}
      >
        <Navbar />
        <main className="p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/societies" element={<Societies />} />
              <Route path="/events" element={<Events />} />
              <Route path="/ai" element={<AI />} />
            </Routes>
          </Suspense>
        </main>
      </motion.div>
      <div className="lg:hidden">
        <Navbar />
        <main className="p-6 pb-24">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/societies" element={<Societies />} />
              <Route path="/events" element={<Events />} />
              <Route path="/ai" element={<AI />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <Chatbot />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
