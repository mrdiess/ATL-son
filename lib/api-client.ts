const GOOGLE_APPS_SCRIPT_API =
  "https://script.google.com/macros/s/AKfycbzOz5gbh01IL0J-dh7yQKzDs0lwAke1AM7PwQy-4iHn_riyoWK_TzbmlhNrEFVftQZ5/exec"

interface Project {
  title: string
  before: string
  after: string
}

interface GalleryItem {
  src: string
  alt: string
}

interface GalleryData {
  [kategori: string]: GalleryItem[]
}

interface Sponsor {
  name: string
  logo: string
}

interface APIResponse {
  projects: Project[]
  gallery: GalleryData
  sponsors: Sponsor[]
}

export async function fetchAPIData(): Promise<APIResponse> {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_API, {
      cache: "no-store",
    })
    if (!response.ok) throw new Error("API hatası")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] API fetch hatası:", error)
    return { projects: [], gallery: {}, sponsors: [] }
  }
}
