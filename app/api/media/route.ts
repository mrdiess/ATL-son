import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

const CATEGORY_CONFIG = [
  { key: "ferforje", label: "Ferforje", order: 1 },
  { key: "merdiven", label: "Merdiven", order: 2 },
]

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

    // 🔹 Sabit sıraya göre dolaş
    CATEGORY_CONFIG
      .sort((a, b) => a.order - b.order)
      .forEach((config) => {
        const files: string[] = galeri[config.key] || []

        files.forEach((url: string, index: number) => {
          gallery.push({
            id: `${config.key}-${index}`,
            url,
            category: config.label, // 👈 UI'de görünen isim
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
