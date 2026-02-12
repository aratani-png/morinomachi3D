import { useState } from 'react'
import { useAppStore } from '../../stores/appStore'

type MansionViewType = 'common' | 'private' | 'vr'

const cgSpots = [
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
      <div className="flex gap-2 p-1.5 border border-gray-200 rounded-xl bg-gray-50 mb-8">
        <button
          onClick={() => setViewType('common')}
          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            viewType === 'common'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          散策
        </button>
        <button
          onClick={() => setViewType('private')}
          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            viewType === 'private'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          CGパース
        </button>
        <button
          onClick={() => setViewType('vr')}
          className={`flex-1 px-3 py-2.5 text-sm font-medium rounded-lg border transition-all duration-200 ${
            viewType === 'vr'
              ? 'bg-gray-900 text-white border-gray-900 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          室内VR
        </button>
      </div>

      {viewType === 'common' && (
        <div className="space-y-4">
          {cgSpots.map((spot) => {
            const isActive = selectedCgSpot === spot.id
            return (
              <button
                key={spot.id}
                onClick={() => handleCgSpotSelect(spot)}
                className={`w-full px-5 py-5 rounded-xl text-left transition-all duration-200 border ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <span className="text-sm font-medium">{spot.name}</span>
              </button>
            )
          })}
        </div>
      )}

      {viewType === 'private' && (
        <div className="space-y-8">
          {/* 1F Section */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">1F</p>
            <div className="space-y-4">
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
                    className={`w-full px-5 py-5 rounded-xl text-left transition-all duration-200 border ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
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
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">2F</p>
            <div className="space-y-4">
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
                    className={`w-full px-5 py-5 rounded-xl text-left transition-all duration-200 border ${
                      isActive
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
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
        <div className="grid grid-cols-2 gap-4">
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
                className={`px-4 py-5 rounded-xl text-left transition-all duration-200 border ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
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
