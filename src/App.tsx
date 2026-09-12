import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar, IntroLoader } from './components/layout'
import { Hero, About, BookSkillsSection, Projects } from './components/sections'
import { useScrollSpy } from './hooks/useScrollSpy'
import { RotateCcw } from 'lucide-react'

export function AppContent() {
  const [showIntro, setShowIntro] = useState(true)
  const activeSection = useScrollSpy(['hero', 'about', 'skills', 'projects', 'contact'], 150) || 'hero'

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-x-hidden selection:bg-[var(--accent)] selection:text-black transition-colors duration-400">
      {/* 3D Spiral Particle Loading Screen */}
      <AnimatePresence>
        {showIntro && (
          <IntroLoader
            onComplete={() => setShowIntro(false)}
            duration={9.5}
          />
        )}
      </AnimatePresence>

      {/* Main Portfolio Experience */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            key="main-portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            {/* Left Vertical Navigation & Top Theme Toggle */}
            <Navbar activeSection={activeSection} />

            {/* Main Sections Flow */}
            <main id="main-content" className="relative z-10 w-full">
              <Hero />
              <About />
              <BookSkillsSection />
              <Projects />
            </main>

            {/* Footer with Replay Option */}
            <footer className="w-full py-8 border-t border-[var(--border-subtle)] pl-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-faint)]">
              <span>© {new Date().getFullYear()} DICKSON E · ALL RIGHTS RESERVED</span>
              <button
                onClick={() => setShowIntro(true)}
                className="inline-flex items-center gap-2 hover:text-[var(--accent)] transition-colors py-1 px-2.5 rounded border border-[var(--border-subtle)] hover:border-[var(--accent)]"
                title="Replay Loading Animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Intro</span>
              </button>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
