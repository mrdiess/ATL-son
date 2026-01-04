"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const constructionPhases = [
  {
    id: 1,
    title: "Temel & Saha Hazırlığı",
    description: "Zemin etüdü, temel kazısı ve ankraj montajı yapılır.",
    images: [
      "/steel-construction-industrial-factory-building.jpg",
      "/industrial-steel-factory-workers-warehouse.jpg",
      "/sandwich-panel-building-construction-modern.jpg",
    ],
  },
  {
    id: 2,
    title: "Çelik Kolon & Kiriş Montajı",
    description: "Taşıyıcı çelik kolon ve kirişler vinçle monte edilir.",
    images: [
      "/industrial-steel-factory-workers-warehouse.jpg",
      "/steel-construction-industrial-factory-building.jpg",
      "/sandwich-panel-building-construction-modern.jpg",
    ],
  },
  {
    id: 3,
    title: "Çatı & Duvar Panelleri",
    description: "Sandviç panel çatı ve cephe kaplamaları yapılır.",
    images: [
      "/sandwich-panel-building-construction-modern.jpg",
      "/steel-construction-industrial-factory-building.jpg",
      "/industrial-steel-factory-workers-warehouse.jpg",
    ],
  },
  {
    id: 4,
    title: "Tamamlama & Teslim",
    description: "Son kontroller yapılır ve proje teslim edilir.",
    images: [
      "/steel-construction-industrial-factory-building.jpg",
      "/sandwich-panel-building-construction-modern.jpg",
      "/industrial-steel-factory-workers-warehouse.jpg",
    ],
  },
]

export default function HomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="py-6 text-center border-b">
        <h1 className="text-3xl md:text-4xl font-bold">ATL Çelik Yapı</h1>
        <p className="text-muted-foreground mt-2">
          Projelerimiz Nasıl Hayata Geçiyor?
        </p>
      </header>

      {/* CONSTRUCTION PHASES */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-500 font-semibold uppercase tracking-wider text-sm">
              Yapım Süreci
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              4 Adımda Çelik Yapı
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-blue-500/30" />

            <div className="space-y-14">
              {constructionPhases.map((phase) => (
                <div key={phase.id} className="relative pl-16">
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    {phase.id}
                  </div>

                  <div className="bg-card border rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-2">
                      {phase.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {phase.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {phase.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => openLightbox(phase.images, index)}
                          className="relative aspect-[4/3] overflow-hidden rounded-lg"
                        >
                          <Image
                            src={img}
                            alt={phase.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={32} />
          </button>

          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev > 0 ? prev - 1 : lightboxImages.length - 1
              )
            }
            className="absolute left-6 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={lightboxImages[lightboxIndex]}
              alt="Yapım aşaması"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev < lightboxImages.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute right-6 text-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </main>
  )
}
