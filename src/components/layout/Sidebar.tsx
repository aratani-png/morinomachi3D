import { useAppStore } from '../../stores/appStore'
import { GroundPanel } from '../panels/GroundPanel'
import { ViewPanel } from '../panels/ViewPanel'
import { MansionPanel } from '../panels/MansionPanel'
import type { ModeType } from '../../types'

const modes: { id: ModeType; label: string; number: string }[] = [
  { id: 'ground', label: '周辺を見る', number: '01' },
  { id: 'view', label: '眺望を見る', number: '02' },
  { id: 'mansion', label: 'マンションを見る', number: '03' },
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
        <nav className="flex-shrink-0 px-5 pt-5 pb-6 border-b border-gray-100">
          <div className="flex gap-2 p-1.5 border border-gray-200 rounded-xl bg-gray-50">
            {modes.map((mode) => {
              const isActive = currentMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => !isTransitioning && setMode(mode.id)}
                  disabled={isTransitioning}
                  className={`
                    flex-1 px-3 py-3 rounded-lg transition-all duration-200 text-center border
                    ${isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isActive
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]'
                    }
                  `}
                >
                  <span className="text-sm font-medium">
                    {mode.label.replace('を見る', '')}
                  </span>
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
