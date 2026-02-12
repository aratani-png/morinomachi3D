import { useEffect, useRef, useCallback } from 'react'
import CameraControls from 'camera-controls'

interface KeyState {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  up: boolean
  down: boolean
}

export function useKeyboardControls(
  controls: CameraControls | null,
  enabled: boolean = true,
  speed: number = 5
) {
  const keyState = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  })

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return

    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        keyState.current.forward = true
        break
      case 'KeyS':
      case 'ArrowDown':
        keyState.current.backward = true
        break
      case 'KeyA':
      case 'ArrowLeft':
        keyState.current.left = true
        break
      case 'KeyD':
      case 'ArrowRight':
        keyState.current.right = true
        break
      case 'KeyQ':
      case 'Space':
        keyState.current.up = true
        break
      case 'KeyE':
      case 'ShiftLeft':
        keyState.current.down = true
        break
    }
  }, [enabled])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        keyState.current.forward = false
        break
      case 'KeyS':
      case 'ArrowDown':
        keyState.current.backward = false
        break
      case 'KeyA':
      case 'ArrowLeft':
        keyState.current.left = false
        break
      case 'KeyD':
      case 'ArrowRight':
        keyState.current.right = false
        break
      case 'KeyQ':
      case 'Space':
        keyState.current.up = false
        break
      case 'KeyE':
      case 'ShiftLeft':
        keyState.current.down = false
        break
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  // Update function to be called in animation loop
  const update = useCallback((delta: number) => {
    if (!controls || !enabled) return

    const moveSpeed = speed * delta
    const state = keyState.current

    if (state.forward) controls.forward(moveSpeed, true)
    if (state.backward) controls.forward(-moveSpeed, true)
    if (state.left) controls.truck(-moveSpeed, 0, true)
    if (state.right) controls.truck(moveSpeed, 0, true)
    if (state.up) controls.truck(0, moveSpeed, true)
    if (state.down) controls.truck(0, -moveSpeed, true)
  }, [controls, enabled, speed])

  return { update, keyState }
}
