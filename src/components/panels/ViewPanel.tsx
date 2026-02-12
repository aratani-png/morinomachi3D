import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'
import { ContentBadge } from '../ui/ContentBadge'

type Direction = 'north' | 'east' | 'south' | 'west'

const directions: { id: Direction; label: string; labelEn: string }[] = [
  { id: 'north', label: '北', labelEn: 'N' },
  { id: 'east', label: '東', labelEn: 'E' },
  { id: 'south', label: '南', labelEn: 'S' },
  { id: 'west', label: '西', labelEn: 'W' },
]

const floors = [5, 10, 15, 20, 25, 30]

export function ViewPanel() {
  const { currentMode, currentViewpoint, setCurrentViewpoint, setPreviewImage } = useAppStore()
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null)

  if (currentMode !== 'view') return null

  const handleFloorSelect = (floor: number) => {
    if (!selectedDirection) return

    const dir = directions.find(d => d.id === selectedDirection)
    if (!dir) return

    const id = `${selectedDirection}-${floor}`
    const name = `${floor}階 ${dir.label}向き`

    setCurrentViewpoint({
      id,
      name,
      splatPath: '',
      position: { x: 0, y: floor * 3, z: 0 },
      lookAt: { x: 0, y: floor * 3, z: -100 },
      isPremium: floor >= 25,
    })

    setPreviewImage(`/images/view/眺望${floor}F.png`, name)
  }

  const getCurrentSelection = () => {
    if (!currentViewpoint) return null
    const parts = currentViewpoint.id.split('-')
    if (parts.length === 2) {
      return { direction: parts[0] as Direction, floor: parseInt(parts[1]) }
    }
    return null
  }

  const current = getCurrentSelection()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">Panorama View</p>
        <h3 className="text-2xl font-light text-white tracking-wide">眺望を確認</h3>
      </div>

      {/* Step 1: Direction Selector */}
      <div className="space-y-3">
        <p className="text-[11px] tracking-wide text-stone-300">Step 1 — 方角を選択</p>
        <div className="grid grid-cols-2 gap-2">
          {directions.map((dir) => {
            const isSelected = selectedDirection === dir.id
            return (
              <button
                key={dir.id}
                onClick={() => setSelectedDirection(dir.id)}
                className={`
                  py-4 rounded-xl flex items-center justify-center gap-2
                  transition-all duration-500
                  ${isSelected
                    ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent border border-amber-200/20 text-amber-100 shadow-lg shadow-amber-900/20'
                    : 'bg-stone-900/30 border border-white/[0.04] text-stone-400 hover:text-stone-200 hover:border-white/[0.08] hover:bg-stone-800/40'
                  }
                `}
              >
                <span className="text-lg font-light">{dir.label}</span>
                <span className="text-[10px] opacity-50 tracking-widest">({dir.labelEn})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Floor Selector */}
      <div className={`space-y-3 transition-opacity duration-500 ${selectedDirection ? 'opacity-100' : 'opacity-40'}`}>
        <p className="text-[11px] tracking-wide text-stone-300">Step 2 — 階数を選択</p>
        <div className="grid grid-cols-3 gap-2">
          {floors.map((floor) => {
            const isSelected = current?.direction === selectedDirection && current?.floor === floor
            const isPremium = floor >= 25

            return (
              <button
                key={floor}
                onClick={() => handleFloorSelect(floor)}
                disabled={!selectedDirection}
                className={`
                  relative py-4 rounded-xl transition-all duration-300 text-center
                  ${!selectedDirection ? 'cursor-not-allowed' : 'cursor-pointer'}
                  ${isSelected
                    ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent border border-amber-200/20 text-amber-100 shadow-lg shadow-amber-900/20'
                    : selectedDirection
                      ? 'bg-stone-900/30 border border-white/[0.04] text-stone-400 hover:text-stone-200 hover:border-white/[0.08] hover:bg-stone-800/40'
                      : 'bg-stone-900/20 border border-white/[0.02] text-stone-600'
                  }
                `}
              >
                <span className="text-xl font-extralight">{floor}</span>
                <span className="text-[9px] ml-0.5 opacity-60">F</span>
                {isPremium && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-lg shadow-amber-500/50" />
                )}
              </button>
            )
          })}
        </div>

        {/* Premium indicator */}
        <div className="flex items-center gap-3 pt-2">
          <span className="w-1.5 h-1.5 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full" />
          <span className="text-[9px] text-stone-600 tracking-wide">25F以上はプレミアム眺望</span>
        </div>
      </div>

      {/* Current Selection Info */}
      {currentViewpoint && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-100/[0.08] via-yellow-50/[0.04] to-transparent border border-amber-200/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] text-amber-200/60 uppercase tracking-[0.2em] mb-1">Selected</p>
              <p className="text-white/90 font-light tracking-wide">{currentViewpoint.name}</p>
            </div>
            {currentViewpoint.isPremium && (
              <span className="px-3 py-1 bg-gradient-to-r from-amber-200/20 to-yellow-100/10 text-[9px] text-amber-200 rounded-full tracking-widest border border-amber-200/20">
                PREMIUM
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
