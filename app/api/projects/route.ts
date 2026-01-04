import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, location, description } = body;

    if (!title || !location) {
      return NextResponse.json(
        { error: "Eksik alanlar" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          location,
          description,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
