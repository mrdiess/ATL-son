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

const FILTERS = [
  { key: "all", label: "Tümü" },
  { key: "depo", label: "Depo" },
  { key: "fabrika", label: "Fabrika" },
  { key: "hangar", label: "Hangar" },
  { key: "ticari", label: "Ticari" },
  { key: "tarimsal", label: "Tarım" },
  { key: "spor", label: "Spor" },
]

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec"
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(console.error)
  }, [])

  const images =
    data &&
    (activeFilter === "all"
      ? Object.values(data.gallery).flat()
      : data.gallery[activeFilter] || [])

  return (
    <main style={{ background: "#020c1b", color: "white" }}>
      {/* GALERİ */}
      <section style={{ padding: "120px 80px" }}>
        <p
          style={{
            textAlign: "center",
            color: "#3ea6ff",
            letterSpacing: 2,
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          PROJELERİMİZDEN KARELER
        </p>

        <h2
          style={{
            textAlign: "center",
            fontSize: 44,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Foto Galeri
        </h2>

        <p
          style={{
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto 40px",
            opacity: 0.75,
          }}
        >
          Tamamladığımız projelerin fotoğraflarını inceleyerek işçiliğimiz
          hakkında fikir edinin.
        </p>

        {/* FİLTRELER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 50,
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background:
                  activeFilter === f.key ? "#0ea5e9" : "#0b1c2d",
                color: "white",
                fontWeight: 500,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {images?.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(img)}
              style={{
                position: "relative",
                height: 220,
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{
                  objectFit: "cover",
                  transition: "transform .4s ease",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 1200,
              height: "80vh",
            }}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </main>
  )
}
