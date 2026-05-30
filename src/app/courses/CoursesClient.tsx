"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import { Search, Filter, BookOpen, Clock, CheckCircle } from "lucide-react"
import ProgressBar from "@/components/ui/ProgressBar"
import Sidebar from "@/components/layout/Sidebar"
import BottomNav from "@/components/layout/BottomNav"
import type { Course } from "@/lib/types"

const filters = ["All", "In Progress", "Completed", "Not Started"]

const barColors: Record<number, string> = {
  0: "from-violet-500 to-purple-400",
  1: "from-blue-500 to-cyan-400",
  2: "from-emerald-500 to-teal-400",
  3: "from-rose-500 to-pink-400",
}

const gradients: Record<number, string> = {
  0: "from-violet-500/10 via-transparent to-transparent",
  1: "from-blue-500/10 via-transparent to-transparent",
  2: "from-emerald-500/10 via-transparent to-transparent",
  3: "from-rose-500/10 via-transparent to-transparent",
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
}

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")

  const filtered = courses.filter((c) => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "Completed" && c.progress === 100) ||
      (activeFilter === "Not Started" && c.progress === 0) ||
      (activeFilter === "In Progress" && c.progress > 0 && c.progress < 100)
    return matchSearch && matchFilter
  })

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">

          {/* header */}
          <header className="mb-8">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Library</p>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white/80">Your Courses</h1>
              <div className="flex items-center gap-2 text-xs text-white/30">
                <BookOpen size={13} />
                <span>{courses.length} total</span>
              </div>
            </div>
          </header>

          {/* search + filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white/70 placeholder:text-white/20 outline-none focus:border-white/10 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <Filter size={13} className="text-white/25 shrink-0" />
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`relative px-3 py-2 rounded-lg text-xs transition-colors ${
                    activeFilter === f ? "text-white/80" : "text-white/30 hover:text-white/50"
                  }`}
                >
                  {activeFilter === f && (
                    <motion.div
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-lg bg-white/5"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              ))}
            </div>
          </div>

          {/* stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "In Progress", value: courses.filter(c => c.progress > 0 && c.progress < 100).length, icon: Clock, color: "text-blue-400" },
              { label: "Completed", value: courses.filter(c => c.progress === 100).length, icon: CheckCircle, color: "text-emerald-400" },
              { label: "Total Hours", value: "24h", icon: BookOpen, color: "text-violet-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
              >
                <stat.icon size={15} className={`${stat.color} mb-3`} />
                <p className="text-xl font-semibold text-white/80">{stat.value}</p>
                <p className="text-xs text-white/30 mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* course grid */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-10 text-center">
              <p className="text-sm text-white/30">No courses match your search.</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              {filtered.map((course, i) => {
                const iconKey = course.icon_name as keyof typeof Icons
                const Icon = (Icons[iconKey] as React.ElementType) ?? Icons.BookOpen

                return (
                  <motion.article
                    key={course.id}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative rounded-2xl border border-white/5 bg-white/[0.03] p-5 overflow-hidden group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % 4]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="p-2 rounded-xl bg-white/5">
                          <Icon size={16} className="text-white/60" />
                        </div>
                        <span className={`text-xs font-medium tabular-nums ${
                          course.progress === 100 ? "text-emerald-400" : "text-white/30"
                        }`}>
                          {course.progress}%
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-white/80 mb-1">{course.title}</h3>
                      <p className="text-xs text-white/30 mb-5">
                        {course.progress === 100 ? "Completed" : course.progress === 0 ? "Not started" : "In progress"}
                      </p>
                      <ProgressBar value={course.progress} color={barColors[i % 4]} />
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}