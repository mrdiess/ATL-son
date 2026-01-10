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

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null)

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec"
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => null)
  }, [])

  // 👉 Anasayfada sadece 6 görsel (performans için)
  const previewImages: GalleryItem[] =
    data ? Object.values(data.gallery).flat().slice(0, 6) : []

  return (
    <main style={{ background: "#020617", color: "white" }}>
      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          height: "85vh",
          overflow: "hidden",
        }}
      >
        <Image
          src="/hero/hero1.jpg"
          alt="ATL Çelik Yapı"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(2,6,23,0.85), rgba(2,6,23,0.3))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
          }}
        >
          <p style={{ color: "#38bdf8", marginBottom: 12 }}>
            Endüstriyel tesis ve depo çözümleri
          </p>
          <h1 style={{ fontSize: 56, fontWeight: 800, marginBottom: 16 }}>
            Çelik Konstrüksiyon
          </h1>
          <p style={{ maxWidth: 520, opacity: 0.85 }}>
            Düzce merkezli, 81 ile profesyonel çelik yapı ve metal işleme
            hizmetleri.
          </p>
        </div>
      </section>

      {/* ================= GALERİ ================= */}
      <section style={{ padding: "100px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ color: "#38bdf8", marginBottom: 8 }}>
            PROJELERİMİZDEN KARELER
          </p>
          <h2 style={{ fontSize: 42, fontWeight: 700 }}>Foto Galeri</h2>
          <p style={{ opacity: 0.7, marginTop: 12 }}>
            Tamamladığımız projelerden seçilmiş kareler
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {previewImages.map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                height: 220,
                borderRadius: 16,
                overflow: "hidden",
                background: "#0f172a",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
