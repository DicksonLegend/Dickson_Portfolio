import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ReceiptTransition: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const rollRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

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

  // GSAP ScrollTrigger Timeline for smooth sliding & folding as user scrolls down the page
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!sectionRef.current || !paperRef.current || !headingRef.current) return

    const ctx = gsap.context(() => {
      // Initial state: paper tongue neatly resting in the dispenser slit
      gsap.set(paperRef.current, {
        transformOrigin: 'top center',
        transformStyle: 'preserve-3d',
        scaleY: 0.08,
        rotateX: -55,
        y: -50,
        opacity: 0.85,
      })

      // Feeder roll starts full
      if (rollRef.current) {
        gsap.set(rollRef.current, { scaleX: 1, opacity: 0.9 })
      }

      // Hide all line items initially
      const lineElements = gsap.utils.toArray<HTMLElement>('.receipt-line-item')
      gsap.set(lineElements, { opacity: 0, y: 10 })

      // Hide heading initially
      gsap.set(headingRef.current, { opacity: 0, y: 35 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 60%',
          scrub: 0.6, // Buttery smooth lag-behind lerp scrub tied to page scroll
          onEnter: () => {
            // Fire achievement popup whenever reaching this section from above
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('trigger-cert-achievement'))
            }
          },
          onEnterBack: () => {
            // Fire achievement popup when scrolling back into the section
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('trigger-cert-achievement'))
            }
          },
        },
      })

      // Step 1: Paper unrolls & slides down out of the feeder slot as user scrolls down
      tl.to(
        paperRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
        },
        0
      )
      .to(
        paperRef.current,
        {
          scaleY: 1,
          rotateX: 0,
          y: 0,
          duration: 1.8,
          ease: 'power2.out',
        },
        0
      )
      // Subtle mechanical paper feeder jitter
      .to(
        paperRef.current,
        {
          keyframes: [
            { rotateZ: 0, x: 0 },
            { rotateZ: -0.6, x: -1.2 },
            { rotateZ: 0.6, x: 1.2 },
            { rotateZ: -0.3, x: -0.6 },
            { rotateZ: 0.3, x: 0.6 },
            { rotateZ: 0, x: 0 },
          ],
          duration: 1.8,
          ease: 'none',
        },
        0
      )
      // Paper bundle core shrinks as paper feeds out
      if (rollRef.current) {
        tl.to(
          rollRef.current,
          {
            scaleX: 0.35,
            opacity: 0.25,
            duration: 1.6,
            ease: 'power2.out',
          },
          0
        )
      }

      // Step 2: Lines print sequentially onto the paper as it unfolds
      tl.to(
        lineElements,
        {
          opacity: 1,
          y: 0,
          stagger: 0.16,
          duration: 0.7,
          ease: 'power1.out',
        },
        0.4
      )

      // Step 3: Big display heading fades in & slides up below unfolded receipt
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        },
        1.5
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // Tooth sawtooth jagged torn bottom
  const jaggedClipPath = `polygon(
    0% 0%,
    100% 0%,
    100% calc(100% - 12px),
    97% 100%, 94% calc(100% - 12px), 91% 100%, 88% calc(100% - 12px),
    85% 100%, 82% calc(100% - 12px), 79% 100%, 76% calc(100% - 12px),
    73% 100%, 70% calc(100% - 12px), 67% 100%, 64% calc(100% - 12px),
    61% 100%, 58% calc(100% - 12px), 55% 100%, 52% calc(100% - 12px),
    49% 100%, 46% calc(100% - 12px), 43% 100%, 40% calc(100% - 12px),
    37% 100%, 34% calc(100% - 12px), 31% 100%, 28% calc(100% - 12px),
    25% 100%, 22% calc(100% - 12px), 19% 100%, 16% calc(100% - 12px),
    13% 100%, 10% calc(100% - 12px), 7% 100%, 4% calc(100% - 12px),
    1% 100%, 0% calc(100% - 12px)
  )`

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <section
        id="receipt-transition"
        aria-label="Projects to Certifications Transition"
        className="relative z-20 w-full min-h-screen bg-[var(--bg)] text-[var(--text)] py-20 px-4 sm:px-8 overflow-hidden select-none border-t border-[var(--border-subtle)] transition-colors duration-400"
      >
        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[var(--accent)] font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span>yes, I kept every certificate. no, I'm not sorry.</span>
          </div>

          <div className="w-72 sm:w-88 bg-[#fbf9f2] text-[#1c1d1f] font-mono text-left px-5 sm:px-7 pt-5 pb-8 border-x border-[#ebe7dc] shadow-2xl" style={{ clipPath: jaggedClipPath }}>
            <div className="text-center pb-3 mb-3 border-b border-dashed border-neutral-300">
              <div className="text-[11px] font-bold tracking-widest text-neutral-800">DICKSON ELECTRONIC ARCHIVE</div>
              <div className="text-[9px] text-neutral-500 tracking-wider mt-0.5">POS #01 · AUTH: PASS · TRICHY NODE</div>
            </div>
            <div className="space-y-2 text-xs sm:text-[13px]">
              <div className="font-bold text-[11px] sm:text-xs text-neutral-900 border-b border-dashed border-neutral-200 pb-1.5">DICKSON E — OFFICIAL PROOF OF CURIOSITY</div>
              <div className="flex justify-between text-neutral-700"><span>PROJECTS SHIPPED</span><span>8</span></div>
              <div className="flex justify-between text-neutral-700"><span>HACKATHONS SURVIVED</span><span>6</span></div>
              <div className="flex justify-between text-neutral-700"><span>CERTIFICATES EARNED</span><span>30</span></div>
              <div className="flex justify-between text-neutral-700"><span>COFFEE CONSUMED</span><span className="bg-neutral-900 text-neutral-900 px-1 py-0.5 rounded-sm">REDACTED</span></div>
              <div className="flex justify-between font-semibold"><span className="text-neutral-900">STATUS</span><span className="text-[#0891b2] font-bold">... STILL CURIOUS</span></div>
              <div className="text-center font-bold text-[11px] sm:text-xs pt-2 border-t border-dashed border-neutral-300 text-neutral-800">*** THANK YOU FOR SCROLLING ***</div>
            </div>
          </div>

          <div className="mt-10 text-center max-w-3xl">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-[var(--textTitle)]">
              THE PAPER TRAIL OF A <span className="text-[#f0a93a] drop-shadow-[0_0_25px_rgba(240,169,58,0.5)]">RELENTLESS</span> BUILDER
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[var(--textLight)]">
              30 verified credentials across AI, Cloud, Microservices, Data Science, and Hackathon arena battles.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="receipt-transition"
      aria-label="Projects to Certifications Transition"
      className="relative z-20 w-full min-h-screen bg-[var(--bg)] text-[var(--text)] select-none border-t border-[var(--border-subtle)] transition-colors duration-400"
    >
      {/* Scroll-Triggered Stage: Flows naturally with page scroll */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 sm:py-28"
      >
        {/* Background Ambient Glows: Cyan & Amber (Exact Hero Palette Match) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(0,229,255,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_75%,rgba(240,169,58,0.05),transparent_50%)] pointer-events-none" />

        <div className="relative max-w-4xl w-full mx-auto flex flex-col items-center text-center z-10">
          
          {/* Small Mono Line Above Dispenser: Vivid Cyan with Pulsing Dot */}
          <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-[var(--accent)] font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)] animate-pulse" />
            <span>yes, I kept every certificate. no, I'm not sorry.</span>
          </div>

          {/* Physical Printer Dispenser Slot & Feeder Bundle */}
          <div className="relative w-72 sm:w-88 flex flex-col items-center">
            
            {/* Scrolled Paper Roll Bundle Inside Feeder Slot */}
            <div
              ref={rollRef}
              className="w-48 h-2 rounded-full bg-[#eee9dc] border border-[#d8d3c5] shadow-inner mb-0.5 pointer-events-none z-30"
              title="Paper Feed Core"
            />

            {/* Printer Dispenser Mouth (Front Housing) */}
            <div className="relative z-30 w-full h-4 bg-[#0d1015] dark:bg-[#0c0f12] border border-neutral-700/60 dark:border-white/10 ring-1 ring-[var(--accent)]/30 rounded-t-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center">
              {/* Paper slit opening */}
              <div className="w-[90%] h-1 bg-[#020406] rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,1)]" />
            </div>

            {/* 3D Folding & Sliding Receipt Paper */}
            <div
              className="w-full relative z-20 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
              style={{ perspective: '1200px' }}
            >
              <div
                ref={paperRef}
                style={{
                  clipPath: jaggedClipPath,
                  WebkitClipPath: jaggedClipPath,
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className="w-full bg-[#fbf9f2] text-[#1c1d1f] font-mono text-left px-5 sm:px-6 pt-3.5 pb-8 overflow-hidden shadow-inner border-x border-[#ebe7dc] relative"
              >
                {/* Subtle paper watermark sheen */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] via-transparent to-black/[0.02] pointer-events-none" />

                {/* Simulated Paper Fold Creases (Giving physical paper depth) */}
                <div className="absolute top-[32%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.07] to-transparent pointer-events-none shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
                <div className="absolute top-[64%] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/[0.07] to-transparent pointer-events-none shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />

                {/* Receipt Header */}
                <div className="receipt-line-item text-center pb-2 mb-2 border-b border-dashed border-neutral-300">
                  <div className="text-[10.5px] font-bold tracking-widest text-neutral-800">
                    DICKSON ELECTRONIC ARCHIVE
                  </div>
                  <div className="text-[8.5px] text-neutral-500 tracking-wider mt-0.5">
                    POS #01 · AUTH: PASS · TRICHY NODE
                  </div>
                  <div className="text-[8.5px] text-neutral-400 tracking-wider">
                    ================================
                  </div>
                </div>

                {/* Line-by-Line Thermal Lines */}
                <div className="space-y-1.5 text-xs leading-relaxed">
                  
                  {/* Line 1: Header Title */}
                  <div className="receipt-line-item font-bold text-[10.5px] sm:text-xs text-neutral-900 border-b border-dashed border-neutral-200 pb-1 mb-1 tracking-tight">
                    DICKSON E — OFFICIAL PROOF OF CURIOSITY
                  </div>

                  {/* Line 2: Projects Shipped */}
                  <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium">
                    <span>PROJECTS SHIPPED</span>
                    <span className="font-semibold text-neutral-900">......... 8</span>
                  </div>

                  {/* Line 3: Hackathons Survived */}
                  <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium">
                    <span>HACKATHONS SURVIVED</span>
                    <span className="font-semibold text-neutral-900">...... 6</span>
                  </div>

                  {/* Line 4: Certificates Earned */}
                  <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium">
                    <span>CERTIFICATES EARNED</span>
                    <span className="font-semibold text-neutral-900">...... 30</span>
                  </div>

                  {/* Line 5: Coffee Consumed */}
                  <div className="receipt-line-item flex items-center justify-between text-neutral-700 font-medium">
                    <span>COFFEE CONSUMED</span>
                    <span className="inline-flex items-center gap-1">
                      <span className="text-neutral-400">..........</span>
                      <span
                        className="bg-neutral-900 text-neutral-900 px-1 py-0.5 rounded-sm select-none"
                        title="Classified"
                      >
                        REDACTED
                      </span>
                    </span>
                  </div>

                  {/* Line 6: Status Still Curious (Vibrant Cyan Highlight) */}
                  <div className="receipt-line-item flex items-center justify-between font-semibold">
                    <span className="text-neutral-900">STATUS</span>
                    <span className="text-[#0891b2] dark:text-[#00e5ff] font-bold">
                      ... STILL CURIOUS
                    </span>
                  </div>

                  {/* Line 7: Thank You For Scrolling */}
                  <div className="receipt-line-item text-center font-bold text-[10.5px] sm:text-xs pt-1.5 border-t border-dashed border-neutral-300 text-neutral-800 tracking-wider">
                    *** THANK YOU FOR SCROLLING ***
                  </div>
                </div>

                {/* Bottom Barcode & Serial ID */}
                <div className="receipt-line-item mt-2.5 pt-2 border-t border-dashed border-neutral-300 flex flex-col items-center text-center text-neutral-400">
                  <div className="flex items-center gap-[2px] h-5 mb-1 opacity-75">
                    {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7].map((w, i) => (
                      <div
                        key={i}
                        className="bg-neutral-800 h-full"
                        style={{ width: `${(w % 3) + 1.2}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] tracking-widest font-mono text-neutral-500 uppercase">
                    VERIFIED BUILDER ID · #DE-2026-30
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 3: Big Display Heading (Reveals in plain view below receipt) */}
          <div
            ref={headingRef}
            className="mt-8 sm:mt-10 text-center max-w-3xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] uppercase font-sans text-[var(--textTitle)]">
              THE PAPER TRAIL OF A{' '}
              <span className="text-[#f0a93a] drop-shadow-[0_0_25px_rgba(240,169,58,0.5)]">
                RELENTLESS
              </span>{' '}
              BUILDER
            </h2>
            <p className="mt-3 text-xs sm:text-sm font-mono text-[var(--textLight)] tracking-wide max-w-xl mx-auto">
              30 verified credentials across AI, Cloud, Microservices, Data Science, and Hackathon arena battles.
            </p>

            {/* Smooth scroll cue arrow */}
            <div className="mt-4 inline-flex items-center justify-center text-[var(--accent)] animate-bounce">
              <a
                href="#certifications"
                className="p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
                title="Continue to Certifications"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
