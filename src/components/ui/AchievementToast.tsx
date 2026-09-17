import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

export interface AchievementToastProps {
  show?: boolean
  onDismiss?: () => void
}

export const AchievementToast: React.FC<AchievementToastProps> = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

      const handleMediaChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }
      mediaQuery.addEventListener('change', handleMediaChange)

      // Listen for custom trigger event
      const handleTrigger = () => {
        const alreadyFired = sessionStorage.getItem('dickson_cert_achievement_unlocked')
        if (alreadyFired) return

        sessionStorage.setItem('dickson_cert_achievement_unlocked', 'true')
        setIsVisible(true)

        // Auto dismiss after 4 seconds
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, 4000)

        return () => clearTimeout(timer)
      }

      window.addEventListener('trigger-cert-achievement', handleTrigger)

      return () => {
        mediaQuery.removeEventListener('change', handleMediaChange)
        window.removeEventListener('trigger-cert-achievement', handleTrigger)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <aside
          aria-live="polite"
          aria-atomic="true"
          className="fixed top-20 right-4 sm:right-8 z-50 pointer-events-auto select-none"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: 80, scale: 0.92 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotate: [0, -3.5, 3.5, -2, 2, 0],
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -16, scale: 0.94 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative p-0.5 rounded-2xl bg-gradient-to-r from-amber-500/50 via-yellow-400/30 to-amber-600/40 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_25px_rgba(240,169,58,0.25)]"
          >
            {/* Inner Glass Card */}
            <div className="relative bg-[#0a1315]/95 backdrop-blur-2xl rounded-[calc(1rem-2px)] p-3.5 sm:p-4 flex items-center gap-3.5 border border-amber-500/30 text-white min-w-[290px] sm:min-w-[340px] overflow-hidden">
              {/* Subtle radiant background glow */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

              {/* Glowing Trophy Badge */}
              <div className="relative flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-b from-amber-400/25 to-amber-600/10 border border-amber-400/40 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_15px_rgba(240,169,58,0.35)]">
                <span className="text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">🏆</span>
              </div>

              {/* Text content */}
              <div className="flex flex-col text-left pr-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#f0a93a] font-bold">
                  <span>ACHIEVEMENT UNLOCKED</span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white tracking-tight mt-0.5">
                  Serial Cert Collector (30/30)
                </span>
                <span className="text-[10px] font-mono text-white/50 tracking-wider">
                  PROOF OF RELENTLESS CURIOSITY
                </span>
              </div>

              {/* Dismiss button */}
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="ml-auto text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* 4s Auto-Dismiss Progress Bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-amber-400 to-yellow-300"
              />
            </div>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  )
}
