import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    )
  }
  return supabaseClient
}

export async function uploadImage(file: File, bucket = "media"): Promise<string | null> {
  try {
    const supabase = getSupabaseClient()
    const filename = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage.from(bucket).upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("[v0] Upload error:", error)
      return null
    }

    const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path)

    return publicData.publicUrl
  } catch (error) {
    console.error("[v0] Upload failed:", error)
    return null
  }
}

export async function getImageUrl(path: string, bucket = "media"): Promise<string> {
  const supabase = getSupabaseClient()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteImage(path: string, bucket = "media"): Promise<boolean> {
  try {
    const supabase = getSupabaseClient()
    const { error } = await supabase.storage.from(bucket).remove([path])
    return !error
  } catch (error) {
    console.error("[v0] Delete failed:", error)
    return false
  }
}
