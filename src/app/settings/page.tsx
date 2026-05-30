"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Sidebar from "@/components/layout/Sidebar"
import BottomNav from "@/components/layout/BottomNav"
import { User, Bell, Shield, Palette, ChevronRight, Check } from "lucide-react"

const sections = [
  {
    label: "Account",
    icon: User,
    fields: [
      { label: "Full Name", value: "Alex Johnson", type: "text" },
      { label: "Email", value: "alex@learnos.dev", type: "email" },
      { label: "Username", value: "@alexj", type: "text" },
    ],
  },
  {
    label: "Notifications",
    icon: Bell,
    toggles: [
      { label: "Daily reminders", sub: "Get reminded to study every day", on: true },
      { label: "Streak alerts", sub: "Warn me before I lose my streak", on: true },
      { label: "Course updates", sub: "New content in enrolled courses", on: false },
      { label: "Weekly summary", sub: "Progress report every Sunday", on: true },
    ],
  },
]

function Toggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial)
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${on ? "bg-violet-500" : "bg-white/10"}`}
    >
      <motion.div
        animate={{ x: on ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-4 h-4 rounded-full bg-white"
      />
    </button>
  )
}

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-6">

          <header className="mb-8">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Preferences</p>
            <h1 className="text-xl font-semibold text-white/80">Settings</h1>
          </header>

          <div className="space-y-4">
            {sections.map((section, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.1 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden"
              >
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
                  <section.icon size={14} className="text-white/40" />
                  <h2 className="text-sm font-medium text-white/50">{section.label}</h2>
                </div>

                {section.fields && (
                  <div className="divide-y divide-white/[0.04]">
                    {section.fields.map((field, fi) => (
                      <div key={fi} className="flex items-center justify-between px-5 py-3.5">
                        <label className="text-xs text-white/35 w-28 shrink-0">{field.label}</label>
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          className="flex-1 bg-transparent text-sm text-white/65 text-right outline-none focus:text-white/80 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {section.toggles && (
                  <div className="divide-y divide-white/[0.04]">
                    {section.toggles.map((toggle, ti) => (
                      <div key={ti} className="flex items-center justify-between px-5 py-3.5">
                        <div>
                          <p className="text-sm text-white/65">{toggle.label}</p>
                          <p className="text-xs text-white/25 mt-0.5">{toggle.sub}</p>
                        </div>
                        <Toggle initial={toggle.on} />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* appearance */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden"
            >
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/5">
                <Palette size={14} className="text-white/40" />
                <h2 className="text-sm font-medium text-white/50">Appearance</h2>
              </div>
              <div className="px-5 py-4">
                <p className="text-xs text-white/35 mb-3">Accent color</p>
                <div className="flex gap-2">
                  {["bg-violet-500", "bg-blue-500", "bg-emerald-500", "bg-rose-500", "bg-orange-500"].map((color, i) => (
                    <button
                      key={i}
                      className={`w-6 h-6 rounded-full ${color} ${i === 0 ? "ring-2 ring-white/20 ring-offset-1 ring-offset-[#0a0a0f]" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* danger zone */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] overflow-hidden"
            >
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-red-500/10">
                <Shield size={14} className="text-red-400/50" />
                <h2 className="text-sm font-medium text-red-400/50">Danger Zone</h2>
              </div>
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/40">Delete account</p>
                  <p className="text-xs text-white/20 mt-0.5">This action cannot be undone</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-red-500/20 text-xs text-red-400/60 hover:bg-red-500/10 transition-colors">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>

          {/* save button */}
          <div className="mt-6 flex justify-end">
            <motion.button
              onClick={handleSave}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-500/20 border border-violet-500/30 text-sm text-violet-300 hover:bg-violet-500/30 transition-colors"
            >
              {saved ? <Check size={14} /> : null}
              {saved ? "Saved!" : "Save changes"}
            </motion.button>
          </div>

        </div>
      </main>
      <BottomNav />
    </div>
  )
}