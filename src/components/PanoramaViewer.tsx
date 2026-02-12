import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface PanoramaViewerProps {
  imageUrl: string
  title?: string | null
}

export function PanoramaViewer({ imageUrl, title }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 0, 0.1)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Sphere geometry (inside-out)
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1) // Flip inside-out

    // Load texture
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      imageUrl,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const sphere = new THREE.Mesh(geometry, material)
        scene.add(sphere)
        setIsLoading(false)
      },
      undefined,
      (error) => {
        console.error('Error loading panorama:', error)
        setIsLoading(false)
      }
    )

    // Mouse/Touch controls
    let isUserInteracting = false
    let onPointerDownMouseX = 0
    let onPointerDownMouseY = 0
    let lon = 0
    let lat = 0
    let onPointerDownLon = 0
    let onPointerDownLat = 0

    const onPointerDown = (event: PointerEvent) => {
      isUserInteracting = true
      const clientX = event.clientX
      const clientY = event.clientY
      onPointerDownMouseX = clientX
      onPointerDownMouseY = clientY
      onPointerDownLon = lon
      onPointerDownLat = lat
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!isUserInteracting) return
      const clientX = event.clientX
      const clientY = event.clientY
      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat
    }

    const onPointerUp = () => {
      isUserInteracting = false
    }

    // Touch support
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isUserInteracting = true
        onPointerDownMouseX = event.touches[0].clientX
        onPointerDownMouseY = event.touches[0].clientY
        onPointerDownLon = lon
        onPointerDownLat = lat
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      if (!isUserInteracting || event.touches.length !== 1) return
      lon = (onPointerDownMouseX - event.touches[0].clientX) * 0.1 + onPointerDownLon
      lat = (event.touches[0].clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat
    }

    const onTouchEnd = () => {
      isUserInteracting = false
    }

    // Mouse wheel zoom
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      camera.fov += event.deltaY * 0.05
      camera.fov = Math.max(30, Math.min(90, camera.fov))
      camera.updateProjectionMatrix()
    }

    container.addEventListener('pointerdown', onPointerDown)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerup', onPointerUp)
    container.addEventListener('pointerleave', onPointerUp)
    container.addEventListener('touchstart', onTouchStart)
    container.addEventListener('touchmove', onTouchMove)
    container.addEventListener('touchend', onTouchEnd)
    container.addEventListener('wheel', onWheel, { passive: false })

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Clamp latitude
      lat = Math.max(-85, Math.min(85, lat))

      // Convert to radians
      const phi = THREE.MathUtils.degToRad(90 - lat)
      const theta = THREE.MathUtils.degToRad(lon)

      // Update camera target
      const target = new THREE.Vector3()
      target.x = 500 * Math.sin(phi) * Math.cos(theta)
      target.y = 500 * Math.cos(phi)
      target.z = 500 * Math.sin(phi) * Math.sin(theta)
      camera.lookAt(target)

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('pointerdown', onPointerDown)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerup', onPointerUp)
      container.removeEventListener('pointerleave', onPointerUp)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
      container.removeEventListener('wheel', onWheel)
      renderer.dispose()
      geometry.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [imageUrl])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-950/80">
          <div className="text-stone-400 text-sm tracking-wider">Loading...</div>
        </div>
      )}

      {title && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-stone-900/80 backdrop-blur-sm rounded-xl border border-white/10">
          <p className="text-white/90 font-light tracking-wider">{title}</p>
        </div>
      )}

      {/* Controls hint */}
      <div className="absolute top-4 right-4 px-4 py-2 bg-stone-900/60 backdrop-blur-sm rounded-lg border border-white/10">
        <p className="text-[10px] text-stone-400 tracking-wide">ドラッグで360°回転</p>
      </div>
    </div>
  )
}
