import React, { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Mail, Menu, X } from 'lucide-react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      {/* 1. Left Vertical Fixed Rail (Hamish Williams signature layout) */}
      <aside
        aria-label="Sidebar Navigation"
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 z-40 flex-col justify-between items-center py-10 select-none pointer-events-auto"
      >
        {/* Top: Monogram 'D' Logo */}
        <a
          href="#hero"
          className="group relative flex items-center justify-center w-12 h-12 focus:outline-none"
          title="Dickson E — AI Engineer"
        >
          <span className="text-2xl font-bold tracking-tighter text-[var(--textTitle)] group-hover:text-[var(--accent)] transition-colors duration-300">
            D
          </span>
          <span className="sr-only">Dickson E Home</span>
        </a>

        {/* Center: Vertical Rotated Nav List (Exact writing-mode approach from hamishw.com) */}
        <nav
          className="relative py-4"
          aria-label="Main sections"
          style={{
            writingMode: 'vertical-lr',
            transform: 'rotate(180deg)',
          }}
        >
          <div className="flex flex-row-reverse items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.label.toLowerCase()
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`group relative py-3 px-1 text-sm font-medium tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--textTitle)] font-semibold'
                      : 'text-[var(--textLight)] hover:text-[var(--textTitle)]'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle accent line on hover / active */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--accent)] transition-transform duration-300 origin-bottom ${
                      isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                    }`}
                  />
                </a>
              )
            })}
          </div>
        </nav>

        {/* Bottom: Social Icons */}
        <div className="flex flex-col items-center gap-5 text-[var(--textLight)]">
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-1 hover:text-[var(--accent)] transition-colors duration-300"
            title="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-1 hover:text-[var(--accent)] transition-colors duration-300"
            title="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href={emailLink}
            aria-label="Email Dickson"
            className="p-1 hover:text-[var(--accent)] transition-colors duration-300"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </aside>

      {/* 2. Top-Right Floating Theme Switcher (Hamish Williams placement) */}
      <div className="fixed top-8 right-8 z-50 pointer-events-auto">
        <ThemeToggle />
      </div>

      {/* 3. Mobile Header Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <a href="#hero" className="text-xl font-bold tracking-tight text-[var(--textTitle)]">
          D
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[var(--textTitle)] hover:text-[var(--accent)] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[var(--bg)]/98 backdrop-blur-lg pt-24 px-8 flex flex-col justify-between pb-12">
          <nav className="flex flex-col gap-6 text-2xl font-bold tracking-tight">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[var(--textTitle)] hover:text-[var(--accent)] transition-colors border-b border-[var(--border-subtle)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6 pt-6 border-t border-[var(--border-subtle)]">
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="text-[var(--textLight)] hover:text-[var(--accent)]">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="text-[var(--textLight)] hover:text-[var(--accent)]">
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a href={emailLink} className="text-[var(--textLight)] hover:text-[var(--accent)]">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
