export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 animate-pulse">
      <div className="flex items-start justify-between mb-6">
        <div className="w-9 h-9 rounded-xl bg-white/5" />
        <div className="w-12 h-4 rounded-full bg-white/5" />
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-4 w-3/4 rounded bg-white/5" />
        <div className="h-3 w-1/2 rounded bg-white/5" />
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/5" />
    </div>
  )
}