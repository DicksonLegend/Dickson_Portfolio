import React, { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink,
  Eye,
  X,
  ShieldCheck,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface CourseCertItem {
  id: string
  number: string
  title: string
  shortTitle: string
  host: string
  date: string
  image: string
  pdfPath?: string
  credentialId?: string
  verifyUrl?: string
  tags: string[]
}

const COURSE_CERTS: CourseCertItem[] = [
  {
    id: 'azure-ai-fundamentals',
    number: '1',
    title: 'Microsoft Azure AI Fundamentals',
    shortTitle: 'Azure AI Fundamentals',
    host: 'Microsoft & Certiport',
    date: 'Apr 9, 2026',
    image: '/Course_Certificates_Images/azure_ai_fundamentals.png',
    pdfPath: '/Certificates/DIckson-Microsoft-certificate.pdf',
    credentialId: 'warrr-FahH',
    verifyUrl: 'https://verify.certiport.com',
    tags: [
      'Microsoft & Certiport Certified',
      'Credential Code: warrr-FahH',
      'Cloud Machine Learning & Vision',
      'Natural Language Processing & AI',
      'Certiport Verified & Verifiable',
    ],
  },
  {
    id: 'aws-ml-solutions',
    number: '2',
    title: 'AWS – Developing Machine Learning Solutions',
    shortTitle: 'AWS ML Solutions',
    host: 'Amazon Web Services (AWS)',
    date: 'Apr 06, 2026',
    image: '/Course_Certificates_Images/aws_machine_learning.png',
    pdfPath: '/Certificates/80452091-ae26-4539-a03c-096fbfd52c7d.pdf',
    credentialId: '80452091-ae26-4539-a03c',
    tags: [
      'Amazon Web Services Certified',
      'Credential: 80452091-ae26-4539',
      'Cloud ML Architecture & Pipelines',
      'Model Training & Endpoint Scaling',
      'Production AWS Cloud Proof',
    ],
  },
  {
    id: 'mongodb-genai-apps',
    number: '3',
    title: 'MongoDB – Building GenAI Apps Learning Path',
    shortTitle: 'MongoDB GenAI Apps',
    host: 'MongoDB University',
    date: 'Apr 06, 2026',
    image: '/Course_Certificates_Images/mongodb_genai_apps.png',
    pdfPath: '/Certificates/dickson-e-1a2f47c1-7f3d-4221-8fdc-d07a89d32db6-certificate.pdf',
    credentialId: 'MDB2bsn4a4tpr',
    tags: [
      'MongoDB University Learning Path',
      'Credential ID: MDB2bsn4a4tpr',
      'Atlas Vector Search & Indexing',
      'LLM Embeddings & Semantic Retrieval',
      'Enterprise GenAI Architecture',
    ],
  },
  {
    id: 'aws-microservices-cicd',
    number: '4',
    title: 'AWS Academy Graduate – Microservices & CI/CD Pipeline Builder',
    shortTitle: 'AWS Microservices & CI/CD',
    host: 'AWS Academy (Credly)',
    date: 'Apr 06, 2026',
    image: '/Course_Certificates_Images/aws_microservices_cicd.png',
    pdfPath: '/Certificates/AWS_Academy_Graduate___Microservices_and_CI_CD_Pipeline_Builder___Training_Badge_Badge20260406-30-tgyz4q.pdf',
    credentialId: 'N9tm4Kd6',
    verifyUrl: 'https://www.credly.com/go/N9tm4Kd6',
    tags: [
      'AWS Academy Graduate (Credly)',
      'Microservices & Automated CI/CD',
      'Containerization & Docker Workflows',
      'Infrastructure as Code & Pipelines',
      'Production Delivery & Ship Proof',
    ],
  },
  {
    id: 'mongodb-rag-apps',
    number: '5',
    title: 'Building RAG Apps Using MongoDB',
    shortTitle: 'Building RAG Apps',
    host: 'MongoDB (Credly)',
    date: 'Oct 25, 2025',
    image: '/Course_Certificates_Images/mongodb_rag_apps.png',
    pdfPath: '/Certificates/SkillsCert20251025-31-elxsju.pdf',
    credentialId: '1da987da-878c-45da-8c42',
    verifyUrl: 'https://www.credly.com/badges/1da987da-878c-45da-8c42-bf0e9d6da6a8',
    tags: [
      'MongoDB Credly Digital Badge',
      'Direct EduRAG Architecture Proof',
      'Hybrid Vector Search & Chunking',
      'Context Window Optimization',
      'Production RAG Pipeline Verified',
    ],
  },
  {
    id: 'mongodb-ai-agents',
    number: '6',
    title: 'Building AI Agents with MongoDB',
    shortTitle: 'Building AI Agents',
    host: 'MongoDB (Credly)',
    date: 'Oct 25, 2025',
    image: '/Course_Certificates_Images/mongodb_ai_agents.png',
    pdfPath: '/Certificates/SkillsCert20251025-31-z3vi08.pdf',
    credentialId: 'cea6e68d-9140-4ad2-802e',
    verifyUrl: 'https://www.credly.com/badges/cea6e68d-9140-4ad2-802e-5a31ecb68ae4',
    tags: [
      'MongoDB Credly Digital Badge',
      'Direct AIRA Autonomous Agent Proof',
      'Tool Calling & Multi-Agent Loops',
      'Persistent Stateful Agent Memory',
      'Autonomous System Engineering',
    ],
  },
  {
    id: 'prepinsta-mern-stack',
    number: '7',
    title: 'Full Stack Web Development MERN Stack',
    shortTitle: 'Full Stack MERN Stack',
    host: 'PrepInsta Technologies',
    date: 'Oct 27, 2025',
    image: '/Course_Certificates_Images/prepinsta_mern_stack.png',
    pdfPath: '/Certificates/certificate_Full Stack Web development MERN Stack_1634237.pdf',
    credentialId: '68ff9156d5fa55bf14baf580',
    tags: [
      'PrepInsta Technologies Certified',
      'Credential ID: 68ff9156d5fa',
      'Full-Stack React & Node.js REST',
      'MongoDB Production Data Layer',
      'End-to-End Web Engineering',
    ],
  },
]

const MIRRORED_DIVIDER_WORDS = [
  'VERIFIED',
  'ARCHITECTED',
  'SPECIALIZED',
  'DEPLOYED',
  'ENGINEERED',
  'CERTIFIED',
  'REPEAT',
]

const ITEM_HEIGHT = 48

export const CoursesEditorialSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedModalCert, setSelectedModalCert] = useState<CourseCertItem | null>(null)

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

  // Continuous, buttery-smooth GSAP ScrollTrigger timeline matching HackathonsEditorialSection exactly
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!containerRef.current || !stageRef.current || !listRef.current) return

    const totalItems = COURSE_CERTS.length
    const totalDistance = (totalItems - 1) * ITEM_HEIGHT

    // Initial position based on activeIndex
    gsap.set(listRef.current, {
      y: -(activeIndex * ITEM_HEIGHT),
    })

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageRef.current,
        anticipatePin: 1,
        scrub: 0.3,
        onUpdate: (self) => {
          const rawProgress = self.progress * (totalItems - 1)
          const currentIdx = Math.min(totalItems - 1, Math.max(0, Math.round(rawProgress)))
          setActiveIndex(currentIdx)

          // Continuous vertical translation: active item stays right under the line,
          // and previous items smoothly slide up past the black line into the buffer space
          if (listRef.current) {
            gsap.set(listRef.current, {
              y: -self.progress * totalDistance,
            })
          }
        },
      })

      scrollTriggerRef.current = st
    }, containerRef)

    // Ensure ScrollTrigger accurately accounts for the preceding pinned hackathon section
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

    const totalItems = COURSE_CERTS.length
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

    // Accurately scroll the window to the exact ScrollTrigger scroll position
    const st = scrollTriggerRef.current
    if (st) {
      const progress = index / (totalItems - 1)
      const targetScroll = st.start + progress * (st.end - st.start)
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

  const currentCert = COURSE_CERTS[activeIndex] || COURSE_CERTS[0]

  return (
    <section
      id="credentials"
      data-navbar-theme="light"
      ref={containerRef}
      aria-label="Official Technical Credentials & Accreditations"
      className="relative w-full bg-white text-black select-none transition-colors duration-400"
      style={{
        height: prefersReducedMotion ? 'auto' : '350vh',
      }}
    >
      {/* Pinned Stage Canvas (Pure White, stark black high-fashion editorial - Mirrored) */}
      <div
        ref={stageRef}
        data-navbar-theme="light"
        className="relative w-full h-screen min-h-[680px] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 bg-white overflow-hidden"
      >
        {/* Top Area: Large Impact Headline - Right Aligned (Mirrored) */}
        <div className="w-full pt-10 sm:pt-14 md:pt-16 flex flex-col items-end text-right">
          <h2
            className="w-full uppercase text-black font-bold tracking-[-0.04em] leading-[0.84] select-none text-[clamp(32px,5.2vw,76px)] text-right"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            <span className="block">TALK IS CHEAP.</span>
            <span className="block mt-1 sm:mt-1.5">HERE ARE THE OFFICIAL RECEIPTS.</span>
          </h2>
        </div>

        {/* Center Interactive Layout (Separated by the horizontal black border line) */}
        <div className="relative w-full my-auto">
          
          {/* Buffer space above line (where items float when scrolled up) */}
          <div className="w-full h-28 sm:h-32 md:h-36 relative pointer-events-none" />

          {/* Horizontal Crisp Black Dividing Rule */}
          <div className="w-full border-t border-black relative z-30 pointer-events-none" />

          {/* Mirrored Layout:
              - Left side (Cols 1-5): Description Tags on extreme left + Compact Certificate Preview Image
              - Center-Right (Cols 7-10): Scrolling vertical list of 7 Course Credentials (identical fonts & size to Hackathons)
              - Far Right (Cols 11-12): "Key credentials" section label
          */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 pt-3 sm:pt-4 items-start min-h-[260px] relative z-20">
            
            {/* Mirrored Left Column (Cols 1-5): Description Tags on Extreme Left + Compact Certificate Image */}
            <div className="col-span-12 md:col-span-5 flex flex-col sm:flex-row items-start gap-6 lg:gap-8 justify-start">
              
              {/* Side Description Tags (Placed at the EXTREME LEFT edge of the section!) */}
              <div className="flex flex-col justify-start text-left max-w-xs pt-1 order-2 sm:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCert.id + '-meta'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                    className="space-y-1.5"
                  >
                    {currentCert.tags.map((tag) => (
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
                        onClick={() => setSelectedModalCert(currentCert)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-black hover:text-cyan-600 transition-colors cursor-pointer group"
                      >
                        <span>INSPECT CREDENTIAL</span>
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Certificate Preview Card (Identical compact size to Hackathons: w-56 to w-64) */}
              <div className="relative group w-full sm:w-56 md:w-60 lg:w-64 flex-shrink-0 order-1 sm:order-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-[0_16px_36px_rgba(0,0,0,0.08)] cursor-pointer"
                    onClick={() => setSelectedModalCert(currentCert)}
                  >
                    {/* Certificate Aspect Ratio Frame */}
                    <div className="relative aspect-[1.38/1] w-full overflow-hidden bg-neutral-100 flex items-center justify-center p-1.5">
                      <img
                        src={currentCert.image}
                        alt={currentCert.title}
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

            </div>

            {/* Mirrored Right Column (Cols 6-10): Scrolling Course Titles Track (Shifted right for balanced editorial layout) */}
            <div className="col-span-12 md:col-span-5 relative md:pl-6 lg:pl-10 xl:pl-14 2xl:pl-16">
              <div
                className="relative overflow-visible"
                style={{
                  clipPath: 'inset(-145px -120px 0 0)',
                }}
              >
                <div
                  ref={listRef}
                  className="flex flex-col will-change-transform"
                >
                  {COURSE_CERTS.map((cert, idx) => {
                    const isActive = activeIndex === idx
                    const isPast = idx < activeIndex
                    const distanceInPast = activeIndex - idx

                    return (
                      <button
                        key={cert.id}
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
                          className={`font-sans transition-colors shrink-0 ${
                            isActive
                              ? 'font-bold text-2xl sm:text-3xl md:text-4xl text-black'
                              : 'font-medium text-xl sm:text-2xl md:text-3xl'
                          }`}
                          style={{
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {cert.number}
                        </span>

                        {/* Title Text */}
                        <span
                          className={`font-sans tracking-tight transition-colors whitespace-nowrap ${
                            isActive
                              ? 'font-extrabold text-2xl sm:text-3xl md:text-4xl text-black drop-shadow-sm'
                              : 'font-medium text-xl sm:text-2xl md:text-3xl'
                          }`}
                          style={{
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {cert.shortTitle}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Far Right: Section Label (Mirrors "Our hackathons" from the far left of the other section!) */}
            <div className="col-span-12 md:col-span-2 pt-0.5 text-left md:text-right">
              <span
                className="text-xs sm:text-sm text-neutral-800 font-medium tracking-tight block"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                Key credentials
              </span>
            </div>

          </div>

        </div>

        {/* Bottom Area: Editorial 7-Word Running Loop Marquee (Mirrored Left to Right) */}
        <div className="w-full pt-4 pb-1 sm:pb-2 overflow-hidden select-none pointer-events-none">
          <div className="flex w-max animate-marquee-right">
            {/* Track 1 */}
            <div className="flex items-center shrink-0 gap-10 sm:gap-16 md:gap-24 lg:gap-28 pr-10 sm:pr-16 md:pr-24 lg:pr-28">
              {[...MIRRORED_DIVIDER_WORDS, ...MIRRORED_DIVIDER_WORDS].map((word, idx) => (
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
              {[...MIRRORED_DIVIDER_WORDS, ...MIRRORED_DIVIDER_WORDS].map((word, idx) => (
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
                        CREDENTIAL 0{selectedModalCert.number}
                      </span>
                      <span className="text-xs font-mono text-neutral-500">{selectedModalCert.date}</span>
                      {selectedModalCert.credentialId && (
                        <span className="text-[10px] font-mono text-neutral-400">
                          ID: {selectedModalCert.credentialId}
                        </span>
                      )}
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
                      Issuer: {selectedModalCert.host}
                    </div>
                    <div className="text-xs text-neutral-600 mt-0.5">
                      {selectedModalCert.tags[0]} · {selectedModalCert.tags[2]}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {selectedModalCert.verifyUrl && (
                      <a
                        href={selectedModalCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors inline-flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Verify Credential</span>
                      </a>
                    )}
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
