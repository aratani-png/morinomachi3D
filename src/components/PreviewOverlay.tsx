import { useAppStore } from '../stores/appStore'
import { PanoramaViewer } from './PanoramaViewer'

export function PreviewOverlay() {
  const { previewImage, previewTitle } = useAppStore()

  if (!previewImage) return null

  // Check if it's a white screen
  const isWhite = previewImage.startsWith('white:')

  // Check if it's an iframe embed
  const isIframe = previewImage.startsWith('iframe:')
  const iframeUrl = isIframe ? previewImage.replace('iframe:', '') : null

  // Check if it's a VR panorama image
  const isPanorama = previewImage.includes('/images/vr/')

  if (isWhite) {
    return (
      <div className="absolute inset-0 bg-white flex items-center justify-center">
        {previewTitle && (
          <p className="text-gray-300 text-3xl font-medium tracking-widest">{previewTitle}</p>
        )}
      </div>
    )
  }

  if (isIframe && iframeUrl) {
    return (
      <div className="absolute inset-0 bg-white">
        <iframe
          src={iframeUrl}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; xr-spatial-tracking"
          allowFullScreen
        />
        {previewTitle && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <p className="text-gray-900 font-medium tracking-wider">{previewTitle}</p>
          </div>
        )}
      </div>
    )
  }

  if (isPanorama) {
    return (
      <div className="absolute inset-0 bg-white">
        <PanoramaViewer imageUrl={previewImage} title={previewTitle} />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <img
          src={previewImage}
          alt={previewTitle || 'Preview'}
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
        />
        {previewTitle && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <p className="text-gray-900 font-medium tracking-wider text-lg">{previewTitle}</p>
          </div>
        )}
      </div>
    </div>
  )
}
