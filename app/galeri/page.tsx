"use client"

import { useState } from "react"
import { gallery } from "../../data/gallery"

const categories = ["tümü", "ferforje", "merdiven"]

export default function GalleryPage() {
  const [active, setActive] = useState("tümü")

  const filtered =
    active === "tümü"
      ? gallery
      : gallery.filter((i) => i.category === active)

  return (
    <section className="container py-20 space-y-10">
      <h1 className="text-3xl font-bold">Galeri</h1>

      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 border rounded-full text-sm ${
              active === c ? "bg-black text-white" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <img
              src={item.src}
              alt={item.category}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
