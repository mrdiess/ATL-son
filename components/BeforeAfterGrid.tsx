"use client"

import { useState } from "react"
import { BeforeAfterModal } from "./BeforeAfterModal"
import Image from "next/image"

type Project = {
  id: string
  title: string
  before: string
  after: string
}

export function BeforeAfterGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section style={{ padding: "80px 40px" }}>
      <h2 style={{ textAlign: "center", fontSize: 36, marginBottom: 40 }}>
        Öne Çıkan Projeler
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {projects.map((p) => (
          <div
            key={p.id}
            style={{ cursor: "pointer" }}
            onClick={() => setActive(p)}
          >
            <Image
              src={p.after}
              alt={p.title}
              width={400}
              height={260}
              style={{ borderRadius: 12, objectFit: "cover" }}
            />
            <p style={{ marginTop: 8, textAlign: "center" }}>{p.title}</p>
          </div>
        ))}
      </div>

      <BeforeAfterModal
        open={!!active}
        before={active?.before || ""}
        after={active?.after || ""}
        onClose={() => setActive(null)}
      />
    </section>
  )
}
