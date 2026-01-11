"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type GalleryItem = {
  src: string
  alt: string
}

type SiteData = {
  gallery: {
    [key: string]: GalleryItem[]
  }
}

export default function GaleriPage() {
  const [data, setData] = useState<SiteData | null>(null)

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec"
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error)
  }, [])

  if (!data) return null

  return (
    <main style={{ padding: "80px 40px" }}>
      <h1 style={{ fontSize: 40, marginBottom: 40 }}>Galeri</h1>

      {Object.entries(data.gallery).map(([category, images]) => (
        <section key={category} style={{ marginBottom: 60 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            {category.toUpperCase()}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {images.map((img, i) => (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
