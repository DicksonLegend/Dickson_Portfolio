import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const aura = auraRef.current
    const container = containerRef.current

    if (!cursor || !aura || !container) return

    // Initialize to offscreen or center until first mouse movement
    let mouseX = -100
    let mouseY = -100
    let cursorX = -100
    let cursorY = -100
    let auraX = -100
    let auraY = -100
    let lastX = 0
    let currentTilt = 0
    let targetTilt = 0
    let isVisible = false
    let isDown = false
    let rafId: number

    // Render loop with lerp for silky smooth 120fps motion
    const render = () => {
      if (isVisible) {
        // Main cursor follows quickly (crisp & snappy: lerp 0.6)
        cursorX += (mouseX - cursorX) * 0.6
        cursorY += (mouseY - cursorY) * 0.6

        // Trailing aura follows with soft liquid inertia (lerp 0.18)
        auraX += (mouseX - auraX) * 0.18
        auraY += (mouseY - auraY) * 0.18

        // Velocity tilt
        currentTilt += (targetTilt - currentTilt) * 0.15

        const scale = isDown ? 0.88 : 1.0
        const auraScale = isDown ? 0.8 : 1.0

        // Direct GPU transforms
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) rotate(${currentTilt}deg) scale(${scale})`
        aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) scale(${auraScale})`
      }

      rafId = requestAnimationFrame(render)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (!isVisible) {
        isVisible = true
        cursorX = mouseX
        cursorY = mouseY
        auraX = mouseX
        auraY = mouseY
        container.style.opacity = '1'
      }

      // Calculate movement velocity for dynamic tilt
      const vx = e.clientX - lastX
      targetTilt = Math.max(-14, Math.min(14, vx * 0.45))
      lastX = e.clientX
    }

    const onMouseDown = () => {
      isDown = true
    }

    const onMouseUp = () => {
      isDown = false
    }

    const onMouseLeave = () => {
      isVisible = false
      container.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisible = true
      container.style.opacity = '1'
    }

    // Start RAF loop immediately
    rafId = requestAnimationFrame(render)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  if (typeof document === 'undefined') {
    return null
  }

  // Mount directly onto document.body via Portal on first render
  return createPortal(
    <div
      ref={containerRef}
      id="custom-cursor-container"
      className="pointer-events-none fixed inset-0 z-[2147483647] overflow-visible transition-opacity duration-150"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Trailing Ambient Neon Aura */}
      <div
        ref={auraRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform transition-opacity duration-300"
        style={{
          width: '54px',
          height: '54px',
          opacity: 0.45,
        }}
      >
        <div className="w-full h-full rounded-full blur-md bg-gradient-to-tr from-fuchsia-500/50 via-purple-500/35 to-cyan-400/50" />
      </div>

      {/* Main Synthwave Neon Arrow Pointer */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 origin-top-left will-change-transform"
      >
        <img
          src="/cursor/custom-cursor.png"
          alt=""
          width={34}
          height={34}
          className="w-[34px] h-[34px] select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(217,70,239,0.75)]"
          draggable={false}
        />
      </div>
    </div>,
    document.body
  )
}
