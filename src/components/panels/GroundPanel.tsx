import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'
import { ContentBadge } from '../ui/ContentBadge'

type GroundView = 'walk' | 'map'

const walkScenes = [
  { id: 'free', name: 'フリー', image: 'iframe:https://arrival.space/79614791_9081' },
  { id: 'mansion', name: 'マンション', image: '/images/ground/マンション.png' },
  { id: 'grace', name: '杜の街グレース', image: '/images/ground/杜の街.png' },
  { id: 'busstop', name: 'バス停駐車場', image: '/images/ground/バス停.png' },
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
      { id: 'icot', name: 'ICOTNICOT', distance: '徒歩10分' },
    ],
  },
  {
    category: '駅',
    items: [
      { id: 'okayama', name: 'JR岡山駅', distance: '徒歩12分' },
      { id: 'nishi', name: '新西大寺町筋駅', distance: '徒歩9分' },
      { id: 'ekimae', name: '岡山駅前駅', distance: '徒歩12分' },
    ],
  },
  {
    category: 'バス停',
    items: [
      { id: 'morinomachi', name: '杜の街バス停', distance: '敷地内' },
      { id: 'sanyo', name: '山陽新聞社前', distance: '徒歩2分' },
      { id: 'airport', name: '岡山空港リムジン', distance: '敷地内' },
    ],
  },
]

export function GroundPanel() {
  const { currentMode, setPreviewImage } = useAppStore()
  const [groundView, setGroundView] = useState<GroundView>('walk')
  const [selectedScene, setSelectedScene] = useState<string>('mansion')

  const handleSceneSelect = (scene: typeof walkScenes[0]) => {
    setSelectedScene(scene.id)
    setPreviewImage(scene.image, scene.name)
  }

  if (currentMode !== 'ground') return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">Ground</p>
        <h3 className="text-2xl font-light text-white tracking-wide">地上</h3>
      </div>

      {/* View Toggle */}
      <div className="relative bg-stone-900/40 rounded-2xl p-1 border border-white/[0.06]">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setGroundView('walk')}
            className={`
              py-3 rounded-xl text-sm tracking-wider transition-all duration-500
              ${groundView === 'walk'
                ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent text-amber-100 shadow-lg shadow-amber-900/20'
                : 'text-stone-500 hover:text-stone-300'
              }
            `}
          >
            散策
          </button>
          <button
            onClick={() => {
              setGroundView('map')
              setPreviewImage('/images/ground/map.jpg', '周辺MAP')
            }}
            className={`
              py-3 rounded-xl text-sm tracking-wider transition-all duration-500
              ${groundView === 'map'
                ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent text-amber-100 shadow-lg shadow-amber-900/20'
                : 'text-stone-500 hover:text-stone-300'
              }
            `}
          >
            周辺MAP
          </button>
        </div>
      </div>

      {groundView === 'walk' ? (
        <div className="space-y-5">
          {/* Scene Selector */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-light">シーン選択</p>
            <div className="space-y-1.5">
              {walkScenes.map((scene) => {
                const isActive = selectedScene === scene.id
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleSceneSelect(scene)}
                    className={`
                      w-full px-4 py-3 rounded-xl transition-all duration-300 text-left
                      flex items-center justify-between group
                      ${isActive
                        ? 'bg-gradient-to-r from-amber-100/10 via-yellow-50/5 to-transparent border border-amber-200/20 shadow-lg shadow-amber-900/10'
                        : 'bg-stone-900/30 border border-white/[0.04] hover:border-white/[0.08] hover:bg-stone-800/40'
                      }
                    `}
                  >
                    <span className={`text-[13px] tracking-wide ${isActive ? 'text-amber-100' : 'text-stone-400 group-hover:text-stone-200'}`}>
                      {scene.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 rounded-2xl bg-stone-900/30 border border-white/[0.04]">
            <p className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-light mb-4">Controls</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-stone-800/50 flex items-center justify-center border border-white/[0.06]">
                  <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="text-[9px] text-stone-600 tracking-wide">ドラッグ</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-stone-800/50 flex items-center justify-center border border-white/[0.06]">
                  <span className="text-[9px] font-mono text-stone-400 tracking-widest">WASD</span>
                </div>
                <p className="text-[9px] text-stone-600 tracking-wide">移動</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-stone-800/50 flex items-center justify-center border border-white/[0.06]">
                  <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <p className="text-[9px] text-stone-600 tracking-wide">ズーム</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Map View - Facilities */}
          {facilities.map((group) => (
            <div key={group.category} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-light">{group.category}</p>
                <ContentBadge type="map" />
              </div>
              <div className="space-y-1.5">
                {group.items.map((facility) => (
                  <button
                    key={facility.id}
                    className="w-full px-4 py-3 rounded-xl bg-stone-900/30 border border-white/[0.04]
                      hover:border-white/[0.08] hover:bg-stone-800/40 transition-all duration-300
                      group text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-stone-400 group-hover:text-stone-200 tracking-wide transition-colors">
                        {facility.name}
                      </span>
                      <span className="text-[10px] text-stone-600 group-hover:text-stone-400 tracking-wide transition-colors">
                        {facility.distance}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
