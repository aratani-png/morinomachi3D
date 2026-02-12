import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'
import { ContentBadge } from '../ui/ContentBadge'

type MansionViewType = 'walk' | 'cg'

const cgSpots = [
  { id: 'entrance', name: 'エントランス', image: null },
  { id: 'lobby', name: 'エントランスロビー', image: null },
  { id: 'parking', name: '駐車場', image: null },
  { id: 'garden', name: '中庭', image: null },
  { id: 'water', name: '水盤', image: '/images/mansion/水盤.png' },
]

const floor1Spots = [
  { id: 'entrance-hall', name: 'エントランスホール' },
]

const floor2Spots = [
  { id: 'lounge', name: 'ラウンジ' },
  { id: 'theater', name: 'シアタールーム' },
  { id: 'study', name: 'スタディルーム' },
  { id: 'guest', name: 'ゲストルーム' },
]

const rooms = [
  { id: 'a', name: 'Type A', image: '/images/vr/A.jpg' },
  { id: 'b', name: 'Type B', image: '/images/vr/B.jpg' },
  { id: 'c', name: 'Type C', image: '/images/vr/A.jpg' },
  { id: 'd', name: 'Type D', image: '/images/vr/B.jpg' },
  { id: 'e', name: 'Type E', image: '/images/vr/A.jpg' },
  { id: 'f', name: 'Type F', image: '/images/vr/B.jpg' },
  { id: 'g', name: 'Type G', image: '/images/vr/A.jpg' },
  { id: 'h', name: 'Type H', image: '/images/vr/B.jpg' },
  { id: 'i', name: 'Type I', image: '/images/vr/A.jpg' },
  { id: 'j', name: 'Type J', image: '/images/vr/J.jpg' },
]

export function MansionPanel() {
  const { currentMode, currentRoom, setCurrentRoom, setPreviewImage } = useAppStore()
  const [viewType, setViewType] = useState<MansionViewType>('walk')
  const [selectedCgSpot, setSelectedCgSpot] = useState<string | null>(null)
  const [selectedHallSpot, setSelectedHallSpot] = useState<string | null>(null)

  if (currentMode !== 'mansion') return null

  const handleCgSpotSelect = (spot: typeof cgSpots[0]) => {
    setSelectedCgSpot(spot.id)
    if (spot.image) {
      setPreviewImage(spot.image, spot.name)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">Mansion</p>
        <h3 className="text-2xl font-light text-white tracking-wide">マンション</h3>
      </div>

      {/* View Toggle */}
      <div className="relative bg-stone-900/40 rounded-2xl p-1 border border-white/[0.06]">
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => setViewType('walk')}
            className={`
              py-3 rounded-xl text-sm tracking-wider transition-all duration-500
              ${viewType === 'walk'
                ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent text-amber-100 shadow-lg shadow-amber-900/20'
                : 'text-stone-500 hover:text-stone-300'
              }
            `}
          >
            散策
          </button>
          <button
            onClick={() => setViewType('cg')}
            className={`
              py-3 rounded-xl text-sm tracking-wider transition-all duration-500
              ${viewType === 'cg'
                ? 'bg-gradient-to-br from-amber-200/20 via-yellow-100/10 to-transparent text-amber-100 shadow-lg shadow-amber-900/20'
                : 'text-stone-500 hover:text-stone-300'
              }
            `}
          >
            パース
          </button>
        </div>
      </div>

      {viewType === 'walk' ? (
        <div className="space-y-3">
          {/* 共用施設 - 散策 */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-light">共用施設</p>
          <div className="space-y-2">
            {cgSpots.map((spot) => {
              const isActive = selectedCgSpot === spot.id
              return (
                <button
                  key={spot.id}
                  onClick={() => handleCgSpotSelect(spot)}
                  className={`
                    w-full px-4 py-3.5 rounded-xl transition-all duration-300 text-left
                    flex items-center justify-between group
                    ${isActive
                      ? 'bg-gradient-to-r from-amber-100/10 via-yellow-50/5 to-transparent border border-amber-200/20 shadow-lg shadow-amber-900/10'
                      : 'bg-stone-900/30 border border-white/[0.04] hover:border-white/[0.08] hover:bg-stone-800/40'
                    }
                  `}
                >
                  <span className={`text-[13px] tracking-wide ${isActive ? 'text-amber-100' : 'text-stone-400 group-hover:text-stone-200'}`}>
                    {spot.name}
                  </span>
                  <ContentBadge type="gs" />
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 1F Section */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-light">1F</p>
            <div className="space-y-2">
              {floor1Spots.map((spot) => {
                const isActive = selectedHallSpot === spot.id
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setSelectedHallSpot(spot.id)
                      setCurrentRoom(null)
                    }}
                    className={`
                      w-full px-4 py-3.5 rounded-xl transition-all duration-300 text-left
                      flex items-center justify-between group
                      ${isActive
                        ? 'bg-gradient-to-r from-amber-100/10 via-yellow-50/5 to-transparent border border-amber-200/20 shadow-lg shadow-amber-900/10'
                        : 'bg-stone-900/30 border border-white/[0.04] hover:border-white/[0.08] hover:bg-stone-800/40'
                      }
                    `}
                  >
                    <span className={`text-[13px] tracking-wide ${isActive ? 'text-amber-100' : 'text-stone-400 group-hover:text-stone-200'}`}>
                      {spot.name}
                    </span>
                    <ContentBadge type="cg" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2F Section */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-light">2F</p>
            <div className="space-y-2">
              {floor2Spots.map((spot) => {
                const isActive = selectedHallSpot === spot.id
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setSelectedHallSpot(spot.id)
                      setCurrentRoom(null)
                    }}
                    className={`
                      w-full px-4 py-3.5 rounded-xl transition-all duration-300 text-left
                      flex items-center justify-between group
                      ${isActive
                        ? 'bg-gradient-to-r from-amber-100/10 via-yellow-50/5 to-transparent border border-amber-200/20 shadow-lg shadow-amber-900/10'
                        : 'bg-stone-900/30 border border-white/[0.04] hover:border-white/[0.08] hover:bg-stone-800/40'
                      }
                    `}
                  >
                    <span className={`text-[13px] tracking-wide ${isActive ? 'text-amber-100' : 'text-stone-400 group-hover:text-stone-200'}`}>
                      {spot.name}
                    </span>
                    <ContentBadge type="cg" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Room VR Section */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-light">室内VR</p>
            <div className="space-y-2">
              {rooms.map((room) => {
                const isActive = currentRoom?.id === room.id
                return (
                  <button
                    key={room.id}
                    onClick={() => {
                      setCurrentRoom({
                        id: room.id,
                        name: room.name,
                        floor: 10,
                        type: '',
                        modelPath: '',
                      })
                      setSelectedHallSpot(null)
                      setPreviewImage(room.image, room.name)
                    }}
                    className={`
                      w-full px-4 py-3 rounded-xl transition-all duration-300 text-left group
                      ${isActive
                        ? 'bg-gradient-to-r from-amber-100/10 via-yellow-50/5 to-transparent border border-amber-200/20 shadow-lg shadow-amber-900/10'
                        : 'bg-stone-900/30 border border-white/[0.04] hover:border-white/[0.08] hover:bg-stone-800/40'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[13px] tracking-wide ${isActive ? 'text-amber-100' : 'text-stone-400 group-hover:text-stone-200'}`}>
                        {room.name}
                      </span>
                      <ContentBadge type="vr" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
