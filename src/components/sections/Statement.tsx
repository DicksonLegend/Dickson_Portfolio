import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export const Statement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle parallax translation and scale for monumental depth
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.3, 1, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98])

  return (
    <section
      ref={containerRef}
      id="statement"
      aria-label="Engineering Manifesto"
      className="relative min-h-screen w-full bg-[#060c0e] text-[var(--text)] flex flex-col items-center justify-center px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 py-32 md:py-44 select-none overflow-hidden"
    >
      {/* Soft ambient center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(63,174,142,0.06),_transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(240,169,58,0.05),_transparent_65%)] pointer-events-none blur-3xl" />

      {/* Content wrapper with smooth scroll-driven momentum */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center will-change-transform"
      >
        {/* Small text matching reference screenshot:
            "Beyond code and algorithms" in elegant serif italic */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic font-normal text-white/75 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-normal mb-8 sm:mb-12 md:mb-14 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        >
          Beyond code and algorithms
        </motion.p>

        {/* Large monumental text matching reference:
            "BUILDING INTELLIGENCE THAT SOLVES REAL-WORLD PROBLEMS" in black grotesque typography */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-[-0.035em] sm:tracking-[-0.04em] leading-[0.92] sm:leading-[0.88] text-white uppercase text-center max-w-6xl mx-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
        >
          <span className="block">BUILDING INTELLIGENCE</span>
          <span className="block">THAT SOLVES</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-white/75">
            REAL-WORLD PROBLEMS
          </span>
        </motion.h2>

        {/* Minimal bottom scroll cue transitioning smoothly into the horizontal projects track */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-14 sm:mt-20 flex flex-col items-center gap-3 text-white/40 hover:text-white/80 transition-colors"
        >
          <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#3fae8e]">
            <span>02 // SELECTED ARCHITECTURES</span>
            <span className="w-8 h-px bg-[#3fae8e]/40" />
            <span className="text-white/40">EXPLORE WORK</span>
          </div>
          <ArrowDown className="w-4 h-4 text-[#f0a93a] animate-bounce mt-1" />
        </motion.div>
      </motion.div>
    </section>
  )
}
