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
      className={`relative p-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 shadow-sm backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: [0.85, 1.05, 1] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-5 h-5 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-[var(--accent)]" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </motion.div>
    </button>
  )
}
