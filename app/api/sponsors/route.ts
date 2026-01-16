import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const sponsors =
      (data.isOrtaklari || []).map((item: any, index: number) => ({
        id: String(index + 1),
        name: item.name || `İş Ortağı ${index + 1}`,
        logo_url: item.logo,          // 👈 UI bunu kullanıyor
        website_url: item.website || undefined,
        sort_order: index + 1,
      })) || []

    return NextResponse.json({
      data: sponsors,
    })
  } catch (error) {
    console.error("Sponsors API error:", error)
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}
