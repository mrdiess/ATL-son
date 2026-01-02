import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse, type NextRequest } from "next/server"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("videos").select("*").order("sort_order", { ascending: true })

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Videos fetched successfully:", data?.length)
    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const { title, youtube_url, category, sort_order, is_active } = body

    console.log("[v0] Video POST received:", { title, youtube_url, category, is_active })

    if (!title || !youtube_url) {
      return NextResponse.json({ error: "Başlık ve YouTube URL gereklidir" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("videos")
      .insert([
        {
          title,
          youtube_url,
          category: category || "Üretim",
          sort_order: sort_order || 0,
          is_active: is_active !== undefined ? is_active : true,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Video insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Video created successfully:", data)
    return NextResponse.json({ data, success: true }, { status: 201 })
  } catch (error) {
    console.error("[v0] Video POST error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID gereklidir" }, { status: 400 })
    }

    const { title, youtube_url, category, sort_order, is_active } = body

    const { data, error } = await supabase
      .from("videos")
      .update({
        title,
        youtube_url,
        category,
        sort_order,
        is_active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Video updated:", data)
    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID gereklidir" }, { status: 400 })
    }

    const { error } = await supabase.from("videos").delete().eq("id", id)

    if (error) {
      console.error("[v0] Delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Video deleted:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}
