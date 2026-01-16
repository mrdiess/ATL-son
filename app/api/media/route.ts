import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Database error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Media fetched successfully:", data?.length)
    return NextResponse.json({ data, success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: mediaItem, error: fetchError } = await supabase
      .from("media")
      .select("url, filename")
      .eq("id", id)
      .single()

    if (fetchError) {
      console.error("[v0] Fetch error:", fetchError)
      return NextResponse.json({ error: "Medya bulunamadı" }, { status: 404 })
    }

    // Delete from storage if exists
    if (mediaItem?.url) {
      try {
        const filePath = mediaItem.url.split("/media/")[1]
        if (filePath) {
          console.log("[v0] Deleting file from storage:", filePath)
          await supabase.storage.from("media").remove([filePath])
        }
      } catch (storageError) {
        console.error("[v0] Storage delete error:", storageError)
        // Continue with DB delete even if storage delete fails
      }
    }

    // Delete from database
    const { error: deleteError } = await supabase.from("media").delete().eq("id", id)

    if (deleteError) {
      console.error("[v0] Database delete error:", deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Log activity
    try {
      await supabase.from("activity_logs").insert({
        action: "media_delete",
        details: `Dosya silindi: ${mediaItem?.filename || id}`,
      })
    } catch (logError) {
      console.error("[v0] Activity log error:", logError)
    }

    console.log("[v0] Media deleted successfully:", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}
