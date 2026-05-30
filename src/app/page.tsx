import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import Sidebar from "@/components/layout/Sidebar"
import BottomNav from "@/components/layout/BottomNav"
import BentoGrid from "@/components/ui/BentoGrid"
import HeroTile from "@/components/tiles/HeroTile"
import CourseCard from "@/components/tiles/CourseCard"
import ActivityTile from "@/components/tiles/ActivityTile"
import SkeletonCard from "@/components/tiles/SkeletonCard"
import type { Course } from "@/lib/types"

async function CourseGrid() {
  const supabase = createClient()

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    return (
      <div className="col-span-3 rounded-2xl border border-red-500/10 bg-red-500/5 p-5 text-sm text-red-400/70">
        Couldn't load courses right now. Try refreshing.
      </div>
    )
  }

  return (
    <>
      {(courses as Course[]).map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </>
  )
}

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
          <header className="mb-6">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Dashboard</p>
          </header>

          <BentoGrid>
            <HeroTile />
            <ActivityTile />
            <Suspense
              fallback={
                <>
                  {[...Array(4)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </>
              }
            >
              <CourseGrid />
            </Suspense>
          </BentoGrid>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}