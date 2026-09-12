import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Html, Float } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Skill definitions from Dickson's AI & Software engineering stack
const SKILLS = [
  { name: 'Python', src: '/icons/python.svg', tag: 'Core AI / ML', color: '#3776ab' },
  { name: 'FastAPI', src: '/icons/fastapi.svg', tag: 'Async Microservices', color: '#009688' },
  { name: 'React', src: '/icons/react.svg', tag: 'Frontend Systems', color: '#61dafb' },
  { name: 'PostgreSQL', src: '/icons/postgresql.svg', tag: 'Relational DB', color: '#336791' },
  { name: 'MongoDB', src: '/icons/mongodb.svg', tag: 'Vector Store & NoSQL', color: '#47a248' },
  { name: 'Docker', src: '/icons/docker.svg', tag: 'Containerization', color: '#2496ed' },
  { name: 'TensorFlow', src: '/icons/tensorflow.svg', tag: 'Deep Learning', color: '#ff6f00' },
  { name: 'AWS', src: '/icons/aws.svg', tag: 'Cloud Infrastructure', color: '#ff9900' },
  { name: 'LangChain', src: '/icons/langchain.svg', tag: 'RAG & Multi-Agent', color: '#00e5ff' },
]

// 1. 3D Animated Book Model
interface BookModelProps {
  scrollProgress: React.MutableRefObject<number>
  isMobile: boolean
}

function BookModel({ scrollProgress, isMobile }: BookModelProps) {
  const { scene } = useGLTF('/models/book.glb', '/draco/gltf/')
  const bookGroupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = false
        mesh.receiveShadow = false
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!bookGroupRef.current) return

    const p = scrollProgress.current

    // Book emerging and opening animation: 0.0 -> 0.55
    // Scales up from 0.55 to 1.0 (or 0.75 on mobile)
    const targetScale = isMobile
      ? THREE.MathUtils.lerp(0.5, 0.75, Math.min(p * 2, 1))
      : THREE.MathUtils.lerp(0.65, 1.05, Math.min(p * 2, 1))

    // Tilted back (closed look) -> leveled open facing the camera
    const targetRotX = THREE.MathUtils.lerp(0.95, 0.42, Math.min(p * 2.2, 1))
    const targetRotY = Math.sin(p * Math.PI) * 0.15
    const targetPosY = isMobile
      ? THREE.MathUtils.lerp(-1.8, -1.2, Math.min(p * 2, 1))
      : THREE.MathUtils.lerp(-2.2, -1.35, Math.min(p * 2, 1))

    // Smooth dampening
    bookGroupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    )
    bookGroupRef.current.rotation.x = THREE.MathUtils.damp(
      bookGroupRef.current.rotation.x,
      targetRotX,
      6,
      delta
    )
    bookGroupRef.current.rotation.y = THREE.MathUtils.damp(
      bookGroupRef.current.rotation.y,
      targetRotY,
      6,
      delta
    )
    bookGroupRef.current.position.y = THREE.MathUtils.damp(
      bookGroupRef.current.position.y,
      targetPosY,
      6,
      delta
    )
  })

  return (
    <group ref={bookGroupRef} position={[0, -1.35, 0]}>
      <primitive object={scene} />
    </group>
  )
}

// 2. Floating Tech Stack Icon with HTML overlay
interface FloatingIconProps {
  skill: (typeof SKILLS)[0]
  index: number
  total: number
  scrollProgress: React.MutableRefObject<number>
  isMobile: boolean
}

function FloatingIcon({ skill, index, total, scrollProgress, isMobile }: FloatingIconProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [scale, setScale] = useState(0)
  const [opacity, setOpacity] = useState(0)

  // Calculate arc position above the book
  // Spread in a wide horizontal arch from -PI*0.38 to +PI*0.38
  const { targetX, targetY, targetZ } = useMemo(() => {
    const spread = (index / (total - 1) - 0.5) * 2 // -1 to +1
    const angle = spread * (Math.PI * 0.38)
    const radiusX = isMobile ? 1.6 : 3.4
    const radiusY = isMobile ? 1.2 : 1.9

    return {
      targetX: Math.sin(angle) * radiusX,
      targetY: (isMobile ? 0.3 : 0.6) + Math.cos(angle) * radiusY,
      targetZ: -Math.abs(spread) * (isMobile ? 0.3 : 0.6) + 0.2,
    }
  }, [index, total, isMobile])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const p = scrollProgress.current

    // Icons emerge as book opens: progress 0.35 -> 1.0
    // Stagger based on index
    const staggerThreshold = 0.35 + (index / total) * 0.25
    const iconProgress = THREE.MathUtils.clamp(
      (p - staggerThreshold) / 0.35,
      0,
      1
    )

    // Interpolate from center of book [0, -1, 0] to arc position
    const currentX = THREE.MathUtils.lerp(0, targetX, iconProgress)
    const baseCurrentY = THREE.MathUtils.lerp(-1.0, targetY, iconProgress)
    const currentZ = THREE.MathUtils.lerp(0, targetZ, iconProgress)

    // Gentle float / bobbing when deployed
    const bob = iconProgress > 0.8
      ? Math.sin(state.clock.elapsedTime * 2.2 + index * 0.85) * 0.08
      : 0

    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      currentX,
      6,
      delta
    )
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      baseCurrentY + bob,
      6,
      delta
    )
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      currentZ,
      6,
      delta
    )

    setScale(iconProgress)
    setOpacity(THREE.MathUtils.clamp(iconProgress * 1.5, 0, 1))
  })

  if (scale <= 0.01) return null

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      <Html
        center
        distanceFactor={isMobile ? 8 : 9}
        zIndexRange={[100, 0]}
        style={{
          opacity,
          transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
          transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
          pointerEvents: opacity > 0.5 ? 'auto' : 'none',
        }}
      >
        <div className="group relative flex flex-col items-center select-none cursor-pointer">
          {/* Exact squircle tile from user reference image */}
          <div
            className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-[#14171f]/95 border border-white/12 p-3 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-115 group-hover:border-[#f0a93a] group-hover:shadow-[0_0_30px_rgba(240,169,58,0.4)] group-hover:-translate-y-1"
            style={{
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={skill.src}
              alt={skill.name}
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_10px_rgba(240,169,58,0.25)] transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Hover Tooltip Card */}
          <div className="absolute -bottom-10 flex flex-col items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50">
            <span className="font-mono text-[11px] font-semibold text-white px-2.5 py-0.5 rounded-full bg-black/85 border border-white/15 backdrop-blur-md shadow-lg whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// 3. Main BookSkillsSection Component
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
      scrub: 0.8,
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
      className="relative h-[300vh] w-full bg-[#0a1315] text-[var(--text)] select-none border-t border-[var(--border-subtle)]"
    >
      {/* Pinned Viewport Container (100vh) */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between bg-[#0a1315]"
      >
        {/* 2D HTML Header Overlay (z-index: 10) */}
        <div className="relative z-10 w-full pt-12 md:pt-16 px-6 md:pl-28 lg:pl-36 pr-6 md:pr-12 pointer-events-none">
          <div className="max-w-4xl">
            {/* Subheading in mono font with Jade color (#3fae8e) */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#3fae8e] font-semibold">
                03 // MY SKILLS
              </span>
              <div className="w-10 h-[1px] bg-[#3fae8e]/60" />
            </div>

            {/* Heading: "The Secret Sauce" with Serif 'Secret' and Amber Italic 'Sauce' */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
              The{' '}
              <span className="font-serif italic font-normal text-white/95 tracking-normal">
                Secret
              </span>{' '}
              <span className="font-serif italic font-normal text-[#f0a93a] drop-shadow-[0_0_35px_rgba(240,169,58,0.45)]">
                Sauce
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base font-mono text-[var(--textLight)] max-w-xl">
              Scroll through to uncover the production technologies and model pipelines powering my software.
            </p>
          </div>
        </div>

        {/* 3D Scene: Canvas filling the pinned container */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <Canvas
            camera={{ position: [0, 0.4, 5.2], fov: 48 }}
            dpr={[1, 1.5]}
            frameloop={isInView ? 'always' : 'never'}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          >
            {/* Background Color */}
            <color attach="background" args={['#0a1315']} />

            {/* Lighting */}
            <ambientLight intensity={0.5} color="#ffffff" />

            <pointLight
              position={[0, 1.8, 1.2]}
              intensity={4.5}
              distance={8}
              color="#f0a93a"
            />

            <pointLight
              position={[-3.5, 0.8, 2.0]}
              intensity={3.0}
              distance={9}
              color="#3fae8e"
            />

            <directionalLight position={[3, 4, 3]} intensity={1.2} color="#ffffff" />

            <Suspense fallback={null}>
              <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
                {/* 3D Book Model centered at bottom */}
                <BookModel
                  scrollProgress={scrollProgressRef}
                  isMobile={isMobile}
                />
              </Float>

              {/* Floating Tech Stack Icons emerging from the book */}
              {SKILLS.map((skill, index) => (
                <FloatingIcon
                  key={skill.name}
                  skill={skill}
                  index={index}
                  total={SKILLS.length}
                  scrollProgress={scrollProgressRef}
                  isMobile={isMobile}
                />
              ))}
            </Suspense>
          </Canvas>
        </div>

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
            <span>SCROLL TO EXPLORE</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Preload optimized model and local Draco decoder
useGLTF.preload('/models/book.glb', '/draco/gltf/')

