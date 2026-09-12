import React, { useEffect, useRef, useState, useMemo, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Switchable mode: 'CANVAS_SEQUENCE' (Apple-style 120fps video frames) or 'THREE_GLTF' (Original 3D mesh)
const RENDER_MODE: 'CANVAS_SEQUENCE' | 'THREE_GLTF' = 'CANVAS_SEQUENCE'

const TOTAL_FRAMES = 90
const FRAME_PATH_PREFIX = '/frames/book/frame_'

// 15 Curated Skills from Dickson's AI & Engineering Stack with Organic Coordinates strictly ABOVE the book
export interface SkillItem {
  name: string
  src: string
  tag: string
  color: string
  // Desktop target coordinates (% of container)
  x: number
  y: number
  // Mobile target coordinates (% of container)
  mobileX: number
  mobileY: number
}

const SKILL_ITEMS: SkillItem[] = [
  // High Floating Tier (Y: 16% - 24%) - Framing upper right & center
  { name: 'FastAPI', src: '/icons/fastapi.svg', tag: 'High-Throughput APIs', color: '#009688', x: 50, y: 16, mobileX: 50, mobileY: 20 },
  { name: 'TypeScript', src: '/icons/typescript.svg', tag: 'Type-Safe Architecture', color: '#3178c6', x: 65, y: 18, mobileX: 74, mobileY: 21 },
  { name: 'Git', src: '/icons/git.svg', tag: 'CI/CD & GitOps', color: '#f34f29', x: 80, y: 17, mobileX: 86, mobileY: 26 },
  { name: 'Linux', src: '/icons/linux.svg', tag: 'UNIX Kernels & Systems', color: '#fcc624', x: 92, y: 22, mobileX: 88, mobileY: 33 },

  // Mid-High Tier (Y: 26% - 34%) - Spanning across the middle open sky
  { name: 'Python', src: '/icons/python.svg', tag: 'Core AI / Machine Learning', color: '#3776ab', x: 13, y: 31, mobileX: 14, mobileY: 23 },
  { name: 'PyTorch', src: '/icons/pytorch.svg', tag: 'Deep Learning & Neural Networks', color: '#ee4c2c', x: 27, y: 27, mobileX: 32, mobileY: 22 },
  { name: 'LangChain', src: '/icons/langchain.svg', tag: 'RAG & Multi-Agent Orchestration', color: '#00e5ff', x: 42, y: 26, mobileX: 52, mobileY: 28 },
  { name: 'React', src: '/icons/react.svg', tag: 'Reactive Frontend Systems', color: '#61dafb', x: 57, y: 29, mobileX: 70, mobileY: 28 },
  { name: 'Scikit-Learn', src: '/icons/scikitlearn.svg', tag: 'Statistical ML Models', color: '#f89939', x: 72, y: 30, mobileX: 30, mobileY: 31 },
  { name: 'AWS', src: '/icons/aws.svg', tag: 'Cloud Compute & Deployments', color: '#ff9900', x: 86, y: 33, mobileX: 84, mobileY: 39 },

  // Lower Hovering Tier (Y: 39% - 45%) - Strictly ABOVE the book pages (pages start at Y >= 56%)
  { name: 'TensorFlow', src: '/icons/tensorflow.svg', tag: 'Model Architecture & Serving', color: '#ff6f00', x: 18, y: 43, mobileX: 15, mobileY: 33 },
  { name: 'MongoDB', src: '/icons/mongodb.svg', tag: 'Vector Store & NoSQL', color: '#47a248', x: 33, y: 41, mobileX: 34, mobileY: 39 },
  { name: 'Docker', src: '/icons/docker.svg', tag: 'Containerization & Isolation', color: '#2496ed', x: 48, y: 40, mobileX: 50, mobileY: 37 },
  { name: 'PostgreSQL', src: '/icons/postgresql.svg', tag: 'Relational & Structured DB', color: '#336791', x: 63, y: 42, mobileX: 66, mobileY: 38 },
  { name: 'TailwindCSS', src: '/icons/tailwindcss.svg', tag: 'Design Systems & Tokens', color: '#06b6d4', x: 78, y: 44, mobileX: 82, mobileY: 46 },
]

// =========================================================================
// SECTION A: APPLE-STYLE CANVAS SEQUENCE (FEATHERED & ORGANIC BLENDING)
// =========================================================================

interface CanvasBookSequenceProps {
  scrollProgress: React.MutableRefObject<number>
  isMobile: boolean
}

function CanvasBookSequence({ scrollProgress, isMobile }: CanvasBookSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const currentFrameRef = useRef<number>(0)
  const animFrameRef = useRef<number>(0)
  const lightGlowRef = useRef<HTMLDivElement>(null)
  const spineCoreRef = useRef<HTMLDivElement>(null)

  // Preload all 90 WebP frames into memory
  useEffect(() => {
    let isCancelled = false
    const images: HTMLImageElement[] = []
    let loadedCount = 0

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(3, '0')
      img.src = `${FRAME_PATH_PREFIX}${frameNum}.webp`
      img.onload = () => {
        if (isCancelled) return
        loadedCount++
        if (loadedCount >= Math.min(15, TOTAL_FRAMES)) {
          setImagesLoaded(true)
        }
      }
      images.push(img)
    }

    imagesRef.current = images

    return () => {
      isCancelled = true
    }
  }, [])

  // Draw current frame to canvas with organic vignette and lower placement
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const displayWidth = canvas.clientWidth
    const displayHeight = canvas.clientHeight

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
    }

    ctx.save()
    ctx.scale(dpr, dpr)

    // Clear with dark teal page background
    ctx.fillStyle = '#0a1315'
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    // Fit image keeping 16:9 aspect ratio, scaled to 0.75 height so upper half is clear
    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = displayWidth / displayHeight

    let drawW: number
    let drawH: number

    if (canvasAspect > imgAspect) {
      // Screen is wider than 16:9 (Desktop)
      drawH = displayHeight * (isMobile ? 0.85 : 0.74)
      drawW = drawH * imgAspect
    } else {
      // Screen is narrower than 16:9 (Mobile portrait)
      drawW = displayWidth * (isMobile ? 1.05 : 0.92)
      drawH = drawW / imgAspect
      if (drawH > displayHeight * 0.74) {
        drawH = displayHeight * 0.74
        drawW = drawH * imgAspect
      }
    }

    const drawX = (displayWidth - drawW) / 2
    // Place book lower down near the bottom of the viewport
    const drawY = displayHeight - drawH + (isMobile ? 15 : 25)

    ctx.drawImage(img, drawX, drawY, drawW, drawH)

    // Internal organic radial feather vignette to dissolve all rectangular boundaries
    const bookCenterX = displayWidth / 2
    const bookCenterY = drawY + drawH * 0.60
    const innerRadius = drawW * 0.16
    const outerRadius = drawW * 0.52

    const vignette = ctx.createRadialGradient(
      bookCenterX,
      bookCenterY,
      innerRadius,
      bookCenterX,
      bookCenterY,
      outerRadius
    )
    vignette.addColorStop(0, 'rgba(10, 19, 21, 0)')
    vignette.addColorStop(0.55, 'rgba(10, 19, 21, 0.18)')
    vignette.addColorStop(0.85, 'rgba(10, 19, 21, 0.75)')
    vignette.addColorStop(1, 'rgba(10, 19, 21, 1)')

    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, displayWidth, displayHeight)

    ctx.restore()
  }, [isMobile])

  // Continuous animation loop synchronized with scroll progress & light burst
  useEffect(() => {
    if (!imagesLoaded) return

    const updateLoop = () => {
      const p = scrollProgress.current

      // First 48% of scroll controls 100% of book opening (frame 0 to 89)
      const sequenceProgress = Math.min(Math.max(p / 0.48, 0), 1)
      const targetFrame = Math.min(
        Math.floor(sequenceProgress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      )

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame
        renderFrame(targetFrame)
      }

      // Golden light burst surge from spine as book reaches full open (p: 0.44 -> 0.60)
      if (lightGlowRef.current && spineCoreRef.current) {
        if (p < 0.42) {
          lightGlowRef.current.style.opacity = '0'
          spineCoreRef.current.style.opacity = '0'
          spineCoreRef.current.style.transform = 'translate(-50%, -50%) scale(0.2)'
        } else {
          // Surge light burst to peak at 0.52, then settle into warm pulsing aura
          const flareProgress = THREE.MathUtils.clamp((p - 0.42) / 0.12, 0, 1)
          const peakFlash = p >= 0.48 && p <= 0.62 ? 1.0 : THREE.MathUtils.clamp(1 - (p - 0.62) / 0.25, 0.65, 1)

          lightGlowRef.current.style.opacity = String((flareProgress * peakFlash).toFixed(3))
          spineCoreRef.current.style.opacity = String((flareProgress * peakFlash).toFixed(3))
          const coreScale = 0.5 + flareProgress * (p <= 0.55 ? 1.3 : 0.8)
          spineCoreRef.current.style.transform = `translate(-50%, -50%) scale(${coreScale.toFixed(3)})`
        }
      }

      animFrameRef.current = requestAnimationFrame(updateLoop)
    }

    renderFrame(0)
    animFrameRef.current = requestAnimationFrame(updateLoop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [imagesLoaded, renderFrame, scrollProgress])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [renderFrame])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* 
        The Canvas container with CSS elliptical mask:
        Feathers outer edges completely to 0% opacity on all 4 borders, eliminating any square box.
      */}
      <div
        className="w-full h-full"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 78%, black 45%, rgba(0, 0, 0, 0.7) 65%, rgba(0, 0, 0, 0.15) 85%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 78%, black 45%, rgba(0, 0, 0, 0.7) 65%, rgba(0, 0, 0, 0.15) 85%, transparent 100%)',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ background: '#0a1315' }}
        />
      </div>

      {/* Radiant Amber & Jade Aura erupting from open book spine */}
      <div
        ref={lightGlowRef}
        className="absolute left-1/2 pointer-events-none transition-opacity duration-300"
        style={{
          top: isMobile ? '76%' : '78%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '300px' : '560px',
          height: isMobile ? '180px' : '300px',
          background: 'radial-gradient(ellipse at center, rgba(240, 169, 58, 0.45) 0%, rgba(63, 174, 142, 0.2) 40%, rgba(10, 19, 21, 0) 75%)',
          filter: 'blur(35px)',
          opacity: 0,
        }}
      />

      {/* Blinding Golden Heart Light Core at the spine */}
      <div
        ref={spineCoreRef}
        className="absolute left-1/2 pointer-events-none transition-all duration-300"
        style={{
          top: isMobile ? '76%' : '78%',
          transform: 'translate(-50%, -50%) scale(0.2)',
          width: isMobile ? '80px' : '150px',
          height: isMobile ? '50px' : '85px',
          background: 'radial-gradient(ellipse at center, #ffffff 0%, #f0a93a 45%, rgba(240, 169, 58, 0) 80%)',
          filter: 'blur(12px)',
          opacity: 0,
        }}
      />
    </div>
  )
}

// =========================================================================
// FLOATING TECH STACK ICONS (ORGANIC CONSTELLATION & STAGGERED SPAWN)
// =========================================================================

interface CanvasFloatingIconsProps {
  scrollProgress: React.MutableRefObject<number>
  isMobile: boolean
}

function CanvasFloatingIcons({ scrollProgress, isMobile }: CanvasFloatingIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const total = SKILL_ITEMS.length

  // Organic continuous floating physics loop
  useEffect(() => {
    let animId: number
    const startTime = performance.now()

    const loop = () => {
      const p = scrollProgress.current
      const elapsed = (performance.now() - startTime) / 1000

      // Origin of skills spawn: right at the glowing book spine
      const originX = 50
      const originY = isMobile ? 68 : 71

      SKILL_ITEMS.forEach((skill, i) => {
        const el = iconRefs.current[i]
        if (!el) return

        // Stagger spawn: Trigger ONLY AFTER light burst begins (p: 0.50 -> 0.72)
        const startThreshold = 0.50 + (i / total) * 0.20
        const rawProgress = THREE.MathUtils.clamp((p - startThreshold) / 0.24, 0, 1)

        // Snappy cubic ease-out for energetic burst outward
        const burstProgress = 1 - Math.pow(1 - rawProgress, 3)

        if (burstProgress <= 0.005) {
          el.style.opacity = '0'
          el.style.visibility = 'hidden'
          el.style.pointerEvents = 'none'
          return
        }

        // Target coordinates from organic scattered constellation
        const targetX = isMobile ? skill.mobileX : skill.x
        const targetY = isMobile ? skill.mobileY : skill.y

        // Interpolate along burst trajectory
        const curX = THREE.MathUtils.lerp(originX, targetX, burstProgress)
        const curY = THREE.MathUtils.lerp(originY, targetY, burstProgress)

        // Zero-gravity harmonic hovering with independent frequencies
        const isHovering = burstProgress > 0.8
        const bobY = isHovering ? Math.sin(elapsed * 2.0 + i * 0.8) * 6 : 0
        const bobX = isHovering ? Math.cos(elapsed * 1.5 + i * 0.6) * 3.5 : 0
        const bobRot = isHovering ? Math.sin(elapsed * 1.7 + i) * 2.2 : 0

        el.style.visibility = 'visible'
        el.style.opacity = String(Math.min(burstProgress * 2.2, 1).toFixed(3))
        el.style.left = `${curX}%`
        el.style.top = `${curY}%`
        el.style.transform = `translate(-50%, -50%) translate3d(${bobX.toFixed(1)}px, ${bobY.toFixed(1)}px, 0) scale(${burstProgress.toFixed(3)}) rotate(${bobRot.toFixed(1)}deg)`
        el.style.pointerEvents = burstProgress > 0.65 ? 'auto' : 'none'
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [scrollProgress, total, isMobile])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
    >
      {SKILL_ITEMS.map((skill, index) => (
        <div
          key={skill.name}
          ref={(el) => {
            iconRefs.current[index] = el
          }}
          className="absolute select-none cursor-pointer will-change-transform"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          <div className="group relative flex flex-col items-center">
            {/* Glassmorphic Squircle Tile with Amber / Jade Accent Glow */}
            <div
              className="w-11 h-11 sm:w-15 sm:h-15 rounded-2xl bg-[#0f171c]/95 border border-white/14 p-2 sm:p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-120 group-hover:border-[#f0a93a] group-hover:shadow-[0_0_35px_rgba(240,169,58,0.6)] group-hover:-translate-y-1.5"
              style={{
                boxShadow: '0 10px 24px -5px rgba(0, 0, 0, 0.85), 0 0 14px rgba(240, 169, 58, 0.25)',
              }}
            >
              <img
                src={skill.src}
                alt={skill.name}
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            {/* Hover Tooltip Card */}
            <div className="absolute -bottom-10 flex flex-col items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50">
              <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-black/95 border border-white/20 backdrop-blur-md shadow-2xl whitespace-nowrap">
                <span className="font-mono text-[11px] font-bold text-white leading-tight">
                  {skill.name}
                </span>
                <span className="font-mono text-[9px] text-[#f0a93a] tracking-wider uppercase leading-tight">
                  {skill.tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// =========================================================================
// SECTION B: PRESERVED THREE.JS 3D GLTF SCENE (Available via RENDER_MODE)
// =========================================================================

interface ClosedBookCoverProps {
  scrollProgress: React.MutableRefObject<number>
}

function ClosedBookCover({ scrollProgress }: ClosedBookCoverProps) {
  const pivotRef = useRef<THREE.Group>(null)
  const coverMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const goldMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const inlayMatRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame(() => {
    if (!pivotRef.current) return
    const p = scrollProgress.current
    const coverProgress = THREE.MathUtils.clamp(p / 0.48, 0, 1)
    const targetRotY = THREE.MathUtils.lerp(0, -Math.PI * 0.8, coverProgress)
    pivotRef.current.rotation.y = targetRotY
    pivotRef.current.position.y = THREE.MathUtils.lerp(0.55, 0.75, coverProgress)
    const opacity = THREE.MathUtils.clamp(1 - (coverProgress - 0.25) / 0.23, 0, 1)

    if (coverMatRef.current) coverMatRef.current.opacity = opacity
    if (goldMatRef.current) goldMatRef.current.opacity = opacity
    if (inlayMatRef.current) inlayMatRef.current.opacity = opacity
    pivotRef.current.visible = opacity > 0.005
  })

  return (
    <group ref={pivotRef} position={[-2.65, 0.55, -1.26]}>
      <group position={[2.65, 0, 0]}>
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={[5.35, 0.08, 3.68]} />
          <meshStandardMaterial ref={coverMatRef} color="#0a1315" roughness={0.35} metalness={0.2} transparent opacity={1} />
        </mesh>
        <mesh position={[0, 0.045, 0]} castShadow={false} receiveShadow={false}>
          <boxGeometry args={[5.05, 0.015, 3.42]} />
          <meshStandardMaterial ref={goldMatRef} color="#f0a93a" roughness={0.2} metalness={0.85} transparent opacity={1} />
        </mesh>
        <mesh position={[0, 0.054, 0]} castShadow={false} receiveShadow={false}>
          <boxGeometry args={[4.8, 0.015, 3.18]} />
          <meshStandardMaterial ref={inlayMatRef} color="#0e1b1f" roughness={0.45} metalness={0.15} transparent opacity={1} />
        </mesh>
      </group>
    </group>
  )
}

function ThreeGLTFBookModel({ scrollProgress, isMobile }: { scrollProgress: React.MutableRefObject<number>; isMobile: boolean }) {
  const { scene } = useGLTF('/models/book.glb', '/draco/gltf/')
  const bookGroupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = false
        mesh.receiveShadow = false
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          mat.roughness = Math.min(mat.roughness, 0.7)
          mat.needsUpdate = true
        }
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!bookGroupRef.current) return
    const p = scrollProgress.current
    const targetScale = isMobile
      ? THREE.MathUtils.lerp(0.58, 0.75, Math.min(p * 2, 1))
      : THREE.MathUtils.lerp(0.9, 1.04, Math.min(p * 2, 1))
    const targetRotX = THREE.MathUtils.lerp(0.82, 0.42, Math.min(p * 2.2, 1))
    const targetRotY = Math.sin(p * Math.PI) * 0.12
    const targetPosY = isMobile
      ? THREE.MathUtils.lerp(-1.6, -1.2, Math.min(p * 2, 1))
      : THREE.MathUtils.lerp(-1.8, -1.35, Math.min(p * 2, 1))

    bookGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6)
    bookGroupRef.current.rotation.x = THREE.MathUtils.damp(bookGroupRef.current.rotation.x, targetRotX, 6, delta)
    bookGroupRef.current.rotation.y = THREE.MathUtils.damp(bookGroupRef.current.rotation.y, targetRotY, 6, delta)
    bookGroupRef.current.position.y = THREE.MathUtils.damp(bookGroupRef.current.position.y, targetPosY, 6, delta)
  })

  return (
    <group ref={bookGroupRef} position={[0, -1.35, 0]}>
      <primitive object={scene} />
      <ClosedBookCover scrollProgress={scrollProgress} />
    </group>
  )
}

function ThreeGLTFFloatingIcon({ skill, index, total, scrollProgress, isMobile }: { skill: SkillItem; index: number; total: number; scrollProgress: React.MutableRefObject<number>; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const domRef = useRef<HTMLDivElement>(null)

  const { targetX, targetY, targetZ } = useMemo(() => {
    const spread = (index / (total - 1) - 0.5) * 2
    const angle = spread * (Math.PI * 0.38)
    const radiusX = isMobile ? 1.7 : 3.5
    const radiusY = isMobile ? 1.15 : 1.85
    return {
      targetX: Math.sin(angle) * radiusX,
      targetY: (isMobile ? 0.35 : 0.65) + Math.cos(angle) * radiusY,
      targetZ: -Math.abs(spread) * (isMobile ? 0.3 : 0.5) + 0.3,
    }
  }, [index, total, isMobile])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const p = scrollProgress.current
    const startThreshold = 0.48 + (index / total) * 0.22
    const rawProgress = THREE.MathUtils.clamp((p - startThreshold) / 0.28, 0, 1)
    const burstProgress = 1 - Math.pow(1 - rawProgress, 3)

    const currentX = THREE.MathUtils.lerp(0, targetX, burstProgress)
    const baseCurrentY = THREE.MathUtils.lerp(-0.7, targetY, burstProgress)
    const currentZ = THREE.MathUtils.lerp(-0.4, targetZ, burstProgress)

    const bobY = burstProgress > 0.75 ? Math.sin(state.clock.elapsedTime * 2.2 + index * 0.85) * 0.08 : 0
    const bobX = burstProgress > 0.75 ? Math.cos(state.clock.elapsedTime * 1.6 + index * 0.7) * 0.04 : 0
    const bobRot = burstProgress > 0.75 ? Math.sin(state.clock.elapsedTime * 1.8 + index) * 0.04 : 0

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, currentX + bobX, 7, delta)
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, baseCurrentY + bobY, 7, delta)
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, currentZ, 7, delta)

    const scale = burstProgress
    const opacity = THREE.MathUtils.clamp(burstProgress * 2.2, 0, 1)

    if (domRef.current) {
      if (opacity <= 0.005) {
        domRef.current.style.opacity = '0'
        domRef.current.style.pointerEvents = 'none'
        domRef.current.style.visibility = 'hidden'
      } else {
        domRef.current.style.visibility = 'visible'
        domRef.current.style.opacity = opacity.toFixed(3)
        domRef.current.style.transform = `translate3d(-50%, -50%, 0) scale(${scale.toFixed(3)}) rotate(${bobRot.toFixed(3)}rad)`
        domRef.current.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none'
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.7, -0.4]}>
      <Html center distanceFactor={isMobile ? 8.5 : 9.5} zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
        <div ref={domRef} className="group relative flex flex-col items-center select-none cursor-pointer" style={{ opacity: 0, visibility: 'hidden' }}>
          <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-2xl bg-[#0f171c]/95 border border-white/12 p-2.5 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-115 group-hover:border-[#f0a93a]">
            <img src={skill.src} alt={skill.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" loading="lazy" />
          </div>
        </div>
      </Html>
    </group>
  )
}

// =========================================================================
// MAIN EXPORTED COMPONENT: BookSkillsSection
// =========================================================================

export const BookSkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const hudPercentRef = useRef<HTMLSpanElement>(null)
  const scrollProgressRef = useRef<number>(0)
  const [isInView, setIsInView] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // GSAP ScrollTrigger setup
  useEffect(() => {
    const section = sectionRef.current
    const pinEl = pinRef.current
    if (!section || !pinEl) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinEl,
      scrub: 0.6,
      onToggle: (self) => {
        setIsInView(self.isActive)
      },
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress
        if (hudPercentRef.current) {
          hudPercentRef.current.innerText = `${Math.round(self.progress * 100)}% UNLOCKED`
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-label="Skills and Secret Sauce"
      className="relative h-[300vh] w-full bg-[#0a1315] text-[var(--text)] select-none"
    >
      {/* 
        1. Seamless Section Blend from About:
        A soft vertical gradient transition from About's background into Skills, eliminating any harsh border line.
      */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[var(--bg)] via-[#0a1315]/80 to-transparent pointer-events-none z-30" />

      {/* 2. Pinned Viewport Container (100vh) */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#0a1315]"
      >
        {/* Top 2D HTML Header Overlay (z-index: 10) */}
        <div className="relative z-10 w-full pt-8 md:pt-12 px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 pointer-events-none">
          <div className="max-w-4xl">
            {/* Subheading in mono font with Jade color (#3fae8e) */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#3fae8e] font-semibold">
                03 // MY SKILLS
              </span>
              <div className="w-10 h-[1px] bg-[#3fae8e]/60" />
            </div>

            {/* Heading: "The Secret Sauce" with Serif 'Secret' and Amber Italic 'Sauce' */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              The{' '}
              <span className="font-serif italic font-normal text-white/95 tracking-normal">
                Secret
              </span>{' '}
              <span className="font-serif italic font-normal text-[#f0a93a] drop-shadow-[0_0_35px_rgba(240,169,58,0.45)]">
                Sauce
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm font-mono text-[var(--textLight)] max-w-xl">
              Scroll through to unlock the ancient tome and watch production engineering pipelines emerge.
            </p>
          </div>
        </div>

        {/* 3. Core Presentation Layer */}
        {RENDER_MODE === 'CANVAS_SEQUENCE' ? (
          <div className="absolute inset-0 z-0 w-full h-full">
            {/* Feathered Apple-Style 120 FPS Preloaded WebP Canvas */}
            <CanvasBookSequence
              scrollProgress={scrollProgressRef}
              isMobile={isMobile}
            />

            {/* Organic 15-Skill Scattered Constellation with Staggered Spine Burst */}
            <CanvasFloatingIcons
              scrollProgress={scrollProgressRef}
              isMobile={isMobile}
            />
          </div>
        ) : (
          /* Preserved Three.js 3D GLTF Scene */
          <div className="absolute inset-0 z-0 w-full h-full">
            <Canvas
              camera={{ position: [0, 0.4, 5.2], fov: 48 }}
              dpr={[1, 1.5]}
              frameloop={isInView ? 'always' : 'never'}
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
              <color attach="background" args={['#0a1315']} />
              <ambientLight intensity={1.3} color="#e0f2fe" />
              <directionalLight position={[3.5, 4.5, 3.5]} intensity={2.2} color="#ffffff" />
              <pointLight position={[0, 1.8, 0.4]} intensity={20} distance={10} decay={1.8} color="#f0a93a" />
              <pointLight position={[-4.2, 0.8, 2.0]} intensity={18} distance={12} decay={1.8} color="#3fae8e" />

              <Suspense fallback={null}>
                <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.08}>
                  <ThreeGLTFBookModel scrollProgress={scrollProgressRef} isMobile={isMobile} />
                </Float>

                {SKILL_ITEMS.map((skill, index) => (
                  <ThreeGLTFFloatingIcon
                    key={skill.name}
                    skill={skill}
                    index={index}
                    total={SKILL_ITEMS.length}
                    scrollProgress={scrollProgressRef}
                    isMobile={isMobile}
                  />
                ))}
              </Suspense>
            </Canvas>
          </div>
        )}

        {/* Bottom Interactive Scroll Progress HUD */}
        <div className="relative z-10 w-full pb-8 px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--textLight)]">
            <span className="w-2 h-2 rounded-full bg-[#f0a93a] animate-ping" />
            <span className="hidden sm:inline">KNOWLEDGE_VAULT //</span>
            <span ref={hudPercentRef} className="text-white font-semibold">
              0% UNLOCKED
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#3fae8e]">
            <span>SCROLL TO UNLOCK</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* 4. Seamless Transition into Projects Section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none z-30" />
    </section>
  )
}

// Preload original 3D model if needed
useGLTF.preload('/models/book.glb', '/draco/gltf/')




