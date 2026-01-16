import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const gallery = data.items
      .filter((item: any) => item.section === "GALERI")
      .map((item: any) => ({
        id: item.id,
        url: item.url,
        category: item.category,
        file_type: item.mimeType,
        created_at: item.createdTime,
      }))

    return NextResponse.json({ data: gallery })
  } catch (error) {
    console.error("Media API error:", error)
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}
