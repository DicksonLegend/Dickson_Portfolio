import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'
import {
  ChevronDown,
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

interface MoreItem {
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  external?: boolean
  download?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero' }) => {
  const { theme } = useTheme()
  const [isOverLightSection, setIsOverLightSection] = useState(false)

  // Track if the navbar is physically hovering over a white/light-background section
  useEffect(() => {
    let ticking = false

    const checkOverlap = () => {
      const lightElements = document.querySelectorAll<HTMLElement>(
        '[data-navbar-theme="light"], #certifications, #credentials'
      )
      // The floating navbar dock is centered at vertical Y ≈ 48px from viewport top
      const navCenterY = 48

      let overLight = false
      for (let i = 0; i < lightElements.length; i++) {
        const el = lightElements[i]
        const rect = el.getBoundingClientRect()
        if (rect.top <= navCenterY && rect.bottom > navCenterY) {
          overLight = true
          break
        }
      }

      setIsOverLightSection(overLight)
      ticking = false
    }

    const onScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkOverlap)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })
    checkOverlap()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  // Automatically adopt light mode styles when over white sections or when light theme is active
  const isLight = theme === 'light' || isOverLightSection

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
    { label: 'Skills', id: 'skills', href: '#skills' },
    { label: 'Work', id: 'projects', href: '#projects' },
    { label: 'Certifications', id: 'certifications', href: '#certifications' },
  ]

  const githubUrl = socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com/DicksonLegend'
  const linkedinUrl = socialLinks.find((l) => l.platform === 'linkedin')?.url || 'https://linkedin.com'

  const moreItems: MoreItem[] = [
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
    {
      label: 'Direct Email',
      description: 'Send project inquiry or message',
      icon: Mail,
      href: 'mailto:dicksone2006@gmail.com',
      external: true,
    },
  ]

  if (typeof document === 'undefined') return null

  return createPortal(
    <>
      {/* Fixed Top Header Container */}
      <header
        data-nav-theme={isLight ? 'light' : 'dark'}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-12 py-4 pointer-events-none select-none transition-all duration-400 ${
          isLight ? 'nav-light-theme' : ''
        }`}
      >
        
        {/* Left: Brand Monogram (Crystal Glass Lens) */}
        <div className="pointer-events-auto z-10">
          <a
            href="#hero"
            className="group relative flex items-center gap-2.5 focus:outline-none"
            title="Dickson E — Home"
          >
            <div className="crystal-lens relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-105 overflow-hidden">
              {/* Specular highlight */}
              <div className={`absolute inset-0 pointer-events-none ${
                isLight 
                  ? 'bg-gradient-to-b from-white/80 via-transparent to-transparent' 
                  : 'bg-gradient-to-b from-white/[0.25] via-transparent to-transparent'
              }`} />
              {/* Modern Monogram SVG */}
              <svg
                viewBox="0 0 32 32"
                className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                  isLight 
                    ? 'text-neutral-900 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]' 
                    : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
                }`}
                fill="currentColor"
              >
                <path d="M7 6h7c5 0 9 3.5 9 10s-4 10-9 10H7V6zm4.5 4v12h2.5c2.8 0 4.8-2 4.8-6s-2-6-4.8-6h-2.5z" />
              </svg>
            </div>
            <span className={`hidden sm:inline-block font-mono text-xs tracking-widest transition-colors uppercase ${
              isLight 
                ? 'text-neutral-700 group-hover:text-black font-semibold' 
                : 'text-white/70 group-hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]'
            }`}>
              Dickson.dev
            </span>
          </a>
        </div>

        {/* Center: Floating Pill Dock Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 pointer-events-none">
          <nav
            aria-label="Primary Navigation"
            className={`crystal-dock pointer-events-auto relative hidden md:inline-flex items-center gap-1 rounded-full p-1.5 overflow-hidden transition-colors duration-300 ${
              isLight ? 'ring-1 ring-black/[0.06]' : 'ring-1 ring-white/10'
            }`}
          >
            {/* Top Gloss Sheen (Liquid Glass Prismatic Refraction) */}
            <div className={`absolute inset-0 rounded-full pointer-events-none ${
              isLight 
                ? 'bg-gradient-to-b from-white/70 via-transparent to-transparent' 
                : 'bg-gradient-to-b from-white/[0.22] via-white/[0.04] to-transparent'
            }`} />

            {/* Hairline Top Specular Light Flare */}
            <div className={`absolute -top-[1px] inset-x-8 h-[1.5px] pointer-events-none ${
              isLight 
                ? 'bg-gradient-to-r from-transparent via-white/95 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-white/85 to-transparent'
            }`} />

            {/* Prismatic rainbow micro-shimmer line */}
            <div className={`absolute -top-[1px] inset-x-16 h-[1px] pointer-events-none blur-[0.5px] ${
              isLight 
                ? 'bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent'
            }`} />

            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm transition-all duration-300 ${
                    isActive
                      ? isLight
                        ? 'text-neutral-900 font-semibold'
                        : 'text-white font-semibold'
                      : isLight
                        ? 'text-neutral-600 font-medium hover:text-neutral-900 hover:bg-black/[0.04]'
                        : 'text-white/70 font-medium hover:text-white hover:bg-white/[0.12] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                  }`}
                >
                  {/* Active Pill Background - Carved Optical Crystal Lens */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-bg"
                      className="crystal-pill-active absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Glowing Top Lamp Light Beam (Luminous Neon Prism) */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-lamp"
                      className="absolute -top-[7px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    >
                      {/* Glowing Lamp Bar */}
                      <div className={`rounded-full ${
                        isLight
                          ? 'w-8 h-[2.5px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8),0_0_16px_rgba(6,182,212,0.4)]'
                          : 'w-10 h-[2.5px] bg-white shadow-[0_0_12px_#ffffff,0_0_24px_rgba(0,229,255,1),0_0_40px_rgba(0,229,255,0.7)]'
                      }`} />
                      {/* Soft ambient downwards light cone */}
                      <div className={`w-14 h-4 blur-[2px] ${
                        isLight
                          ? 'bg-gradient-to-b from-cyan-500/25 via-cyan-400/10 to-transparent'
                          : 'bg-gradient-to-b from-cyan-300/40 via-cyan-400/15 to-transparent'
                      }`} />
                    </motion.div>
                  )}

                  <span className={`relative z-10 ${
                    isLight 
                      ? '' 
                      : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                  }`}>
                    {item.label}
                  </span>
                </a>
              )
            })}

            {/* More Dropdown Menu */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`relative flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  moreDropdownOpen
                    ? isLight
                      ? 'text-neutral-900 crystal-pill-active'
                      : 'text-white crystal-pill-active'
                    : isLight
                      ? 'text-neutral-600 hover:text-neutral-900 hover:bg-black/[0.04]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.12] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                }`}
              >
                <span className={`relative z-10 ${isLight ? '' : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'}`}>
                  More
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 relative z-10 transition-transform duration-200 ${
                    moreDropdownOpen
                      ? isLight ? 'rotate-180 text-neutral-900' : 'rotate-180 text-white'
                      : isLight ? 'text-neutral-500' : 'text-white/60'
                  }`}
                />
              </button>

              {/* Dropdown Menu Panel - Crystal Glass Slab */}
              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className={`crystal-dock absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-64 rounded-2xl p-2 z-50 overflow-hidden ${
                      isLight 
                        ? 'bg-white/95 border border-neutral-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.12)]' 
                        : ''
                    }`}
                  >
                    {/* Top inner gloss reflection */}
                    <div className={`absolute inset-0 pointer-events-none rounded-2xl ${
                      isLight
                        ? 'bg-gradient-to-b from-white/60 via-transparent to-transparent'
                        : 'bg-gradient-to-b from-white/[0.18] via-transparent to-black/20'
                    }`} />

                    <div className="relative z-10 flex flex-col gap-1">
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
                            className={`group flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer ${
                              isLight
                                ? 'hover:bg-neutral-100/90'
                                : 'hover:bg-white/[0.15] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                isLight
                                  ? 'bg-neutral-100 text-neutral-700 group-hover:text-neutral-950 border border-neutral-200/80'
                                  : 'crystal-lens text-white/80 group-hover:text-white group-hover:border-white/40'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className={`text-xs font-semibold ${
                                  isLight
                                    ? 'text-neutral-900 group-hover:text-black'
                                    : 'text-white/95 group-hover:text-white'
                                }`}>
                                  {item.label}
                                </span>
                                <span className={`text-[10px] line-clamp-1 ${
                                  isLight ? 'text-neutral-500' : 'text-white/60'
                                }`}>
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            {item.badge && (
                              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                                isLight
                                  ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                                  : 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                            {item.external && (
                              <ExternalLink className={`w-3 h-3 transition-colors ${
                                isLight 
                                  ? 'text-neutral-400 group-hover:text-neutral-800' 
                                  : 'text-white/40 group-hover:text-white/90'
                              }`} />
                            )}
                          </a>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book a Call Button - Polished Capsule */}
            <a
              href="mailto:dicksone2006@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
              className={`relative ml-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] overflow-hidden group cursor-pointer ${
                isLight
                  ? 'bg-neutral-900 hover:bg-black text-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] ring-1 ring-black/20'
                  : 'crystal-btn text-white'
              }`}
            >
              {/* Gloss highlight on button */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.25] via-transparent to-transparent pointer-events-none" />
              <Calendar className={`relative z-10 w-3.5 h-3.5 transition-colors ${
                isLight ? 'text-neutral-300 group-hover:text-white' : 'text-white/90 group-hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
              }`} />
              <span className={`relative z-10 ${isLight ? '' : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'}`}>
                Book a Call
              </span>
            </a>
          </nav>
        </div>

        {/* Right: Command Shortcut Badge (⌘) + Theme Switcher */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 z-10">
          {/* ⌘ Key Shortcut Trigger (Crystal Glass Lens) */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className={`crystal-lens hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full transition-all overflow-hidden relative group cursor-pointer ${
              isLight 
                ? 'text-neutral-700 hover:text-black hover:bg-neutral-100/80' 
                : 'text-white/80 hover:text-white'
            }`}
            title="Command Palette (Press ⌘K or Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.25] via-transparent to-transparent pointer-events-none" />
            <span className={`relative z-10 font-mono text-sm font-semibold ${
              isLight ? '' : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
            }`}>⌘</span>
          </button>

          {/* Theme Toggle */}
          <div className="relative">
            <ThemeToggle isNavLight={isLight} />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`crystal-lens md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors relative overflow-hidden cursor-pointer ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}
            aria-label="Toggle mobile menu"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.25] via-transparent to-transparent pointer-events-none" />
            <span className="relative z-10">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Floating Drawer Menu - Crystal Glass Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`crystal-dock md:hidden fixed top-20 left-4 right-4 z-40 rounded-3xl p-6 flex flex-col gap-4 overflow-hidden ${
              isLight ? 'bg-white/95 border border-neutral-200 shadow-2xl' : ''
            }`}
          >
            <div className={`absolute inset-0 pointer-events-none ${
              isLight 
                ? 'bg-gradient-to-b from-white/80 via-transparent to-transparent' 
                : 'bg-gradient-to-b from-white/[0.14] via-transparent to-black/20'
            }`} />

            <div className="relative z-10 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                    activeSection === item.id
                      ? isLight
                        ? 'crystal-pill-active text-neutral-950 font-semibold'
                        : 'crystal-pill-active text-white font-semibold'
                      : isLight
                        ? 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.12]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className={`relative z-10 pt-3 flex flex-col gap-2 ${
              isLight ? 'border-t border-neutral-200' : 'border-t border-white/15'
            }`}>
              <a
                href="mailto:dicksone2006@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                  isLight
                    ? 'bg-neutral-900 hover:bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
                    : 'bg-white/90 hover:bg-white text-black shadow-[0_4px_16px_rgba(255,255,255,0.25)]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Call</span>
              </a>

              <div className={`flex items-center justify-around pt-2 ${
                isLight ? 'text-neutral-600' : 'text-white/60'
              }`}>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors ${
                  isLight ? 'hover:text-black' : 'hover:text-white'
                }`}>
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={`p-2 transition-colors ${
                  isLight ? 'hover:text-black' : 'hover:text-white'
                }`}>
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="mailto:dicksone2006@gmail.com" className={`p-2 transition-colors ${
                  isLight ? 'hover:text-black' : 'hover:text-white'
                }`}>
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Command Palette Modal - Crystal Glass Modal */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandPaletteOpen(false)}
              className={`absolute inset-0 backdrop-blur-xl ${
                isLight ? 'bg-black/40' : 'bg-black/70'
              }`}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-lg rounded-2xl p-4 z-10 overflow-hidden ${
                isLight 
                  ? 'bg-white/95 text-neutral-900 border border-neutral-200/90 shadow-2xl' 
                  : 'crystal-dock text-white'
              }`}
            >
              {/* Top gloss reflection */}
              <div className={`absolute inset-0 pointer-events-none rounded-2xl ${
                isLight
                  ? 'bg-gradient-to-b from-white/80 via-transparent to-transparent'
                  : 'bg-gradient-to-b from-white/[0.14] via-transparent to-black/20'
              }`} />

              <div className="relative z-10">
                {/* Header Search Input */}
                <div className={`flex items-center gap-3 px-3 py-2 border-b ${
                  isLight ? 'border-neutral-200 text-neutral-500' : 'border-white/15 text-white/60'
                }`}>
                  <Search className={`w-4 h-4 ${isLight ? 'text-neutral-400' : 'text-white/50'}`} />
                  <input
                    type="text"
                    placeholder="Type a command or jump to section..."
                    autoFocus
                    className={`w-full bg-transparent text-sm focus:outline-none ${
                      isLight 
                        ? 'text-neutral-900 placeholder-neutral-400' 
                        : 'text-white placeholder-white/40'
                    }`}
                  />
                  <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                    isLight 
                      ? 'bg-neutral-100 border border-neutral-200 text-neutral-600' 
                      : 'bg-white/10 border border-white/20 text-white/70'
                  }`}>
                    ESC
                  </kbd>
                </div>

                {/* Quick Links List */}
                <div className="mt-3 flex flex-col gap-1 max-h-72 overflow-y-auto">
                  <div className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1 ${
                    isLight ? 'text-neutral-400 font-medium' : 'text-white/50'
                  }`}>
                    Navigation
                  </div>
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setCommandPaletteOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                        isLight
                          ? 'text-neutral-800 hover:bg-neutral-100'
                          : 'text-white hover:bg-white/[0.14] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]'
                      }`}
                    >
                      <span>Go to {item.label}</span>
                      <span className={`font-mono text-xs ${isLight ? 'text-neutral-400' : 'text-white/40'}`}>↵</span>
                    </a>
                  ))}

                  <div className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1 mt-2 ${
                    isLight ? 'text-neutral-400 font-medium' : 'text-white/50'
                  }`}>
                    Actions & Links
                  </div>
                  <a
                    href="mailto:dicksone2006@gmail.com"
                    onClick={() => setCommandPaletteOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                      isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'text-white hover:bg-white/[0.14]'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-cyan-500" />
                    <span>Book a Call / Send Email</span>
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCommandPaletteOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                      isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'text-white hover:bg-white/[0.14]'
                    }`}
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Open GitHub Profile</span>
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCommandPaletteOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
                      isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'text-white hover:bg-white/[0.14]'
                    }`}
                  >
                    <LinkedinIcon className="w-4 h-4 text-blue-500" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body
  )
}
