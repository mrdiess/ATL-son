import { createAdminClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Kullanıcı adı ve şifre gereklidir" }, { status: 400 })
    }

    const supabase = await createAdminClient()

    // Try to get user from database
    const { data: user, error } = await supabase.from("admin_users").select("*").eq("username", username).single()

    // If table doesn't exist or other error, use test credentials
    if (error) {
      console.log("[v0] Admin user query error:", error.message)
      if (username === "admin" && password === "admin123") {
        const sessionData = {
          id: "admin-001",
          username: "admin",
          name: "Admin",
          role: "admin",
        }

        const cookieStore = await cookies()
        cookieStore.set("admin_session", JSON.stringify(sessionData), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
        })

        return NextResponse.json({
          success: true,
          user: sessionData,
        })
      }
      return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı" }, { status: 401 })
    }

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı" }, { status: 401 })
    }

    // Simple password check (in production use bcrypt)
    if (user.password_hash !== password) {
      return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı" }, { status: 401 })
    }

    // Update last login
    await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    // Log activity
    await supabase.from("activity_logs").insert({
      user_id: user.id,
      user_name: user.name,
      user_role: user.role,
      action: "Giriş Yapıldı",
      action_type: "login",
      details: `${user.name} admin paneline giriş yaptı`,
    })

    // Set session cookie
    const cookieStore = await cookies()
    const sessionData = {
      id: user.id,
      username: user.username,
      name: user.name || user.username,
      role: user.role || "admin",
    }

    cookieStore.set("admin_session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({
      success: true,
      user: sessionData,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
