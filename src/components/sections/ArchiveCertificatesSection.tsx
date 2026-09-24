import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import {
  ExternalLink,
  X,
  ShieldCheck,
  FileText,
  Copy,
  Check,
} from 'lucide-react'

export interface ArchiveCertItem {
  id: string
  number: string
  title: string
  issuer: string
  category: string
  date: string
  credentialId?: string
  verifyUrl?: string
  pdfPath: string
  image: string
  highlight: string
  tilt: number
}

export const ARCHIVE_CERTS: ArchiveCertItem[] = [
  {
    id: 'mongodb-vector-search',
    number: '001',
    title: 'BUILDING AI-POWERED SEARCH WITH MONGODB VECTOR SEARCH',
    issuer: 'MONGODB // CREDLY',
    category: 'RAG / Vector Databases',
    date: 'OCT 2025',
    credentialId: 'ee6ca90c-29dc-4f06-bc86-10336188a452',
    verifyUrl: 'https://www.credly.com/badges/ee6ca90c-29dc-4f06-bc86-10336188a452',
    pdfPath: '/Certificates/SkillsCert20251025-31-g5iq5d.pdf',
    image: '/Archive_Certificates_Images/mongodb_vector.png',
    highlight: 'Semantic retrieval, vector embeddings & hybrid search indexing.',
    tilt: -3,
  },
  {
    id: 'nvidia-jetson-nano',
    number: '002',
    title: 'GETTING STARTED WITH AI ON JETSON NANO',
    issuer: 'NVIDIA // DLI',
    category: 'Edge AI & Embedded Vision',
    date: 'OCT 2025',
    credentialId: '_vHERuMIRRGRkRF1Nyv2MA',
    pdfPath: '/Certificates/Dickson-Nvdia-certificate.pdf',
    image: '/Archive_Certificates_Images/nvidia_jetson.png',
    highlight: 'Computer vision deployment on accelerated NVIDIA hardware.',
    tilt: 3.5,
  },
  {
    id: 'mongodb-python-developer',
    number: '003',
    title: 'MONGODB PYTHON DEVELOPER PATH',
    issuer: 'MONGODB UNIVERSITY',
    category: 'Backend & Data Architecture',
    date: 'SEP 2024',
    credentialId: 'MDBw8ia1c81zv',
    pdfPath: '/Certificates/Dickson-MongoDB-Certificate.pdf',
    image: '/Archive_Certificates_Images/mongodb_python.png',
    highlight: 'Advanced PyMongo query optimization, aggregation pipelines & Atlas.',
    tilt: -2.5,
  },
  {
    id: 'prepinsta-mern-stack',
    number: '004',
    title: 'FULL STACK WEB DEVELOPMENT MERN STACK',
    issuer: 'PREPINSTA TECHNOLOGIES',
    category: 'Full-Stack Web Engineering',
    date: 'OCT 2025',
    credentialId: '68ff9156d5fa55bf14baf580',
    pdfPath: '/Certificates/certificate_Full Stack Web development MERN Stack_1634237.pdf',
    image: '/Archive_Certificates_Images/prepinsta_mern.png',
    highlight: 'End-to-end React, Node.js, Express, and MongoDB production apps.',
    tilt: 4,
  },
  {
    id: 'cisco-python-pcap',
    number: '005',
    title: 'PCAP: PROGRAMMING ESSENTIALS IN PYTHON',
    issuer: 'CISCO // OPENEDG',
    category: 'Core Systems Programming',
    date: 'JAN 2024',
    pdfPath: '/Certificates/DicksonE-EVEN 23-24 FIRST-certificate.pdf',
    image: '/Archive_Certificates_Images/python_pcap.png',
    highlight: 'Industry-standard Python OOP, algorithmic foundations & data structures.',
    tilt: -3.5,
  },
  {
    id: 'uipath-automation-starter',
    number: '006',
    title: 'AUTOMATION STARTER (RPA & AUTOMATION)',
    issuer: 'UIPATH ACADEMY',
    category: 'Workflow Automation & RPA',
    date: 'APR 2026',
    pdfPath: '/Certificates/badge304103317893189197329728229.pdf',
    image: '/Archive_Certificates_Images/uipath_automation.png',
    highlight: 'Intelligent automation workflows and robotic process automation.',
    tilt: 3,
  },
  {
    id: 'ibm-prompt-engineering',
    number: '007',
    title: 'PROMPT ENGINEERING FOR EVERYONE',
    issuer: 'IBM DEVELOPER SKILLS',
    category: 'Generative AI & LLM Systems',
    date: 'MAR 2025',
    verifyUrl: 'https://courses.cognitiveclass.ai/certificates/ffb5cca3181442a78334e135a94c2d9a',
    pdfPath: '/Certificates/Dickson-PromptEngineer-Certificate.pdf',
    image: '/Archive_Certificates_Images/ibm_prompt.png',
    highlight: 'Structured prompting patterns, reasoning constraints & context crafting.',
    tilt: -4,
  },
  {
    id: 'ibm-data-analysis',
    number: '008',
    title: 'DATA ANALYSIS WITH PYTHON (DA0101EN)',
    issuer: 'IBM DEVELOPER SKILLS',
    category: 'Data Science & Statistical Modeling',
    date: 'MAR 2025',
    verifyUrl: 'https://courses.cognitiveclass.ai/certificates/50ac98a3a18c4b1599cf23e1231f540e',
    pdfPath: '/Certificates/Dickson-Data-Analysis-withpython.pdf',
    image: '/Archive_Certificates_Images/ibm_data_analysis.png',
    highlight: 'Pandas, NumPy, model evaluation, and regression analytics.',
    tilt: 2.5,
  },
  {
    id: 'infosys-power-bi',
    number: '009',
    title: 'MICROSOFT POWER BI ANALYTICS',
    issuer: 'INFOSYS SPRINGBOARD',
    category: 'Business Intelligence & Dashboards',
    date: 'OCT 2024',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson-PowerBI-Certificate.pdf',
    image: '/Archive_Certificates_Images/infosys_powerbi.png',
    highlight: 'DAX modeling, automated ETL pipelines & dynamic business reporting.',
    tilt: -3,
  },
  {
    id: 'infosys-tableau',
    number: '010',
    title: 'MASTERING TABLEAU 10',
    issuer: 'INFOSYS SPRINGBOARD',
    category: 'Data Visualization & Insights',
    date: 'OCT 2024',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson-Tableau_Cetificate.pdf',
    image: '/Archive_Certificates_Images/infosys_tableau.png',
    highlight: 'Complex data blending, geospatial mapping & storytelling dashboards.',
    tilt: 3.5,
  },
  {
    id: 'coursera-ethics-technology',
    number: '011',
    title: 'ETHICS, TECHNOLOGY AND ENGINEERING',
    issuer: 'TU EINDHOVEN // COURSERA',
    category: 'Engineering Philosophy & AI Ethics',
    date: 'MAR 2024',
    verifyUrl: 'https://coursera.org/verify/TV4HNR4PE2DW',
    pdfPath: '/Certificates/Dickson-Ethics-Certificate.pdf',
    image: '/Archive_Certificates_Images/coursera_ethics.png',
    highlight: 'Responsible AI development, technological risks & systemic governance.',
    tilt: -2,
  },
  {
    id: 'infosys-explore-ml',
    number: '012',
    title: 'EXPLORE MACHINE LEARNING USING PYTHON',
    issuer: 'INFOSYS SPRINGBOARD',
    category: 'Machine Learning Foundations',
    date: 'APR 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson machine learning certificate infosys.pdf',
    image: '/Archive_Certificates_Images/infosys_ml.png',
    highlight: 'Supervised & unsupervised learning algorithms and pipeline tuning.',
    tilt: 4,
  },
  {
    id: 'aws-compute-services',
    number: '013',
    title: 'AWS COMPUTE SERVICES OVERVIEW',
    issuer: 'AMAZON WEB SERVICES',
    category: 'Cloud Infrastructure & EC2/Lambda',
    date: 'APR 2026',
    pdfPath: '/Certificates/8f83ac2a-77ab-4592-831d-dd62926d696c.pdf',
    image: '/Archive_Certificates_Images/aws_compute.png',
    highlight: 'Serverless compute, container scaling & AWS architecture patterns.',
    tilt: -3.5,
  },
  {
    id: 'infosys-aws-dynamodb',
    number: '014',
    title: 'AWS DEVELOPER ASSOCIATE: DYNAMODB NOSQL',
    issuer: 'INFOSYS SPRINGBOARD',
    category: 'Cloud NoSQL & High-Throughput DBs',
    date: 'APR 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson Dynamo db nosql certificate.pdf',
    image: '/Archive_Certificates_Images/infosys_dynamodb.png',
    highlight: 'Partition key design, secondary indexes & distributed database scaling.',
    tilt: 2.5,
  },
]

export const ArchiveCertificatesSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ArchiveCertItem>(ARCHIVE_CERTS[0])
  const [hoveredItem, setHoveredItem] = useState<ArchiveCertItem | null>(null)
  const [selectedModalCert, setSelectedModalCert] = useState<ArchiveCertItem | null>(null)
  const [copiedId, setCopiedId] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null)
  const isInsideContainerRef = useRef(false)

  // Smooth mouse coordinates with spring physics for the floating popup card
  const springConfig = { damping: 25, stiffness: 320 }
  const mouseX = useSpring(0, springConfig)
  const mouseY = useSpring(0, springConfig)

  // Update hover detection based on cursor position (even while scrolling)
  const updateHoverOnPosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return
    const cRect = containerRef.current.getBoundingClientRect()

    // Check if cursor is inside container bounds horizontally and vertically
    if (
      clientX < cRect.left ||
      clientX > cRect.right ||
      clientY < cRect.top ||
      clientY > cRect.bottom
    ) {
      if (isInsideContainerRef.current) {
        isInsideContainerRef.current = false
        setHoveredItem(null)
      }
      return
    }

    isInsideContainerRef.current = true

    // Find row whose vertical bounding box intersects clientY
    const rowElements = containerRef.current.querySelectorAll<HTMLElement>('[data-cert-id]')
    let foundCert: ArchiveCertItem | null = null

    for (let i = 0; i < rowElements.length; i++) {
      const row = rowElements[i]
      const rRect = row.getBoundingClientRect()
      // Check if mouse Y falls within this row's vertical bounds
      if (clientY >= rRect.top - 2 && clientY <= rRect.bottom + 2) {
        const certId = row.getAttribute('data-cert-id')
        foundCert = ARCHIVE_CERTS.find((c) => c.id === certId) || null
        break
      }
    }

    if (foundCert) {
      setHoveredItem(foundCert)
      setActiveItem(foundCert)
      const clampedX = Math.min(clientX + 32, window.innerWidth - 270)
      const clampedY = Math.max(clientY - 110, 80)
      mouseX.set(clampedX)
      mouseY.set(clampedY)
    }
  }

  // Handle continuous tracking during scroll, wheel, and global mouse movement
  useEffect(() => {
    let ticking = false

    const handleWindowMouseMove = (e: MouseEvent) => {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
      updateHoverOnPosition(e.clientX, e.clientY)
    }

    const handleScrollOrWheel = () => {
      if (!lastMousePosRef.current) return
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastMousePosRef.current) {
            updateHoverOnPosition(lastMousePosRef.current.x, lastMousePosRef.current.y)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true })
    window.addEventListener('scroll', handleScrollOrWheel, { passive: true })
    window.addEventListener('wheel', handleScrollOrWheel, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove)
      window.removeEventListener('scroll', handleScrollOrWheel)
      window.removeEventListener('wheel', handleScrollOrWheel)
    }
  }, [])

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedModalCert) {
      document.body.classList.add('cert-modal-open')
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedModalCert(null)
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.classList.remove('cert-modal-open')
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [selectedModalCert])

  const handleCopyCredential = (id?: string) => {
    if (!id) return
    navigator.clipboard.writeText(id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  return (
    <section
      id="archive"
      data-navbar-theme="dark"
      aria-label="Official Technical Credentials Archive"
      className="relative z-10 w-full min-h-screen bg-[#07080a] text-[#f5f5f5] pt-24 sm:pt-32 pb-24 overflow-hidden select-none transition-colors duration-400 font-mono"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_15%,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_85%,rgba(255,59,83,0.025),transparent_70%)] pointer-events-none" />

      {/* SECTION HEADER ABOVE THE CARD (withhoney.com Pool Rules Header style) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
        
        {/* Giant Flowing Marquee Ticker */}
        <div className="w-full overflow-hidden py-3 opacity-25 select-none pointer-events-none">
          <div className="animate-marquee-left flex whitespace-nowrap gap-8 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-neutral-500 font-sans">
            <span className="flex items-center gap-8 shrink-0">
              <span>ADDITIONAL ACCREDITATIONS</span>
              <span className="text-[#ff3b53]">■</span>
              <span>VERIFIED DIRECTORY</span>
              <span className="text-[#ff3b53]">■</span>
              <span>TECHNICAL ARCHIVE</span>
              <span className="text-[#ff3b53]">■</span>
            </span>
            <span className="flex items-center gap-8 shrink-0">
              <span>ADDITIONAL ACCREDITATIONS</span>
              <span className="text-[#ff3b53]">■</span>
              <span>VERIFIED DIRECTORY</span>
              <span className="text-[#ff3b53]">■</span>
              <span>TECHNICAL ARCHIVE</span>
              <span className="text-[#ff3b53]">■</span>
            </span>
          </div>
        </div>

        {/* Editorial Intro Paragraph (Centered withhoney style) */}
        <div className="max-w-2xl mx-auto text-center mt-6 mb-10 px-4">
          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed">
            A permanent archive of 14 verified technical accreditations spanning RAG architecture,
            Edge AI, Distributed NoSQL, Cloud Systems, and Full-Stack Engineering. Verified and audited.
          </p>
        </div>

        {/* Meta Bar Line */}
        <div className="flex items-center justify-between text-xs tracking-widest text-neutral-500 font-mono uppercase pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff3b53] shadow-[0_0_8px_rgba(255,59,83,0.8)]" />
            <span>[ 03 / 03 ]</span>
          </div>
          <div className="text-center font-bold tracking-widest text-neutral-300">
            ACCREDITATIONS ARCHIVE
          </div>
          <div>
            <span>14 VERIFIED</span>
          </div>
        </div>
      </div>

      {/* MAIN CARD CONTAINER (withhoney.com rounded container card covering almost entire page) */}
      <div className="relative w-full px-2 sm:px-4 md:px-6 max-w-[1740px] mx-auto">
        <div
          ref={containerRef}
          onMouseLeave={() => setHoveredItem(null)}
          className="relative w-full rounded-t-[32px] sm:rounded-t-[48px] md:rounded-t-[56px] rounded-b-[24px] sm:rounded-b-[36px] bg-[#121316] border-t border-x border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.95)] px-6 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-16 md:py-20 overflow-hidden"
        >
          {/* MONOSPACE NUMBERED LIST (Exact withhoney.com pool rules list - left aligned with tight line spacing) */}
          <div className="relative z-10 flex flex-col space-y-1.5 sm:space-y-2">
            {ARCHIVE_CERTS.map((item) => {
              const isActive = activeItem.id === item.id
              const isHovered = hoveredItem?.id === item.id
              const isHighlighted = isHovered || (hoveredItem === null && isActive)

              return (
                <div
                  key={item.id}
                  data-cert-id={item.id}
                  onClick={() => {
                    setActiveItem(item)
                    setSelectedModalCert(item)
                  }}
                  onMouseEnter={() => {
                    setHoveredItem(item)
                    setActiveItem(item)
                  }}
                  className="group relative flex items-baseline cursor-pointer transition-colors duration-150 py-1 sm:py-1.5 w-full"
                >
                  {/* Number + Title in withhoney format: 001. TITLE. */}
                  <div
                    className={`font-mono tracking-[-0.02em] uppercase transition-colors duration-150 text-sm sm:text-base md:text-lg lg:text-[20px] xl:text-[22px] leading-snug ${
                      isHighlighted
                        ? 'text-white font-bold'
                        : 'text-[#484b54] font-medium hover:text-neutral-400'
                    }`}
                  >
                    {/* 3-Digit Number */}
                    <span className="inline-block mr-2 sm:mr-3 shrink-0">
                      {item.number}
                      {/* Signature Neon Red Period After Number */}
                      <span
                        className={`inline-block font-bold transition-all duration-150 ${
                          isHighlighted
                            ? 'text-[#ff3b53] drop-shadow-[0_0_10px_rgba(255,59,83,0.9)] ml-0.5'
                            : 'text-[#484b54]'
                        }`}
                      >
                        .
                      </span>
                    </span>

                    {/* Certificate Title */}
                    <span>{item.title}</span>

                    {/* Signature Neon Red Period at End of Sentence */}
                    <span
                      className={`inline-block font-bold transition-all duration-150 ${
                        isHighlighted
                          ? 'text-[#ff3b53] drop-shadow-[0_0_10px_rgba(255,59,83,0.9)] ml-0.5'
                          : 'text-[#484b54]'
                      }`}
                    >
                      .
                    </span>
                  </div>

                  {/* Mobile Tap Cue (visible on small mobile screens) */}
                  <span className="sm:hidden ml-auto text-[10px] text-neutral-500 font-mono pl-2 shrink-0">
                    VIEW
                  </span>
                </div>
              )
            })}
          </div>

          {/* Footer Line inside card */}
          <div className="relative z-10 mt-16 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500 font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CRYPTOGRAPHICALLY AUDITED REPOSITORY</span>
            </div>
            <span>DICKSON ELECTRONIC ARCHIVE · {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* FLOATING CURSOR-FOLLOWING PREVIEW CARD (Exact withhoney.com rS popup component) */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            key={hoveredItem.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              x: mouseX,
              y: mouseY,
              rotate: hoveredItem.tilt,
            }}
            className="fixed top-0 left-0 z-50 pointer-events-none hidden lg:block w-[240px] rounded-2xl bg-[#16181f]/95 border border-white/20 p-3 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
          >
            {/* Certificate Thumbnail Print */}
            <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-neutral-900 border border-white/10 mb-2.5 shadow-md">
              <img
                src={hoveredItem.image}
                alt={hoveredItem.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Monospace Metadata (withhoney style text layout) */}
            <div className="space-y-1 font-mono">
              <div className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider truncate">
                {hoveredItem.issuer}
              </div>
              <div className="text-[10px] text-neutral-500 flex items-center justify-between">
                <span>// ({hoveredItem.date})</span>
                <span className="text-[var(--accent)] font-semibold">// (VERIFIED)</span>
              </div>
              <div className="text-[9px] text-neutral-400 pt-0.5 tracking-tight line-clamp-1">
                // CLICK TO INSPECT
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL MODAL LIGHTBOX (Opened on click) */}
      {selectedModalCert &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setSelectedModalCert(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0e1015] text-white border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#13161c]/90">
                <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">{selectedModalCert.number}.</span>
                  <span className="uppercase text-[var(--accent)] font-semibold">
                    {selectedModalCert.issuer}
                  </span>
                  <span>·</span>
                  <span>{selectedModalCert.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedModalCert(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors focus:outline-none"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Scrollable Body */}
              <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
                
                {/* Full High-Resolution Certificate Image */}
                <div className="w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl flex items-center justify-center">
                  <img
                    src={selectedModalCert.image}
                    alt={selectedModalCert.title}
                    className="w-full h-auto max-h-[55vh] object-contain"
                  />
                </div>

                {/* Details Section */}
                <div className="space-y-3 font-mono">
                  <h3 className="text-base sm:text-xl font-bold uppercase tracking-tight text-white">
                    {selectedModalCert.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {selectedModalCert.highlight}
                  </p>

                  {/* Credential ID row */}
                  {selectedModalCert.credentialId && (
                    <div className="p-3 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">CREDENTIAL ID:</span>
                        <code className="text-[var(--accent)] font-bold">
                          {selectedModalCert.credentialId}
                        </code>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyCredential(selectedModalCert.credentialId)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px]"
                      >
                        {copiedId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    {selectedModalCert.verifyUrl && (
                      <a
                        href={selectedModalCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-bold text-xs hover:brightness-110 transition-all"
                      >
                        <span>VERIFY CREDENTIAL</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={selectedModalCert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>OPEN FULL PDF</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
export default ArchiveCertificatesSection
