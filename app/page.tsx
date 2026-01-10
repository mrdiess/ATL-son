"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

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
  gallery: {
    [key: string]: GalleryItem[]
  }
  projects: Project[]
}

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec"
    )
      .then((res) => res.json())
      .then(setData)
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
          <p>Anahtar teslim çelik konstrüksiyon çözümleri</p>
        </div>
      </section>

      {/* PROJELER – BEFORE / AFTER */}
      {data?.projects && (
        <section style={{ padding: "80px 40px" }}>
          <h2 style={{ fontSize: 36, marginBottom: 32 }}>Projeler</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {data.projects.map((project, i) => (
              <div
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveProject(project)}
              >
                <Image
                  src={project.after}
                  alt={project.title}
                  width={600}
                  height={400}
                  style={{ borderRadius: 12, objectFit: "cover" }}
                />
                <h3 style={{ marginTop: 12 }}>{project.title}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALERİ */}
      {data?.gallery && (
        <section style={{ padding: "80px 40px" }}>
          <h2 style={{ fontSize: 36, marginBottom: 32 }}>Galeri</h2>

          {Object.entries(data.gallery).map(([category, images]) => (
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
      )}

      {/* MODAL – BEFORE / AFTER */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              maxWidth: 1000,
              width: "90%",
            }}
          >
            <h3 style={{ marginBottom: 16 }}>{activeProject.title}</h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <p>Önce</p>
                <Image
                  src={activeProject.before}
                  alt="Before"
                  width={500}
                  height={350}
                  style={{ borderRadius: 8 }}
                />
              </div>
              <div>
                <p>Sonra</p>
                <Image
                  src={activeProject.after}
                  alt="After"
                  width={500}
                  height={350}
                  style={{ borderRadius: 8 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
