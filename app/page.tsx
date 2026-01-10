"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import BeforeAfter from "@/components/before-after"

type GalleryItem = {
  src: string
  alt: string
}

type SiteData = {
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
      .then((json) => setData(json))
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
            background: "rgba(0,0,0,0.55)",
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
          <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
            Çelik Konstrüksiyon
          </h1>
          <p style={{ marginTop: 20, fontSize: 18, color: "#cbd5f5" }}>
            Anahtar teslim endüstriyel yapı ve depo projeleri
          </p>
        </div>
      </section>

      {/* ================= PROJELER ================= */}
      <section style={{ padding: "120px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ color: "#38bdf8", fontWeight: 600 }}>
            YAPIM SÜRECİ
          </p>
          <h2 style={{ fontSize: 42, fontWeight: 800 }}>
            Projelerimiz Nasıl Hayata Geçiyor?
          </h2>
          <p style={{ marginTop: 12, color: "#94a3b8" }}>
            Her proje profesyonel aşamalardan geçerek tamamlanır.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                background: "#1e293b",
                height: 160,
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
                fontWeight: 700,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </section>

      {/* ================= BEFORE / AFTER ================= */}
      <section style={{ padding: "120px 60px", background: "#020617" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <p style={{ color: "#38bdf8", fontWeight: 600 }}>
            BEFORE / AFTER
          </p>
          <h2 style={{ fontSize: 42, fontWeight: 800 }}>
            Yapım Süreci Karşılaştırması
          </h2>
        </div>

        <BeforeAfter
          title="Depo Projesi – Faz 1"
          before="https://drive.google.com/uc?id=BEFORE_ID"
          after="https://drive.google.com/uc?id=AFTER_ID"
        />
      </section>

      {/* ================= GALERİ ================= */}
      <section style={{ padding: "120px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p style={{ color: "#38bdf8", fontWeight: 600 }}>
            PROJELERİMİZDEN KARELER
          </p>
          <h2 style={{ fontSize: 42, fontWeight: 800 }}>
            Foto Galeri
          </h2>
        </div>

        {data &&
          Object.entries(data.gallery).map(([category, images]) => (
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
    </main>
  )
}
