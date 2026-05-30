"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface Props {
  value: number
  color?: string
}

export default function ProgressBar({ value, color = "from-violet-500 to-blue-500" }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start({ width: `${value}%` })
    }
  }, [inView, value, controls])

  return (
    <div ref={ref} className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={controls}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  )
}