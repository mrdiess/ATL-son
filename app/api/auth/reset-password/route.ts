import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { AUTH_CONFIG, setPassword } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { code, newPassword } = await request.json()

    if (code !== AUTH_CONFIG.resetCode) {
      return NextResponse.json({ message: "Geçersiz sıfırlama kodu" }, { status: 400 })
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ message: "Şifre en az 6 karakter olmalıdır" }, { status: 400 })
    }

    setPassword(newPassword)

    const cookieStore = await cookies()
    cookieStore.set("adminSession", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    })

    return NextResponse.json({ success: true, message: "Şifre başarıyla sıfırlandı" })
  } catch (error) {
    return NextResponse.json({ message: "Bir hata oluştu" }, { status: 500 })
  }
}
