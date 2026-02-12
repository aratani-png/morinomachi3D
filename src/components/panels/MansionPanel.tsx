import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'

type MansionViewType = 'common' | 'private' | 'vr'

const cgSpots = [
  { id: 'free', name: 'フリー散策', image: 'iframe:https://arrival.space/79614791_9081' },
  { id: 'mansion', name: 'マンション前', image: '/images/ground/マンション.png' },
  { id: 'entrance', name: 'エントランス', image: 'white:' },
  { id: 'lobby', name: 'エントランスロビー', image: 'white:' },
  { id: 'parking', name: '駐車場', image: 'white:' },
  { id: 'water', name: '水盤', image: '/images/mansion/水盤.png' },
]

const floor1Spots = [
  { id: 'entrance-hall', name: 'エントランスホール', image: 'white:' },
]

const floor2Spots = [
  { id: 'lounge', name: 'ラウンジ', image: 'white:' },
  { id: 'theater', name: 'シアタールーム', image: 'white:' },
  { id: 'study', name: 'スタディルーム', image: 'white:' },
  { id: 'guest', name: 'ゲストルーム', image: 'white:' },
]

const rooms = [
  { id: 'a', name: 'Aタイプ', image: '/images/vr/A.jpg' },
  { id: 'b', name: 'Bタイプ', image: '/images/vr/B.jpg' },
  { id: 'c', name: 'Cタイプ', image: '/images/vr/A.jpg' },
  { id: 'd', name: 'Dタイプ', image: '/images/vr/B.jpg' },
  { id: 'e', name: 'Eタイプ', image: '/images/vr/A.jpg' },
  { id: 'f', name: 'Fタイプ', image: '/images/vr/B.jpg' },
  { id: 'g', name: 'Gタイプ', image: '/images/vr/A.jpg' },
  { id: 'h', name: 'Hタイプ', image: '/images/vr/B.jpg' },
  { id: 'i', name: 'Iタイプ', image: '/images/vr/A.jpg' },
  { id: 'j', name: 'Jタイプ', image: '/images/vr/J.jpg' },
]

export function MansionPanel() {
  const { currentMode, currentRoom, setCurrentRoom, setPreviewImage } = useAppStore()
  const [viewType, setViewType] = useState<MansionViewType>('common')
  const [selectedCgSpot, setSelectedCgSpot] = useState<string | null>(null)
  const [selectedHallSpot, setSelectedHallSpot] = useState<string | null>(null)

  if (currentMode !== 'mansion') return null

  const handleCgSpotSelect = (spot: typeof cgSpots[0]) => {
    setSelectedCgSpot(spot.id)
    // Add "散策" suffix for white screens in 散策 section
    const title = spot.image.startsWith('white:') ? `${spot.name}散策` : spot.name
    setPreviewImage(spot.image, title)
  }

  return (
    <div className="px-5 py-6">
      {/* Tab Toggle */}
      <div className="flex gap-2 p-1.5 border border-gray-200 rounded-xl bg-gray-50 mb-2">
        <button
          onClick={() => setViewType('common')}
          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            viewType === 'common'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-400 '
          }`}
        >
          散策
        </button>
        <button
          onClick={() => setViewType('private')}
          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            viewType === 'private'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-400 '
          }`}
        >
          CGパース
        </button>
        <button
          onClick={() => setViewType('vr')}
          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            viewType === 'vr'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-200 hover:border-gray-400 '
          }`}
        >
          室内VR
        </button>
      </div>

      {viewType === 'common' && (
        <div className="space-y-2">
          {cgSpots.map((spot) => {
            const isActive = selectedCgSpot === spot.id
            return (
              <button
                key={spot.id}
                onClick={() => handleCgSpotSelect(spot)}
                className={`w-full px-5 py-5 rounded-xl text-center transition-all duration-200 border ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-400 hover:scale-[1.02]'
                }`}
              >
                <span className="text-sm font-medium">{spot.name}</span>
              </button>
            )
          })}
        </div>
      )}

      {viewType === 'private' && (
        <div className="space-y-2">
          {/* 1F Section */}
          <div>
            <div className="flex justify-center mb-4"><span className="px-5 py-2 bg-gray-200 text-gray-500 text-xs font-medium tracking-widest rounded-full">1F</span></div>
            <div className="space-y-2">
              {floor1Spots.map((spot) => {
                const isActive = selectedHallSpot === spot.id
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setSelectedHallSpot(spot.id)
                      setCurrentRoom(null)
                      // Add "パース" suffix for white screens in CGパース section
                      const title = spot.image.startsWith('white:') ? `${spot.name}パース` : spot.name
                      setPreviewImage(spot.image, title)
                    }}
                    className={`w-full px-5 py-5 rounded-xl text-center transition-all duration-200 border ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-400 hover:scale-[1.02]'
                    }`}
                  >
                    <span className="text-sm font-medium">{spot.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2F Section */}
          <div>
            <div className="flex justify-center mb-4"><span className="px-5 py-2 bg-gray-200 text-gray-500 text-xs font-medium tracking-widest rounded-full">2F</span></div>
            <div className="space-y-2">
              {floor2Spots.map((spot) => {
                const isActive = selectedHallSpot === spot.id
                return (
                  <button
                    key={spot.id}
                    onClick={() => {
                      setSelectedHallSpot(spot.id)
                      setCurrentRoom(null)
                      // Add "パース" suffix for white screens in CGパース section
                      const title = spot.image.startsWith('white:') ? `${spot.name}パース` : spot.name
                      setPreviewImage(spot.image, title)
                    }}
                    className={`w-full px-5 py-5 rounded-xl text-center transition-all duration-200 border ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-400 hover:scale-[1.02]'
                    }`}
                  >
                    <span className="text-sm font-medium">{spot.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {viewType === 'vr' && (
        <div className="grid grid-cols-2 gap-2">
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
                className={`px-4 py-5 rounded-xl text-center transition-all duration-200 border ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-400 hover:scale-[1.02]'
                }`}
              >
                <span className="text-sm font-medium">{room.name}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
