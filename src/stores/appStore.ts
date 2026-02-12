import { create } from 'zustand'
import type { ModeType, Viewpoint, Room } from '../types'

interface AppState {
  // Current mode (null = initial state, no mode selected)
  currentMode: ModeType | null
  setMode: (mode: ModeType) => void

  // Loading state
  isLoading: boolean
  loadingProgress: number
  loadingMessage: string
  setLoading: (loading: boolean, progress?: number, message?: string) => void

  // Transition state
  isTransitioning: boolean
  setTransitioning: (transitioning: boolean) => void

  // UI state
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void

  // View mode state
  currentViewpoint: Viewpoint | null
  setCurrentViewpoint: (viewpoint: Viewpoint | null) => void

  // Mansion mode state
  currentRoom: Room | null
  setCurrentRoom: (room: Room | null) => void
  mansionView: 'exterior' | 'interior'
  setMansionView: (view: 'exterior' | 'interior') => void

  // Preview image
  previewImage: string | null
  previewTitle: string | null
  setPreviewImage: (image: string | null, title?: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Mode (null = initial state, no mode selected yet)
  currentMode: null,
  setMode: (mode) => set({ currentMode: mode }),

  // Loading
  isLoading: true,
  loadingProgress: 0,
  loadingMessage: 'Loading...',
  setLoading: (loading, progress = 0, message = 'Loading...') =>
    set({ isLoading: loading, loadingProgress: progress, loadingMessage: message }),

  // Transition
  isTransitioning: false,
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

  // UI
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // View mode
  currentViewpoint: null,
  setCurrentViewpoint: (viewpoint) => set({ currentViewpoint: viewpoint }),

  // Mansion mode
  currentRoom: null,
  setCurrentRoom: (room) => set({ currentRoom: room }),
  mansionView: 'exterior',
  setMansionView: (view) => set({ mansionView: view }),

  // Preview image
  previewImage: null,
  previewTitle: null,
  setPreviewImage: (image, title = null) => set({ previewImage: image, previewTitle: title }),
}))
