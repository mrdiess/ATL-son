"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type GalleryItem = {
  src: string
  category: string
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [active, setActive] = useState("Tümü")

  useEffect(() => {
    fetch("GOOGLE_SCRIPT_URL")
      .then(res => res.json())
      .then(data => {
        // beklenen format: data.gallery = { Depo: [], Fabrika: [] }
        const flat: GalleryItem[] = []
        Object.entries(data.gallery).forEach(([cat, images]: any) => {
          images.forEach((img: any) =>
            flat.push({ src: img.src, category: cat })
          )
        })
        setItems(flat)
      })
  }, [])

  const categories = ["Tümü", ...Array.from(new Set(items.map(i => i.category)))]
  const filtered =
    active === "Tümü" ? items : items.filter(i => i.category === active)

  return (
    <main style={{ padding: "120px 40px" }}>
      <h1 style={{ fontSize: 42, textAlign: "center", marginBottom: 24 }}>
        Foto Galeri
      </h1>

      {/* FİLTRE */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          marginBottom: 40,
          flexWrap: "wrap",
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              background: active === cat ? "#0ea5e9" : "#1f2933",
              color: "white",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALERİ GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((img, i) => (
          <div key={i} style={{ position: "relative", height: 220 }}>
            <Image
              src={img.src}
              alt={img.category}
              fill
              style={{ objectFit: "cover", borderRadius: 12 }}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
