import * as THREE from 'three'
import * as GaussianSplats3D from '@mkkellogg/gaussian-splats-3d'
import CameraControls from 'camera-controls'

// Install camera-controls with Three.js
CameraControls.install({ THREE })

export interface SceneManagerOptions {
  canvas: HTMLCanvasElement
  onProgress?: (progress: number, message: string) => void
  onLoad?: () => void
  onError?: (error: Error) => void
}

export class SceneManager {
  private canvas: HTMLCanvasElement
  private container: HTMLElement
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private cameraControls: CameraControls
  private clock: THREE.Clock
  private splatViewer: GaussianSplats3D.Viewer | null = null
  private animationFrameId: number | null = null
  private resizeObserver: ResizeObserver | null = null

  private onProgress?: (progress: number, message: string) => void
  private onLoad?: () => void
  private onError?: (error: Error) => void

  constructor(options: SceneManagerOptions) {
    this.canvas = options.canvas
    this.container = this.canvas.parentElement || document.body
    this.onProgress = options.onProgress
    this.onLoad = options.onLoad
    this.onError = options.onError

    // Get container dimensions
    const width = this.container.clientWidth || window.innerWidth
    const height = this.container.clientHeight || window.innerHeight

    // Initialize Three.js renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.isMobile(),
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(width, height)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    // Initialize scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xffffff) // White

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      10000
    )
    this.camera.position.set(0, 10, 30)

    // Initialize camera controls
    this.cameraControls = new CameraControls(this.camera, this.canvas)
    this.cameraControls.dampingFactor = 0.1
    this.cameraControls.draggingDampingFactor = 0.2

    // Initialize clock
    this.clock = new THREE.Clock()

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this))

    // Handle container resize (e.g., sidebar toggle)
    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize()
    })
    this.resizeObserver.observe(this.container)
  }

  private isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  private handleResize(): void {
    const width = this.container.clientWidth || window.innerWidth
    const height = this.container.clientHeight || window.innerHeight

    if (width > 0 && height > 0) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    }
  }

  public async loadSplat(path: string): Promise<void> {
    try {
      this.onProgress?.(0, 'Loading 3DGS data...')

      // Dispose previous viewer if exists
      if (this.splatViewer) {
        this.splatViewer.dispose()
        this.splatViewer = null
      }

      // Create new viewer
      this.splatViewer = new GaussianSplats3D.Viewer({
        cameraUp: [0, 1, 0],
        initialCameraPosition: [0, 10, 30],
        initialCameraLookAt: [0, 0, 0],
        sharedMemoryForWorkers: typeof SharedArrayBuffer !== 'undefined',
        gpuAcceleratedSort: !this.isMobile(),
        halfPrecisionCovariancesOnGPU: this.isMobile(),
        dynamicScene: false,
        selfDrivenMode: false,
        renderer: this.renderer,
        camera: this.camera,
        threeScene: this.scene,
      })

      // Load splat scene
      await this.splatViewer.addSplatScene(path, {
        showLoadingUI: false,
        progressiveLoad: true,
        onProgress: (progress: number, message: string) => {
          this.onProgress?.(progress * 100, message)
        },
      })

      this.onProgress?.(100, 'Complete!')
      this.onLoad?.()
    } catch (error) {
      console.error('Failed to load splat:', error)
      this.onError?.(error instanceof Error ? error : new Error('Failed to load splat'))
    }
  }

  public startRenderLoop(): void {
    if (this.animationFrameId !== null) return

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate)

      const delta = this.clock.getDelta()

      // Update camera controls
      this.cameraControls.update(delta)

      // Update splat viewer
      if (this.splatViewer) {
        this.splatViewer.update()
      }

      // Render scene
      this.renderer.render(this.scene, this.camera)
    }

    animate()
  }

  public stopRenderLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  public getCameraControls(): CameraControls {
    return this.cameraControls
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }

  public getScene(): THREE.Scene {
    return this.scene
  }

  public dispose(): void {
    this.stopRenderLoop()
    window.removeEventListener('resize', this.handleResize.bind(this))

    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }

    if (this.splatViewer) {
      this.splatViewer.dispose()
      this.splatViewer = null
    }

    this.cameraControls.dispose()
    this.renderer.dispose()
  }
}
