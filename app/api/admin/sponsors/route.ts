export const dynamic = "force-dynamic"

import { createAdminClient, createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("sponsors").select("*").order("sort_order", { ascending: true })

    if (error) {
      console.error("[v0] Sponsors query error:", error.message)
      return NextResponse.json([])
    }

    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error("[v0] Sponsors API error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  try {
    const sponsor = await request.json()
    const supabase = await createAdminClient()

    const { data, error } = await supabase.from("sponsors").insert(sponsor).select()

    if (error) throw error
    return NextResponse.json(data?.[0] || sponsor)
  } catch (error) {
    console.error("Add sponsor error:", error)
    return NextResponse.json({ error: "Sponsor eklenemedi" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const sponsor = await request.json()
    const supabase = await createAdminClient()

    const { data, error } = await supabase
      .from("sponsors")
      .update({ ...sponsor, updated_at: new Date().toISOString() })
      .eq("id", sponsor.id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    console.error("Update sponsor error:", error)
    return NextResponse.json({ error: "Sponsor güncellenemedi" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 })
    }

    const supabase = await createAdminClient()

    const { error } = await supabase.from("sponsors").delete().eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete sponsor error:", error)
    return NextResponse.json({ error: "Sponsor silinemedi" }, { status: 500 })
  }
}
