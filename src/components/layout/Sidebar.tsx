import { useAppStore } from '../../stores/appStore'
import { GroundPanel } from '../panels/GroundPanel'
import { ViewPanel } from '../panels/ViewPanel'
import { MansionPanel } from '../panels/MansionPanel'
import type { ModeType } from '../../types'

const modes: { id: ModeType; label: string; sublabel: string }[] = [
  { id: 'ground', label: '地上', sublabel: 'Ground View' },
  { id: 'view', label: '眺望', sublabel: 'Panorama' },
  { id: 'mansion', label: '建物', sublabel: 'Building' },
]

export function Sidebar() {
  const { currentMode, setMode, isTransitioning } = useAppStore()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-20 lg:w-80 z-50 flex flex-col">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 via-transparent to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

      {/* Content */}
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Logo Area */}
        <div className="flex-shrink-0 p-4 lg:p-6 border-b border-white/[0.04]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent rounded-xl flex items-center justify-center border border-amber-200/20 shadow-lg shadow-amber-900/10">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-amber-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-white/90 font-extralight tracking-[0.15em] text-sm">MORINOMACHI</h1>
              <p className="text-amber-200/50 text-[9px] tracking-[0.3em] font-light">GRACE RESIDENCE</p>
            </div>
          </div>
        </div>

        {/* Mode Navigation */}
        <nav className="flex-shrink-0 p-3 lg:p-5 border-b border-white/[0.04]">
          <p className="hidden lg:block text-[9px] uppercase tracking-[0.25em] text-stone-600 mb-4 px-1 font-light">
            View Mode
          </p>
          <div className="flex lg:flex-col gap-1.5 lg:gap-2">
            {modes.map((mode) => {
              const isActive = currentMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => !isTransitioning && setMode(mode.id)}
                  disabled={isTransitioning}
                  className={`
                    flex-1 lg:flex-none p-2.5 lg:p-3.5 rounded-xl transition-all duration-500 group
                    ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isActive
                      ? 'bg-gradient-to-r from-amber-100/[0.08] via-yellow-50/[0.04] to-transparent border border-amber-200/20 shadow-lg shadow-amber-900/10'
                      : 'hover:bg-stone-800/40 border border-transparent hover:border-white/[0.04]'
                    }
                  `}
                >
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <div className={`
                      w-9 h-9 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center transition-all duration-500
                      ${isActive
                        ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent border border-amber-200/20'
                        : 'bg-stone-800/50 border border-white/[0.04] group-hover:bg-stone-700/50'
                      }
                    `}>
                      {mode.id === 'ground' && (
                        <svg className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-200' : 'text-stone-500 group-hover:text-stone-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {mode.id === 'view' && (
                        <svg className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-200' : 'text-stone-500 group-hover:text-stone-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                      {mode.id === 'mansion' && (
                        <svg className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-200' : 'text-stone-500 group-hover:text-stone-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className={`text-sm font-light tracking-wide ${isActive ? 'text-white/90' : 'text-stone-400 group-hover:text-stone-200'}`}>
                        {mode.label}
                      </p>
                      <p className={`text-[9px] tracking-wider ${isActive ? 'text-amber-200/60' : 'text-stone-600'}`}>
                        {mode.sublabel}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Mode-specific Panel Content */}
        <div className="hidden lg:block flex-1 overflow-y-auto p-5 custom-scrollbar">
          <GroundPanel />
          <ViewPanel />
          <MansionPanel />
        </div>

        {/* Bottom Info */}
        <div className="flex-shrink-0 p-4 lg:p-5 border-t border-white/[0.04]">
          <div className="hidden lg:block">
            <p className="text-[9px] uppercase tracking-[0.25em] text-stone-600 mb-3 font-light">Contact</p>
            <p className="text-white/80 text-sm font-light tracking-wider">0120-XXX-XXX</p>
            <p className="text-stone-600 text-[10px] mt-1.5 tracking-wide">10:00 - 18:00</p>
          </div>
          <div className="lg:hidden flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-stone-800/50 border border-white/[0.04] flex items-center justify-center">
              <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
