import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const maintenance = process.env.MAINTENANCE === "true"

  if (maintenance && request.nextUrl.pathname !== "/bakim") {
    return NextResponse.rewrite(new URL("/bakim", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
