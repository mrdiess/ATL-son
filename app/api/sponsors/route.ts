import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse, type NextRequest } from "next/server"

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase.from("sponsors").select("*").order("sort_order", { ascending: true })

    if (error) {
      console.error("[v0] Sponsors fetch error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Sponsors fetched:", data?.length)
    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[v0] Sponsors error:", error)
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

    const { name, logo_url, website_url, sort_order, is_active } = body

    console.log("[v0] Sponsor POST received:", { name, logo_url, is_active })

    if (!name || !logo_url) {
      return NextResponse.json({ error: "Ad ve logo URL gereklidir" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("sponsors")
      .insert([
        {
          name,
          logo_url,
          website_url: website_url || null,
          sort_order: sort_order || 0,
          is_active: is_active !== undefined ? is_active : true,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Sponsor insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Sponsor created successfully:", data)
    return NextResponse.json({ data, success: true }, { status: 201 })
  } catch (error) {
    console.error("[v0] Sponsor POST error:", error)
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

    const { name, logo_url, website_url, sort_order, is_active } = body

    const { data, error } = await supabase
      .from("sponsors")
      .update({
        name,
        logo_url,
        website_url,
        sort_order,
        is_active,
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Sponsor update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Sponsor updated:", data)
    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[v0] Sponsor PUT error:", error)
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

    const { error } = await supabase.from("sponsors").delete().eq("id", id)

    if (error) {
      console.error("[v0] Sponsor delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Sponsor deleted:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Sponsor DELETE error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}
