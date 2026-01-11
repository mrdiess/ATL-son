"use client"

import { useEffect, useState } from "react"
import { BeforeAfterModal } from "@/components/BeforeAfterModal"

type Project = {
  title: string
  before: string
  after: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec")
      .then(res => res.json())
      .then(data => setProjects(data.projects))
  }, [])

  return (
    <main style={{ padding: "120px 40px" }}>
      <h1 style={{ textAlign: "center", fontSize: 42, marginBottom: 40 }}>
        Projelerimiz
      </h1>

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
    </main>
  )
}
