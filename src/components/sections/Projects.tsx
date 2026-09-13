import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '@/data/portfolioData'
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

// Soundwave visualizer bar pattern (48 bars total, 4 per project)
const WAVEFORM_HEIGHTS = [
  12, 22, 16, 28, 14, 20, 26, 18, 10, 24, 32, 16,
  14, 28, 20, 12, 26, 34, 18, 22, 14, 30, 24, 16,
  10, 18, 28, 22, 16, 32, 20, 14, 26, 18, 30, 24,
  14, 22, 18, 28, 12, 26, 32, 20, 16, 24, 18, 12,
]

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeIndexRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [scrollPercent, setScrollPercent] = useState<number>(0)

  // Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Update card transform scales and opacities based on distance to visual center
  const updateCardTransforms = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    // Desktop focal center offset takes into account the 80px left sidebar
    const viewportW = window.innerWidth
    const focalCenter = window.innerWidth < 768 ? viewportW * 0.5 : (viewportW + 80) * 0.5
    const falloffRadius = viewportW * 0.48

    let closestIdx = 0
    let minDistance = Infinity

    cardRefs.current.forEach((card, idx) => {
      if (!card) return

      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const dist = Math.abs(cardCenter - focalCenter)

      if (dist < minDistance) {
        minDistance = dist
        closestIdx = idx
      }

      // Distance normalized: 0 at exact center, 1 at edge of focal zone
      const normDist = Math.min(2.5, dist / falloffRadius)

      // Focal magnification: center card pops up to 1.08x, flanking cards scale down
      const scale = Math.max(0.48, Math.min(1.08, 1.08 - normDist * 0.55))
      const opacity = Math.max(0.28, Math.min(1.0, 1.0 - normDist * 0.68))
      const zIndex = Math.round(100 - normDist * 50)
      const brightness = Math.max(0.4, 1.0 - normDist * 0.4)

      card.style.transform = `scale(${scale.toFixed(4)})`
      card.style.opacity = opacity.toFixed(3)
      card.style.zIndex = `${zIndex}`
      card.style.filter = `brightness(${brightness.toFixed(3)})`
    })

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx
      setActiveIndex(closestIdx)
    }
  }, [])

  // Initialize GSAP Pinned Horizontal Scrub
  useEffect(() => {
    const section = sectionRef.current
    const pinEl = pinRef.current
    const track = trackRef.current
    if (!section || !pinEl || !track) return

    // Compute max scroll translation
    const calculateDistance = () => {
      const trackW = track.scrollWidth
      const viewportW = window.innerWidth
      const focalCenter = window.innerWidth < 768 ? viewportW * 0.5 : (viewportW + 80) * 0.5
      const cardW = window.innerWidth < 640 ? 320 : window.innerWidth < 1024 ? 400 : 460
      // Pad so first card starts centered and last card finishes centered
      return Math.max(0, trackW - viewportW + (viewportW - focalCenter - cardW / 2))
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinEl,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress
        setScrollPercent(Math.round(p * 100))

        const maxDist = calculateDistance()
        const currentX = -p * maxDist
        track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`

        updateCardTransforms()
      },
      onRefresh: () => {
        updateCardTransforms()
      },
    })

    scrollTriggerRef.current = trigger
    updateCardTransforms()

    return () => {
      trigger.kill()
    }
  }, [updateCardTransforms])

  // Click on waveform or card to smoothly scroll to that project
  const scrollToProject = (targetIndex: number) => {
    const trigger = scrollTriggerRef.current
    if (!trigger) return

    const clamped = Math.max(0, Math.min(projectsData.length - 1, targetIndex))
    const targetProgress = clamped / (projectsData.length - 1)
    const targetScrollY = trigger.start + targetProgress * (trigger.end - trigger.start)

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  const currentProject = projectsData[activeIndex] || projectsData[0]

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Selected Works and Flagship Projects"
      className="relative h-[480vh] w-full bg-[#060c0e] text-[var(--text)] select-none"
    >
      {/* Ambient background mesh glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#f0a93a]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Pinned 100vh Viewport */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:py-8 bg-[#060c0e]/95 backdrop-blur-3xl"
      >
        {/* =========================================================================
            1. TOP HEADER: TinyWins Dynamic "Make them feel [feelWord]" Headline
            ========================================================================= */}
        <div className="relative z-20 w-full px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 pointer-events-none">
          <div className="max-w-5xl">
            {/* Category / Counter Eyebrow */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#3fae8e] font-semibold flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                02 // SELECTED WORKS
              </span>
              <div className="w-10 h-[1px] bg-[#3fae8e]/50" />
              <span className="font-mono text-xs text-[var(--text-faint)]">
                12 PRODUCTION REPOSITORIES
              </span>
            </div>

            {/* Dynamic TinyWins-Style Hero Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white flex flex-wrap items-baseline gap-x-3">
              <span>Make them feel</span>
              <span
                key={currentProject.id}
                className="font-serif italic font-normal inline-block transition-all duration-300 drop-shadow-[0_0_35px_rgba(240,169,58,0.35)]"
                style={{ color: currentProject.accentColor || '#f0a93a' }}
              >
                {currentProject.feelWord || 'empowered'}.
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm font-mono text-[var(--text-muted)] max-w-2xl">
              Scroll to scrub through clinical RAG engines, multi-agent frameworks, and high-scale production architectures.
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. HORIZONTAL TRACK: Dynamic 3D Focal Carousel of All 12 Projects
            ========================================================================= */}
        <div className="relative z-10 w-full overflow-visible py-4 my-auto">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 md:gap-10 will-change-transform"
            style={{
              paddingLeft: isMobile ? 'calc(50vw - 160px)' : 'calc(50vw - 230px + 40px)',
              paddingRight: '50vw',
            }}
          >
            {projectsData.map((project, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  onClick={() => scrollToProject(index)}
                  className={`group relative shrink-0 cursor-pointer transition-shadow duration-500 rounded-[2rem] p-[1px] will-change-transform ${
                    isActive
                      ? 'shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(0,229,255,0.12)]'
                      : 'shadow-2xl'
                  }`}
                  style={{
                    width: isMobile ? '320px' : window.innerWidth < 1024 ? '400px' : '460px',
                    height: isMobile ? '470px' : '530px',
                    transformOrigin: 'center center',
                  }}
                >
                  {/* Subtle Glowing Border Layer */}
                  <div
                    className="absolute inset-0 rounded-[2rem] transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${
                        project.accentColor || '#f0a93a'
                      }55, transparent 65%, ${project.accentColor || '#3fae8e'}22)`,
                      opacity: isActive ? 1 : 0.25,
                    }}
                  />

                  {/* Inner Card Container */}
                  <div className="relative w-full h-full rounded-[2rem] bg-[#0c1418]/95 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                    {/* Ambient Interior Glow */}
                    <div
                      className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                      style={{
                        background: project.accentColor || '#f0a93a',
                        opacity: isActive ? 0.15 : 0.05,
                      }}
                    />

                    {/* Top Row: Category Pill & Index Number */}
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span
                          className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border transition-colors duration-300"
                          style={{
                            color: project.accentColor || '#f0a93a',
                            borderColor: `${project.accentColor || '#f0a93a'}40`,
                            backgroundColor: `${project.accentColor || '#f0a93a'}15`,
                          }}
                        >
                          {project.category}
                        </span>

                        <span className="font-mono text-xs sm:text-sm text-[var(--text-faint)] tracking-widest">
                          {String(index + 1).padStart(2, '0')} // 12
                        </span>
                      </div>

                      {/* Project Title with Pop-out Link */}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="group/title inline-flex items-center gap-2 mb-2 focus:outline-none"
                      >
                        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover/title:text-[var(--accent)] transition-colors duration-300">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-[var(--text-faint)] group-hover/title:text-[var(--accent)] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-300" />
                      </a>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm font-serif italic text-white/80 mb-3 line-clamp-1">
                        "{project.tagline}"
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Middle: Key Performance Metrics Callout */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="my-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] grid grid-cols-2 gap-3">
                        {project.metrics.map((m) => (
                          <div key={m.label} className="flex flex-col">
                            <span className="font-mono text-[10px] uppercase text-[var(--text-faint)] tracking-wider">
                              {m.label}
                            </span>
                            <span
                              className="font-mono text-xs sm:text-sm font-semibold truncate"
                              style={{ color: project.accentColor || '#f0a93a' }}
                            >
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom: Tech Stack Pills & Action Buttons */}
                    <div>
                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 5 && (
                          <span className="font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md text-[var(--text-faint)]">
                            +{project.tags.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 text-xs font-mono text-white transition-all duration-300 hover:border-white/30"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Source Code</span>
                        </a>

                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono text-black font-semibold transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: project.accentColor || '#3fae8e' }}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* =========================================================================
            3. BOTTOM HUD: Soundwave Visualizer & Active Project Scrub Controller
            ========================================================================= */}
        <div className="relative z-20 w-full px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            {/* Left: Active Project Indicator */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: currentProject.accentColor || '#f0a93a' }}
              />
              <span className="text-white font-bold tracking-wider">
                {String(activeIndex + 1).padStart(2, '0')} // 12
              </span>
              <span className="text-white/40 hidden sm:inline">·</span>
              <span className="text-white/90 uppercase tracking-wide truncate max-w-[200px] sm:max-w-xs font-semibold">
                {currentProject.title}
              </span>
            </div>

            {/* Center: Audio-Waveform Visualizer Scrub Bar */}
            <div
              className="flex items-center gap-[3px] sm:gap-[4px] px-3 py-2 rounded-full bg-white/[0.03] border border-white/10 cursor-pointer hover:border-white/25 transition-all duration-300"
              title="Click anywhere to scrub between projects"
            >
              {WAVEFORM_HEIGHTS.map((height, barIdx) => {
                // Each project corresponds to 4 bars (48 / 12 = 4)
                const projectIdxForBar = Math.floor(barIdx / 4)
                const isCurrentProjectBar = projectIdxForBar === activeIndex
                const isPassed = projectIdxForBar < activeIndex

                return (
                  <button
                    key={barIdx}
                    type="button"
                    onClick={() => scrollToProject(projectIdxForBar)}
                    aria-label={`Jump to project ${projectIdxForBar + 1}`}
                    className="group/bar relative flex items-center justify-center p-[1px] focus:outline-none"
                  >
                    <span
                      className={`w-[3px] rounded-full transition-all duration-300 ${
                        isCurrentProjectBar
                          ? 'scale-y-125'
                          : 'group-hover/bar:scale-y-125'
                      }`}
                      style={{
                        height: `${height}px`,
                        backgroundColor: isCurrentProjectBar
                          ? currentProject.accentColor || '#f0a93a'
                          : isPassed
                          ? 'rgba(255, 255, 255, 0.5)'
                          : 'rgba(255, 255, 255, 0.15)',
                        boxShadow: isCurrentProjectBar
                          ? `0 0 10px ${currentProject.accentColor || '#f0a93a'}`
                          : 'none',
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Right: Scrub Navigation Controls & Progress Percentage */}
            <div className="flex items-center gap-4 font-mono text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollToProject(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToProject(activeIndex + 1)}
                  disabled={activeIndex === projectsData.length - 1}
                  className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#f0a93a]" />
                <span className="font-semibold">{scrollPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
