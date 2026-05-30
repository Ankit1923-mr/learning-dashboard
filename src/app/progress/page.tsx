"use client"

import { motion } from "framer-motion"
import Sidebar from "@/components/layout/Sidebar"
import BottomNav from "@/components/layout/BottomNav"
import { TrendingUp, Zap, Target, Award } from "lucide-react"

const weeklyData = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 4 },
  { day: "Fri", hours: 2.5 },
  { day: "Sat", hours: 1 },
  { day: "Sun", hours: 3.5 },
]

const maxHours = Math.max(...weeklyData.map((d) => d.hours))

const milestones = [
  { label: "First lesson completed", date: "Jan 3", done: true },
  { label: "7 day streak achieved", date: "Jan 10", done: true },
  { label: "First course finished", date: "Jan 18", done: true },
  { label: "25 hours of learning", date: "Feb 2", done: true },
  { label: "Complete 4 courses", date: "Upcoming", done: false },
  { label: "30 day streak", date: "Upcoming", done: false },
]

const stats = [
  { label: "Current Streak", value: "12 days", icon: Zap, color: "text-orange-400", bg: "bg-orange-500/10" },
  { label: "This Week", value: "17.5h", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Avg per Day", value: "2.5h", icon: Target, color: "text-violet-400", bg: "bg-violet-500/10" },
  { label: "Certificates", value: "3", icon: Award, color: "text-emerald-400", bg: "bg-emerald-500/10" },
]

export default function ProgressPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">

          <header className="mb-8">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Analytics</p>
            <h1 className="text-xl font-semibold text-white/80">Your Progress</h1>
          </header>

          {/* stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
              >
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon size={15} className={s.color} />
                </div>
                <p className="text-xl font-semibold text-white/80">{s.value}</p>
                <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* weekly chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium text-white/60">Weekly Learning Hours</h2>
              <span className="text-xs text-white/25">This week</span>
            </div>
            <div className="flex items-end gap-3 h-32">
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-violet-500/40 to-violet-500/80 min-h-[4px]"
                  />
                  <span className="text-[10px] text-white/25">{d.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* milestones */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-6"
          >
            <h2 className="text-sm font-medium text-white/60 mb-5">Milestones</h2>
            <div className="space-y-3">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.06 }}
                  className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${m.done ? "bg-emerald-400" : "bg-white/10"}`} />
                    <span className={`text-sm ${m.done ? "text-white/60" : "text-white/25"}`}>
                      {m.label}
                    </span>
                  </div>
                  <span className="text-xs text-white/25">{m.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <BottomNav />
    </div>
  )
}