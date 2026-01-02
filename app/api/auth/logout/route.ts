import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("adminSession")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 })
  }
}
