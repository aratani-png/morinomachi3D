import { useEffect, useRef, useCallback } from 'react'
import { SceneManager } from '../core/SceneManager'
import { useAppStore } from '../stores/appStore'

interface ViewerProps {
  splatPath?: string
}

export function Viewer({ splatPath }: ViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneManagerRef = useRef<SceneManager | null>(null)
  const { setLoading } = useAppStore()

  const handleProgress = useCallback((progress: number, message: string) => {
    setLoading(true, progress, message)
  }, [setLoading])

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  const handleError = useCallback((error: Error) => {
    console.error('Viewer error:', error)
    setLoading(false)
  }, [setLoading])

  useEffect(() => {
    if (!canvasRef.current) return

    // Create scene manager
    const sceneManager = new SceneManager({
      canvas: canvasRef.current,
      onProgress: handleProgress,
      onLoad: handleLoad,
      onError: handleError,
    })

    sceneManagerRef.current = sceneManager

    // Start render loop
    sceneManager.startRenderLoop()

    // Load splat if path provided
    if (splatPath) {
      sceneManager.loadSplat(splatPath)
    } else {
      // No splat to load, just show empty scene
      setLoading(false)
    }

    // Cleanup
    return () => {
      sceneManager.dispose()
      sceneManagerRef.current = null
    }
  }, [splatPath, handleProgress, handleLoad, handleError, setLoading])

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} />
    </div>
  )
}
