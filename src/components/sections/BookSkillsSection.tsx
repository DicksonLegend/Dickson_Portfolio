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
  { name: 'TypeScript', src: '/icons/typescript.svg', tag: 'Type-Safe Architecture', color: '#3178c6' },
]

// =========================================================================
// 1. 3D Closed Book Cover (Clever Visual Trick to simulate book opening)
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
    // Opening flip animation: scroll progress 0.0 -> 0.48
    const coverProgress = THREE.MathUtils.clamp(p / 0.48, 0, 1)

    // Flip cover open on Y-axis from 0 to -145 degrees like a real book cover
    const targetRotY = THREE.MathUtils.lerp(0, -Math.PI * 0.8, coverProgress)
    pivotRef.current.rotation.y = targetRotY

    // Slight lift as it swings open
    pivotRef.current.position.y = THREE.MathUtils.lerp(0.55, 0.75, coverProgress)

    // Fade out as it opens between 0.25 and 0.48
    const opacity = THREE.MathUtils.clamp(1 - (coverProgress - 0.25) / 0.23, 0, 1)

    if (coverMatRef.current) coverMatRef.current.opacity = opacity
    if (goldMatRef.current) goldMatRef.current.opacity = opacity
    if (inlayMatRef.current) inlayMatRef.current.opacity = opacity

    // Hide completely once finished opening to free GPU
    pivotRef.current.visible = opacity > 0.005
  })

  return (
    // Pivot anchored at the left edge / spine hinge
    <group ref={pivotRef} position={[-2.65, 0.55, -1.26]}>
      {/* Cover assembly offset so hinge rotates around left edge */}
      <group position={[2.65, 0, 0]}>
        {/* Main Leather / Obsidian Cover Slab */}
        <mesh castShadow={false} receiveShadow={false}>
          <boxGeometry args={[5.35, 0.08, 3.68]} />
          <meshStandardMaterial
            ref={coverMatRef}
            color="#0a1315"
            roughness={0.35}
            metalness={0.2}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Embossed Gold Outer Border */}
        <mesh position={[0, 0.045, 0]} castShadow={false} receiveShadow={false}>
          <boxGeometry args={[5.05, 0.015, 3.42]} />
          <meshStandardMaterial
            ref={goldMatRef}
            color="#f0a93a"
            roughness={0.2}
            metalness={0.85}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Inner Dark Inlay */}
        <mesh position={[0, 0.054, 0]} castShadow={false} receiveShadow={false}>
          <boxGeometry args={[4.8, 0.015, 3.18]} />
          <meshStandardMaterial
            ref={inlayMatRef}
            color="#0e1b1f"
            roughness={0.45}
            metalness={0.15}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Center Gold Crest: Insignia Ring */}
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow={false} receiveShadow={false}>
          <ringGeometry args={[0.38, 0.48, 48]} />
          <meshStandardMaterial
            color="#f0a93a"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={1}
          />
        </mesh>

        {/* Center Gold Crest: Tech Glyph Diamond */}
        <mesh position={[0, 0.066, 0]} rotation={[0, Math.PI / 4, 0]} castShadow={false} receiveShadow={false}>
          <boxGeometry args={[0.26, 0.015, 0.26]} />
          <meshStandardMaterial
            color="#f0a93a"
            roughness={0.2}
            metalness={0.9}
            transparent
            opacity={1}
          />
        </mesh>
      </group>
    </group>
  )
}

// =========================================================================
// 2. Underlying 3D Book Model (Static Open Mesh)
// =========================================================================
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
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial
          // Ensure materials respond richly to warm amber and jade light
          mat.roughness = Math.min(mat.roughness, 0.7)
          mat.needsUpdate = true
        }
      }
    })
  }, [scene])

  useFrame((_, delta) => {
    if (!bookGroupRef.current) return

    const p = scrollProgress.current

    // Book reveal & scaling as cover opens: 0.0 -> 0.50
    // Scales up smoothly from 0.90 to 1.02 (or 0.58 to 0.75 on mobile)
    const targetScale = isMobile
      ? THREE.MathUtils.lerp(0.58, 0.75, Math.min(p * 2, 1))
      : THREE.MathUtils.lerp(0.9, 1.04, Math.min(p * 2, 1))

    // Tilted back when covered -> leveled open facing camera as it unlocks
    const targetRotX = THREE.MathUtils.lerp(0.82, 0.42, Math.min(p * 2.2, 1))
    const targetRotY = Math.sin(p * Math.PI) * 0.12
    const targetPosY = isMobile
      ? THREE.MathUtils.lerp(-1.6, -1.2, Math.min(p * 2, 1))
      : THREE.MathUtils.lerp(-1.8, -1.35, Math.min(p * 2, 1))

    // Smooth dampening for organic feel
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
      {/* Underlying Open GLB Book */}
      <primitive object={scene} />

      {/* The Closed Book Cover sitting directly on top */}
      <ClosedBookCover scrollProgress={scrollProgress} />
    </group>
  )
}

// =========================================================================
// 3. Floating Tech Stack Icons (Zero-Render-Cost direct DOM & Three.js sync)
// =========================================================================
interface FloatingIconProps {
  skill: (typeof SKILLS)[0]
  index: number
  total: number
  scrollProgress: React.MutableRefObject<number>
  isMobile: boolean
}

function FloatingIcon({ skill, index, total, scrollProgress, isMobile }: FloatingIconProps) {
  const groupRef = useRef<THREE.Group>(null)
  const domRef = useRef<HTMLDivElement>(null)

  // Calculate scattered arc positions above the book
  const { targetX, targetY, targetZ } = useMemo(() => {
    const spread = (index / (total - 1) - 0.5) * 2 // -1.0 to +1.0
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

    // Trigger skills as the cover finishes opening: scroll 0.48 -> 1.0
    const startThreshold = 0.48 + (index / total) * 0.22
    const rawProgress = THREE.MathUtils.clamp((p - startThreshold) / 0.28, 0, 1)

    // Snappy cubic ease-out for energetic burst
    const burstProgress = 1 - Math.pow(1 - rawProgress, 3)

    // Interpolate from center of the book pages [0, -0.7, -0.4] to final arc
    const currentX = THREE.MathUtils.lerp(0, targetX, burstProgress)
    const baseCurrentY = THREE.MathUtils.lerp(-0.7, targetY, burstProgress)
    const currentZ = THREE.MathUtils.lerp(-0.4, targetZ, burstProgress)

    // Continuous, gentle zero-gravity bobbing when deployed
    const bobY = burstProgress > 0.75
      ? Math.sin(state.clock.elapsedTime * 2.2 + index * 0.85) * 0.08
      : 0
    const bobX = burstProgress > 0.75
      ? Math.cos(state.clock.elapsedTime * 1.6 + index * 0.7) * 0.04
      : 0
    const bobRot = burstProgress > 0.75
      ? Math.sin(state.clock.elapsedTime * 1.8 + index) * 0.04
      : 0

    // Smooth dampening on position
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      currentX + bobX,
      7,
      delta
    )
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      baseCurrentY + bobY,
      7,
      delta
    )
    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      currentZ,
      7,
      delta
    )

    // Scale and opacity
    const scale = burstProgress
    const opacity = THREE.MathUtils.clamp(burstProgress * 2.2, 0, 1)

    // Direct DOM manipulation without causing React re-renders or unmount traps
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
      <Html
        center
        distanceFactor={isMobile ? 8.5 : 9.5}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          ref={domRef}
          className="group relative flex flex-col items-center select-none cursor-pointer transition-transform duration-200"
          style={{ opacity: 0, visibility: 'hidden' }}
        >
          {/* Exact Squircle Tile with Amber Drop Shadow */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0f171c]/95 border border-white/12 p-3 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-115 group-hover:border-[#f0a93a] group-hover:shadow-[0_0_30px_rgba(240,169,58,0.5)] group-hover:-translate-y-1"
            style={{
              boxShadow: '0 12px 28px -5px rgba(0, 0, 0, 0.8), 0 0 16px rgba(240, 169, 58, 0.25)',
            }}
          >
            <img
              src={skill.src}
              alt={skill.name}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_2px_10px_rgba(240,169,58,0.35)] transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>

          {/* Hover Tooltip Card */}
          <div className="absolute -bottom-9 flex flex-col items-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 z-50">
            <span className="font-mono text-[11px] font-semibold text-white px-2.5 py-0.5 rounded-full bg-black/90 border border-white/20 backdrop-blur-md shadow-lg whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// =========================================================================
// 4. Dynamic Lighting Rig (Amber Warm Glow + Jade Rim Light)
// =========================================================================
interface LightingRigProps {
  scrollProgress: React.MutableRefObject<number>
}

function LightingRig({ scrollProgress }: LightingRigProps) {
  const amberLightRef = useRef<THREE.PointLight>(null)
  const jadeLightRef = useRef<THREE.PointLight>(null)

  useFrame(() => {
    const p = scrollProgress.current

    // Warm amber glow intensifies as the book opens (from 12 up to 28)
    if (amberLightRef.current) {
      amberLightRef.current.intensity = THREE.MathUtils.lerp(12, 28, Math.min(p * 2, 1))
    }

    // Jade rim light stays crisp and deep
    if (jadeLightRef.current) {
      jadeLightRef.current.intensity = THREE.MathUtils.lerp(14, 22, Math.min(p * 2, 1))
    }
  })

  return (
    <>
      {/* Base Balanced Fill Light */}
      <ambientLight intensity={1.3} color="#e0f2fe" />

      {/* Directional Key Light for Crisp Highlights */}
      <directionalLight position={[3.5, 4.5, 3.5]} intensity={2.2} color="#ffffff" />

      {/* Amber PointLight shining directly into the open book */}
      <pointLight
        ref={amberLightRef}
        position={[0, 1.8, 0.4]}
        intensity={20}
        distance={10}
        decay={1.8}
        color="#f0a93a"
      />

      {/* Secondary PointLight inside pages for radiant warm spill */}
      <pointLight
        position={[0, 0.1, -1.0]}
        intensity={9}
        distance={6}
        decay={2.0}
        color="#f0a93a"
      />

      {/* Jade PointLight for sharp rim lighting from the side */}
      <pointLight
        ref={jadeLightRef}
        position={[-4.2, 0.8, 2.0]}
        intensity={18}
        distance={12}
        decay={1.8}
        color="#3fae8e"
      />

      {/* Signature Cyan Accent Side Light */}
      <pointLight
        position={[4.0, 0.6, 1.6]}
        intensity={8}
        distance={10}
        decay={2.0}
        color="#00e5ff"
      />
    </>
  )
}

// =========================================================================
// 5. Main BookSkillsSection Component
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
              Scroll through to unlock the secret tome and watch production skills emerge.
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
            {/* Deep Teal Background */}
            <color attach="background" args={['#0a1315']} />

            {/* Dynamic Amber & Jade Lighting Rig */}
            <LightingRig scrollProgress={scrollProgressRef} />

            <Suspense fallback={null}>
              <Float speed={1.0} rotationIntensity={0.08} floatIntensity={0.08}>
                {/* 3D Book with Closed Cover Flip Animation */}
                <BookModel
                  scrollProgress={scrollProgressRef}
                  isMobile={isMobile}
                />
              </Float>

              {/* Floating Tech Stack Icons bursting out from 50% to 100% */}
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
            <span>SCROLL TO UNLOCK</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Preload optimized model and local Draco decoder
useGLTF.preload('/models/book.glb', '/draco/gltf/')


