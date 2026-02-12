import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'

type Direction = 'north' | 'east' | 'south' | 'west'

const directions: { id: Direction; label: string }[] = [
  { id: 'north', label: '北' },
  { id: 'east', label: '東' },
  { id: 'south', label: '南' },
  { id: 'west', label: '西' },
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
    <div className="px-5 py-6">
      {/* Step 1: Direction */}
      <div className="mb-8">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
          方角を選択
        </p>
        <div className="grid grid-cols-4 gap-3">
          {directions.map((dir) => {
            const isSelected = selectedDirection === dir.id
            return (
              <button
                key={dir.id}
                onClick={() => setSelectedDirection(dir.id)}
                className={`py-5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]'
                }`}
              >
                {dir.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2: Floor */}
      <div className={`transition-opacity duration-300 ${selectedDirection ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
          階数を選択
        </p>
        <div className="grid grid-cols-3 gap-4">
          {floors.map((floor) => {
            const isSelected = current?.direction === selectedDirection && current?.floor === floor

            return (
              <button
                key={floor}
                onClick={() => handleFloorSelect(floor)}
                disabled={!selectedDirection}
                className={`py-5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-400 hover:shadow-md hover:scale-[1.02]'
                }`}
              >
                {floor}F
              </button>
            )
          })}
        </div>
      </div>

      {/* Current Selection */}
      {currentViewpoint && (
        <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-400 mb-2">選択中</p>
          <p className="text-sm font-medium text-gray-900">{currentViewpoint.name}</p>
        </div>
      )}
    </div>
  )
}
