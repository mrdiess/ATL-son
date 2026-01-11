"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BeforeAfterModal } from "@/components/BeforeAfterModal"

type Project = {
  title: string
  before: string
  after: string
}

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec")
      .then(res => res.json())
      .then(data => setProjects(data.projects?.slice(0, 3) || []))
      .catch(console.error)
  }, [])

  return (
    <main>

      {/* ================= HERO ================= */}
      <section
        style={{
          position: "relative",
          height: "85vh",
          width: "100%",
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
            padding: "0 60px",
            maxWidth: 900,
          }}
        >
          <Image
            src="/logo.png"
            alt="ATL Çelik Yapı Logo"
            width={220}
            height={80}
            style={{ marginBottom: 30 }}
          />

          <h1 style={{ fontSize: 52, marginBottom: 20 }}>
            Çelik Yapıda Güvenilir Çözüm Ortağınız
          </h1>

          <p style={{ fontSize: 18, opacity: 0.9 }}>
            Anahtar teslim çelik konstrüksiyon, depo ve endüstriyel tesis çözümleri
          </p>
        </div>
      </section>

      {/* ================= PROJELER (Before / After) ================= */}
      <section style={{ padding: "100px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: 36, marginBottom: 40 }}>
          Öne Çıkan Projeler
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {projects.map((p, i) => (
            <div key={i}>
              <BeforeAfterModal before={p.before} after={p.after} />
              <p style={{ textAlign: "center", marginTop: 10 }}>{p.title}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Link
            href="/projeler"
            style={{
              padding: "14px 36px",
              borderRadius: 30,
              background: "#0ea5e9",
              color: "white",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Tüm Projeleri Gör
          </Link>
        </div>
      </section>

    </main>
  )
}
