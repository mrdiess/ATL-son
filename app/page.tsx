"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useBeforeAfterModal } from "@/components/BeforeAfterModal"

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
  const modal = useBeforeAfterModal()

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
      {modal.modal}

      {/* HERO */}
      <section style={{ position: "relative", height: "85vh" }}>
        <Image
          src="/hero/hero1.jpg"
          alt="ATL Çelik Yapı"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </section>

      {/* PROJELER */}
      {data?.projects && (
        <section style={{ padding: "120px 60px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#38bdf8", fontWeight: 600 }}>YAPIM SÜRECİ</p>
            <h2 style={{ fontSize: 42, fontWeight: 800 }}>
              Projelerimiz Nasıl Hayata Geçiyor?
            </h2>
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
                onClick={() => modal.open(p)}
                style={{
                  cursor: "pointer",
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
    </main>
  )
}
