import React from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Mail } from 'lucide-react'
import { socialLinks } from '@/data/portfolioData'

export interface NavbarProps {
  activeSection?: string
}

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

export const Navbar: React.FC<NavbarProps> = ({ activeSection = 'hero' }) => {
  const navItems = [
    { label: 'Projects', href: '#projects' },
    { label: 'Details', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  const githubLink = socialLinks.find((l) => l.platform === 'github')?.url || 'https://github.com/DicksonLegend'
  const linkedinLink = socialLinks.find((l) => l.platform === 'linkedin')?.url || 'https://linkedin.com'
  const emailLink = socialLinks.find((l) => l.platform === 'email')?.url || 'mailto:dicksone2006@gmail.com'

  return (
    <>
      {/* 1. Left Vertical Fixed Rail (Desktop) */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 z-40 flex-col justify-between items-center py-8 border-r border-[var(--border-subtle)] bg-[var(--bg)]/80 backdrop-blur-md select-none transition-colors duration-400"
      >
        {/* Top: Monogram Logo */}
        <a
          href="#hero"
          className="group relative flex items-center justify-center w-12 h-12 focus:outline-none"
          title="Dickson E — AI Engineer"
        >
          <svg
            className="w-8 h-8 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M6 4h10a12 12 0 0 1 12 12v0a12 12 0 0 1-12 12H6V4zm4 4v16h6a8 8 0 0 0 8-8v0a8 8 0 0 0-8-8h-6z" />
          </svg>
          <span className="sr-only">Dickson E Home</span>
        </a>

        {/* Center: Vertical Rotated Nav Links */}
        <nav className="flex flex-col items-center gap-10 py-6" aria-label="Main sections">
          {navItems.map((item) => {
            const isActive = activeSection === item.label.toLowerCase()
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-xs tracking-[0.22em] uppercase font-mono transition-colors duration-300 transform -rotate-90 origin-center py-2 ${
                  isActive
                    ? 'text-[var(--accent)] font-semibold'
                    : 'text-[var(--text-faint)] hover:text-[var(--text)]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-line"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-[var(--accent)]"
                  />
                )}
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Bottom: Social Icons */}
        <div className="flex flex-col items-center gap-4 text-[var(--text-faint)]">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1.5 hover:text-[var(--accent)] transition-colors duration-300"
            title="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1.5 hover:text-[var(--accent)] transition-colors duration-300"
            title="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href={emailLink}
            aria-label="Email Dickson"
            className="p-1.5 hover:text-[var(--accent)] transition-colors duration-300"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </aside>

      {/* 2. Top-Right Floating Theme Switcher */}
      <header className="fixed top-6 right-6 z-40 flex items-center gap-4">
        <ThemeToggle />
      </header>

      {/* 3. Mobile Header Bar (Mobile only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <a href="#hero" className="flex items-center gap-2">
          <svg className="w-6 h-6 text-[var(--accent)]" viewBox="0 0 32 32" fill="currentColor">
            <path d="M6 4h10a12 12 0 0 1 12 12v0a12 12 0 0 1-12 12H6V4zm4 4v16h6a8 8 0 0 0 8-8v0a8 8 0 0 0-8-8h-6z" />
          </svg>
          <span className="font-mono text-xs tracking-widest font-bold uppercase text-[var(--text)]">
            DICKSON E
          </span>
        </a>
      </div>
    </>
  )
}
