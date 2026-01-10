"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

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
      .catch(console.error)
  }, [])

  const previewImages =
    data ? Object.values(data.gallery).flat().slice(0, 8) : []

  return (
    <main>
      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          height: "80vh",
          width: "100%",
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
            background: "rgba(0,0,0,0.55)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
            paddingRight: 40,
          }}
        >
          <h1 style={{ fontSize: 56, fontWeight: 700, marginBottom: 16 }}>
            Çelik Konstrüksiyon
          </h1>
          <p style={{ fontSize: 20, maxWidth: 600 }}>
            Endüstriyel tesis, depo ve anahtar teslim çelik yapı çözümleri
          </p>
        </div>
      </section>

      {/* ================= GALERİ ÖZET ================= */}
      <section
        style={{
          padding: "100px 60px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2
          style={{
            fontSize: 40,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          Foto Galeri
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {previewImages.map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                height: 200,
                borderRadius: 14,
                overflow: "hidden",
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

        <div style={{ textAlign: "center" }}>
          <Link
            href="/galeri"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "#0ea5e9",
              color: "white",
              borderRadius: 999,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Tüm Galeriyi Gör
          </Link>
        </div>
      </section>
    </main>
  )
}
