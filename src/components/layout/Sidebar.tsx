"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, BookOpen, BarChart2,
  Settings, ChevronLeft, GraduationCap
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Courses", icon: BookOpen, href: "/courses" },
  { label: "Progress", icon: BarChart2, href: "/progress" },
  { label: "Settings", icon: Settings, href: "/settings" },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.nav
      animate={{ width: collapsed ? 60 : 216 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex relative flex-col h-screen border-r border-white/5 bg-[#0a0a0f] px-2.5 py-5 shrink-0 overflow-hidden"
    >
      {/* logo */}
      <div className="flex items-center gap-2.5 px-1.5 mb-8 h-8">
        <div className="w-7 h-7 rounded-lg bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
          <GraduationCap size={13} className="text-violet-400" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="text-sm font-semibold text-white/75 whitespace-nowrap"
            >
              LearnOS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* nav */}
      <ul className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-xl bg-white/5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-violet-400 rounded-full" />
                )}
                <Icon
                  size={15}
                  className={`relative z-10 shrink-0 transition-colors duration-200 ${
                    isActive ? "text-violet-400" : "text-white/25 group-hover:text-white/40"
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      className={`relative z-10 whitespace-nowrap text-sm transition-colors duration-200 ${
                        isActive ? "text-white/75 font-medium" : "text-white/25"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* user area */}
      <div className="mb-3">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 px-2 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] mb-2"
            >
              <div className="w-6 h-6 rounded-full bg-violet-500/30 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-semibold text-violet-300">A</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white/60 truncate">Alex Johnson</p>
                <p className="text-[10px] text-white/25 truncate">Pro Plan</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center h-8 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ChevronLeft size={13} className="text-white/25" />
          </motion.div>
        </button>
      </div>
    </motion.nav>
  )
}