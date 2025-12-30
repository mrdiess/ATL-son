import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Get activity logs error:", error)
    return NextResponse.json({ error: "Loglar alınamadı" }, { status: 500 })
  }
}
