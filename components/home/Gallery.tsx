"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Gallery() {
  const images = [
    "/steel-construction-industrial-factory-building.jpg",
    "/sandwich-panel-building-construction-modern.jpg",
    "/industrial-steel-factory-workers-warehouse.jpg",
    "/metal-processing-industrial-workshop.jpg",
    "/industrial-warehouse-steel-structure.jpg",
    "/construction-site-steel-frame-building.jpg",
  ]

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <section className="bg-slate-950 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Projelerimizden Kareler</h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded"
              onClick={() => {
                setIndex(i)
                setOpen(true)
              }}
            >
              <Image
                src={src}
                alt="ATL Çelik Yapı Proje"
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <button
            className="absolute left-6 text-white"
            onClick={prev}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="relative w-[90vw] max-w-5xl aspect-[16/10]">
            <Image
              src={images[index]}
              alt="ATL Çelik Yapı Proje"
              fill
              className="object-contain"
            />
          </div>

          <button
            className="absolute right-6 text-white"
            onClick={next}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  )
}
