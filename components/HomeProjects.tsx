"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BeforeAfterModal } from "@/components/BeforeAfterModal"

type Project = {
  title: string
  before: string
  after: string
}

export function HomeProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec")
      .then(res => res.json())
      .then(data => setProjects(data.projects.slice(0, 3))) // SADECE 3 ADET
  }, [])

  return (
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

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Link
          href="/projeler"
          style={{
            padding: "12px 30px",
            borderRadius: 30,
            background: "#0ea5e9",
            color: "white",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Tüm Projeleri Gör
        </Link>
      </div>
    </section>
  )
}
