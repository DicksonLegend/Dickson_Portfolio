import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '@/hooks/useTheme'

export interface DisplacementMeshProps {
  className?: string
}

export function DisplacementMesh({ className = '' }: DisplacementMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    // 1. Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 4.2)

    // 2. Renderer setup with transparency and antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    // 3. High-density disc / plane geometry
    const geometry = new THREE.PlaneGeometry(3.6, 3.6, 128, 128)

    // 4. Custom Shader Material
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTheme: { value: theme === 'light' ? 1.0 : 0.0 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vDisplacement;

        void main() {
          vUv = uv;
          vNormal = normal;
          vec3 pos = position;

          float dist = length(pos.xy);
          float angle = atan(pos.y, pos.x);

          // Organic flower / crystalline layered noise waves matching Hamish Williams reference
          float wave1 = sin(angle * 6.0 + uTime * 0.5) * cos(dist * 3.0 - uTime * 0.4);
          float wave2 = sin(angle * 12.0 - uTime * 0.3) * sin(dist * 6.0 + uTime * 0.25) * 0.4;
          float wave3 = cos(dist * 9.0 - uTime * 0.6) * 0.2;

          // Interactive mouse sway
          float mouseDist = length(pos.xy - uMouse);
          float mouseWave = sin(mouseDist * 4.0 - uTime) * 0.15 * smoothstep(2.0, 0.0, mouseDist);

          float displacement = (wave1 + wave2 + wave3 + mouseWave) * smoothstep(0.1, 1.6, dist);
          pos.z += displacement * 0.75;
          vDisplacement = displacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTheme;
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vDisplacement;

        void main() {
          // Dark theme colors: Deep oceanic slate -> glowing electric cyan
          vec3 darkDeep = vec3(0.04, 0.07, 0.09);
          vec3 darkTeal = vec3(0.0, 0.42, 0.48);
          vec3 darkCyan = vec3(0.0, 0.95, 1.0);

          // Light theme colors: Vibrant turquoise -> soft aquamarine & crystalline white
          vec3 lightBase = vec3(0.95, 0.98, 1.0);
          vec3 lightTurquoise = vec3(0.0, 0.88, 0.98);
          vec3 lightCyanGlow = vec3(0.3, 0.95, 1.0);

          float t = smoothstep(-0.55, 0.75, vDisplacement);

          vec3 darkColor = mix(darkDeep, darkTeal, t);
          darkColor = mix(darkColor, darkCyan, pow(t, 2.2));

          vec3 lightColor = mix(lightTurquoise, lightCyanGlow, t);
          lightColor = mix(lightColor, lightBase, smoothstep(0.15, 0.85, t));

          vec3 finalColor = mix(darkColor, lightColor, uTheme);

          // Soft edge alpha falloff for seamless visual integration
          float dist = length(vUv - vec2(0.5));
          float alphaMask = smoothstep(0.5, 0.25, dist);
          float alpha = mix(0.95, 0.88, uTheme) * alphaMask;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = -0.35
    mesh.rotation.y = 0.15
    scene.add(mesh)

    // 5. Mouse tracking with lerp interpolation
    const targetMouse = new THREE.Vector2(0, 0)
    const currentMouse = new THREE.Vector2(0, 0)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetMouse.set(x * 0.8, y * 0.8)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // 6. Resize handler
    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // 7. Animation loop
    let animationFrameId: number
    const startTime = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = (performance.now() - startTime) * 0.001
      uniforms.uTime.value = elapsedTime

      // Smooth mouse lerp
      currentMouse.lerp(targetMouse, 0.05)
      uniforms.uMouse.value.copy(currentMouse)

      // Dynamic theme transition
      const targetTheme = themeRef.current === 'light' ? 1.0 : 0.0
      uniforms.uTheme.value = THREE.MathUtils.lerp(uniforms.uTheme.value, targetTheme, 0.08)

      // Subtle resting rotation
      mesh.rotation.z = elapsedTime * 0.08 + currentMouse.x * 0.15
      mesh.rotation.x = -0.35 + currentMouse.y * 0.1
      mesh.rotation.y = 0.15 + currentMouse.x * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [theme])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
