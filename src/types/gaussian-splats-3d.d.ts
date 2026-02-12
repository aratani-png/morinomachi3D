declare module '@mkkellogg/gaussian-splats-3d' {
  import * as THREE from 'three'

  export interface ViewerOptions {
    cameraUp?: [number, number, number]
    initialCameraPosition?: [number, number, number]
    initialCameraLookAt?: [number, number, number]
    sharedMemoryForWorkers?: boolean
    gpuAcceleratedSort?: boolean
    halfPrecisionCovariancesOnGPU?: boolean
    dynamicScene?: boolean
    selfDrivenMode?: boolean
    renderer?: THREE.WebGLRenderer
    camera?: THREE.PerspectiveCamera
    threeScene?: THREE.Scene
    rootElement?: HTMLElement
    useBuiltInControls?: boolean
  }

  export interface SplatSceneOptions {
    showLoadingUI?: boolean
    progressiveLoad?: boolean
    position?: [number, number, number]
    rotation?: [number, number, number, string]
    scale?: [number, number, number]
    onProgress?: (progress: number, message: string) => void
  }

  export class Viewer {
    constructor(options?: ViewerOptions)
    addSplatScene(path: string, options?: SplatSceneOptions): Promise<void>
    update(): void
    render(): void
    dispose(): void
    getSplatScene(index: number): THREE.Object3D
  }

  export class DropInViewer extends Viewer {
    constructor(options?: ViewerOptions)
  }
}
