"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type GalleryItem = {
  src: string
  alt: string
}

type ProjectItem = {
  title: string
  before: string
  after: string
}

type SiteData = {
  gallery: {
    [key: string]: GalleryItem[]
  }
  projects: ProjectItem[]
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

  return (
    <main style={{ background: "#020617", color: "white" }}>
      {/* ================= HERO ================= */}
      <section style={{ position: "relative", height: "80vh" }}>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
          }}
        >
          <h1 style={{ fontSize: 56, fontWeight: 800 }}>
            Çelik Konstrüksiyon
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Endüstriyel tesis ve depo çözümleri
          </p>
        </div>
      </section>

      {/* ================= PROJELER ================= */}
      {data?.projects && (
        <section
          style={{
            padding: "120px 60px",
            background:
              "radial-gradient(circle at top, #020617, #020617 60%, #020617)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p style={{ color: "#38bdf8", fontWeight: 600 }}>
              YAPIM SÜRECİ
            </p>
            <h2 style={{ fontSize: 42, fontWeight: 800 }}>
              Projelerimiz Nasıl Hayata Geçiyor?
            </h2>
            <p style={{ opacity: 0.8, marginTop: 12 }}>
              Her projemiz profesyonel standartlarda tamamlanır.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 20,
              maxWidth: 1400,
              margin: "0 auto",
            }}
          >
            {data.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#e5e7eb",
                }}
              >
                <Image
                  src={p.after}
                  alt={p.title}
                  fill
                  style={{ objectFit: "cover" }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "#2563eb",
                    color: "white",
                    fontSize: 14,
                    fontWeight: 700,
                    padding: "6px 10px",
                    borderRadius: 6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= GALERİ ================= */}
      {data?.gallery && (
        <section style={{ padding: "100px 60px" }}>
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              textAlign: "center",
              marginBottom: 50,
            }}
          >
            Foto Galeri
          </h2>

          {Object.entries(data.gallery).map(([category, images]) => (
            <div key={category} style={{ marginBottom: 70 }}>
              <h3
                style={{
                  fontSize: 24,
                  marginBottom: 20,
                  color: "#38bdf8",
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(260px, 1fr))",
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
                    style={{
                      objectFit: "cover",
                      borderRadius: 14,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
