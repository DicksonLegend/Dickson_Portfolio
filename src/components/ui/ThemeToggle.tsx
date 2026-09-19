import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { Sun, Moon } from 'lucide-react'

export interface ThemeToggleProps {
  className?: string
  isNavLight?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', isNavLight = false }) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const effectiveLight = !isDark || isNavLight

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`crystal-lens relative w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] cursor-pointer overflow-hidden group ${
        effectiveLight ? 'text-neutral-900' : 'text-white'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Specular gloss highlight */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
        effectiveLight
          ? 'bg-gradient-to-b from-white/80 via-transparent to-transparent'
          : 'bg-gradient-to-b from-white/[0.25] via-transparent to-transparent'
      }`} />

      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: [0.85, 1.05, 1] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 w-5 h-5 flex items-center justify-center"
      >
        {isDark ? (
          <Moon className={`w-4 h-4 transition-colors duration-300 ${
            effectiveLight
              ? 'text-neutral-900 group-hover:text-cyan-600 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]'
              : 'text-[var(--accent)] drop-shadow-[0_0_6px_var(--accent-glow)]'
          }`} />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
        )}
      </motion.div>
    </button>
  )
}
