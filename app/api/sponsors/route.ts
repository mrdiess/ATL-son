import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const sponsors =
      (data.isOrtaklari || []).map((logoUrl: string, index: number) => ({
        id: String(index + 1),
        name: `İş Ortağı ${index + 1}`,
        logo_url: logoUrl,          // 👈 ASIL EKSİK OLAN BUYDU
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
