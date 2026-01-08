export async function fetchGalleryData() {
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

  if (!apiUrl) {
    console.error("[v0] Google Apps Script API URL not configured")
    return { gallery: [], categories: ["Tümü"] }
  }

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Gallery verisi API'den gelen array'den işle
    const galleryItems = Array.isArray(data.gallery)
      ? data.gallery.map((item: any) => ({
          src: item.src || item.image_url || "",
          title: item.title || item.name || "",
          category: item.category || "Diğer",
        }))
      : []

    // Kategorileri dinamik çıkar
    const uniqueCategories = ["Tümü", ...new Set(galleryItems.map((item: any) => item.category))]

    return {
      gallery: galleryItems,
      categories: uniqueCategories,
    }
  } catch (error) {
    console.error("[v0] Gallery fetch error:", error)
    return { gallery: [], categories: ["Tümü"] }
  }
}
