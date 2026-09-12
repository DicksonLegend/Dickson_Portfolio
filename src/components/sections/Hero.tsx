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
    }, 3600)

    return () => clearInterval(interval)
  }, [])

  const currentRole = personalInfo.roles[roleIndex]

  const handleDownloadResume = () => {
    // Generate/download resume text or PDF trigger
    const link = document.createElement('a')
    link.href = '#download-resume'
    link.download = 'Dickson_E_Resume.pdf'
    // Create an informative alert/notice or download trigger
    window.open('https://github.com/DicksonLegend', '_blank')
  }

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-[100dvh] w-full flex items-center justify-between overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-400 pl-6 md:pl-28 lg:pl-36 pr-6 md:pr-12"
    >
      {/* 1. Left Content Area */}
      <div className="relative z-10 max-w-2xl pt-20 pb-16 md:py-24">
        {/* Eyebrow Name with Decoder Effect */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 flex items-center gap-2.5"
        >
          <span className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-[var(--text-muted)] font-medium">
            <DecoderText text={personalInfo.name.toUpperCase()} startDelay={300} speed={35} />
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
        </motion.div>

        {/* Main Heading with Two Rows & Extending Horizontal Line */}
        <div className="space-y-1 md:space-y-2">
          {/* Row 1: Primary Title + Extending Divider Line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--text)] leading-[1.08] select-none">
              AI Engineer
            </h1>

            {/* Extending horizontal rule matching reference */}
            <div className="hidden sm:block flex-1 max-w-xs h-[1px] bg-[var(--border)] relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/60" />
            </div>
          </motion.div>

          {/* Row 2: Rotating Disciplines with Cyan Block Mask Wipe & Decoder */}
          <div className="flex items-center gap-3 overflow-hidden h-[54px] sm:h-[72px] lg:h-[86px]">
            <span className="text-3xl sm:text-5xl lg:text-6xl font-extralight text-[var(--text-muted)] select-none">
              +
            </span>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRole}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-none select-none"
                >
                  <DecoderText
                    text={currentRole}
                    speed={28}
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
          className="mt-6 flex items-center gap-2 text-xs sm:text-sm font-mono text-[var(--text-muted)] tracking-wider"
        >
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
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
            className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/70 px-6 py-3.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 backdrop-blur-md focus:outline-none"
            title="Download Dickson E's Resume"
          >
            <Download className="w-4 h-4 text-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0.5" />
            <span>Download Resume</span>
          </button>
        </motion.div>
      </div>

      {/* 2. Right Side: 3D Organic WebGL Displacement Mesh Canvas */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-[60%] lg:w-[55%] h-full overflow-hidden pointer-events-none z-0 opacity-90 transition-opacity duration-500">
        <DisplacementMesh />
      </div>

      {/* 3. Bottom Minimal Scroll Indicator */}
      <motion.a
        href="#projects"
        aria-label="Scroll down to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors duration-300"
      >
        <div className="w-5 h-9 rounded-full border border-[var(--border)] flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
          />
        </div>
      </motion.a>
    </section>
  )
}
