// Mode types
export type ModeType = 'ground' | 'view' | 'mansion'

// Simple vector for serializable state
export interface SimpleVector3 {
  x: number
  y: number
  z: number
}

// Camera state
export interface CameraState {
  position: SimpleVector3
  target: SimpleVector3
  fov: number
}

// Viewpoint for View Mode
export interface Viewpoint {
  id: string
  name: string
  splatPath: string
  position: SimpleVector3
  lookAt: SimpleVector3
  isPremium: boolean
}

// Room for Mansion Mode
export interface Room {
  id: string
  name: string
  floor: number
  type: string
  modelPath: string
  floorPlanPath?: string
}

// Asset loading state
export interface AssetState {
  id: string
  type: 'splat' | 'gltf'
  loaded: boolean
  progress: number
  error?: string
}

// Device profile for performance optimization
export interface DeviceProfile {
  maxSplats: number
  pixelRatio: number
  halfPrecision: boolean
  gpuSort: boolean
  antialiasing: boolean
}
