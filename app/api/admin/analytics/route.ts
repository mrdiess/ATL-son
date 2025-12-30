import { createAdminClient, createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const days = Number.parseInt(searchParams.get("days") || "30")

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get analytics data
    const { data: analytics, error } = await supabase
      .from("site_analytics")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false })

    if (error) throw error

    // Calculate stats
    const totalVisits = analytics?.length || 0
    const uniqueVisitors = new Set(analytics?.map((a) => a.visitor_id)).size
    const pageViews: Record<string, number> = {}
    const deviceTypes: Record<string, number> = {}
    const dailyVisits: Record<string, number> = {}

    analytics?.forEach((item) => {
      // Page views
      pageViews[item.page_path] = (pageViews[item.page_path] || 0) + 1

      // Device types
      if (item.device_type) {
        deviceTypes[item.device_type] = (deviceTypes[item.device_type] || 0) + 1
      }

      // Daily visits
      const day = new Date(item.created_at).toISOString().split("T")[0]
      dailyVisits[day] = (dailyVisits[day] || 0) + 1
    })

    return NextResponse.json({
      totalVisits,
      uniqueVisitors,
      pageViews,
      deviceTypes,
      dailyVisits,
      recentVisits: analytics?.slice(0, 50) || [],
    })
  } catch (error) {
    console.error("Get analytics error:", error)
    return NextResponse.json({ error: "Analitikler alınamadı" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = await createAdminClient()

    const { error } = await supabase.from("site_analytics").insert({
      page_path: data.page_path,
      visitor_id: data.visitor_id,
      referrer: data.referrer,
      user_agent: data.user_agent,
      device_type: data.device_type,
      browser: data.browser,
    })

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Track analytics error:", error)
    return NextResponse.json({ error: "Analitik kaydedilemedi" }, { status: 500 })
  }
}
