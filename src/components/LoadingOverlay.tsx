import { useAppStore } from '../stores/appStore'

export function LoadingOverlay() {
  const { isLoading, loadingProgress, loadingMessage } = useAppStore()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/5 to-transparent" />

      <div className="relative text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-amber-500/20 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-light tracking-widest">MORINOMACHI</h1>
          <p className="text-amber-400/80 text-xs tracking-[0.3em] mt-1">RESIDENCE</p>
        </div>

        <div className="w-72 mx-auto">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Loading</p>
            <p className="text-sm text-white font-light">{Math.round(loadingProgress)}%</p>
          </div>
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-3">{loadingMessage}</p>
        </div>

        <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
