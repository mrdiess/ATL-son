"use client"

import { BeforeAfterModal } from "./BeforeAfterModal"

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
  return (
    <section style={{ padding: "80px 40px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: 36,
          marginBottom: 40,
        }}
      >
        Projelerimiz Nasıl Hayata Geçiyor?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {projects.map((p) => (
          <div key={p.id}>
            <BeforeAfterModal
              before={p.before}
              after={p.after}
            />
            <p
              style={{
                marginTop: 10,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {p.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
