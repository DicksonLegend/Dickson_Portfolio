import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

// Reusable scroll-synced line component with bidirectional fade & translate
const PrintLine: React.FC<{
  progress: MotionValue<number>
  range: [number, number]
  children: React.ReactNode
  className?: string
}> = ({ progress, range, children, className = '' }) => {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [6, 0])

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  )
}

export const ReceiptTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const handleMediaChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }
      mediaQuery.addEventListener('change', handleMediaChange)
      return () => mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // Linked directly to scroll progress:
  // Starts when container top enters 80% of viewport, finishes when center is at 45% (perfectly centered on screen!)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'center 45%'],
  })

  // Fire achievement toast when user reaches completion of receipt
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.65) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('trigger-cert-achievement'))
        }
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Phase 1: Paper extends from the printer slot (Height 0px → 410px) in plain view
  const paperHeight = useTransform(scrollYProgress, [0.0, 0.40], [0, 415])
  const paperOpacity = useTransform(scrollYProgress, [0.0, 0.06], [0, 1])

  // Mechanical paper feed micro-wobble
  const paperRotate = useTransform(
    scrollYProgress,
    [0.0, 0.10, 0.20, 0.30, 0.40],
    [0, -0.6, 0.6, -0.3, 0]
  )
  const paperX = useTransform(
    scrollYProgress,
    [0.0, 0.10, 0.20, 0.30, 0.40],
    [0, -1.2, 1.2, -0.6, 0]
  )

  // Rolled paper bundle inside feeder slot
  const rollScale = useTransform(scrollYProgress, [0.0, 0.40], [1, 0.4])
  const rollOpacity = useTransform(scrollYProgress, [0.0, 0.40], [1, 0.25])

  // Phase 3: Down text (Big Display Heading) appears directly below receipt in view space
  const headingOpacity = useTransform(scrollYProgress, [0.55, 0.80], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.55, 0.80], [28, 0])
  const cueOpacity = useTransform(scrollYProgress, [0.70, 0.88], [0, 1])

  // Sawtooth jagged torn bottom via CSS clip-path
  const jaggedClipPath = `polygon(
    0% 0%,
    100% 0%,
    100% calc(100% - 12px),
    97% 100%, 94% calc(100% - 12px), 91% 100%, 88% calc(100% - 12px),
    85% 100%, 82% calc(100% - 12px), 79% 100%, 76% calc(100% - 12px),
    73% 100%, 70% calc(100% - 12px), 67% 100%, 64% calc(100% - 12px),
    61% 100%, 58% calc(100% - 12px), 55% 100%, 52% calc(100% - 12px),
    49% 100%, 46% calc(100% - 12px), 43% 100%, 40% calc(100% - 12px),
    37% 100%, 34% calc(100% - 12px), 31% 100%, 28% calc(100% - 12px),
    25% 100%, 22% calc(100% - 12px), 19% 100%, 16% calc(100% - 12px),
    13% 100%, 10% calc(100% - 12px), 7% 100%, 4% calc(100% - 12px),
    1% 100%, 0% calc(100% - 12px)
  )`

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <section
        aria-label="Projects to Certifications Transition"
        className="relative w-full bg-[var(--bg)] text-[var(--text)] py-20 px-4 sm:px-8 overflow-hidden select-none border-t border-[var(--border-subtle)] transition-colors duration-400"
      >
        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[var(--accent)] font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>yes, I kept every certificate. no, I'm not sorry.</span>
          </div>

          <div className="w-72 sm:w-88 bg-[#fbf9f2] text-[#1c1d1f] font-mono text-left px-5 sm:px-7 pt-5 pb-8 border-x border-[#ebe7dc] shadow-2xl" style={{ clipPath: jaggedClipPath }}>
            <div className="text-center pb-3 mb-3 border-b border-dashed border-neutral-300">
              <div className="text-[11px] font-bold tracking-widest text-neutral-800">DICKSON ELECTRONIC ARCHIVE</div>
              <div className="text-[9px] text-neutral-500 tracking-wider mt-0.5">POS #01 · AUTH: PASS · TRICHY NODE</div>
            </div>
            <div className="space-y-2 text-xs sm:text-[13px]">
              <div className="font-bold text-[11px] sm:text-xs text-neutral-900 border-b border-dashed border-neutral-200 pb-1.5">DICKSON E — OFFICIAL PROOF OF CURIOSITY</div>
              <div className="flex justify-between text-neutral-700"><span>PROJECTS SHIPPED</span><span>8</span></div>
              <div className="flex justify-between text-neutral-700"><span>HACKATHONS SURVIVED</span><span>6</span></div>
              <div className="flex justify-between text-neutral-700"><span>CERTIFICATES EARNED</span><span>30</span></div>
              <div className="flex justify-between text-neutral-700"><span>COFFEE CONSUMED</span><span className="bg-neutral-900 text-neutral-900 px-1 py-0.5 rounded-sm">REDACTED</span></div>
              <div className="flex justify-between font-semibold"><span className="text-neutral-900">STATUS</span><span className="text-[#0891b2] font-bold">... STILL CURIOUS</span></div>
              <div className="text-center font-bold text-[11px] sm:text-xs pt-2 border-t border-dashed border-neutral-300 text-neutral-800">*** THANK YOU FOR SCROLLING ***</div>
            </div>
          </div>

          <div className="mt-10 text-center max-w-3xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[var(--textTitle)]">
              THE PAPER TRAIL OF A <span className="text-[#f0a93a] drop-shadow-[0_0_25px_rgba(240,169,58,0.5)]">RELENTLESS</span> BUILDER
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[var(--textLight)]">
              30 verified credentials across AI, Cloud, Microservices, Data Science, and Hackathon arena battles.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      id="receipt-transition"
      aria-label="Projects to Certifications Transition"
      className="relative w-full min-h-[92vh] py-20 sm:py-24 px-4 sm:px-8 bg-[var(--bg)] text-[var(--text)] select-none border-t border-[var(--border-subtle)] transition-colors duration-400 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Glows: Cyan & Amber (Exact Hero Palette Match) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(240,169,58,0.05),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10">
        
        {/* Small Mono Line Above Dispenser: Vivid Cyan with Pulsing Dot */}
        <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[var(--accent)] font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)] animate-pulse" />
          <span>yes, I kept every certificate. no, I'm not sorry.</span>
        </div>

        {/* Physical Printer Dispenser Slot & Rolled Bundle */}
        <div className="relative w-72 sm:w-88 flex flex-col items-center">
          
          {/* Scrolled Paper Roll Bundle Inside Feeder Slot */}
          <motion.div
            style={{ scaleX: rollScale, opacity: rollOpacity }}
            className="w-48 h-2 rounded-full bg-[#eee9dc] border border-[#d8d3c5] shadow-inner mb-0.5 pointer-events-none z-30"
            title="Paper Feed Core"
          />

          {/* Printer Dispenser Mouth (Front Housing) */}
          <div className="relative z-30 w-full h-4 bg-[#0d1015] dark:bg-[#0c0f12] border border-neutral-700/60 dark:border-white/10 ring-1 ring-[var(--accent)]/30 rounded-t-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center">
            {/* Paper slit opening */}
            <div className="w-[90%] h-1 bg-[#020406] rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,1)]" />
          </div>

          {/* Thermal Receipt Paper Roll Container: Extrudes out smoothly with wobble in plain view */}
          <div className="w-full relative z-20 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.55)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
            <motion.div
              style={{
                height: paperHeight,
                opacity: paperOpacity,
                rotate: paperRotate,
                x: paperX,
                clipPath: jaggedClipPath,
                WebkitClipPath: jaggedClipPath,
              }}
              className="w-full bg-[#fbf9f2] text-[#1c1d1f] font-mono text-left px-5 sm:px-6 pt-3.5 pb-8 overflow-hidden shadow-inner border-x border-[#ebe7dc]"
            >
              {/* Subtle thermal paper watermark sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.02] pointer-events-none" />

              {/* Receipt Header: Appears at [0.06, 0.14] */}
              <PrintLine
                progress={scrollYProgress}
                range={[0.06, 0.14]}
                className="text-center pb-2 mb-2 border-b border-dashed border-neutral-300"
              >
                <div className="text-[10.5px] font-bold tracking-widest text-neutral-800">
                  DICKSON ELECTRONIC ARCHIVE
                </div>
                <div className="text-[8.5px] text-neutral-500 tracking-wider mt-0.5">
                  POS #01 · AUTH: PASS · TRICHY NODE
                </div>
                <div className="text-[8.5px] text-neutral-400 tracking-wider">
                  ================================
                </div>
              </PrintLine>

              {/* Line-by-Line Sequential Thermal Printing Driven by Scroll */}
              <div className="space-y-1.5 text-xs leading-relaxed">
                
                {/* Line 1: Header Title */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.12, 0.20]}
                  className="font-bold text-[10.5px] sm:text-xs text-neutral-900 border-b border-dashed border-neutral-200 pb-1 mb-1 tracking-tight"
                >
                  DICKSON E — OFFICIAL PROOF OF CURIOSITY
                </PrintLine>

                {/* Line 2: Projects Shipped */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.18, 0.26]}
                  className="flex items-center justify-between text-neutral-700 font-medium"
                >
                  <span>PROJECTS SHIPPED</span>
                  <span className="font-semibold text-neutral-900">......... 8</span>
                </PrintLine>

                {/* Line 3: Hackathons Survived */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.24, 0.32]}
                  className="flex items-center justify-between text-neutral-700 font-medium"
                >
                  <span>HACKATHONS SURVIVED</span>
                  <span className="font-semibold text-neutral-900">...... 6</span>
                </PrintLine>

                {/* Line 4: Certificates Earned */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.30, 0.38]}
                  className="flex items-center justify-between text-neutral-700 font-medium"
                >
                  <span>CERTIFICATES EARNED</span>
                  <span className="font-semibold text-neutral-900">...... 30</span>
                </PrintLine>

                {/* Line 5: Coffee Consumed (Classified Redacted) */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.36, 0.44]}
                  className="flex items-center justify-between text-neutral-700 font-medium"
                >
                  <span>COFFEE CONSUMED</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-neutral-400">..........</span>
                    <span
                      className="bg-neutral-900 text-neutral-900 px-1 py-0.5 rounded-sm select-none"
                      title="Classified"
                    >
                      REDACTED
                    </span>
                  </span>
                </PrintLine>

                {/* Line 6: Status Still Curious (Vibrant Cyan Highlight) */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.42, 0.50]}
                  className="flex items-center justify-between font-semibold"
                >
                  <span className="text-neutral-900">STATUS</span>
                  <span className="text-[#0891b2] dark:text-[#00e5ff] font-bold">
                    ... STILL CURIOUS
                  </span>
                </PrintLine>

                {/* Line 7: Thank You For Scrolling */}
                <PrintLine
                  progress={scrollYProgress}
                  range={[0.48, 0.56]}
                  className="text-center font-bold text-[10.5px] sm:text-xs pt-1.5 border-t border-dashed border-neutral-300 text-neutral-800 tracking-wider"
                >
                  *** THANK YOU FOR SCROLLING ***
                </PrintLine>
              </div>

              {/* Bottom Barcode & Serial ID */}
              <PrintLine
                progress={scrollYProgress}
                range={[0.54, 0.62]}
                className="mt-2.5 pt-2 border-t border-dashed border-neutral-300 flex flex-col items-center text-center text-neutral-400"
              >
                <div className="flex items-center gap-[2px] h-5 mb-1 opacity-75">
                  {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, i) => (
                    <div
                      key={i}
                      className="bg-neutral-800 h-full"
                      style={{ width: `${(w % 3) + 1.2}px` }}
                    />
                  ))}
                </div>
                <span className="text-[8px] tracking-widest font-mono text-neutral-500 uppercase">
                  VERIFIED BUILDER ID · #DE-2026-30
                </span>
              </PrintLine>
            </motion.div>
          </div>
        </div>

        {/* Phase 3: Big Display Heading (Appears right in the view space below the receipt) */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="mt-8 sm:mt-10 text-center max-w-3xl"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] uppercase font-sans text-[var(--textTitle)]">
            THE PAPER TRAIL OF A{' '}
            <span className="text-[#f0a93a] drop-shadow-[0_0_25px_rgba(240,169,58,0.5)]">
              RELENTLESS
            </span>{' '}
            BUILDER
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-mono text-[var(--textLight)] tracking-wide max-w-xl mx-auto">
            30 verified credentials across AI, Cloud, Microservices, Data Science, and Hackathon arena battles.
          </p>

          {/* Smooth scroll cue arrow */}
          <motion.div
            style={{ opacity: cueOpacity }}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="mt-4 inline-flex items-center justify-center text-[var(--accent)]"
          >
            <a
              href="#certifications"
              className="p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              title="Continue to Certifications"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
