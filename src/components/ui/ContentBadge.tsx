type ContentType = 'gs' | 'cg' | 'vr' | 'map'

const badgeConfig: Record<ContentType, { label: string; border: string; text: string; glow: string }> = {
  gs: {
    label: '3D GS',
    border: 'border-violet-400/30',
    text: 'text-violet-300',
    glow: 'shadow-violet-500/20'
  },
  cg: {
    label: 'CG',
    border: 'border-emerald-400/30',
    text: 'text-emerald-300',
    glow: 'shadow-emerald-500/20'
  },
  vr: {
    label: 'VR',
    border: 'border-rose-400/30',
    text: 'text-rose-300',
    glow: 'shadow-rose-500/20'
  },
  map: {
    label: 'MAP',
    border: 'border-sky-400/30',
    text: 'text-sky-300',
    glow: 'shadow-sky-500/20'
  },
}

export function ContentBadge({ type }: { type: ContentType }) {
  const config = badgeConfig[type]
  return (
    <span className={`
      inline-flex items-center px-2 py-0.5
      rounded border ${config.border} ${config.text}
      text-[9px] font-medium tracking-widest uppercase
      bg-gradient-to-r from-white/5 to-transparent
      shadow-sm ${config.glow}
    `}>
      {config.label}
    </span>
  )
}
