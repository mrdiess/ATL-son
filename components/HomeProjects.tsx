"use client"

import { useState } from "react"
import Link from "next/link"
import BeforeAfterModal from "./BeforeAfterModal"

type Project = {
  id: string
  title: string
  before: string
  after: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Villa Projesi",
    before: "/before/1.jpg",
    after: "/after/1.jpg",
  },
]

export default function HomeProjects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section className="container py-20 space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Öne Çıkan Projeler</h2>

        <Link href="/projeler" className="text-sm underline">
          Tümünü Gör
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelected(p)}
            className="relative aspect-video overflow-hidden rounded-xl border"
          >
            <img
              src={p.after}
              alt={p.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm">
              {p.title}
            </div>
          </button>
        ))}
      </div>

      <BeforeAfterModal
        item={
          selected
            ? { before: selected.before, after: selected.after }
            : null
        }
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
