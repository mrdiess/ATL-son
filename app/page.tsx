"use client"

import { useEffect, useState } from "react"
import { BeforeAfterModal } from "@/components/BeforeAfterModal"

type Project = {
  id: string
  title: string
  before: string
  after: string
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    setProjects([
      {
        id: "1",
        title: "Anahtar Teslim Daire",
        before: "/before.jpg",
        after: "/after.jpg",
      },
    ])
  }, [])

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Projelerimiz</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <BeforeAfterModal
            key={p.id}
            before={p.before}
            after={p.after}
            title={p.title}
          />
        ))}
      </div>
    </main>
  )
}
