import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    // Only activate custom cursor on devices with fine pointer (mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const checkIsTouch = () => !mediaQuery.matches || 'ontouchstart' in window

    if (checkIsTouch()) {
      setIsTouchDevice(true)
      return
    }

    setIsTouchDevice(false)
    document.body.classList.add('has-custom-cursor')

    const cursorEl = cursorRef.current
    const auraEl = auraRef.current

    if (!cursorEl || !auraEl) return

    // Position setters with GSAP quickTo for 120fps silky smooth physics
    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.1, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.1, ease: 'power3.out' })
    
    // Trailing aura follows with slight inertia
    const auraXTo = gsap.quickTo(auraEl, 'x', { duration: 0.32, ease: 'power2.out' })
    const auraYTo = gsap.quickTo(auraEl, 'y', { duration: 0.32, ease: 'power2.out' })

    let lastX = 0
    let lastY = 0

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      if (!isVisible) setIsVisible(true)

      // Update cursor position directly to mouse tip (0, 0 hotspot)
      xTo(clientX)
      yTo(clientY)

      // Aura centered around the click point with gentle lag
      auraXTo(clientX)
      auraYTo(clientY)

      // Subtle dynamic tilt based on mouse velocity
      const vx = clientX - lastX
      const vy = clientY - lastY
      const speed = Math.hypot(vx, vy)
      
      if (speed > 1.5) {
        const tilt = Math.max(-14, Math.min(14, (vx * 0.4)))
        gsap.to(cursorEl, {
          rotation: tilt,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      } else {
        gsap.to(cursorEl, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      lastX = clientX
      lastY = clientY

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, select, textarea, label, [data-interactive="true"], .cursor-pointer'
        )
        setIsHovered(!!interactive)
      }
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onMouseLeave = () => {
      setIsVisible(false)
      setIsHovered(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  if (isTouchDevice) {
    return null
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Ambient Trailing Glow / Aura */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
        style={{
          width: '56px',
          height: '56px',
          transform: `translate3d(0, 0, 0) scale(${isHovered ? 1.9 : isClicking ? 0.7 : 1})`,
        }}
      >
        <div
          className={`w-full h-full rounded-full blur-md transition-all duration-300 ${
            isHovered
              ? 'opacity-85 scale-110 bg-gradient-to-tr from-fuchsia-500/40 via-purple-500/30 to-cyan-400/50'
              : 'opacity-40 bg-gradient-to-tr from-purple-500/25 via-pink-500/20 to-cyan-400/25'
          }`}
        />
      </div>

      {/* Main Custom Neon Arrow Pointer */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none origin-top-left will-change-transform"
        style={{
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${isClicking ? 0.84 : isHovered ? 1.18 : 1})`,
          }}
        >
          <img
            src="/cursor/custom-cursor.png"
            alt=""
            width={34}
            height={34}
            className="w-[34px] h-[34px] select-none pointer-events-none drop-shadow-[0_2px_10px_rgba(217,70,239,0.55)]"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
