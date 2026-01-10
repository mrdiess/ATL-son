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
      .catch(console.error)
  }, [])

  return (
    <main>
      {/* HERO – layout bozulmasın diye statik */}
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
          <h1 style={{ fontSize: 56 }}>Çelik Konstrüksiyon</h1>
          <p>Endüstriyel tesis ve depo çözümleri</p>
        </div>
      </section>

      {/* GALERİ – Drive’dan */}
      <section style={{ padding: "80px 40px" }}>
        <h2 style={{ fontSize: 36, marginBottom: 32 }}>Galeri</h2>

        {data &&
          Object.entries(data.gallery).map(([category, images]) => (
            <div key={category} style={{ marginBottom: 60 }}>
              <h3 style={{ fontSize: 24, marginBottom: 16 }}>{category}</h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                ))}
              </div>
            </div>
          ))}
      </section>
    </main>
  )
}
