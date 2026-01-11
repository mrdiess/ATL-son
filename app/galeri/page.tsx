// app/galeri/page.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const categories = ["tümü", "villa", "fabrika", "cati", "ic-mekan"]

const gallery = [
  { id: "1", src: "/gallery/1.jpg", category: "villa" },
  { id: "2", src: "/gallery/2.jpg", category: "fabrika" },
  { id: "3", src: "/gallery/3.jpg", category: "cati" },
]

export default function GalleryPage() {
  const [active, setActive] = useState("tümü")

  const filtered =
    active === "tümü"
      ? gallery
      : gallery.filter((i) => i.category === active)

  return (
    <section className="container py-20 space-y-10">
      <h1 className="text-3xl font-bold">Galeri</h1>

      {/* Filtre */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "px-4 py-2 border rounded-full text-sm",
              active === c && "bg-black text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={item.src}
              alt=""
              fill
              className="object-cover hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
