"use client"

import Image from "next/image"
import { useState } from "react"

type Project = {
  id: string
  title: string
  before: string
  after: string
}

type Props = {
  projects: Project[]
}

export function BeforeAfterGrid({ projects }: Props) {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <>
      <section style={{ padding: "80px 40px" }}>
        <h2 style={{ textAlign: "center", fontSize: 36, marginBottom: 40 }}>
          Projelerimiz
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
                height={300}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
              <p style={{ marginTop: 8, textAlign: "center" }}>{p.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {active && (
        <div
          onClick={() => setActive(null)}
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
              maxWidth: 900,
              width: "100%",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: 16 }}>
              {active.title}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div>
                <p style={{ textAlign: "center", marginBottom: 8 }}>Önce</p>
                <Image
                  src={active.before}
                  alt="Before"
                  width={400}
                  height={300}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </div>

              <div>
                <p style={{ textAlign: "center", marginBottom: 8 }}>Sonra</p>
                <Image
                  src={active.after}
                  alt="After"
                  width={400}
                  height={300}
                  style={{ objectFit: "cover", borderRadius: 8 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
