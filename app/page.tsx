"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type MediaItem = {
  id?: string
  category?: string
  file_type?: string
  url: string
}

export default function Page() {
  const [mediaCategories, setMediaCategories] = useState<string[]>([])
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("Tümü")

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL as string)
      .then((res) => res.json())
      .then((result) => {
        const data: MediaItem[] = Array.isArray(result.data)
          ? result.data
          : []

        /* ✅ KATEGORİLER – TYPE SAFE */
        const uniqueCategories: string[] = [
          "Tümü",
          ...Array.from(
            new Set(
              data
                .map((item) => item.category)
                .filter(
                  (c): c is string =>
                    typeof c === "string" && c.length > 0,
                ),
            ),
          ),
        ]

        setMediaCategories(uniqueCategories)

        /* ✅ GÖRSELLER */
        const images = data
          .filter(
            (item): item is MediaItem =>
              typeof item.url === "string" &&
              item.file_type?.startsWith("image"),
          )
          .map((item) => item.url)

        setGalleryImages(images)
      })
      .catch(console.error)
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">API TEST</h1>

      {/* KATEGORİLER */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {mediaCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 border rounded ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALERİ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Görsel ${i + 1}`}
            width={400}
            height={300}
            className="rounded object-cover"
          />
        ))}
      </div>
    </main>
  )
}
