import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("project_id")

    let query = supabase
      .from("project_steps")
      .select(`
        *,
        project_photos (
          id,
          photo_url,
          caption,
          sort_order
        )
      `)
      .order("step_number", { ascending: true })

    if (projectId) {
      query = query.eq("project_id", projectId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Project steps fetch error:", error)
      return NextResponse.json({ error: error.message, data: [] }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], success: true })
  } catch (error) {
    console.error("Project steps API error:", error)
    return NextResponse.json({ error: "Sunucu hatası", data: [] }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const { project_id, step_number, title, description } = body

    if (!project_id || !title) {
      return NextResponse.json({ error: "Proje ID ve başlık gereklidir" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("project_steps")
      .insert([
        {
          project_id,
          step_number: step_number || 1,
          title,
          description: description || null,
          sort_order: step_number || 1,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Project step insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data, success: true }, { status: 201 })
  } catch (error) {
    console.error("Project step POST error:", error)
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

    // First delete related photos
    await supabase.from("project_photos").delete().eq("project_step_id", id)

    const { error } = await supabase.from("project_steps").delete().eq("id", id)

    if (error) {
      console.error("Project step delete error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Project step DELETE error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
