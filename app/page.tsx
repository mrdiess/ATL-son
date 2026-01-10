"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import BeforeAfter from "@/components/before-after"

type GalleryItem = {
  src: string
  alt: string
}

type Project = {
  title: string
  before: string
  after: string
}

type SiteData = {
  projects: Project[]
  gallery: {
    [key: string]: GalleryItem[]
  }
}

export default function HomePage() {
  const [data, setData] = useState<SiteData | null>(null)

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec"
    )
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <main style={{ background: "#020617", color: "white" }}>
      {/* ================= HERO ================= */}
      <section style={{ position: "relative", height: "85vh" }}>
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
              "linear-gradient(to right, rgba(2,6,23,.85), rgba(2,6,23,.4))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
            maxWidth: 900,
          }}
        >
          <p style={{ color: "#38bdf8", fontWeight: 600 }}>
            Endüstriyel Çözümler
          </p>
          <h1 style={{ fontSize: 56, fontWeight: 800 }}>
            Çelik Konstrüksiyon
          </h1>
          <p style={{ marginTop: 16, fontSize: 18, color: "#cbd5f5" }}>
            Anahtar teslim endüstriyel yapı ve depo projeleri
          </p>
        </div>
      </section>

      {/* ================= PROJELER (GRID) ================= */}
      {data?.projects && (
        <section style={{ padding: "120px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#38bdf8", fontWeight: 600 }}>
              YAPIM SÜRECİ
            </p>
            <h2 style={{ fontSize: 42, fontWeight: 800 }}>
              Projelerimiz Nasıl Hayata Geçiyor?
            </h2>
            <p style={{ marginTop: 12, color: "#94a3b8" }}>
              Drive üzerinden otomatik güncellenir
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

      {/* ================= BEFORE / AFTER ================= */}
      {data?.projects && (
        <section style={{ padding: "120px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#38bdf8", fontWeight: 600 }}>
              BEFORE / AFTER
            </p>
            <h2 style={{ fontSize: 42, fontWeight: 800 }}>
              Yapım Süreci Karşılaştırması
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
            {data.projects.map((project, i) => (
              <BeforeAfter
                key={i}
                title={project.title}
                before={project.before}
                after={project.after}
              />
            ))}
          </div>
        </section>
      )}

      {/* ================= GALERİ ================= */}
      {data?.gallery && (
        <section style={{ padding: "120px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#38bdf8", fontWeight: 600 }}>
              PROJELERDEN KARELER
            </p>
            <h2 style={{ fontSize: 42, fontWeight: 800 }}>
              Foto Galeri
            </h2>
          </div>

          {Object.entries(data.gallery).map(([category, images]) => (
            <div key={category} style={{ marginBottom: 80 }}>
              <h3
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  marginBottom: 24,
                  textTransform: "capitalize",
                }}
              >
                {category}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 24,
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
                      width: "100%",
                      height: "auto",
                      borderRadius: 16,
                      objectFit: "cover",
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
