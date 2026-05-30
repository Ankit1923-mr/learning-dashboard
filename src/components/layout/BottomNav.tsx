"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, BarChart2, Settings } from "lucide-react"
import Link from "next/link"

const items = [
  { label: "Home", icon: LayoutDashboard, href: "/" },
  { label: "Courses", icon: BookOpen, href: "/courses" },
  { label: "Progress", icon: BarChart2, href: "/progress" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export default function BottomNav() {
  const [active, setActive] = useState("/")

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl z-50">
      <ul className="flex">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.href

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                onClick={() => setActive(item.href)}
                className="flex flex-col items-center gap-1 py-3 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-pill"
                    className="absolute top-1.5 w-8 h-0.5 bg-violet-400 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className={isActive ? "text-violet-400" : "text-white/25"} />
                <span className={`text-[10px] ${isActive ? "text-violet-400" : "text-white/25"}`}>
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}