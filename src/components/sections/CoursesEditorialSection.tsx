import React, { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink,
  Eye,
  X,
  Award,
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
  valueProp: string
  description: string
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
    valueProp: 'On Resume · Global Brand · Certiport Verifiable',
    description: 'Rigorous foundational certification covering core machine learning workloads, computer vision, natural language processing, and conversational AI services on Azure cloud.',
    tags: [
      'Certiport Verifiable',
      'Azure AI Services',
      'Machine Learning Workloads',
      'Computer Vision & NLP',
      'Conversational AI',
      'Global Microsoft Standard',
    ],
  },
  {
    id: 'aws-ml-solutions',
    number: '2',
    title: 'AWS – Developing Machine Learning Solutions',
    shortTitle: 'AWS Developing ML Solutions',
    host: 'Amazon Web Services (AWS)',
    date: 'Apr 06, 2026',
    image: '/Course_Certificates_Images/aws_machine_learning.png',
    pdfPath: '/Certificates/80452091-ae26-4539-a03c-096fbfd52c7d.pdf',
    credentialId: '80452091-ae26-4539-a03c',
    valueProp: 'On Resume · Core ML-on-Cloud Proof',
    description: 'Demonstrates deep capability in architecting and operationalizing end-to-end machine learning workflows on AWS, including model training, inference pipelines, and scalable cloud endpoints.',
    tags: [
      'AWS Training & Certification',
      'Cloud ML Architecture',
      'Scalable Cloud Endpoints',
      'Inference Pipelines',
      'Enterprise ML Ops',
      'Amazon Web Services Proof',
    ],
  },
  {
    id: 'mongodb-genai-apps',
    number: '3',
    title: 'MongoDB – Building GenAI Apps Learning Path',
    shortTitle: 'MongoDB Building GenAI Apps',
    host: 'MongoDB University',
    date: 'Apr 06, 2026',
    image: '/Course_Certificates_Images/mongodb_genai_apps.png',
    pdfPath: '/Certificates/dickson-e-1a2f47c1-7f3d-4221-8fdc-d07a89d32db6-certificate.pdf',
    credentialId: 'MDB2bsn4a4tpr',
    valueProp: 'On Resume · GenAI Focus',
    description: 'Specialized learning path certification for building production GenAI systems using MongoDB Atlas Vector Search, LLM embeddings, semantic indexing, and operational database backends.',
    tags: [
      'MongoDB University',
      'Atlas Vector Search',
      'Semantic Indexing',
      'LLM Embeddings',
      'GenAI Backend Integration',
      'Production Architecture',
    ],
  },
  {
    id: 'aws-microservices-cicd',
    number: '4',
    title: 'AWS Academy Graduate – Microservices & CI/CD Builder',
    shortTitle: 'AWS Microservices & CI/CD',
    host: 'AWS Academy (Credly)',
    date: 'Apr 06, 2026',
    image: '/Course_Certificates_Images/aws_microservices_cicd.png',
    pdfPath: '/Certificates/AWS_Academy_Graduate___Microservices_and_CI_CD_Pipeline_Builder___Training_Badge_Badge20260406-30-tgyz4q.pdf',
    credentialId: 'N9tm4Kd6',
    verifyUrl: 'https://www.credly.com/go/N9tm4Kd6',
    valueProp: 'On Resume · Proves You Ship and Deploy, Not Just Prototype',
    description: 'Hands-on credential validating continuous integration, continuous delivery, containerization, and automated deployment architectures on AWS cloud infrastructure.',
    tags: [
      'Credly Digital Badge',
      'CI/CD Automated Pipelines',
      'Microservices Architecture',
      'Containerization & Docker',
      'AWS Cloud Infrastructure',
      'Production Deployment Proof',
    ],
  },
  {
    id: 'mongodb-rag-apps',
    number: '5',
    title: 'Building RAG Apps Using MongoDB',
    shortTitle: 'Building RAG Apps (Credly)',
    host: 'MongoDB (Credly)',
    date: 'Oct 25, 2025',
    image: '/Course_Certificates_Images/mongodb_rag_apps.png',
    pdfPath: '/Certificates/SkillsCert20251025-31-elxsju.pdf',
    credentialId: '1da987da-878c-45da-8c42',
    verifyUrl: 'https://www.credly.com/badges/1da987da-878c-45da-8c42-bf0e9d6da6a8',
    valueProp: 'Signature Cert · Directly Validates EduRAG',
    description: 'Advanced Retrieval-Augmented Generation credential validating chunking strategies, vector embeddings, hybrid semantic retrieval, and context window orchestration directly applied in EduRAG.',
    tags: [
      'Credly Verified Credential',
      'Direct EduRAG Proof',
      'Hybrid Semantic Search',
      'Vector Embeddings & Chunks',
      'Context Window Optimization',
      'Enterprise RAG Pipelines',
    ],
  },
  {
    id: 'mongodb-ai-agents',
    number: '6',
    title: 'Building AI Agents with MongoDB',
    shortTitle: 'Building AI Agents (Credly)',
    host: 'MongoDB (Credly)',
    date: 'Oct 25, 2025',
    image: '/Course_Certificates_Images/mongodb_ai_agents.png',
    pdfPath: '/Certificates/SkillsCert20251025-31-z3vi08.pdf',
    credentialId: 'cea6e68d-9140-4ad2-802e',
    verifyUrl: 'https://www.credly.com/badges/cea6e68d-9140-4ad2-802e-5a31ecb68ae4',
    valueProp: 'Signature Cert · Directly Validates AIRA & Agent Systems',
    description: 'Validates autonomous agent design patterns, tool-calling loops, multi-agent coordination, and persistent state memory on MongoDB, directly backing AIRA and multi-agent system claims.',
    tags: [
      'Credly Verified Credential',
      'Direct AIRA Proof',
      'Autonomous Agent Workflows',
      'Tool Calling & Loops',
      'Stateful Agent Memory',
      'Multi-Agent Orchestration',
    ],
  },
  {
    id: 'prepinsta-mern-stack',
    number: '7',
    title: 'Full Stack Web Development MERN Stack',
    shortTitle: 'Full Stack MERN Stack Mastery',
    host: 'PrepInsta Technologies',
    date: 'Oct 27, 2025',
    image: '/Course_Certificates_Images/prepinsta_mern_stack.png',
    pdfPath: '/Certificates/certificate_Full Stack Web development MERN Stack_1634237.pdf',
    credentialId: '68ff9156d5fa55bf14baf580',
    valueProp: 'Backs Your Production Full-Stack Claim',
    description: 'Comprehensive full-stack accreditation spanning React, Node.js, Express, MongoDB, RESTful APIs, JWT authentication, state management, and production-ready web application engineering.',
    tags: [
      'PrepInsta Technologies',
      'Full-Stack Architecture',
      'React & Modern Frontend',
      'Node.js & Express REST APIs',
      'MongoDB Data Layer',
      'Production Engineering Proof',
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

  // Continuous, buttery-smooth GSAP ScrollTrigger timeline
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!containerRef.current || !stageRef.current || !listRef.current) return

    const totalItems = COURSE_CERTS.length
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
            const rawProgress = self.progress * (totalItems - 1)
            const currentIdx = Math.min(totalItems - 1, Math.max(0, Math.round(rawProgress)))
            setActiveIndex(currentIdx)
          },
        },
      })

      // Continuous vertical translation of the items list
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

    const totalItems = COURSE_CERTS.length
    const containerTop = containerRef.current.offsetTop
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight
    const targetScroll = containerTop + (index / (totalItems - 1)) * containerHeight

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }

  const currentCert = COURSE_CERTS[activeIndex] || COURSE_CERTS[0]

  return (
    <section
      id="credentials"
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
        className="relative w-full h-screen min-h-[680px] flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 bg-white overflow-hidden"
      >
        {/* Top Area: Large Impact Headline - Right Aligned (Mirrored) */}
        <div className="w-full pt-10 sm:pt-14 md:pt-16 flex flex-col items-end text-right">
          <h2
            className="w-full uppercase text-black font-bold tracking-[-0.04em] leading-[0.84] select-none text-[clamp(28px,4.8vw,72px)] text-right"
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
          <div className="w-full h-24 sm:h-28 md:h-32 relative pointer-events-none" />

          {/* Horizontal Crisp Black Dividing Rule */}
          <div className="w-full border-t border-black relative z-10" />

          {/* Mirrored Layout:
              - Left side (Cols 1-7): Certificate Image Preview Card + Metadata Tags
              - Right side (Cols 8-12): Scrolling vertical list of 7 Course Credentials
          */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-3 sm:pt-4 items-start min-h-[260px] relative z-20">
            
            {/* Mirrored Left Column (Cols 1-7): Certificate Showcase (Image + Structured Explanation) */}
            <div className="col-span-12 md:col-span-7 order-2 md:order-1 flex flex-col sm:flex-row gap-5 lg:gap-8 items-start">
              
              {/* Certificate Preview Card with Lightbox Trigger */}
              <div className="relative w-full sm:w-[58%] shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCert.id}
                    initial={{ opacity: 0, scale: 0.97, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100 shadow-md transition-all duration-300 hover:shadow-2xl hover:border-black"
                    onClick={() => setSelectedModalCert(currentCert)}
                  >
                    {/* Certificate Aspect Ratio Frame */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-200">
                      <img
                        src={currentCert.image}
                        alt={currentCert.title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Subtle Dark Gradient Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />

                      {/* Click To Expand Floating Pill */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-black opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Full-Res</span>
                      </div>

                      {/* Top Verified Ribbon Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 rounded bg-black/85 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-white shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-cyan-400" />
                        <span>VERIFIED CREDENTIAL</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Explanatory Context Tags & Metadata */}
              <div className="w-full sm:flex-1 flex flex-col justify-between self-stretch text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCert.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="space-y-3"
                  >
                    {/* Value Proposition Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-300 text-[10px] font-mono uppercase font-bold tracking-wider text-black">
                      <Award className="w-3 h-3 text-amber-600" />
                      <span>{currentCert.valueProp}</span>
                    </div>

                    {/* Concise Impact Description */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 font-medium line-clamp-3">
                      {currentCert.description}
                    </p>

                    {/* Metadata Pill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentCert.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-neutral-100 text-neutral-800 border border-neutral-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Direct Inspect Credential CTA */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedModalCert(currentCert)}
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-bold text-black hover:opacity-75 transition-opacity cursor-pointer font-mono uppercase tracking-wider"
                      >
                        <span>INSPECT CREDENTIAL</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

            {/* Mirrored Right Column (Cols 8-12): Scrolling Course Certificates Vertical List */}
            <div className="col-span-12 md:col-span-5 order-1 md:order-2 flex flex-col justify-start relative">
              
              {/* Category Label */}
              <div className="text-[11px] font-mono tracking-wider uppercase text-neutral-500 font-semibold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black inline-block" />
                <span>KEY TECHNICAL ACCREDITATIONS</span>
              </div>

              {/* Scrolling Titles Track */}
              <div className="relative overflow-visible">
                <div
                  ref={listRef}
                  className="flex flex-col will-change-transform text-left"
                  style={{ transform: 'translate3d(0, 0px, 0)' }}
                >
                  {COURSE_CERTS.map((cert, idx) => {
                    const isActive = idx === activeIndex
                    const isPassed = idx < activeIndex

                    return (
                      <div
                        key={cert.id}
                        onClick={() => handleItemClick(idx)}
                        className="group flex items-baseline gap-4 cursor-pointer transition-all duration-300"
                        style={{ height: `${ITEM_HEIGHT}px` }}
                      >
                        {/* Number Index */}
                        <span
                          className={`font-mono text-base sm:text-lg transition-colors duration-300 shrink-0 ${
                            isActive
                              ? 'text-black font-extrabold'
                              : isPassed
                                ? 'text-neutral-300 font-semibold'
                                : 'text-neutral-300 group-hover:text-neutral-600 font-semibold'
                          }`}
                        >
                          0{cert.number}
                        </span>

                        {/* Title Text */}
                        <h3
                          className={`truncate text-base sm:text-lg md:text-xl transition-all duration-300 tracking-[-0.02em] ${
                            isActive
                              ? 'text-black font-extrabold scale-100 origin-left'
                              : isPassed
                                ? 'text-neutral-300 font-medium'
                                : 'text-neutral-300 group-hover:text-neutral-600 font-medium'
                          }`}
                          style={{
                            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          }}
                        >
                          {cert.shortTitle}
                        </h3>
                      </div>
                    )
                  })}
                </div>
              </div>

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
                      {selectedModalCert.valueProp}
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
