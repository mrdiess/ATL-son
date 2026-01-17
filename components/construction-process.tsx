"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { PhotoLightbox } from "@/components/photo-lightbox"

const DRIVE_API =
  "https://script.google.com/macros/s/AKfycbz6KD5v8emprNcAvzqvzlsqXSCmArK17wwumahmm04h8E1MivpdKUQDVTGytqiXXmPl/exec"

type ProjectStep = {
  slug: string
  before: string | null
  after: string | null
}

export default function ConstructionProcess() {
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await fetch(DRIVE_API, { cache: "no-store" })
        const data = await res.json()

        if (Array.isArray(data.projeler)) {
          const cleaned = data.projeler.filter(
            (p: ProjectStep) => p.before && p.after,
          )
          setSteps(cleaned)
        }
      } catch (e) {
        console.error("ConstructionProcess fetch error:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchSteps()
  }, [])

  const openLightbox = (images: string[], index = 0) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (loading) {
    return (
      <div className="text-center text-slate-400 py-12">
        Yükleniyor…
      </div>
    )
  }

  if (!steps.length) {
    return (
      <div className="text-center text-slate-400 py-12">
        Henüz proje bulunamadı.
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <button
            key={step.slug}
            onClick={() =>
              openLightbox([step.before!, step.after!], 0)
            }
            className="group relative rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all"
          >
            <div className="absolute inset-0 z-10 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

            <Image
              src={step.before!}
              alt={`Adım ${index + 1}`}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
              <div className="text-sm text-blue-400 font-semibold">
                Adım {index + 1}
              </div>
              <div className="text-white font-bold">
                Yapım Süreci – {step.slug}
              </div>
            </div>
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <PhotoLightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
