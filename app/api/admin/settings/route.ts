import { createAdminClient, createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("site_settings").select("*")

    if (error) {
      console.error("[v0] Get settings error:", error.message)
      return NextResponse.json(
        {
          theme: "light",
          company_name: "ATL Çelik Yapı",
          logo_url: "/logo.svg",
          favicon_url: "/icon.svg",
        },
        { status: 200 },
      )
    }

    // Convert array to object
    const settings: Record<string, string> = {}
    data?.forEach((item: { key: string; value: string }) => {
      settings[item.key] = item.value
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("[v0] Get settings error:", error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      {
        theme: "light",
        company_name: "ATL Çelik Yapı",
        logo_url: "/logo.svg",
        favicon_url: "/icon.svg",
      },
      { status: 200 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()
    const supabase = await createAdminClient()

    const valueToStore = typeof value === "string" ? value : JSON.stringify(value)

    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, value: valueToStore, updated_at: new Date().toISOString() }, { onConflict: "key" })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Save settings error:", error)
    return NextResponse.json({ error: "Ayarlar kaydedilemedi" }, { status: 500 })
  }
}
