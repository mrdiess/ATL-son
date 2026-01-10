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
      .catch((err) => {
        console.error("Drive data error:", err)
      })
  }, [])

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

      {/* ================= GALERİ ================= */}
      <section
        style={{
          padding: "100px 60px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2
          style={{
            fontSize: 42,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 70,
          }}
        >
          Galeri
        </h2>

        {data &&
          Object.entries(data.gallery).map(([category, images]) => (
            <div key={category} style={{ marginBottom: 90 }}>
              <h3
                style={{
                  fontSize: 28,
                  marginBottom: 28,
                  textTransform: "capitalize",
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 24,
                }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      height: 220,
                      borderRadius: 14,
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
                        transition: "transform 0.4s ease",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>
    </main>
  )
}
