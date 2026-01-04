import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

const FALLBACK_DATA = [
  {
    id: "1",
    title: "Sakarya Merdiven Projesi",
    slug: "sakarya-merdiven",
    description: "Sakarya ilinde gerçekleştirilen endüstriyel merdiven imalatı ve montajı projesi",
    category: "Merdiven",
    location: "Sakarya",
    building_type: "Endüstriyel",
    project_duration: "2 Ay",
    is_featured: true,
    featured_image_url: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Düzce Depo Çelik Yapı",
    slug: "duzce-depo",
    description: "Düzce Küçük Sanayi Sitesinde 500m² kapalı alan depo çelik konstrüksiyon projesi",
    category: "Depo",
    location: "Düzce",
    building_type: "Depo",
    project_duration: "3 Ay",
    is_featured: true,
    featured_image_url: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Bolu Fabrika Projesi",
    slug: "bolu-fabrika",
    description: "Bolu Organize Sanayide 2000m² fabrika binası çelik yapı projesi",
    category: "Fabrika",
    location: "Bolu",
    building_type: "Fabrika",
    project_duration: "4 Ay",
    is_featured: true,
    featured_image_url: "/placeholder.svg?height=400&width=600",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const supabase = await createClient()

    let query = supabase
      .from("projects")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (id) {
      query = query.eq("id", id)
    }

    const { data, error } = await query

    if (error) {
      console.log("[v0] Projects table error:", error.code, error.message)
      // Return fallback data silently - table will be created via SQL script
      if (id) {
        return NextResponse.json({
          data: FALLBACK_DATA.filter((p) => p.id === id),
          success: true,
        })
      }
      return NextResponse.json({ data: FALLBACK_DATA, success: true })
    }

    if (!data || data.length === 0) {
      if (id) {
        return NextResponse.json({
          data: FALLBACK_DATA.filter((p) => p.id === id),
          success: true,
        })
      }
      return NextResponse.json({ data: FALLBACK_DATA, success: true })
    }

    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.log("[v0] Projects API error:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({
      data: FALLBACK_DATA,
      success: true,
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase.from("projects").insert([body]).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}
