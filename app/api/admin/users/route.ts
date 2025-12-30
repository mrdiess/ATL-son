export const dynamic = "force-dynamic"

import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

// Get all users
export async function GET() {
  try {
    const supabase = await createServerClient()

    const { data: users, error } = await supabase
      .from("admin_users")
      .select("id, username, email, name, role, last_login, created_at")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(users || [])
  } catch (error) {
    console.error("[v0] Get users error:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// Update user (with super admin protection)
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const body = await request.json()
    const { id, username, email, name, role, currentUserId } = body

    // Prevent modifying super admin (first created user with ID check)
    const { data: superAdmin } = await supabase
      .from("admin_users")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .single()

    if (superAdmin && id === superAdmin.id && id !== currentUserId) {
      return NextResponse.json({ error: "Cannot modify super admin account" }, { status: 403 })
    }

    const { error } = await supabase
      .from("admin_users")
      .update({ username, email, name, role, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Update user error:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Delete user (with super admin protection)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const currentUserId = searchParams.get("currentUserId")

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    // Prevent deleting super admin
    const { data: superAdmin } = await supabase
      .from("admin_users")
      .select("id")
      .order("created_at", { ascending: true })
      .limit(1)
      .single()

    if (superAdmin && id === superAdmin.id) {
      return NextResponse.json({ error: "Cannot delete super admin account" }, { status: 403 })
    }

    // Prevent self-deletion
    if (id === currentUserId) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 403 })
    }

    const { error } = await supabase.from("admin_users").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Delete user error:", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
