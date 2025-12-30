export const dynamic = "force-dynamic"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    },
  )

  try {
    const { data, error } = await supabase.from("media").select("*").order("uploaded_at", { ascending: false })

    if (error) {
      console.log("[v0] Supabase returned error - table may not exist yet")
      // Return empty array if table doesn't exist or any error occurs
      return NextResponse.json([], { status: 200 })
    }

    // Ensure data is always an array
    return NextResponse.json(Array.isArray(data) ? data : [], { status: 200 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.log("[v0] Media API catch block:", errorMessage)

    // If we get a JSON parse error, it means we got HTML instead of JSON
    // This typically happens when the table doesn't exist
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    },
  )

  try {
    const body = await request.json()
    const { name, url, type, category, size, alt } = body

    const { data, error } = await supabase
      .from("media")
      .insert([
        {
          name,
          url,
          type,
          category,
          size,
          alt,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data?.[0] || { name, url })
  } catch (error) {
    console.error("[v0] Error creating media:", error instanceof Error ? error.message : String(error))
    return NextResponse.json({ error: "Failed to create media" }, { status: 500 })
  }
}
