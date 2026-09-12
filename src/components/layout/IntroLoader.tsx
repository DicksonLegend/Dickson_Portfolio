import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpiralAnimation, type SpiralAnimationRef } from '@/components/ui/spiral-animation'
import { Maximize2, Minimize2, RotateCcw } from 'lucide-react'

export interface IntroLoaderProps {
  onComplete: () => void
  duration?: number // Full cycle duration in seconds (default: 9.5s)
}

export function IntroLoader({
  onComplete,
  duration = 9.5,
}: IntroLoaderProps) {
  const spiralRef = useRef<SpiralAnimationRef>(null)
  const [isWarping, setIsWarping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [key, setKey] = useState(0)

  // Trigger smooth transition
  const handleTransition = useCallback(() => {
    if (isWarping) return
    setIsWarping(true)
    spiralRef.current?.warp(() => {
      // Pause briefly after stars disperse to let the dark void settle
      setTimeout(() => {
        onComplete()
      }, 400)
    })
  }, [isWarping, onComplete])

  // Stable callback passed to SpiralAnimation
  const handleAnimationComplete = useCallback(() => {
    setTimeout(() => {
      onComplete()
    }, 400)
  }, [onComplete])

  // Keyboard interaction: Space or Enter to accelerate warp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        handleTransition()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleTransition])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const handleResetAnimation = () => {
    setIsWarping(false)
    setKey((prev) => prev + 1)
  }

  return (
    <AnimatePresence>
      <motion.div
        key={`intro-loader-${key}`}
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
        }}
        className="fixed inset-0 z-50 w-full h-full overflow-hidden bg-black select-none"
      >
        {/* Top-left HUD matching screenshot */}
        <header className="absolute top-6 left-6 z-30 flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={handleResetAnimation}
            aria-label="Replay Spiral"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
            title="Replay Spiral"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </header>

        {/* 3D Spiral Particle Canvas */}
        <div className="absolute inset-0">
          <SpiralAnimation
            key={`spiral-canvas-${key}`}
            ref={spiralRef}
            duration={duration}
            onComplete={handleAnimationComplete}
          />
        </div>

        {/* Center Minimalist Button - Appears gracefully from the start without React re-render */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={
            isWarping
              ? { opacity: 0, scale: 1.25, filter: 'blur(10px)' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={
            isWarping
              ? { duration: 0.6, ease: 'easeInOut' }
              : { duration: 1.2, delay: 0.3, ease: 'easeOut' }
          }
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-auto"
        >
          <motion.button
            onClick={handleTransition}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group relative px-10 py-5 focus:outline-none"
          >
            {/* Subtle backlight glow */}
            <div className="absolute inset-0 rounded-full bg-white/[0.03] blur-xl group-hover:bg-cyan-500/15 transition-all duration-700" />

            <div className="relative flex flex-col items-center">
              <span className="text-white text-2xl sm:text-3xl tracking-[0.32em] uppercase font-extralight transition-all duration-700 group-hover:tracking-[0.42em] group-hover:text-cyan-100 animate-pulse">
                ENTER
              </span>
              <span className="mt-2 text-[10px] font-mono tracking-[0.25em] text-white/35 uppercase transition-colors duration-500 group-hover:text-cyan-300/70">
                DICKSON E // AI ENGINEER
              </span>
            </div>
          </motion.button>
        </motion.div>

        {/* Bottom prompt */}
        <footer className="absolute bottom-6 inset-x-0 z-20 flex justify-center text-center pointer-events-none">
          <p className="text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase">
            CLICK ENTER TO WARP // OR LET FULL ANIMATION UNFOLD
          </p>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}
