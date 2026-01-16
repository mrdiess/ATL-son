import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const sponsors = data.items
      .filter((item: any) => item.section === "ISORTAKLARI")
      .map((item: any, index: number) => ({
        id: index,
        name: item.name,
        logo_url: item.url,
        sort_order: index,
      }))

    return NextResponse.json({ data: sponsors })
  } catch (error) {
    console.error("Sponsors API error:", error)
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}
