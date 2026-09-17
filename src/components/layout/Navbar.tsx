import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import {
  ChevronDown,
  Award,
  FileText,
  Calendar,
  Search,
  ExternalLink,
  Menu,
  X,
  Mail
} from 'lucide-react'
import { socialLinks } from '@/data/portfolioData'

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export interface NavbarProps {
  activeSection?: string
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero' }) => {
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut ⌘K to open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandPaletteOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
        setMoreDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navItems = [
    { label: 'Home', id: 'hero', href: '#hero' },
    { label: 'About', id: 'about', href: '#about' },
    { label: 'Work', id: 'projects', href: '#projects' },
    { label: 'Skills', id: 'skills', href: '#skills' },
  ]

  const githubUrl = socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com/DicksonLegend'
  const linkedinUrl = socialLinks.find((l) => l.platform === 'linkedin')?.url || 'https://linkedin.com'

  const moreItems = [
    {
      label: 'Certifications',
      description: '30+ Cloud, AI & Security Credentials',
      icon: Award,
      href: '#projects',
      badge: '30+',
    },
    {
      label: 'GitHub Profile',
      description: 'Explore repositories and open source',
      icon: GithubIcon,
      href: githubUrl,
      external: true,
    },
    {
      label: 'LinkedIn Profile',
      description: 'Connect professionally',
      icon: LinkedinIcon,
      href: linkedinUrl,
      external: true,
    },
    {
      label: 'Download Resume',
      description: 'PDF Resume with complete JD details',
      icon: FileText,
      href: '/resume.pdf',
      download: true,
    },
  ]

  return (
    <>
      {/* Fixed Top Header Container */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 pointer-events-none select-none">
        
        {/* Left: Brand Monogram (Modern Stylized 'NK' style for Dickson) */}
        <div className="pointer-events-auto">
          <a
            href="#hero"
            className="group relative flex items-center gap-2 focus:outline-none"
            title="Dickson E — Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-white/25 group-hover:bg-white/10">
              {/* Modern Monogram SVG */}
              <svg
                viewBox="0 0 32 32"
                className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
              >
                <path d="M7 6h7c5 0 9 3.5 9 10s-4 10-9 10H7V6zm4.5 4v12h2.5c2.8 0 4.8-2 4.8-6s-2-6-4.8-6h-2.5z" />
              </svg>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs tracking-widest text-white/50 group-hover:text-white/90 transition-colors uppercase">
              Dickson.dev
            </span>
          </a>
        </div>

        {/* Center: Exact Floating Pill Dock Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto hidden md:inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#0c0e12]/85 backdrop-blur-2xl p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-white/5"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Active Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill-bg"
                    className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Glowing Top Lamp Light Beam (Exact reference detail!) */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill-lamp"
                    className="absolute -top-[7px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    {/* Glowing White Lamp Bar */}
                    <div className="w-8 h-[2.5px] bg-white rounded-full shadow-[0_0_12px_#ffffff,0_0_20px_#ffffff,0_0_35px_rgba(255,255,255,0.8)]" />
                    {/* Soft ambient downwards light cone */}
                    <div className="w-12 h-3 bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[2px]" />
                  </motion.div>
                )}

                <span className="relative z-10">{item.label}</span>
              </a>
            )
          })}

          {/* More Dropdown Menu */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                moreDropdownOpen
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>More</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  moreDropdownOpen ? 'rotate-180 text-white' : 'text-white/50'
                }`}
              />
            </button>

            {/* Dropdown Menu Panel */}
            <AnimatePresence>
              {moreDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-2xl border border-white/10 bg-[#0c0e12]/95 backdrop-blur-2xl p-2 shadow-2xl shadow-black/80 ring-1 ring-white/10 z-50 overflow-hidden"
                >
                  <div className="flex flex-col gap-1">
                    {moreItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                          download={item.download ? true : undefined}
                          onClick={() => setMoreDropdownOpen(false)}
                          className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/20 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-xs font-semibold text-white/90 group-hover:text-white">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-white/40 line-clamp-1">
                                {item.description}
                              </span>
                            </div>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              {item.badge}
                            </span>
                          )}
                          {item.external && (
                            <ExternalLink className="w-3 h-3 text-white/30 group-hover:text-white/70 transition-colors" />
                          )}
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Book a Call Button (Capsule button on the right inside the pill) */}
          <a
            href="mailto:dicksone2006@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
            className="ml-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-inner"
          >
            <Calendar className="w-3.5 h-3.5 text-white/70" />
            <span>Book a Call</span>
          </a>
        </nav>

        {/* Right: Command Shortcut Badge (⌘) + Theme Switcher */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* ⌘ Key Shortcut Trigger */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md"
            title="Command Palette (Press ⌘K or Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <span className="font-mono text-sm font-semibold">⌘</span>
          </button>

          {/* Theme Toggle */}
          <div className="relative">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Floating Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 left-4 right-4 z-40 rounded-3xl border border-white/10 bg-[#0c0e12]/95 backdrop-blur-2xl p-6 shadow-2xl shadow-black/80 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <a
                href="mailto:dicksone2006@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Call</span>
              </a>

              <div className="flex items-center justify-around pt-2 text-white/50">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-white">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-white">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="mailto:dicksone2006@gmail.com" className="p-2 hover:text-white">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Command Palette Modal (triggered via ⌘ button or ⌘K) */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandPaletteOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/15 bg-[#0e1117] p-4 shadow-2xl text-white z-10 overflow-hidden"
            >
              {/* Header Search Input */}
              <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 text-white/50">
                <Search className="w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Type a command or jump to section..."
                  autoFocus
                  className="w-full bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                />
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/50">
                  ESC
                </kbd>
              </div>

              {/* Quick Links List */}
              <div className="mt-3 flex flex-col gap-1 max-h-72 overflow-y-auto">
                <div className="text-[11px] font-mono tracking-wider text-white/40 uppercase px-3 py-1">
                  Navigation
                </div>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setCommandPaletteOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors"
                  >
                    <span>Go to {item.label}</span>
                    <span className="font-mono text-xs text-white/30">↵</span>
                  </a>
                ))}

                <div className="text-[11px] font-mono tracking-wider text-white/40 uppercase px-3 py-1 mt-2">
                  Actions & Links
                </div>
                <a
                  href="mailto:dicksone2006@gmail.com"
                  onClick={() => setCommandPaletteOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Book a Call / Send Email</span>
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCommandPaletteOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Open GitHub Profile</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCommandPaletteOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  )
}
