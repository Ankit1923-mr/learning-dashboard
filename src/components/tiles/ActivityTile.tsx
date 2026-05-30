"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const intensityClass: Record<number, string> = {
  0: "bg-white/[0.04]",
  1: "bg-violet-500/25",
  2: "bg-violet-500/50",
  3: "bg-violet-500/80",
}

const WEEKS = 12
const DAYS = 7

export default function ActivityTile() {
  const [grid, setGrid] = useState<number[][]>([])

  useEffect(() => {
    const generated = Array.from({ length: WEEKS }, (_, wi) =>
      Array.from({ length: DAYS }, (_, di) => {
        // make recent weeks denser
        const recency = wi / WEEKS
        const rand = Math.random()
        if (rand < 0.25 - recency * 0.1) return 0
        if (rand < 0.5) return 1
        if (rand < 0.75) return 2
        return 3
      })
    )
    setGrid(generated)
  }, [])

  const totalActive = grid.flat().filter((v) => v > 0).length

  return (
    <motion.section
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-white/60">Activity</h2>
        <span className="text-xs text-white/25">Last 12 weeks</span>
      </div>

      {/* day labels */}
      <div className="flex gap-[3px] mb-1 pl-0">
        {Array.from({ length: WEEKS }).map((_, i) => (
          <div key={i} className="flex-1" />
        ))}
      </div>

      <div className="flex gap-[3px]">
        {grid.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px] flex-1">
            {week.map((day, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: wi * 0.025 + di * 0.008,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className={`w-full aspect-square rounded-[2px] ${intensityClass[day]}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04]">
        <span className="text-xs text-white/25">
          <span className="text-white/50 font-medium">{totalActive}</span> active days
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-white/20 mr-1">Less</span>
          {[0, 1, 2, 3].map((v) => (
            <div key={v} className={`w-2 h-2 rounded-[2px] ${intensityClass[v]}`} />
          ))}
          <span className="text-[10px] text-white/20 ml-1">More</span>
        </div>
      </div>
    </motion.section>
  )
}