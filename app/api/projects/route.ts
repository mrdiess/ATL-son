import { NextResponse } from "next/server"

const DRIVE_API_URL = process.env.DRIVE_API_URL!

export async function GET() {
  try {
    const res = await fetch(DRIVE_API_URL, { cache: "no-store" })
    const data = await res.json()

    const projects = data.items
      .filter((item: any) => item.section === "PROJELER")
      .map((item: any) => ({
        id: item.project,
        title: item.project,
        slug: item.project,
        before: item.before,
        after: item.after,
        is_featured: true,
      }))

    return NextResponse.json({ data: projects })
  } catch (error) {
    console.error("Projects API error:", error)
    return NextResponse.json({ data: [] }, { status: 500 })
  }
}
