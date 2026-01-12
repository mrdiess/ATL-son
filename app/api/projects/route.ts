import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "demo-1",
        title: "Depo Yapısı - İzmir",
        before: "/projects/proje1/before.jpg",
        after: "/projects/proje1/after.jpg",
      },
    ],
    warning: "mock data (drive kapalı)",
  })
}
