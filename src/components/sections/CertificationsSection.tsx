import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { certificatesData, type CertificateItem } from '@/data/certificatesData'
import {
  ExternalLink,
  FileText,
  CheckCircle2,
  X,
  Eye,
  Download,
  ShieldCheck,
  Search,
} from 'lucide-react'

type CategoryFilter = 'All' | 'Hackathons' | 'AI & ML' | 'Cloud & DB' | 'Full-Stack & Python' | 'Data & Analytics' | 'Security & Networks'

export const CertificationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.15, once: true })

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null)

  // Fire game-style achievement toast once when section enters viewport
  useEffect(() => {
    if (isInView) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('trigger-cert-achievement'))
      }
    }
  }, [isInView])

  const categories: { label: CategoryFilter; count: number }[] = [
    { label: 'All', count: certificatesData.length },
    { label: 'Hackathons', count: certificatesData.filter(c => c.category === 'Hackathons').length },
    { label: 'AI & ML', count: certificatesData.filter(c => c.category === 'AI & ML').length },
    { label: 'Cloud & DB', count: certificatesData.filter(c => c.category === 'Cloud & DB').length },
    { label: 'Full-Stack & Python', count: certificatesData.filter(c => c.category === 'Full-Stack & Python').length },
    { label: 'Data & Analytics', count: certificatesData.filter(c => c.category === 'Data & Analytics').length },
    { label: 'Security & Networks', count: certificatesData.filter(c => c.category === 'Security & Networks').length },
  ]

  const filteredCerts = certificatesData.filter(cert => {
    const matchesCategory = activeCategory === 'All' || cert.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.details && cert.details.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="certifications"
      ref={sectionRef}
      aria-label="Professional Certifications & Accreditations"
      className="relative w-full min-h-screen py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[var(--bg)] text-[var(--text)] transition-colors duration-400 overflow-hidden scroll-mt-24"
    >
      {/* Background Decorative Ambient Radial Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--accent)]/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header: Dual-Bezel Aesthetic with Eyebrow Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 mb-3">
              <ShieldCheck className="w-3 h-3" />
              <span>ACCREDITED COMPETENCY · 30 BADGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--textTitle)] leading-tight">
              Verified Credentials & Honors
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--textBody)] max-w-2xl">
              Catalog of all 30 industry accreditations spanning Generative AI, Cloud Infrastructure, Hackathon qualifiers, and Full-Stack development.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--textLight)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 30 certificates..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--textTitle)] placeholder-[var(--textLight)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--textLight)] hover:text-[var(--textTitle)]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Pill Capsules (Double-Bezel Nested Architecture) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActiveCategory(cat.label)}
                className={`flex-shrink-0 relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent)] text-black font-semibold shadow-[0_2px_12px_var(--accent-glow)]'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--textBody)] hover:text-[var(--textTitle)] hover:border-[var(--accent)]/40'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black/20 text-black' : 'bg-[var(--border)] text-[var(--textLight)]'
                }`}>
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Certificates Grid: Responsive Masonry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.3) }}
              className="group relative p-1.5 rounded-[1.5rem] bg-[var(--border-subtle)] border border-[var(--border)] hover:border-[var(--accent)]/50 transition-all duration-300 flex flex-col"
            >
              {/* Inner Core Container */}
              <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-[var(--bg-secondary)] p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {/* Top specular shine */}
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div>
                  {/* Category & Date Line */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                      {cert.category}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--textLight)]">
                      {cert.date}
                    </span>
                  </div>

                  {/* Issuer & Title */}
                  <div className="text-xs font-semibold text-[var(--textLight)] tracking-tight mb-1">
                    {cert.issuer}
                  </div>
                  <h3 className="text-base font-bold text-[var(--textTitle)] group-hover:text-[var(--accent)] transition-colors leading-snug mb-2">
                    {cert.title}
                  </h3>

                  {/* Detailed summary */}
                  {cert.details && (
                    <p className="text-xs text-[var(--textBody)] line-clamp-2 leading-relaxed mb-4">
                      {cert.details}
                    </p>
                  )}
                </div>

                {/* Card Footer: Credential ID / Verification Link & Preview Button */}
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                  <div className="text-[10px] font-mono text-[var(--textLight)] truncate max-w-[150px]">
                    {cert.credentialId ? `ID: ${cert.credentialId}` : 'VERIFIED ACCREDITATION'}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Direct View Modal Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg)] hover:bg-[var(--accent)] hover:text-black border border-[var(--border)] transition-all cursor-pointer"
                      title="View Certificate Details"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </button>

                    {/* External or Direct PDF Link */}
                    <a
                      href={cert.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[var(--bg)] hover:bg-[var(--accent)] hover:text-black border border-[var(--border)] transition-all text-[var(--textLight)] hover:text-black"
                      title="Open Original Document"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="py-16 text-center text-sm font-mono text-[var(--textLight)]">
            No certifications found matching "{searchQuery}".
          </div>
        )}
      </div>

      {/* Interactive Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl p-6 shadow-2xl z-10 overflow-hidden text-[var(--text)] max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--accent)] uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedCert.category} · {selectedCert.issuer}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--textTitle)] leading-snug">
                    {selectedCert.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--textLight)] mt-1">
                    Issued: {selectedCert.date} {selectedCert.credentialId && `· Credential ID: ${selectedCert.credentialId}`}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 rounded-lg text-[var(--textLight)] hover:text-[var(--textTitle)] hover:bg-[var(--bg)] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Content */}
              <div className="py-4 flex-1 overflow-y-auto">
                {selectedCert.details && (
                  <div className="p-3.5 rounded-xl bg-[var(--bg)] border border-[var(--border-subtle)] text-xs text-[var(--textBody)] leading-relaxed mb-4">
                    <div className="font-semibold text-[var(--textTitle)] mb-1">Credential Details:</div>
                    {selectedCert.details}
                  </div>
                )}

                {/* Preview Frame for Images or PDF Preview Notice */}
                {selectedCert.fileType === 'jpeg' || selectedCert.fileType === 'png' ? (
                  <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-black/40 flex items-center justify-center max-h-96">
                    <img
                      src={selectedCert.filePath}
                      alt={selectedCert.title}
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg)] flex flex-col items-center justify-center text-center gap-3">
                    <FileText className="w-12 h-12 text-[var(--accent)]" />
                    <div className="text-sm font-medium text-[var(--textTitle)]">
                      PDF Document: {selectedCert.title}
                    </div>
                    <p className="text-xs text-[var(--textLight)] max-w-sm">
                      This verified document is stored as a high-resolution vector PDF in the official archive.
                    </p>
                    <a
                      href={selectedCert.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[var(--accent)] text-black hover:opacity-95 transition-opacity"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Full PDF in New Tab</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                {selectedCert.verifyUrl ? (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)] hover:underline"
                  >
                    <span>Verify with Issuer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[var(--textLight)]">
                    Direct Institutional Certificate
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <a
                    href={selectedCert.filePath}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--bg)] border border-[var(--border)] hover:bg-[var(--border)] text-[var(--textTitle)] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <a
                    href={selectedCert.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[var(--accent)] text-black hover:opacity-95 transition-opacity font-semibold"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Document</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
