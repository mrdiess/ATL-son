import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    if (!supabase) {
      console.error("[v0] Supabase client initialization failed - returning fallback data")
      return NextResponse.json(
        {
          data: [
            {
              id: "demo-1",
              title: "Depo Yapısı - İzmir",
              slug: "depo-yapisi-izmir",
              description: "Modern depo yapısı inşaatı",
              category: "Depo",
              location: "İzmir",
              is_active: true,
              sort_order: 1,
            },
          ],
          success: true,
          warning: "Using demo data",
        },
        { status: 200 },
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    let query = supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })

    if (id) {
      query = query.eq("id", id)
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Projects fetch error:", error)
      return NextResponse.json({ error: error.message, data: [] }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], success: true })
  } catch (error) {
    console.error("[v0] Projects API error:", error)
    return NextResponse.json({ error: "Sunucu hatası", data: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase bağlantısı yapılamadı" }, { status: 503 })
    }

    const body = await request.json()

    const { title, slug, description, category, location, client_name, featured_image_url, is_active, sort_order } =
      body

    if (!title) {
      return NextResponse.json({ error: "Proje adı gereklidir" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
          description: description || null,
          category: category || "Genel",
          location: location || null,
          client_name: client_name || null,
          featured_image_url: featured_image_url || null,
          is_active: is_active !== undefined ? is_active : true,
          sort_order: sort_order || 0,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("[v0] Project insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, success: true }, { status: 201 })
  } catch (error) {
    console.error("[v0] Project POST error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID gereklidir" }, { status: 400 })
    }

    const body = await request.json()

    const { data, error } = await supabase
      .from("projects")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Project update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[v0] Project PUT error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createAdminClient()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID gereklidir" }, { status: 400 })
    }

    // First delete related steps and photos
    await supabase.from("project_photos").delete().eq("project_step_id", id)
    await supabase.from("project_steps").delete().eq("project_id", id)

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("[v0] Project delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Project DELETE error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
