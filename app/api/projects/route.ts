import { NextResponse, type NextRequest } from "next/server"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiB0EEyK59Hc-7e-8OYone5AXsxDng7uzM2naJx-53JOYa1QnWJcq4glXCRC7y-I7hDarpZEApTOkmMG7yZWqnwlN0v0kk-OISYAOc4CWufScygYVSXOuD08WwwlZ5MKw3uRuAEIkeEjHJOdgLfas7GrpENDGP3JDW_Jn7Jhc1lIi1_s0yI5iYKi7snAE8bai8f80CtgIkWdfesCQnIH8EgSbbLKbeONdpgP5Y4xXy1j8Sl5j29my6xgCaF74bfS6XC3WRyBzRIahkG_H67m628y8QQww&lib=MgeQSX0wZzblU_U4f4EVxvMawggDRzBb0"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching projects from Google Apps Script...")

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    })

    if (!response.ok) {
      // Media API'den görselleri çekerek fallback data'ya ekliyoruz
      let mediaItems = []
      try {
        const mediaRes = await fetch(new URL("/api/media", request.url), {
          cache: "no-store",
        })
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json()
          mediaItems = Array.isArray(mediaData.data) ? mediaData.data : mediaData.media || []
        }
      } catch (err) {
        console.log("[v0] Could not fetch media for projects")
      }

      const fallbackProjects = [
        {
          id: "1",
          slug: "proje-1",
          title: "Proje 1",
          description: "Google Drive Projesi",
          category: "Çelik Yapı",
          location: "İstanbul",
          before: mediaItems[0]?.url || null,
          after: mediaItems[1]?.url || null,
          featured_image_url: mediaItems[1]?.url || null,
          is_active: true,
          sort_order: 1,
        },
        {
          id: "2",
          slug: "proje-2",
          title: "Proje 2",
          description: "Google Drive Projesi",
          category: "Merdiven",
          location: "Ankara",
          before: mediaItems[2]?.url || null,
          after: mediaItems[3]?.url || null,
          featured_image_url: mediaItems[3]?.url || null,
          is_active: true,
          sort_order: 2,
        },
      ]

      console.log("[v0] Using projects with media images")
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
    let mediaItems = []
    try {
      const mediaRes = await fetch(new URL("/api/media", request.url), {
        cache: "no-store",
      })
      if (mediaRes.ok) {
        const mediaData = await mediaRes.json()
        mediaItems = Array.isArray(mediaData.data) ? mediaData.data : mediaData.media || []
      }
    } catch (err) {
      console.log("[v0] Could not fetch media for projects")
    }

    const fallbackProjects = [
      {
        id: "1",
        slug: "proje-1",
        title: "Proje 1",
        description: "Google Drive Projesi",
        category: "Çelik Yapı",
        location: "İstanbul",
        before: mediaItems[0]?.url || null,
        after: mediaItems[1]?.url || null,
        featured_image_url: mediaItems[1]?.url || null,
        is_active: true,
        sort_order: 1,
      },
      {
        id: "2",
        slug: "proje-2",
        title: "Proje 2",
        description: "Google Drive Projesi",
        category: "Merdiven",
        location: "Ankara",
        before: mediaItems[2]?.url || null,
        after: mediaItems[3]?.url || null,
        featured_image_url: mediaItems[3]?.url || null,
        is_active: true,
        sort_order: 2,
      },
    ]

    console.log("[v0] Using projects with media images")
    return NextResponse.json({ data: fallbackProjects, success: true })
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
