import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export const ReceiptTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.25 })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })
  const [receiptComplete, setReceiptComplete] = useState(() => {
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
        if (e.matches) setReceiptComplete(true)
      }
      mediaQuery.addEventListener('change', handleMediaChange)
      return () => mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  // When in view and not reduced motion, schedule completion after thermal printing
  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      const timer = setTimeout(() => {
        setReceiptComplete(true)
      }, 2600)
      return () => clearTimeout(timer)
    }
  }, [isInView, prefersReducedMotion])

  const receiptLines = [
    { text: 'DICKSON E — OFFICIAL PROOF OF CURIOSITY', isHeader: true },
    { text: 'PROJECTS SHIPPED ......... 8' },
    { text: 'HACKATHONS SURVIVED ...... 6' },
    { text: 'CERTIFICATES EARNED ...... 30' },
    { text: 'COFFEE CONSUMED .......... [REDACTED]', isRedacted: true },
    { text: 'STATUS ................... STILL CURIOUS', isHighlight: true },
    { text: '*** THANK YOU FOR SCROLLING ***', isFooter: true },
  ]

  // Tooth sawtooth jagged torn bottom
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

  return (
    <section
      ref={containerRef}
      aria-label="Projects to Certifications Transition"
      className="relative w-full bg-[#0a1315] text-white py-24 sm:py-32 px-4 sm:px-8 overflow-hidden select-none border-t border-[#142327]"
    >
      {/* Background Ambience: Subtle Radial Glow & Retro Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(240,169,58,0.04),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* Small Mono Jade Line Above Dispenser */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-4 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-emerald-400/90 font-medium"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>yes, I kept every certificate. no, I'm not sorry.</span>
        </motion.div>

        {/* Physical Printer Dispenser Slot */}
        <div className="relative w-72 sm:w-96 flex flex-col items-center">
          {/* Printer machine casing slot mouth */}
          <div className="w-full h-3.5 bg-[#050b0c] border border-[#1a2e33] rounded-t-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.6)] flex items-center justify-center">
            {/* Slot slit opening */}
            <div className="w-[88%] h-1 bg-[#010405] rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,1)]" />
          </div>

          {/* Thermal Receipt Paper Roll Container */}
          <div
            className="w-full relative filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
          >
            <motion.div
              initial={
                prefersReducedMotion
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              animate={
                isInView
                  ? prefersReducedMotion
                    ? { height: 'auto', opacity: 1 }
                    : {
                        height: 'auto',
                        opacity: 1,
                        rotate: [0, -0.4, 0.4, -0.25, 0.25, 0],
                        x: [0, -1, 1.2, -0.8, 0.8, 0],
                      }
                  : {}
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      height: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.2 },
                      rotate: { duration: 1.8, ease: 'linear' },
                      x: { duration: 1.8, ease: 'linear' },
                    }
              }
              style={{
                clipPath: jaggedClipPath,
                WebkitClipPath: jaggedClipPath,
              }}
              className="w-full bg-[#fbf9f2] text-[#1c1d1f] font-mono text-left px-5 sm:px-7 pt-5 pb-8 overflow-hidden shadow-inner border-x border-[#ebe7dc]"
            >
              {/* Subtle paper watermark texture lines */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.03] pointer-events-none" />

              {/* Receipt Header */}
              <div className="text-center pb-3 mb-3 border-b border-dashed border-neutral-300">
                <div className="text-[11px] font-bold tracking-widest text-neutral-800">
                  DICKSON ELECTRONIC ARCHIVE
                </div>
                <div className="text-[9px] text-neutral-500 tracking-wider mt-0.5">
                  POS #01 · AUTH: PASS · TRICHY NODE
                </div>
                <div className="text-[9px] text-neutral-400 tracking-wider">
                  ================================
                </div>
              </div>

              {/* Typed Lines (Staggered Animation) */}
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.22,
                      delayChildren: prefersReducedMotion ? 0 : 0.3,
                    },
                  },
                  hidden: {},
                }}
                className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed"
              >
                {receiptLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 4 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center justify-between ${
                      line.isHeader
                        ? 'font-bold text-[11px] sm:text-xs text-neutral-900 border-b border-dashed border-neutral-200 pb-2 mb-1 tracking-tight'
                        : line.isFooter
                        ? 'text-center justify-center font-bold text-[11px] sm:text-xs pt-3 border-t border-dashed border-neutral-300 text-neutral-800 tracking-wider'
                        : 'text-neutral-700 font-medium'
                    }`}
                  >
                    {line.isFooter ? (
                      <span>{line.text}</span>
                    ) : line.isRedacted ? (
                      <>
                        <span>COFFEE CONSUMED</span>
                        <span className="inline-flex items-center gap-1">
                          <span className="text-neutral-400">...</span>
                          <span
                            className="bg-neutral-900 text-neutral-900 px-1 py-0.5 rounded-sm select-none"
                            title="Classified Information"
                          >
                            REDACTED
                          </span>
                        </span>
                      </>
                    ) : line.isHighlight ? (
                      <>
                        <span className="font-semibold text-neutral-900">STATUS</span>
                        <span className="font-semibold text-emerald-800">... STILL CURIOUS</span>
                      </>
                    ) : (
                      <span>{line.text}</span>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Thermal Barcode */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: prefersReducedMotion ? 0 : 2.0, duration: 0.4 }}
                className="mt-5 pt-3 border-t border-dashed border-neutral-300 flex flex-col items-center text-center text-neutral-400"
              >
                {/* Decorative CSS barcode bars */}
                <div className="flex items-center gap-[2px] h-7 mb-1 opacity-75">
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
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Big Display Heading (Fades in after receipt finishes) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={
            receiptComplete
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16 text-center max-w-3xl"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] uppercase font-sans text-white">
            THE PAPER TRAIL OF A{' '}
            <span className="text-[#f0a93a] drop-shadow-[0_0_25px_rgba(240,169,58,0.5)]">
              RELENTLESS
            </span>{' '}
            BUILDER
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base font-mono text-neutral-400 tracking-wide max-w-xl mx-auto">
            30 verified credentials across AI, Cloud, Microservices, Data Science, and Hackathon arena battles.
          </p>

          {/* Smooth scroll cue arrow */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="mt-6 inline-flex items-center justify-center text-emerald-400"
          >
            <a
              href="#certifications"
              className="p-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
              title="Scroll to Certifications"
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
