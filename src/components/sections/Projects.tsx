import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectsData } from '@/data/portfolioData'
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, Layers } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const TOTAL_WAVEFORM_BARS = 41

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeIndexRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Pure mathematical distance calculation: 0 layout reflows (120 FPS smooth)
  const updateCardTransforms = useCallback((currentX: number, pitch: number, cardW: number) => {
    const closestIdx = Math.max(0, Math.min(projectsData.length - 1, Math.round(-currentX / pitch)))

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx
      setActiveIndex(closestIdx)
    }

    const falloffRadius = cardW * 1.45

    cardRefs.current.forEach((card, idx) => {
      if (!card) return

      // Mathematical offset from the visual focal point
      const dist = Math.abs(currentX + idx * pitch)
      const normDist = Math.min(2.5, dist / falloffRadius)

      // Focal magnification: active card pops up to 1.08x, flanking cards scale down
      const scale = Math.max(0.48, Math.min(1.08, 1.08 - normDist * 0.55))
      const opacity = Math.max(0.28, Math.min(1.0, 1.0 - normDist * 0.68))
      const zIndex = Math.round(100 - normDist * 50)
      const brightness = Math.max(0.42, 1.0 - normDist * 0.38)

      card.style.transform = `scale(${scale.toFixed(4)})`
      card.style.opacity = opacity.toFixed(3)
      card.style.zIndex = `${zIndex}`
      card.style.filter = `brightness(${brightness.toFixed(3)})`
    })
  }, [])

  // Initialize GSAP Pinned Horizontal Scrub with momentum smoothing
  useEffect(() => {
    const section = sectionRef.current
    const pinEl = pinRef.current
    const track = trackRef.current
    if (!section || !pinEl || !track) return

    const cardW = window.innerWidth < 640 ? 320 : window.innerWidth < 1024 ? 400 : 460
    const gap = window.innerWidth < 640 ? 24 : 36
    const pitch = cardW + gap
    const totalDist = (projectsData.length - 1) * pitch

    const viewportW = window.innerWidth
    const focalCenter = window.innerWidth < 768 ? viewportW * 0.5 : (viewportW + 80) * 0.5
    const padLeft = focalCenter - cardW / 2
    const padRight = viewportW - focalCenter

    track.style.paddingLeft = `${padLeft}px`
    track.style.paddingRight = `${padRight}px`

    const END_BUFFER = 0.86 // Card 12 reaches center and rests stationary for the final 14% of scroll

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinEl,
      pinSpacing: true,
      scrub: 1.0, // Momentum-smoothed scrub for buttery mousewheel and trackpad feel
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const scrubProgress = Math.min(1, self.progress / END_BUFFER)
        const currentX = -scrubProgress * totalDist
        track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`
        updateCardTransforms(currentX, pitch, cardW)
      },
      onRefresh: (self) => {
        const scrubProgress = Math.min(1, self.progress / END_BUFFER)
        const currentX = -scrubProgress * totalDist
        track.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`
        updateCardTransforms(currentX, pitch, cardW)
      },
    })

    scrollTriggerRef.current = trigger
    updateCardTransforms(0, pitch, cardW)

    // Force refresh to ensure all preceding sections and pin spacers are calibrated
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

    return () => {
      clearTimeout(refreshTimer)
      trigger.kill()
    }
  }, [updateCardTransforms])

  // Click on waveform bar, chevron, or card to smoothly scroll directly to that project
  const scrollToProject = (targetIndex: number) => {
    const trigger = scrollTriggerRef.current
    if (!trigger) return

    const END_BUFFER = 0.86
    const clamped = Math.max(0, Math.min(projectsData.length - 1, targetIndex))
    const targetProgress = (clamped / (projectsData.length - 1)) * END_BUFFER
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
      className="relative h-[500vh] w-full bg-[#060c0e] text-[var(--text)] select-none"
    >
      {/* Waveform living pulse CSS animation */}
      <style>{`
        @keyframes livingWaveform {
          0%, 100% {
            transform: scaleY(0.85);
          }
          50% {
            transform: scaleY(1.18);
          }
        }
      `}</style>

      {/* Ambient background mesh glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#f0a93a]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Pinned 100vh Viewport */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-8 sm:pt-10 md:pt-12 pb-4 md:pb-6 bg-[#060c0e]/95 backdrop-blur-3xl"
      >
        {/* =========================================================================
            1. TOP HEADER: "Engineered to be [word]."
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

            {/* Impactful 3-word sentence + Dynamic technical virtue word */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white flex flex-wrap items-baseline gap-x-3">
              <span>Engineered to be</span>
              <span
                key={currentProject.id}
                className="font-serif italic font-normal inline-block transition-all duration-300 drop-shadow-[0_0_35px_rgba(240,169,58,0.35)]"
                style={{ color: currentProject.accentColor || '#f0a93a' }}
              >
                {currentProject.feelWord || 'optimal'}.
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
            className="flex items-center gap-6 sm:gap-9 will-change-transform"
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
            3. BOTTOM HUD: Minimal Borderless Waveform Visualizer (TinyWins Reference)
            ========================================================================= */}
        <div className="relative z-20 w-full pb-2 md:pb-4 flex flex-col items-center justify-center pointer-events-auto select-none">
          {/* Active Project Title & Technical Virtue (like AXUM CAPITAL STEADY in TinyWins) */}
          <div className="flex items-center justify-center gap-3 mb-2.5 font-mono text-xs tracking-[0.25em] uppercase">
            <span className="text-white/40">{String(activeIndex + 1).padStart(2, '0')} //</span>
            <span className="text-white font-bold tracking-[0.22em] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
              {currentProject.title}
            </span>
            <span
              className="font-serif italic font-normal tracking-normal lowercase transition-colors duration-300"
              style={{ color: currentProject.accentColor || '#f0a93a' }}
            >
              · {currentProject.feelWord}
            </span>
          </div>

          {/* Minimal Borderless Audio Waveform Visualizer */}
          <div className="relative flex items-center justify-center gap-4 sm:gap-6">
            {/* Minimal Ghost Prev Chevron */}
            <button
              type="button"
              onClick={() => scrollToProject(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="p-1 text-white/30 hover:text-white disabled:opacity-0 transition-all duration-300 focus:outline-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Symmetrical Bell-Curve Waveform (Zero Border, Zero Capsule, Pure Negative Space) */}
            <div
              className="flex items-center gap-[3px] sm:gap-[4px] py-1 cursor-pointer"
              title="Click or scrub to navigate projects"
            >
              {Array.from({ length: TOTAL_WAVEFORM_BARS }).map((_, barIdx) => {
                // Map current active index to center bar
                const activeBar = Math.round(
                  (activeIndex / (projectsData.length - 1)) * (TOTAL_WAVEFORM_BARS - 1)
                )
                const delta = Math.abs(barIdx - activeBar)
                // Gaussian bell curve: sharp peak at active position, descending to subtle dots on sides
                const bell = Math.exp(-Math.pow(delta / 4.2, 2))
                const height = Math.max(3, Math.round(3 + bell * 28))
                const isFocal = bell > 0.45
                const isMid = bell > 0.15

                return (
                  <button
                    key={barIdx}
                    type="button"
                    onClick={() => {
                      const targetProject = Math.round(
                        (barIdx / (TOTAL_WAVEFORM_BARS - 1)) * (projectsData.length - 1)
                      )
                      scrollToProject(targetProject)
                    }}
                    aria-label={`Jump to project from bar ${barIdx + 1}`}
                    className="group/bar relative flex items-center justify-center p-[1px] focus:outline-none"
                  >
                    <span
                      className="w-[2.5px] sm:w-[3px] rounded-full transition-all duration-300"
                      style={{
                        height: `${height}px`,
                        backgroundColor: isFocal
                          ? currentProject.accentColor || '#f0a93a'
                          : isMid
                          ? 'rgba(255, 255, 255, 0.45)'
                          : 'rgba(255, 255, 255, 0.14)',
                        boxShadow: isFocal
                          ? `0 0 12px ${currentProject.accentColor || '#f0a93a'}99`
                          : 'none',
                        animation: 'livingWaveform 1.8s ease-in-out infinite',
                        animationDelay: `${(barIdx * 0.05).toFixed(2)}s`,
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Minimal Ghost Next Chevron */}
            <button
              type="button"
              onClick={() => scrollToProject(activeIndex + 1)}
              disabled={activeIndex === projectsData.length - 1}
              aria-label="Next project"
              className="p-1 text-white/30 hover:text-white disabled:opacity-0 transition-all duration-300 focus:outline-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
