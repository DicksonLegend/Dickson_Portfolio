import React, { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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

const DIVIDER_WORDS = ['LEARNED', 'EARNED', 'BUILT', 'SHIPPED', 'EVOLVED', 'PROVED', 'REPEAT']

const ITEM_HEIGHT = 48

const JAGGED_CLIP_PATH = `polygon(
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

export const HackathonsEditorialSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const rollRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
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

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Manage modal state: lock background scroll, hide floating navbar, and allow Escape to close
  useEffect(() => {
    if (selectedModalCert) {
      document.body.classList.add('cert-modal-open')
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedModalCert(null)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.classList.remove('cert-modal-open')
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.classList.remove('cert-modal-open')
      document.body.style.overflow = ''
    }
  }, [selectedModalCert])

  // Continuous, buttery-smooth GSAP ScrollTrigger timeline:
  // stageRef is pinned rock-solid at top: 0 via native compositor pin (zero shaking).
  // Step 1: Printer paper feeds out smoothly, thermal text prints, heading appears.
  // Step 2: The printer section itself lifts up smoothly as a curtain (yPercent: 0 -> -100),
  // directly unveiling the static white certifications section with all details pre-rendered.
  // Step 3: Once curtain has lifted, the hackathon list scrubs smoothly through items 1 to 6.
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!containerRef.current || !stageRef.current || !listRef.current) return

    const totalItems = HACKATHONS.length
    const totalDistance = (totalItems - 1) * ITEM_HEIGHT

    // Initial positions
    if (curtainRef.current) {
      gsap.set(curtainRef.current, { yPercent: 0 })
    }
    if (paperRef.current) {
      gsap.set(paperRef.current, {
        transformOrigin: 'top center',
        transformStyle: 'preserve-3d',
        scaleY: 0,
        rotateX: 0,
        y: 0,
        opacity: 0,
      })
    }
    if (rollRef.current) {
      gsap.set(rollRef.current, { scaleX: 1, opacity: 0.9 })
    }
    const lineElements = curtainRef.current?.querySelectorAll<HTMLElement>('.receipt-line-item')
    if (lineElements && lineElements.length > 0) {
      gsap.set(lineElements, { opacity: 0, y: 10 })
    }
    if (headingRef.current) {
      gsap.set(headingRef.current, { opacity: 0, y: 35 })
    }
    if (listRef.current) {
      gsap.set(listRef.current, {
        y: -(activeIndex * ITEM_HEIGHT),
      })
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stageRef.current,
          anticipatePin: 1,
          scrub: 0.4,
          onUpdate: (self) => {
            const listStartRatio = 0.50
            if (self.progress <= listStartRatio) {
              setActiveIndex(0)
            } else {
              const listProg = (self.progress - listStartRatio) / (1 - listStartRatio)
              const rawProgress = listProg * (totalItems - 1)
              const currentIdx = Math.min(totalItems - 1, Math.max(0, Math.round(rawProgress)))
              setActiveIndex(currentIdx)
            }
          },
        },
      })

      // Step 1: Receipt unrolling & line items printing
      if (paperRef.current) {
        tl.to(
          paperRef.current,
          {
            opacity: 1,
            scaleY: 1,
            rotateX: 0,
            y: 0,
            duration: 1.4,
            ease: 'power2.out',
            onStart: () => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('trigger-cert-achievement'))
              }
            },
          },
          0
        )
        // Subtle paper feeder jitter
        tl.to(
          paperRef.current,
          {
            keyframes: [
              { rotateZ: 0, x: 0 },
              { rotateZ: -0.6, x: -1.2 },
              { rotateZ: 0.6, x: 1.2 },
              { rotateZ: -0.3, x: -0.6 },
              { rotateZ: 0.3, x: 0.6 },
              { rotateZ: 0, x: 0 },
            ],
            duration: 1.4,
            ease: 'none',
          },
          0
        )
      }

      if (rollRef.current) {
        tl.to(
          rollRef.current,
          {
            scaleX: 0.35,
            opacity: 0.25,
            duration: 1.3,
            ease: 'power2.out',
          },
          0
        )
      }

      if (lineElements && lineElements.length > 0) {
        tl.to(
          lineElements,
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power1.out',
          },
          0.3
        )
      }

      if (headingRef.current) {
        tl.to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.8
        )
      }

      // Step 2: The printer section itself lifts up smoothly to unveil the white certifications section
      if (curtainRef.current) {
        tl.to(
          curtainRef.current,
          {
            yPercent: -100,
            ease: 'power1.inOut',
            duration: 1.5,
          },
          '>+=0.25'
        )
      }

      // Step 3: Gliding list scrubs through items 1 to 6
      tl.to(
        listRef.current,
        {
          y: -totalDistance,
          ease: 'none',
          duration: 3.2,
        },
        curtainRef.current ? '>+=0.1' : 0
      )

      scrollTriggerRef.current = tl.scrollTrigger || null
    }, containerRef)

    ScrollTrigger.refresh()

    return () => {
      scrollTriggerRef.current = null
      ctx.revert()
    }
  }, [prefersReducedMotion])

  // Handle clicking a specific numbered item: smooth glide list and scroll window
  const handleItemClick = (index: number) => {
    setActiveIndex(index)
    if (!containerRef.current || prefersReducedMotion) return

    const totalItems = HACKATHONS.length
    const targetY = -(index * ITEM_HEIGHT)

    // Immediately glide the list element smoothly to the clicked item
    if (listRef.current) {
      gsap.to(listRef.current, {
        y: targetY,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    // Accurately scroll the window accounting for the initial printer reveal phase
    const st = scrollTriggerRef.current
    if (st) {
      const listStartRatio = 0.50
      const listProg = index / (totalItems - 1)
      const overallProgress = listStartRatio + listProg * (1 - listStartRatio)
      const targetScroll = st.start + overallProgress * (st.end - st.start)
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
    } else {
      const containerTop = containerRef.current.offsetTop
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight
      const targetScroll = containerTop + (index / (totalItems - 1)) * containerHeight
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
    }
  }

  const currentHackathon = HACKATHONS[activeIndex] || HACKATHONS[0]

  return (
    <section
      id="certifications"
      data-navbar-theme="light"
      ref={containerRef}
      aria-label="Hackathons and Arena Battle Records"
      className="relative w-full bg-white text-black select-none transition-colors duration-400"
      style={{
        height: prefersReducedMotion ? 'auto' : '480vh',
      }}
    >
      {/* Pinned Stage Canvas (Pure White, stark black high-fashion editorial) */}
      <div
        ref={stageRef}
        data-navbar-theme="light"
        className="relative w-full h-screen min-h-[680px] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 bg-white overflow-hidden"
      >
        {/* Dark Printer Curtain Panel (Seamless Transition from Projects to Certifications) */}
        {!prefersReducedMotion && (
          <div
            ref={curtainRef}
            id="certifications-curtain"
            className="absolute inset-0 bg-[#0c0f12] text-[#fbf9f2] z-40 overflow-hidden flex flex-col justify-center items-center px-4 py-8 sm:py-12 select-none border-b border-neutral-700/60 shadow-[0_25px_60px_rgba(0,0,0,0.9)] will-change-transform"
          >
            {/* Background Ambient Glows: Cyan & Amber */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(240,169,58,0.05),transparent_50%)] pointer-events-none" />

            <div className="relative max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10">
              {/* Small Mono Line Above Dispenser */}
              <div className="mb-2 sm:mb-3 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[var(--accent)] font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)] animate-pulse" />
                <span>yes, I kept every certificate. no, I'm not sorry.</span>
              </div>

              {/* Physical Printer Dispenser Slot & Feeder Bundle */}
              <div className="relative w-72 sm:w-88 flex flex-col items-center">
                <div
                  ref={rollRef}
                  className="w-48 h-2 rounded-full bg-[#eee9dc] border border-[#d8d3c5] shadow-inner mb-0.5 pointer-events-none z-30"
                  title="Paper Feed Core"
                />
                <div className="relative z-30 w-full h-4 bg-[#0d1015] border border-neutral-700/60 ring-1 ring-[var(--accent)]/30 rounded-t-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center">
                  <div className="w-[90%] h-1 bg-[#020406] rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,1)]" />
                </div>

                {/* 3D Folding & Sliding Receipt Paper */}
                <div
                  className="w-full relative z-20 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] -mt-1"
                  style={{ perspective: '1200px' }}
                >
                  <div
                    ref={paperRef}
                    style={{
                      clipPath: JAGGED_CLIP_PATH,
                      WebkitClipPath: JAGGED_CLIP_PATH,
                      transformOrigin: 'top center',
                      transformStyle: 'preserve-3d',
                    }}
                    className="w-full bg-[#fbf9f2] text-[#1c1d1f] font-mono text-left px-5 sm:px-6 pt-3 pb-6 sm:pb-7 overflow-hidden shadow-inner border-x border-[#ebe7dc] relative"
                  >
                    {/* Subtle paper watermark sheen */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.02] pointer-events-none" />

                    {/* Simulated Paper Fold Creases */}
                    <div className="absolute top-[32%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.07] to-transparent pointer-events-none shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
                    <div className="absolute top-[64%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.07] to-transparent pointer-events-none shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />

                    {/* Receipt Header */}
                    <div className="receipt-line-item text-center pb-2 mb-2 border-b border-dashed border-neutral-300">
                      <div className="text-[10px] sm:text-[10.5px] font-bold tracking-widest text-neutral-800">
                        DICKSON ELECTRONIC ARCHIVE
                      </div>
                      <div className="text-[8px] sm:text-[8.5px] text-neutral-500 tracking-wider mt-0.5">
                        POS #01 · AUTH: PASS · TRICHY NODE
                      </div>
                      <div className="text-[8px] sm:text-[8.5px] text-neutral-400 tracking-wider">
                        ================================
                      </div>
                    </div>

                    {/* Line-by-Line Thermal Lines */}
                    <div className="space-y-1 sm:space-y-1.5 text-xs leading-relaxed">
                      <div className="receipt-line-item font-bold text-[10px] sm:text-[11px] text-neutral-900 border-b border-dashed border-neutral-200 pb-1 mb-1 tracking-tight">
                        DICKSON E — OFFICIAL PROOF OF CURIOSITY
                      </div>
                      <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium text-[11px] sm:text-xs">
                        <span>PROJECTS SHIPPED</span>
                        <span className="font-semibold text-neutral-900">......... 8</span>
                      </div>
                      <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium text-[11px] sm:text-xs">
                        <span>HACKATHONS SURVIVED</span>
                        <span className="font-semibold text-neutral-900">...... 6</span>
                      </div>
                      <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium text-[11px] sm:text-xs">
                        <span>CERTIFICATES EARNED</span>
                        <span className="font-semibold text-neutral-900">...... 30</span>
                      </div>
                      <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium text-[11px] sm:text-xs">
                        <span>COFFEE CONSUMED</span>
                        <span className="inline-flex items-center gap-1">
                          <span className="text-neutral-400">..........</span>
                          <span className="bg-neutral-900 text-neutral-900 px-1 py-0.5 rounded-sm select-none" title="Classified">
                            REDACTED
                          </span>
                        </span>
                      </div>
                      <div className="receipt-line-item flex items-center justify-between font-semibold text-[11px] sm:text-xs">
                        <span className="text-neutral-900">STATUS</span>
                        <span className="text-[#0891b2] font-bold">
                          ... STILL CURIOUS
                        </span>
                      </div>
                      <div className="receipt-line-item text-center font-bold text-[10px] sm:text-[10.5px] pt-1 border-t border-dashed border-neutral-300 text-neutral-800 tracking-wider">
                        *** THANK YOU FOR SCROLLING ***
                      </div>
                    </div>

                    {/* Bottom Barcode & Serial ID */}
                    <div className="receipt-line-item mt-2 pt-1.5 border-t border-dashed border-neutral-300 flex flex-col items-center text-center text-neutral-400">
                      <div className="flex items-center gap-[2px] h-4 sm:h-5 mb-1 opacity-75">
                        {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, i) => (
                          <div key={i} className="bg-neutral-800 h-full" style={{ width: `${(w % 3) + 1.2}px` }} />
                        ))}
                      </div>
                      <span className="text-[7.5px] sm:text-[8px] tracking-widest font-mono text-neutral-500 uppercase">
                        VERIFIED BUILDER ID · #DE-2026-30
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Display Heading */}
              <div ref={headingRef} className="mt-5 sm:mt-7 text-center max-w-3xl">
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] uppercase font-sans text-white">
                  THE PAPER TRAIL OF A{' '}
                  <span className="text-[#f0a93a] drop-shadow-[0_0_25px_rgba(240,169,58,0.5)]">
                    RELENTLESS
                  </span>{' '}
                  BUILDER
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-mono text-neutral-400 tracking-wide max-w-xl mx-auto">
                  30 verified credentials across AI, Cloud, Microservices, Data Science, and Hackathon arena battles.
                </p>

                {/* Smooth scroll cue arrow */}
                <div className="mt-3 inline-flex items-center justify-center text-[var(--accent)] animate-bounce">
                  <button
                    type="button"
                    onClick={() => {
                      if (scrollTriggerRef.current) {
                        const st = scrollTriggerRef.current
                        const targetScroll = st.start + 0.50 * (st.end - st.start)
                        window.scrollTo({ top: targetScroll, behavior: 'smooth' })
                      }
                    }}
                    className="p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
                    title="Continue to Certifications"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Cyan accent hairline along bottom border */}
            <div className="absolute bottom-0 inset-x-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent pointer-events-none" />
          </div>
        )}

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
          <div className="w-full border-t border-black relative z-30 pointer-events-none" />

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
                  clipPath: 'inset(-145px 0 0 0)',
                }}
              >
                <div
                  ref={listRef}
                  className="flex flex-col will-change-transform"
                >
                  {HACKATHONS.map((item, idx) => {
                    const isActive = activeIndex === idx
                    const isPast = idx < activeIndex
                    const distanceInPast = activeIndex - idx

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleItemClick(idx)}
                        disabled={isPast}
                        className={`h-[48px] flex items-baseline gap-4 text-left transition-all duration-300 focus:outline-none ${
                          isActive
                            ? 'text-black opacity-100 scale-100 cursor-pointer'
                            : isPast
                            ? distanceInPast === 1
                              ? 'text-neutral-400 opacity-35 scale-[0.98] pointer-events-none select-none'
                              : distanceInPast === 2
                              ? 'text-neutral-300 opacity-20 scale-[0.97] pointer-events-none select-none'
                              : distanceInPast === 3
                              ? 'text-neutral-200 opacity-10 scale-[0.96] pointer-events-none select-none'
                              : 'opacity-0 pointer-events-none select-none invisible'
                            : 'text-neutral-400 hover:text-neutral-600 opacity-30 hover:opacity-75 scale-[0.98] cursor-pointer'
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

        {/* Bottom Area: Editorial 5-Word Running Loop Marquee (Right to Left) */}
        <div className="w-full pt-4 pb-1 sm:pb-2 overflow-hidden select-none pointer-events-none">
          <div className="flex w-max animate-marquee-left">
            {/* Track 1 */}
            <div className="flex items-center shrink-0 gap-10 sm:gap-16 md:gap-24 lg:gap-28 pr-10 sm:pr-16 md:pr-24 lg:pr-28">
              {[...DIVIDER_WORDS, ...DIVIDER_WORDS].map((word, idx) => (
                <span
                  key={`track1-${idx}`}
                  className="font-bold uppercase text-black tracking-[-0.03em] text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl whitespace-nowrap"
                  style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Track 2 (Seamless loop clone) */}
            <div className="flex items-center shrink-0 gap-10 sm:gap-16 md:gap-24 lg:gap-28 pr-10 sm:pr-16 md:pr-24 lg:pr-28" aria-hidden="true">
              {[...DIVIDER_WORDS, ...DIVIDER_WORDS].map((word, idx) => (
                <span
                  key={`track2-${idx}`}
                  className="font-bold uppercase text-black tracking-[-0.03em] text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl whitespace-nowrap"
                  style={{
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal (Portaled directly to document.body) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedModalCert && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedModalCert(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
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
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
