import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'

interface MobileBottomSheetProps {
  children: React.ReactNode
}

export function MobileBottomSheet({ children }: MobileBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { currentMode } = useAppStore()

  const getModeInfo = () => {
    switch (currentMode) {
      case 'ground': return { label: '地上', sublabel: 'Ground View' }
      case 'view': return { label: '眺望', sublabel: 'Panorama' }
      case 'mansion': return { label: '建物', sublabel: 'Building' }
      default: return { label: '', sublabel: '' }
    }
  }

  const modeInfo = getModeInfo()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Handle bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/10 px-4 py-3"
      >
        <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
              {currentMode === 'ground' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              )}
              {currentMode === 'view' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              {currentMode === 'mansion' && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                </svg>
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">{modeInfo.label}</p>
              <p className="text-[10px] text-slate-400">{modeInfo.sublabel}</p>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`bg-slate-900/95 backdrop-blur-xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[70vh]' : 'max-h-0'
        }`}
      >
        <div className="p-4 pb-8 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  )
}
