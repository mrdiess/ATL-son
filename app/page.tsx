"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type Project = {
  id: string
  before: string
  after: string
  title: string
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Şimdilik statik – sonra Drive API’den çekeceğiz
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
          <div
            key={p.id}
            className="rounded-xl overflow-hidden border hover:shadow-lg transition"
          >
            <div className="grid grid-cols-2">
              <Image
                src={p.before}
                alt="Önce"
                width={600}
                height={400}
                className="object-cover h-full"
              />
              <Image
                src={p.after}
                alt="Sonra"
                width={600}
                height={400}
                className="object-cover h-full"
              />
            </div>

            <div className="p-4 font-semibold text-center">
              {p.title}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
