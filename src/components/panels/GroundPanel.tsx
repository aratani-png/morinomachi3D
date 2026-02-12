import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'

type GroundView = 'walk' | 'map'

const walkScenes = [
  { id: 'free', name: '3D散策', image: 'iframe:https://arrival.space/79614791_9081' },
  { id: 'grace', name: '杜の街グレース', image: '/images/ground/杜の街.png' },
  { id: 'busstop', name: 'バス停・駐車場', image: '/images/ground/バス停.png' },
]

interface Facility {
  id: string
  name: string
  distance: string
}

const facilities: { category: string; items: Facility[] }[] = [
  {
    category: 'ショッピング',
    items: [
      { id: 'aeon', name: 'イオンモール岡山', distance: '徒歩3分' },
      { id: 'marche', name: '森のマルシェ', distance: '敷地内' },
      { id: 'tenmaya', name: '天満屋 岡山本店', distance: '徒歩8分' },
    ],
  },
  {
    category: '交通',
    items: [
      { id: 'okayama', name: 'JR岡山駅', distance: '徒歩12分' },
      { id: 'morinomachi', name: '杜の街バス停', distance: '敷地内' },
      { id: 'airport', name: '岡山空港リムジン', distance: '敷地内' },
    ],
  },
]

interface GroundPanelProps {
  forceShow?: boolean
}

export function GroundPanel({ forceShow = false }: GroundPanelProps) {
  const { currentMode, setPreviewImage } = useAppStore()
  const [groundView, setGroundView] = useState<GroundView>('walk')
  const [selectedScene, setSelectedScene] = useState<string>('free')
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null)

  const handleSceneSelect = (scene: typeof walkScenes[0]) => {
    setSelectedScene(scene.id)
    setPreviewImage(scene.image, scene.name)
  }

  const handleFacilitySelect = (facility: Facility) => {
    setSelectedFacility(facility.id)
    // Show map with route info (will be animation in the future)
    setPreviewImage('/images/ground/map.jpg', `マンションから${facility.name}まで ${facility.distance}`)
  }

  if (!forceShow && currentMode !== 'ground') return null

  return (
    <div className="px-5 py-6">
      {/* Tab Toggle */}
      <div className="flex gap-2 p-1.5 border border-gray-200 rounded-xl bg-gray-50 mb-8">
        <button
          onClick={() => setGroundView('walk')}
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            groundView === 'walk'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          散策
        </button>
        <button
          onClick={() => {
            setGroundView('map')
            setPreviewImage('/images/ground/map.jpg', '周辺MAP')
          }}
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            groundView === 'map'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          周辺MAP
        </button>
      </div>

      {groundView === 'walk' ? (
        <div className="space-y-4">
          {walkScenes.map((scene) => {
            const isActive = selectedScene === scene.id
            return (
              <button
                key={scene.id}
                onClick={() => handleSceneSelect(scene)}
                className={`w-full px-5 py-5 rounded-xl text-left transition-all duration-200 border ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <span className="text-sm font-medium pl-2">{scene.name}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="space-y-8">
          {facilities.map((group) => (
            <div key={group.category}>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                {group.category}
              </p>
              <div className="space-y-4">
                {group.items.map((facility) => {
                  const isActive = selectedFacility === facility.id
                  return (
                    <button
                      key={facility.id}
                      onClick={() => handleFacilitySelect(facility)}
                      className={`w-full flex items-center justify-between px-5 py-5 rounded-xl transition-all duration-200 border ${
                        isActive
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-sm font-medium pl-2">{facility.name}</span>
                      <span className={`text-xs ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>{facility.distance}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
