import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = (formData.get("category") as string) || "Tümü"

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 })
    }

    const supabase = await createClient()

    const fileExt = file.name.split(".").pop()?.toLowerCase()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("media").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (uploadError) {
      console.error("[v0] Storage upload error:", uploadError)
      return NextResponse.json({ error: "Dosya yüklenemedi: " + uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(filePath)
    const publicUrl = publicUrlData.publicUrl

    // Save to database with proper error handling
    const { data: mediaData, error: dbError } = await supabase
      .from("media")
      .insert({
        filename: file.name,
        url: publicUrl,
        file_type: file.type,
        category: category === "Tümü" ? "Genel" : category,
        size: file.size,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error("[v0] Database insert error:", dbError)
      // Delete uploaded file if DB insert fails
      await supabase.storage.from("media").remove([filePath])
      return NextResponse.json({ error: "Veritabanına kaydedilemedi: " + dbError.message }, { status: 500 })
    }

    // Log activity
    try {
      await supabase.from("activity_logs").insert({
        action: "media_upload",
        details: `Dosya yüklendi: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
      })
    } catch (logError) {
      console.error("[v0] Activity log error:", logError)
      // Don't fail the whole request if logging fails
    }

    console.log("[v0] Media uploaded successfully:", mediaData)
    return NextResponse.json({ success: true, data: mediaData })
  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Sunucu hatası: " + (error instanceof Error ? error.message : "Bilinmeyen hata") },
      { status: 500 },
    )
  }
}
