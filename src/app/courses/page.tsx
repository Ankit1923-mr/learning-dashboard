import { createClient } from "@/lib/supabase/server"
import CoursesClient from "./CoursesClient"
import type { Course } from "@/lib/types"

export default async function CoursesPage() {
  const supabase = createClient()
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true })

  return <CoursesClient courses={(courses as Course[]) ?? []} />
}