"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Project = {
  id: string
  title: string
  before: string
  after: string
}

export default function HomeProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [active, setActive] = useState<Project | null>(null)
  const [showAfter, setShowAfter] = useState(false)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
  }, [])

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Projelerimiz
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-card rounded-xl overflow-hidden border cursor-pointer hover:scale-[1.02] transition"
              onClick={() => {
                setActive(p)
                setShowAfter(false)
              }}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={p.before}
                  alt={p.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-3 text-sm font-medium text-center">
                {p.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {active && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-card rounded-xl p-4 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{active.title}</h3>
              <button
                className="text-sm underline"
                onClick={() => setShowAfter(!showAfter)}
              >
                {showAfter ? "Before" : "After"}
              </button>
            </div>

            <div className="relative aspect-[4/3]">
              <Image
                src={showAfter ? active.after : active.before}
                alt={active.title}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
