"use client"

import { motion } from "framer-motion"
import { Flame, TrendingUp } from "lucide-react"

export default function HeroTile() {
  return (
    <motion.section
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative col-span-2 rounded-2xl border border-white/5 bg-white/[0.03] p-7 overflow-hidden group cursor-pointer"
    >
      {/* glow blobs — fixed visibility */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-violet-600/20 rounded-full blur-3xl transition-all duration-700 group-hover:bg-violet-600/30 group-hover:scale-110" />
      <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-blue-600/15 rounded-full blur-2xl transition-all duration-700 group-hover:bg-blue-600/25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

      {/* subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20">
            <Flame size={11} className="text-orange-400" />
            <span className="text-xs text-orange-400 font-medium">12 day streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            <span className="text-xs text-violet-400 font-medium">Pro Plan</span>
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-white/90 mb-1.5 tracking-tight">
          Welcome back, Alex
        </h1>
        <p className="text-sm text-white/40 mb-7">
          You have 3 courses in progress. Keep it going.
        </p>

        <div className="flex items-center gap-8">
          <div>
            <p className="text-2xl font-semibold text-white/80 tabular-nums">247</p>
            <p className="text-xs text-white/30 mt-0.5">lessons done</p>
          </div>
          <div className="w-px h-9 bg-white/[0.07]" />
          <div>
            <p className="text-2xl font-semibold text-white/80 tabular-nums">18h</p>
            <p className="text-xs text-white/30 mt-0.5">this month</p>
          </div>
          <div className="w-px h-9 bg-white/[0.07]" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={13} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-400">+12%</p>
              <p className="text-xs text-white/25">vs last month</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}