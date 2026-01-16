import { createAdminClient } from "@/lib/supabase/admin"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Tüm alanlar gerekli" }, { status: 400 })
    }

    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database bağlantı hatası" }, { status: 500 })
    }

    // Insert into contact_submissions table
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone,
        message,
        is_read: false,
      })
      .select()

    if (error) {
      console.error("Contact submission error:", error)
      return NextResponse.json({ error: "Teklif formu gönderilemedi" }, { status: 500 })
    }

    return NextResponse.json({ message: "Teklif formu başarıyla gönderildi", data }, { status: 201 })
  } catch (error) {
    console.error("Contact API error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

// GET endpoint - Admin paneli için teklif listesini getir
export async function GET() {
  try {
    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database bağlantı hatası" }, { status: 500 })
    }

    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Teklif listesi alınamadı" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Contact GET error:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
