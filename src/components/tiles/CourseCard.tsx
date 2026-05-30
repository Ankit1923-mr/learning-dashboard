"use client"

import { motion } from "framer-motion"
import * as Icons from "lucide-react"
import ProgressBar from "@/components/ui/ProgressBar"
import type { Course } from "@/lib/types"

const gradients: Record<number, string> = {
  0: "from-violet-500/10 via-transparent to-transparent",
  1: "from-blue-500/10 via-transparent to-transparent",
  2: "from-emerald-500/10 via-transparent to-transparent",
  3: "from-rose-500/10 via-transparent to-transparent",
}

const barColors: Record<number, string> = {
  0: "from-violet-500 to-purple-400",
  1: "from-blue-500 to-cyan-400",
  2: "from-emerald-500 to-teal-400",
  3: "from-rose-500 to-pink-400",
}

interface Props {
  course: Course
  index: number
}

export default function CourseCard({ course, index }: Props) {
  const iconKey = course.icon_name as keyof typeof Icons
  const Icon = (Icons[iconKey] as React.ElementType) ?? Icons.BookOpen

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="grain relative rounded-2xl border border-white/5 bg-white/[0.03] p-5 overflow-hidden group cursor-pointer"
    >
      {/* gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % 4]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* glow border on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="p-2 rounded-xl bg-white/5">
            <Icon size={18} className="text-white/70" />
          </div>
          <span className="text-xs text-white/30 font-medium tabular-nums">
            {course.progress}%
          </span>
        </div>

        <h3 className="text-sm font-medium text-white/80 mb-1 leading-snug">
          {course.title}
        </h3>
        <p className="text-xs text-white/30 mb-5">In progress</p>

        <ProgressBar value={course.progress} color={barColors[index % 4]} />
      </div>
    </motion.article>
  )
}