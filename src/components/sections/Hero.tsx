import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DecoderText } from '@/components/ui/DecoderText'
import { DisplacementMesh } from '@/components/ui/DisplacementMesh'
import { personalInfo } from '@/data/portfolioData'
import { ArrowUpRight, Download, MapPin } from 'lucide-react'

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0)

  // Cycle through the 4 roles requested by the user
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [])

  const currentRole = personalInfo.roles[roleIndex]

  const handleDownloadResume = () => {
    window.open('https://github.com/DicksonLegend', '_blank')
  }

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-[100dvh] w-full flex items-center overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-400 px-6 md:px-16 lg:px-24 pt-16 select-none"
    >
      {/* 1. Fullscreen 3D WebGL Organic Displacement Mesh Canvas */}
      <DisplacementMesh />

      {/* 2. Left Content Container (Exact Hamish Williams hierarchy & spacing) */}
      <div className="relative z-10 max-w-5xl lg:max-w-6xl pt-16 pb-20 md:py-24">
        {/* Name: Scaled up to 1.5rem (24px) with 0.3em letter spacing matching hamishw.com */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-xl sm:text-2xl font-medium tracking-[0.3em] uppercase text-[var(--textLight)] inline-flex items-center gap-3">
            <DecoderText text={personalInfo.name.toUpperCase()} startDelay={400} speed={30} />
          </h1>
        </motion.div>

        {/* Main Heading: Two Large Lines with Horizontal Extension */}
        <div className="space-y-2 md:space-y-3">
          {/* Line 1: Primary Role + Animated Extending Horizontal Line */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-[var(--textTitle)] leading-[1.08] whitespace-nowrap">
              Developer
            </h2>

            {/* Extending horizontal rule directly from Hamish reference */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
              style={{ originX: 0 }}
              className="hidden sm:block flex-1 max-w-[280px] h-[2px] bg-white/20 ml-6 relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            </motion.div>
          </motion.div>

          {/* Line 2: Rotating Disciplines with Matching Giant Font & Cyan Mask Wipe */}
          <div className="flex items-center gap-3 md:gap-4 min-h-[52px] sm:min-h-[76px] md:min-h-[88px] xl:min-h-[104px] whitespace-nowrap overflow-visible">
            <span className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-[var(--textLight)] opacity-50 select-none">
              +
            </span>

            <div className="relative inline-block whitespace-nowrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tight text-[var(--textTitle)] leading-none whitespace-nowrap"
                >
                  <DecoderText
                    text={currentRole}
                    speed={24}
                    showBlockMask={true}
                    className="font-bold"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Small Line Below: Location, Undergrad & Batch details */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[var(--textLight)] tracking-wider"
        >
          <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <span>{personalInfo.subtitle}</span>
        </motion.div>

        {/* Action Buttons: Resume Download & View My Work */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {/* Primary CTA: View My Work */}
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent-glow)] hover:brightness-110 focus:outline-none"
          >
            <span>View My Work</span>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/15 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Secondary CTA: Download Resume */}
          <button
            onClick={handleDownloadResume}
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 px-6 py-3.5 text-sm font-medium text-[var(--textTitle)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 backdrop-blur-md focus:outline-none"
            title="Download Dickson E's Resume"
          >
            <Download className="w-4 h-4 text-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>Download Resume</span>
          </button>
        </motion.div>
      </div>

      {/* 3. Hamish Williams Signature Mouse Scroll Indicator */}
      <motion.a
        href="#projects"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[var(--textLight)] hover:text-[var(--accent)] transition-colors group cursor-pointer z-10"
        aria-label="Scroll to Projects"
      >
        <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <motion.div
            animate={{
              y: [0, 8, 0],
              opacity: [1, 0.2, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-1.5 rounded-full bg-current"
          />
        </div>
      </motion.a>
    </section>
  )
}
