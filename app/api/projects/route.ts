import { NextResponse, type NextRequest } from "next/server"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzawjpexOQS2hitiOskEHmmbJ2jPWA5XGo6c0yle0eax8kxmwa3-Oe5PVYoGO6Vt38L/exec"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching projects from Google Apps Script...")

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "GET",
      cache: "no-store",
    })

    if (!response.ok) {
      console.error("[v0] Google Apps Script API error:", response.status)
      const fallbackProjects = [
        {
          id: "1",
          slug: "celik-yapilandirma",
          title: "Çelik Yapılandırma",
          description: "Modern çelik yapı projesi",
          category: "Çelik Yapı",
          location: "İstanbul",
          before: "https://via.placeholder.com/800x600?text=Öncesi",
          after: "https://via.placeholder.com/800x600?text=Sonrası",
          featured_image_url: "https://via.placeholder.com/800x600?text=Sonrası",
          is_active: true,
          sort_order: 1,
        },
      ]
      console.log("[v0] Using fallback projects due to API error")
      return NextResponse.json({ data: fallbackProjects, success: true })
    }

    let result
    try {
      result = await response.json()
    } catch (parseError) {
      console.error("[v0] Failed to parse Google Apps Script response:", parseError)
      return NextResponse.json(
        {
          data: [],
          success: false,
          error: "Invalid JSON response from Google Apps Script",
        },
        { status: 500 },
      )
    }

    console.log("[v0] Google Apps Script raw response:", JSON.stringify(result).substring(0, 200))

    const projectsArray = Array.isArray(result) ? result : result.data || result.projects || []
    console.log("[v0] Projects fetched from Google Apps Script:", projectsArray.length)

    // Normalize the response to match expected format
    const projects = projectsArray.map((project: any) => ({
      id: project.id || project.slug,
      slug: project.slug || project.title?.toLowerCase().replace(/\s+/g, "-"),
      title: project.title || project.name,
      description: project.description || null,
      category: project.category || "Genel",
      location: project.location || null,
      before: project.before || null,
      after: project.after || null,
      featured_image_url: project.featured_image_url || project.after || null,
      is_active: project.is_active !== false,
      sort_order: project.sort_order || 0,
    }))

    return NextResponse.json({ data: projects, success: true })
  } catch (error) {
    console.error("[v0] Projects API error:", error instanceof Error ? error.message : error)
    return NextResponse.json({
      data: [
        {
          id: "1",
          slug: "demo-project",
          title: "Demo Proje",
          description: "Demo proje",
          category: "Genel",
          location: "Konum",
          before: "https://via.placeholder.com/800x600?text=Öncesi",
          after: "https://via.placeholder.com/800x600?text=Sonrası",
          featured_image_url: "https://via.placeholder.com/800x600?text=Sonrası",
          is_active: true,
          sort_order: 1,
        },
      ],
      success: true,
    })
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: "POST not supported - frontend only" }, { status: 405 })
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ error: "PUT not supported - frontend only" }, { status: 405 })
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ error: "DELETE not supported - frontend only" }, { status: 405 })
}
