import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { validateCredentials } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!validateCredentials(username, password)) {
      return NextResponse.json({ message: "Kullanıcı adı veya şifre hatalı" }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set("adminSession", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 500 })
  }
}
