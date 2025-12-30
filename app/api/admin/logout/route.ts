import { createAdminClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("admin_session")

    if (sessionCookie) {
      const session = JSON.parse(sessionCookie.value)
      const supabase = await createAdminClient()

      // Log activity
      await supabase.from("activity_logs").insert({
        user_id: session.id,
        user_name: session.name,
        user_role: session.role,
        action: "Çıkış Yapıldı",
        action_type: "logout",
        details: `${session.name} admin panelinden çıkış yaptı`,
      })
    }

    // Clear session cookie
    cookieStore.delete("admin_session")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
