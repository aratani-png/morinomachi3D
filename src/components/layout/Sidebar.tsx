import { useAppStore } from '../../stores/appStore'
import { GroundPanel } from '../panels/GroundPanel'
import { ViewPanel } from '../panels/ViewPanel'
import { MansionPanel } from '../panels/MansionPanel'
import type { ModeType } from '../../types'

const modes: { id: ModeType; label: string; subLabel: string; number: string }[] = [
  { id: 'ground', label: '地上', subLabel: 'シーン', number: '01' },
  { id: 'view', label: '眺望', subLabel: 'シーン', number: '02' },
  { id: 'mansion', label: 'マンション', subLabel: 'シーン', number: '03' },
]

export function Sidebar() {
  const { currentMode, setMode, isTransitioning, sidebarOpen } = useAppStore()

  return (
    <aside className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col transition-all duration-300 overflow-hidden ${sidebarOpen ? 'w-80' : 'w-0'}`}>
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-y-0 right-0 w-px bg-gray-200" />

      {/* Content */}
      <div className="relative flex flex-col h-full overflow-hidden">
        {/* Logo Area */}
        <div className="flex-shrink-0 px-6 py-5 border-b border-gray-100 text-center">
          <h1 className="text-gray-900 font-medium tracking-wide text-lg">杜の街グレース</h1>
          <p className="text-gray-400 text-xs tracking-wider mt-1">MORINOMACHI GRACE</p>
        </div>

        {/* Mode Navigation */}
        <nav className="flex-shrink-0 px-4 pt-6 pb-8 border-b border-gray-100">
          <div className="grid grid-cols-3 gap-2">
            {modes.map((mode) => {
              const isActive = currentMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => !isTransitioning && setMode(mode.id)}
                  disabled={isTransitioning}
                  className={`
                    px-2 py-4 rounded-2xl transition-all duration-300 text-center
                    ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isActive
                      ? 'bg-gray-900 text-white shadow-lg scale-[1.02]'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-200 hover:scale-[1.02]'
                    }
                  `}
                >
                  <span className="text-sm font-semibold tracking-wide block">{mode.label}</span>
                  <span className="text-xs tracking-wide block">{mode.subLabel}</span>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Mode-specific Panel Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
          currentMode === null
            ? 'opacity-30 pointer-events-none'
            : 'opacity-100'
        }`}>
          {/* Show ground panel as preview when no mode selected */}
          {currentMode === null && <GroundPanel forceShow />}
          {currentMode === 'ground' && <GroundPanel />}
          {currentMode === 'view' && <ViewPanel />}
          {currentMode === 'mansion' && <MansionPanel />}
        </div>

        {/* Hint when no mode selected */}
        {currentMode === null && (
          <div className="absolute bottom-20 left-0 right-0 px-6 py-4 bg-gradient-to-t from-white via-white to-transparent">
            <p className="text-center text-sm text-gray-400">
              上のボタンを選択してください
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}
