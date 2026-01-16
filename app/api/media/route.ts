import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const gallery: {
      id: string
      url: string
      category: string
      file_type: string
      created_at: string
    }[] = []

    const galeri = data.galeri || {}

    Object.keys(galeri).forEach((category: string) => {
      const files: string[] = galeri[category]

      files.forEach((url: string, index: number) => {
        gallery.push({
          id: `${category}-${index}`,
          url,
          category,
          file_type: "image/jpeg",
          created_at: new Date().toISOString(),
        })
      })
    })

    return NextResponse.json({ data: gallery })
  } catch (error) {
    console.error("Media API error:", error)
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}
