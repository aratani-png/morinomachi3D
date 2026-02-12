import { Viewer } from './components/Viewer'
import { Sidebar } from './components/layout/Sidebar'
import { LoadingOverlay } from './components/LoadingOverlay'
import { PreviewOverlay } from './components/PreviewOverlay'
import { GroundPanel } from './components/panels/GroundPanel'
import { ViewPanel } from './components/panels/ViewPanel'
import { MansionPanel } from './components/panels/MansionPanel'
import { MobileBottomSheet } from './components/layout/MobileBottomSheet'
import { useAppStore } from './stores/appStore'

function App() {
  const { currentMode: _currentMode, sidebarOpen, setSidebarOpen } = useAppStore()

  // PLY files are hosted externally - currently using preview system only
  const getSplatPath = () => {
    return undefined
  }

  const CurrentPanel = () => (
    <>
      <GroundPanel />
      <ViewPanel />
      <MansionPanel />
    </>
  )

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Left Sidebar - Navigation + Panels */}
      <Sidebar />

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed bottom-6 z-50 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 ${sidebarOpen ? 'left-[19rem]' : 'left-4'}`}
      >
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main Content Area */}
      <div className={`absolute top-0 bottom-0 right-0 transition-all duration-300 ${sidebarOpen ? 'left-80' : 'left-0'}`}>
        {/* 3D Viewer */}
        <Viewer splatPath={getSplatPath()} />

        {/* Preview Image Overlay */}
        <PreviewOverlay />
      </div>

      {/* Mobile: Bottom Sheet (panels shown here on small screens) */}
      <div className="lg:hidden">
        <MobileBottomSheet>
          <CurrentPanel />
        </MobileBottomSheet>
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay />
    </div>
  )
}

export default App
