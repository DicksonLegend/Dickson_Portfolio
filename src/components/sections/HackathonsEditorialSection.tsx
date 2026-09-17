import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink,
  Eye,
  X,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface HackathonItem {
  id: string
  number: string
  title: string
  shortTitle: string
  host: string
  location: string
  award: string
  date: string
  image: string
  pdfPath?: string
  credentialId?: string
  projectTitle: string
  projectDesc: string
  tags: string[]
}

const HACKATHONS: HackathonItem[] = [
  {
    id: 'genai-exchange-2025',
    number: '1',
    title: 'Gen AI Exchange Hackathon 2025',
    shortTitle: 'Gen AI Exchange',
    host: 'Google Cloud & Hack2skill',
    location: 'Virtual National Arena',
    award: 'Official Prototype Finalist',
    date: 'Jan 14, 2026',
    image: '/Dickson_Hackathon_Certificates/GenAI-Exchange_Hackathon.jpeg',
    credentialId: '2025H2S08GH-P701797',
    projectTitle: 'Artisan AI Marketplace Assistant',
    projectDesc: 'Intelligent generative commerce assistant enabling local artisans to catalog, price, and translate craft inventory in real-time.',
    tags: [
      'Google Cloud & Hack2skill',
      'Vertex AI & Gemini Pro',
      'Multilingual AI Assistant',
      'Cloud Run Microservices',
      'Rapid 48-Hour Sprint',
      'Credential #2025H2S08GH',
    ],
  },
  {
    id: 'vibe-hacks-2',
    number: '2',
    title: 'Vibe Hacks 2.0 National Hackathon',
    shortTitle: 'Vibe Hacks 2.0',
    host: 'HackWithIndia',
    location: 'National Offline Arena',
    award: 'Top 1,000 of 3,000+ Teams Nationwide',
    date: 'Feb 18, 2026',
    image: '/Dickson_Hackathon_Certificates/Vibe_Hacks_Hackathon-1.png',
    pdfPath: '/Dickson_Hackathon_Certificates/Vibe_Hacks_Hackathon.pdf',
    projectTitle: 'Next-Gen Civic Incident Navigator',
    projectDesc: 'Offline-resilient civic grievance router connecting citizens directly with rapid municipal response dispatchers.',
    tags: [
      'HackWithIndia Arena',
      'Top 1,000 / 3,000+ Nationwide',
      '36-Hour Continuous Sprint',
      'Offline-First Local Architecture',
      'React & Distributed Backend',
      'National Stage Evaluation',
    ],
  },
  {
    id: 'sih-internal-2025',
    number: '3',
    title: 'Smart India Hackathon (SIH) 2025',
    shortTitle: 'Smart India Hackathon',
    host: 'Karunya Deemed University & AICTE',
    location: 'Coimbatore, India',
    award: 'University Qualifier for Nationals',
    date: 'Sep 27, 2025',
    image: '/Dickson_Hackathon_Certificates/SIH_Internal_Hackathon.jpeg',
    credentialId: 'URK23AI1072',
    projectTitle: 'Intelligent Edge Telemetry Node',
    projectDesc: 'Edge-accelerated IoT sensor processing platform for sustainable public infrastructure monitoring and predictive maintenance.',
    tags: [
      'AICTE & Ministry of Education',
      'University Internal Qualifier',
      'Team Lead & System Architect',
      'Edge Computing & Embedded AI',
      'National Round Candidate',
      'Student Reg: URK23AI1072',
    ],
  },
  {
    id: 'innovate-x-2025',
    number: '4',
    title: 'INNOVATE-X 48-Hour Hackathon',
    shortTitle: 'INNOVATE-X',
    host: 'Karunya Deemed University (DSCS & ATOM)',
    location: 'Coimbatore, India',
    award: 'Intensive Sprint Participant',
    date: 'Sep 2–3, 2025',
    image: '/Dickson_Hackathon_Certificates/Innovate-X-1.png',
    pdfPath: '/Dickson_Hackathon_Certificates/Innovate-X.pdf',
    projectTitle: 'Predictive Data Operations Suite',
    projectDesc: 'Automated pipeline monitoring dashboard with predictive metric anomaly detection and fault isolation.',
    tags: [
      'DSCS & ATOM Society',
      '48-Hour Intensive Marathon',
      'Data Engineering Pipeline',
      'Fast Analytics Visualization',
      'Cross-Disciplinary Teamwork',
      'Official Commendation',
    ],
  },
  {
    id: 'g-hacks-2025',
    number: '5',
    title: 'G-Hacks 24H Continuous Hackathon',
    shortTitle: 'G-Hacks 24H',
    host: 'Karunya Institute of Technology & Sciences',
    location: 'Coimbatore, India',
    award: '24-Hour Non-Stop Build Finisher',
    date: 'Sep 18–19, 2025',
    image: '/Dickson_Hackathon_Certificates/G-Hacks_Hackathon-1.png',
    pdfPath: '/Dickson_Hackathon_Certificates/G-Hacks_Hackathon.pdf',
    credentialId: 'G-K_Hacks_2025_0257',
    projectTitle: 'Microservices Resiliency Gateway',
    projectDesc: 'High-throughput event-driven microservices prototype with real-time health telemetry and circuit breakers.',
    tags: [
      'KITS CSE & AI Labs',
      '24-Hour Non-Stop Coding Sprint',
      'Event-Driven Microservices',
      'Real-Time WebSocket Streams',
      'Rapid Iteration & Pitch',
      'Verified: #G-K_Hacks_2025_0257',
    ],
  },
  {
    id: 'bi3-byte-beats',
    number: '6',
    title: 'Bi3 Byte Beats Industry Hackathon',
    shortTitle: 'Bi3 Byte Beats',
    host: 'Bi3 Technologies India & Karunya Univ',
    location: 'Trichy / Coimbatore',
    award: 'Industry Track Competitor',
    date: '2025',
    image: '/Dickson_Hackathon_Certificates/Bi3_Byte_Beats.jpeg',
    projectTitle: 'Enterprise Data Integration Bridge',
    projectDesc: 'Enterprise-grade ETL pipeline connecting disparate legacy data stores into unified, secure API endpoints.',
    tags: [
      'Bi3 Technologies India',
      'Enterprise Corporate Challenge',
      'Scalable Cloud Architecture',
      'API Design & Security Patterns',
      'Industry Expert Mentorship',
      'Official Credential of Merit',
    ],
  },
]

const PARTNER_LOGOS = [
  'GOOGLE CLOUD',
  'AICTE',
  'HACKWITHINDIA',
  'KARUNYA UNIVERSITY',
  'BI3 TECHNOLOGIES',
  'DEVPOST',
  'NVIDIA DLI',
]

const ITEM_HEIGHT = 48

export const HackathonsEditorialSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedModalCert, setSelectedModalCert] = useState<HackathonItem | null>(null)

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

  // Continuous, buttery-smooth GSAP ScrollTrigger timeline
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!containerRef.current || !stageRef.current || !listRef.current) return

    const totalItems = HACKATHONS.length
    const totalDistance = (totalItems - 1) * ITEM_HEIGHT

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stageRef.current,
          anticipatePin: 1,
          scrub: 0.4, // Buttery smooth lag-behind lerp scrub for physical weight
          onUpdate: (self) => {
            // Continuously map scroll progress to active index [0..5]
            const rawProgress = self.progress * (totalItems - 1)
            const currentIdx = Math.min(totalItems - 1, Math.max(0, Math.round(rawProgress)))
            setActiveIndex(currentIdx)
          },
        },
      })

      // Continuous linear list translation - moves on every single scroll pixel!
      tl.to(listRef.current, {
        y: -totalDistance,
        ease: 'none',
        duration: 1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Handle clicking a specific numbered item
  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    if (!containerRef.current || prefersReducedMotion) return

    const totalItems = HACKATHONS.length
    const containerTop = containerRef.current.offsetTop
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight
    const targetScroll = containerTop + (index / (totalItems - 1)) * containerHeight

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }

  const currentHackathon = HACKATHONS[activeIndex] || HACKATHONS[0]

  return (
    <section
      id="certifications"
      ref={containerRef}
      aria-label="Hackathons and Arena Battle Records"
      className="relative w-full bg-white text-black select-none transition-colors duration-400"
      style={{
        height: prefersReducedMotion ? 'auto' : '300vh',
      }}
    >
      {/* Pinned Stage Canvas (Pure White, stark black high-fashion editorial) */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[680px] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 bg-white overflow-hidden"
      >
        {/* Top Area: Large Impact Headline with tight leading */}
        <div className="w-full pt-10 sm:pt-14 md:pt-16">
          <h2
            className="w-full uppercase text-black font-bold tracking-[-0.04em] leading-[0.84] select-none text-[clamp(32px,5.2vw,76px)]"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <span className="block">FROM PROMPTS TO PRODUCTION.</span>
            <span className="block mt-1 sm:mt-1.5">PROVEN UNDER PRESSURE.</span>
          </h2>
        </div>

        {/* Center Interactive Layout (Separated by the horizontal black border line) */}
        <div className="relative w-full my-auto">
          
          {/* Buffer space above line (where items float when scrolled up) */}
          <div className="w-full h-24 sm:h-28 md:h-32 relative pointer-events-none" />

          {/* Horizontal Crisp Black Dividing Rule (Separates past scrolled items from active items) */}
          <div className="w-full border-t border-black relative z-10" />

          {/* Lower Active Area: Active item directly under the line + upcoming items + image & tags */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-3 sm:pt-4 items-start min-h-[260px] relative z-20">
            
            {/* Column 1: Section Label ("Our services" -> "Our hackathons") */}
            <div className="col-span-12 md:col-span-2 pt-0.5">
              <span
                className="text-xs sm:text-sm text-neutral-800 font-medium tracking-tight block"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                Our hackathons
              </span>
            </div>

            {/* Column 2: Continuous Gliding List spanning across the horizontal line */}
            <div className="col-span-12 md:col-span-5 relative">
              {/* List container allows upward overflow so past items float above the line */}
              <div
                className="relative overflow-visible"
                style={{
                  // Smoothly clip past items if they scroll higher than 144px above the line
                  clipPath: 'inset(-144px 0 0 0)',
                }}
              >
                <div
                  ref={listRef}
                  className="flex flex-col will-change-transform"
                >
                  {HACKATHONS.map((item, idx) => {
                    const isActive = activeIndex === idx
                    const isPast = idx < activeIndex

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(idx)}
                        className={`h-[48px] flex items-baseline gap-4 text-left transition-all duration-300 focus:outline-none cursor-pointer ${
                          isActive
                            ? 'text-black opacity-100 scale-100'
                            : isPast
                            ? 'text-neutral-300 hover:text-neutral-500 opacity-40 hover:opacity-80 scale-[0.98]'
                            : 'text-neutral-400 hover:text-neutral-600 opacity-30 hover:opacity-75 scale-[0.98]'
                        }`}
                      >
                        {/* Number */}
                        <span
                          className={`font-sans transition-colors ${
                            isActive
                              ? 'font-bold text-2xl sm:text-3xl md:text-4xl text-black'
                              : 'font-medium text-xl sm:text-2xl md:text-3xl'
                          }`}
                          style={{
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {item.number}
                        </span>

                        {/* Title */}
                        <span
                          className={`font-sans tracking-tight transition-colors ${
                            isActive
                              ? 'font-extrabold text-2xl sm:text-3xl md:text-4xl text-black drop-shadow-sm'
                              : 'font-medium text-xl sm:text-2xl md:text-3xl'
                          }`}
                          style={{
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {item.shortTitle}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Column 3: Right Side Showcase (Certificate Image + Side Description Tags) */}
            <div className="col-span-12 md:col-span-5 flex flex-col sm:flex-row items-start gap-6 lg:gap-8 justify-end">
              
              {/* Certificate Preview Card */}
              <div className="relative group w-full sm:w-56 md:w-60 lg:w-64 flex-shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHackathon.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-[0_16px_36px_rgba(0,0,0,0.08)] cursor-pointer"
                    onClick={() => setSelectedModalCert(currentHackathon)}
                  >
                    {/* Certificate Aspect Ratio Frame */}
                    <div className="relative aspect-[1.38/1] w-full overflow-hidden bg-neutral-100 flex items-center justify-center p-1.5">
                      <img
                        src={currentHackathon.image}
                        alt={currentHackathon.title}
                        className="w-full h-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Hover Overlay Hint */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-semibold">
                        <Eye className="w-4 h-4" />
                        <span>Enlarge</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Side Description Tags (Clean stacked lines matching TinyWins) */}
              <div className="flex flex-col justify-start text-left max-w-xs pt-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHackathon.id + '-meta'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                    className="space-y-1.5"
                  >
                    {currentHackathon.tags.map((tag) => (
                      <div
                        key={tag}
                        className="text-xs sm:text-[13px] text-neutral-800 font-medium tracking-tight leading-snug"
                        style={{
                          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        }}
                      >
                        {tag}
                      </div>
                    ))}

                    {/* Action link */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedModalCert(currentHackathon)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-black hover:text-cyan-600 transition-colors cursor-pointer group"
                      >
                        <span>INSPECT CREDENTIAL</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Area: Monochrome Partner / Host Ribbon (TinyWins Style) */}
        <div className="w-full pt-4 pb-2 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
          <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 font-semibold">
            VERIFIED PARTICIPATION IN NATIONAL & UNIVERSITY INITIATIVES
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[11px] tracking-wider uppercase font-bold text-neutral-600">
            {PARTNER_LOGOS.map((logo) => (
              <span key={logo} className="hover:text-black transition-colors">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedModalCert && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedModalCert(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-white text-neutral-900 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[92vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-black text-white px-2 py-0.5 rounded">
                      HACKATHON 0{selectedModalCert.number}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">{selectedModalCert.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-black mt-1">
                    {selectedModalCert.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedModalCert(null)}
                  className="p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Full Image Display */}
              <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-100 flex items-center justify-center">
                <img
                  src={selectedModalCert.image}
                  alt={selectedModalCert.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Modal Footer: Structured Metadata */}
              <div className="p-4 sm:p-6 bg-white border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col text-left">
                  <div className="text-xs font-bold text-neutral-800">
                    Host: {selectedModalCert.host}
                  </div>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    {selectedModalCert.projectTitle} · {selectedModalCert.projectDesc}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedModalCert.pdfPath && (
                    <a
                      href={selectedModalCert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Original PDF</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedModalCert(null)}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
