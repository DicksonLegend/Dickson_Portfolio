import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Eye,
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
}

export const ARCHIVE_CERTS: ArchiveCertItem[] = [
  {
    id: 'mongodb-vector-search',
    number: '001',
    title: 'BUILDING AI-POWERED SEARCH WITH MONGODB VECTOR SEARCH',
    issuer: 'MongoDB (Credly)',
    category: 'RAG / Vector Databases',
    date: 'Oct 25, 2025',
    credentialId: 'ee6ca90c-29dc-4f06-bc86-10336188a452',
    verifyUrl: 'https://www.credly.com/badges/ee6ca90c-29dc-4f06-bc86-10336188a452',
    pdfPath: '/Certificates/SkillsCert20251025-31-g5iq5d.pdf',
    image: '/Archive_Certificates_Images/mongodb_vector.png',
    highlight: 'Semantic retrieval, vector embeddings & hybrid search indexing.',
  },
  {
    id: 'nvidia-jetson-nano',
    number: '002',
    title: 'GETTING STARTED WITH AI ON JETSON NANO',
    issuer: 'NVIDIA Deep Learning Institute',
    category: 'Edge AI & Embedded Vision',
    date: 'Oct 30, 2025',
    credentialId: '_vHERuMIRRGRkRF1Nyv2MA',
    pdfPath: '/Certificates/Dickson-Nvdia-certificate.pdf',
    image: '/Archive_Certificates_Images/nvidia_jetson.png',
    highlight: 'Computer vision deployment on accelerated NVIDIA hardware.',
  },
  {
    id: 'mongodb-python-developer',
    number: '003',
    title: 'MONGODB PYTHON DEVELOPER PATH',
    issuer: 'MongoDB University',
    category: 'Backend & Data Architecture',
    date: 'Sep 16, 2024',
    credentialId: 'MDBw8ia1c81zv',
    pdfPath: '/Certificates/Dickson-MongoDB-Certificate.pdf',
    image: '/Archive_Certificates_Images/mongodb_python.png',
    highlight: 'Advanced PyMongo query optimization, aggregation pipelines & Atlas.',
  },
  {
    id: 'prepinsta-mern-stack',
    number: '004',
    title: 'FULL STACK WEB DEVELOPMENT MERN STACK',
    issuer: 'PrepInsta Technologies',
    category: 'Full-Stack Web Engineering',
    date: 'Oct 27, 2025',
    credentialId: '68ff9156d5fa55bf14baf580',
    pdfPath: '/Certificates/certificate_Full Stack Web development MERN Stack_1634237.pdf',
    image: '/Archive_Certificates_Images/prepinsta_mern.png',
    highlight: 'End-to-end React, Node.js, Express, and MongoDB production apps.',
  },
  {
    id: 'cisco-python-pcap',
    number: '005',
    title: 'PCAP: PROGRAMMING ESSENTIALS IN PYTHON',
    issuer: 'Cisco Networking Academy & OpenEDG',
    category: 'Core Systems Programming',
    date: 'Jan 20, 2024',
    pdfPath: '/Certificates/DicksonE-EVEN 23-24 FIRST-certificate.pdf',
    image: '/Archive_Certificates_Images/python_pcap.png',
    highlight: 'Industry-standard Python OOP, algorithmic foundations & data structures.',
  },
  {
    id: 'uipath-automation-starter',
    number: '006',
    title: 'AUTOMATION STARTER (RPA & AUTOMATION)',
    issuer: 'UiPath Academy',
    category: 'Workflow Automation & RPA',
    date: 'Apr 07, 2026',
    pdfPath: '/Certificates/badge304103317893189197329728229.pdf',
    image: '/Archive_Certificates_Images/uipath_automation.png',
    highlight: 'Intelligent automation workflows and robotic process automation.',
  },
  {
    id: 'ibm-prompt-engineering',
    number: '007',
    title: 'PROMPT ENGINEERING FOR EVERYONE',
    issuer: 'IBM Developer Skills Network',
    category: 'Generative AI & LLM Systems',
    date: 'Mar 11, 2025',
    verifyUrl: 'https://courses.cognitiveclass.ai/certificates/ffb5cca3181442a78334e135a94c2d9a',
    pdfPath: '/Certificates/Dickson-PromptEngineer-Certificate.pdf',
    image: '/Archive_Certificates_Images/ibm_prompt.png',
    highlight: 'Structured prompting patterns, reasoning constraints & context crafting.',
  },
  {
    id: 'ibm-data-analysis',
    number: '008',
    title: 'DATA ANALYSIS WITH PYTHON (DA0101EN)',
    issuer: 'IBM Developer Skills Network',
    category: 'Data Science & Statistical Modeling',
    date: 'Mar 14, 2025',
    verifyUrl: 'https://courses.cognitiveclass.ai/certificates/50ac98a3a18c4b1599cf23e1231f540e',
    pdfPath: '/Certificates/Dickson-Data-Analysis-withpython.pdf',
    image: '/Archive_Certificates_Images/ibm_data_analysis.png',
    highlight: 'Pandas, NumPy, model evaluation, and regression analytics.',
  },
  {
    id: 'infosys-power-bi',
    number: '009',
    title: 'MICROSOFT POWER BI ANALYTICS',
    issuer: 'Infosys Springboard',
    category: 'Business Intelligence & Dashboards',
    date: 'Oct 14, 2024',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson-PowerBI-Certificate.pdf',
    image: '/Archive_Certificates_Images/infosys_powerbi.png',
    highlight: 'DAX modeling, automated ETL pipelines & dynamic business reporting.',
  },
  {
    id: 'infosys-tableau',
    number: '010',
    title: 'MASTERING TABLEAU 10',
    issuer: 'Infosys Springboard',
    category: 'Data Visualization & Insights',
    date: 'Oct 14, 2024',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson-Tableau_Cetificate.pdf',
    image: '/Archive_Certificates_Images/infosys_tableau.png',
    highlight: 'Complex data blending, geospatial mapping & storytelling dashboards.',
  },
  {
    id: 'coursera-ethics-technology',
    number: '011',
    title: 'ETHICS, TECHNOLOGY AND ENGINEERING',
    issuer: 'TU Eindhoven / 4TU.Ethics (Coursera)',
    category: 'Engineering Philosophy & AI Ethics',
    date: 'Mar 17, 2024',
    verifyUrl: 'https://coursera.org/verify/TV4HNR4PE2DW',
    pdfPath: '/Certificates/Dickson-Ethics-Certificate.pdf',
    image: '/Archive_Certificates_Images/coursera_ethics.png',
    highlight: 'Responsible AI development, technological risks & systemic governance.',
  },
  {
    id: 'infosys-explore-ml',
    number: '012',
    title: 'EXPLORE MACHINE LEARNING USING PYTHON',
    issuer: 'Infosys Springboard',
    category: 'Machine Learning Foundations',
    date: 'Apr 5, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson machine learning certificate infosys.pdf',
    image: '/Archive_Certificates_Images/infosys_ml.png',
    highlight: 'Supervised & unsupervised learning algorithms and pipeline tuning.',
  },
  {
    id: 'aws-compute-services',
    number: '013',
    title: 'AWS COMPUTE SERVICES OVERVIEW',
    issuer: 'Amazon Web Services',
    category: 'Cloud Infrastructure & EC2/Lambda',
    date: 'Apr 06, 2026',
    pdfPath: '/Certificates/8f83ac2a-77ab-4592-831d-dd62926d696c.pdf',
    image: '/Archive_Certificates_Images/aws_compute.png',
    highlight: 'Serverless compute, container scaling & AWS architecture patterns.',
  },
  {
    id: 'infosys-aws-dynamodb',
    number: '014',
    title: 'AWS DEVELOPER ASSOCIATE: DYNAMODB NOSQL',
    issuer: 'Infosys Springboard',
    category: 'Cloud NoSQL & High-Throughput DBs',
    date: 'Apr 4, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    pdfPath: '/Certificates/Dickson Dynamo db nosql certificate.pdf',
    image: '/Archive_Certificates_Images/infosys_dynamodb.png',
    highlight: 'Partition key design, secondary indexes & distributed database scaling.',
  },
]

export const ArchiveCertificatesSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ArchiveCertItem>(ARCHIVE_CERTS[0])
  const [hoveredItem, setHoveredItem] = useState<ArchiveCertItem | null>(null)
  const [selectedModalCert, setSelectedModalCert] = useState<ArchiveCertItem | null>(null)
  const [copiedId, setCopiedId] = useState(false)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  // Current displayed preview item
  const currentPreview = hoveredItem || activeItem

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

  // Handle row hover
  const handleMouseEnter = (item: ArchiveCertItem) => {
    setHoveredItem(item)
    setActiveItem(item)
  }

  return (
    <section
      id="archive"
      data-navbar-theme="dark"
      aria-label="Official Technical Credentials Archive"
      className="relative z-10 w-full min-h-screen bg-[#0a0c0f] text-[#f5f5f5] py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden select-none transition-colors duration-400"
    >
      {/* Background Ambient Glows: Cyan & Amber */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_20%,rgba(0,229,255,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_80%,rgba(240,169,58,0.03),transparent_70%)] pointer-events-none" />

      {/* Main Terminal Card Container (withhoney.com rounded container style) */}
      <div
        ref={cardContainerRef}
        className="relative max-w-6xl mx-auto rounded-[24px] sm:rounded-[36px] bg-[#0e1014]/90 border border-white/[0.08] backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.85)] p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden"
      >
        {/* Subtle grid line accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[var(--accent)] font-medium mb-3 uppercase">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)] animate-pulse" />
              <span>[ 03 / 03 ] · CREDENTIAL DIRECTORY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
              ADDITIONAL ACCREDITATIONS
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md md:text-right leading-relaxed">
            14 verified specializations spanning Generative AI, Edge Computing, Cloud Systems, and Data Pipelines.
          </div>
        </div>

        {/* Interactive List Layout with Floating Preview Card */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 sm:pt-12 items-start">
          
          {/* Left Column (Cols 1-8): withhoney.com Monospace Numbered Text List */}
          <div className="lg:col-span-8 flex flex-col space-y-1">
            {ARCHIVE_CERTS.map((item) => {
              const isActive = activeItem.id === item.id
              const isHovered = hoveredItem?.id === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedModalCert(item)}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group relative flex items-baseline gap-3 sm:gap-4 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    isActive || isHovered
                      ? 'bg-white/[0.04]'
                      : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* 3-Digit Number with Dot Indicator (withhoney.com signature style) */}
                  <span
                    className={`font-mono text-xs sm:text-sm tracking-widest shrink-0 transition-colors duration-200 ${
                      isActive || isHovered
                        ? 'text-white font-bold'
                        : 'text-neutral-600'
                    }`}
                  >
                    {item.number}
                    {/* Glowing Red Dot */}
                    <span
                      className={`inline-block font-bold transition-all duration-200 ${
                        isActive || isHovered
                          ? 'text-[#ff3b53] drop-shadow-[0_0_8px_rgba(255,59,83,0.8)] scale-125 ml-0.5'
                          : 'text-neutral-600'
                      }`}
                    >
                      .
                    </span>
                  </span>

                  {/* Certificate Title */}
                  <span
                    className={`font-mono text-xs sm:text-sm md:text-base tracking-tight uppercase leading-snug transition-all duration-200 ${
                      isActive || isHovered
                        ? 'text-white font-bold tracking-normal translate-x-1'
                        : 'text-neutral-500 font-normal hover:text-neutral-300'
                    }`}
                  >
                    {item.title}
                  </span>

                  {/* Quick Inspect Arrow on Active */}
                  {(isActive || isHovered) && (
                    <span className="ml-auto text-[var(--accent)] shrink-0 hidden sm:inline-flex items-center text-xs font-mono font-medium gap-1 animate-pulse">
                      <span>INSPECT</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column (Cols 9-12): Floating Interactive Preview Card (withhoney.com style) */}
          <div className="lg:col-span-4 sticky top-28 hidden lg:block">
            <AnimatePresence mode="wait">
              {currentPreview && (
                <motion.div
                  key={currentPreview.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedModalCert(currentPreview)}
                  className="w-full bg-[#14171d] rounded-2xl border border-white/[0.12] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer group hover:border-[var(--accent)]/50 transition-colors"
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-white/[0.08] mb-4">
                    <img
                      src={currentPreview.image}
                      alt={currentPreview.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category badge */}
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 uppercase tracking-wider">
                      {currentPreview.category}
                    </div>

                    {/* Hover Inspect Cue */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider shadow-xl">
                        <Eye className="w-3.5 h-3.5" />
                        <span>VIEW DETAILS</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Metadata */}
                  <div className="space-y-1.5 font-mono">
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest flex items-center justify-between">
                      <span>{currentPreview.issuer}</span>
                      <span className="text-neutral-500">{currentPreview.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white uppercase leading-snug tracking-tight">
                      {currentPreview.title}
                    </h3>

                    <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-1 line-clamp-2">
                      {currentPreview.highlight}
                    </p>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
                      <span className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                        OFFICIAL VERIFIED RECORD
                      </span>
                      <span className="inline-flex items-center gap-1 text-white group-hover:text-[var(--accent)] transition-colors text-xs font-bold">
                        <span>OPEN</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Footer Line Inside Card */}
        <div className="relative z-10 mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ALL 14 CREDENTIALS CRYPTOGRAPHICALLY VERIFIED & AUDITED</span>
          </div>
          <span className="text-neutral-400">DICKSON ELECTRONIC ARCHIVE · 2026</span>
        </div>
      </div>

      {/* Full Modal Lightbox (Modal Portal) */}
      {selectedModalCert &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
            onClick={() => setSelectedModalCert(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0f1217] text-white border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-[#14181f]/80">
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
                  <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
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
