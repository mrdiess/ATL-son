"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BeforeAfterGrid } from "@/components/BeforeAfterGrid"

type GalleryItem = {
  src: string
  alt: string
}

type Project = {
  id: string
  title: string
  before: string
  after: string
}

type SiteData = {
  projects?: Project[]
  gallery?: {
    [key: string]: GalleryItem[]
  }
}

export default function Page() {
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
    <main>
      {/* HERO */}
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
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 60,
          }}
        >
          <h1 style={{ fontSize: 56 }}>ATL Çelik Yapı</h1>
          <p style={{ fontSize: 20, marginTop: 12 }}>
            Çelik konstrüksiyon • Anahtar teslim çözümler
          </p>
        </div>
      </section>

      {/* PROJELER */}
      {data?.projects && data.projects.length > 0 && (
        <BeforeAfterGrid projects={data.projects} />
      )}

      {/* GALERİ */}
      {data?.gallery && (
        <section style={{ padding: "80px 40px" }}>
          <h2 style={{ fontSize: 36, marginBottom: 32 }}>Galeri</h2>

          {Object.entries(data.gallery).map(([category, images]) => (
            <div key={category} style={{ marginBottom: 48 }}>
              <h3 style={{ fontSize: 22, marginBottom: 16 }}>
                {category.toUpperCase()}
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 16,
                }}
              >
                {images.slice(0, 4).map((img, i) => (
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
            </div>
          ))}
        </section>
      )}
    </main>
  )
}
