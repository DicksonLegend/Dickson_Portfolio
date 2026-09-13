import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const Statement: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Subtle smooth scroll parallax
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.3, 1, 1, 0.3])

  return (
    <section
      ref={containerRef}
      id="statement"
      aria-label="Engineering Manifesto"
      className="relative min-h-screen w-full bg-[#060c0e] text-[var(--text)] flex flex-col justify-between py-12 md:py-16 select-none overflow-hidden"
    >
      {/* 1. Top Small Text: Exactly matching reference's "We build brands that triumph with emotion." */}
      <div className="w-full pt-4 md:pt-8 px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-[clamp(18px,1.6vw,30px)] leading-[1.3] tracking-[-0.02em] font-normal"
          style={{ fontFamily: "'Newsreader', Georgia, 'Times New Roman', serif" }}
        >
          Beyond code and algorithms
        </motion.p>
      </div>

      {/* 2. Middle Large Headline: Exactly 2 lines matching reference's "LET'S MAKE THEM / FEEL SOMETHING" */}
      <motion.div
        style={{ y, opacity }}
        className="my-auto w-full px-4 sm:px-8 md:pl-24 lg:pl-28 pr-4 sm:pr-8 md:pr-8 text-center flex flex-col items-center justify-center z-10 will-change-transform"
      >
        <h2
          className="w-full uppercase text-white font-bold tracking-[-0.04em] leading-[0.87] select-none text-[clamp(38px,6.8vw,140px)]"
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 700,
          }}
        >
          {/* Line 1 */}
          <span className="block whitespace-normal md:whitespace-nowrap">
            BUILDING INTELLIGENCE
          </span>
          {/* Line 2 */}
          <span className="block whitespace-normal md:whitespace-nowrap mt-2 sm:mt-3 md:mt-4">
            THAT SOLVES REAL-WORLD PROBLEMS
          </span>
        </h2>
      </motion.div>

      {/* 3. Bottom Minimal Transition Cue */}
      <div className="w-full pb-2 md:pb-4 px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 text-center z-10">
        <div className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.28em] text-[#3fae8e]/80 uppercase">
          <span>02 // SELECTED WORKS</span>
          <span className="w-8 h-px bg-[#3fae8e]/30" />
          <span className="text-white/40">SCROLL TO VIEW</span>
        </div>
      </div>
    </section>
  )
}
