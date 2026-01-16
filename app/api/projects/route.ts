import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const projects = (data.projeler || []).map((p: any) => ({
      id: p.slug,
      title: p.slug,
      slug: p.slug,
      before: p.before,
      after: p.after,
      is_featured: true,
    }))

    return NextResponse.json({ data: projects })
  } catch (error) {
    console.error("Projects API error:", error)
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}
