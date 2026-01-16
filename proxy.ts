import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const maintenance = process.env.MAINTENANCE === "true"
  if (maintenance && path !== "/bakim" && !path.startsWith("/_next")) {
    return NextResponse.rewrite(new URL("/bakim", request.url))
  }

  // Admin paneline erişim kontrolü
  if (path.startsWith("/admin")) {
    const session = request.cookies.get("adminSession")

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Login sayfasına oturum açmış kullanıcı erişirse admin paneline yönlendir
  if (path === "/login") {
    const session = request.cookies.get("adminSession")
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/((?!_next/static|_next/image|favicon.ico).*)"],
}
