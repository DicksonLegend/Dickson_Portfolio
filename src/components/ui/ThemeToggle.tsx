import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export interface ThemeToggleProps {
  className?: string
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`relative w-9 h-9 flex items-center justify-center rounded-full border border-white/20 border-t-white/35 bg-white/[0.07] text-[var(--text)] hover:border-white/35 hover:bg-white/[0.14] hover:text-[var(--accent)] transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-3xl backdrop-saturate-[190%] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer overflow-hidden group ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Specular gloss highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.15] via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: [0.85, 1.05, 1] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-5 h-5 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent-glow)]" />
        ) : (
          <Sun className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
        )}
      </motion.div>
    </button>
  )
}
