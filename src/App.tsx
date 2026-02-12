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
  const { currentMode } = useAppStore()

  const getSplatPath = () => {
    switch (currentMode) {
      case 'ground':
        return '/assets/splats/ground/test.ply'
      case 'view':
        return undefined
      case 'mansion':
        return undefined
      default:
        return undefined
    }
  }

  const CurrentPanel = () => (
    <>
      <GroundPanel />
      <ViewPanel />
      <MansionPanel />
    </>
  )

  return (
    <div className="relative w-full h-full bg-slate-900">
      {/* Left Sidebar - Navigation + Panels */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="absolute inset-0 left-20 lg:left-80">
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
