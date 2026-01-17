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
          setSteps(data.projeler)
        }
      } catch (e) {
        console.error("ConstructionProcess fetch error:", e)
      } finally {
        setLoading(false)
      }
    }

    fetchSteps()
  }, [])

  const openLightbox = (images: string[]) => {
    setLightboxImages(images)
    setLightboxIndex(0)
    setLightboxOpen(true)
  }

  if (loading) {
    return <div className="text-center text-slate-400 py-12">Yükleniyor…</div>
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {Array.from({ length: 20 }).map((_, index) => {
          const step = steps[index]
          const hasImage = step?.before && step?.after

          return (
            <button
              key={index}
              disabled={!hasImage}
              onClick={() =>
                hasImage && openLightbox([step.before!, step.after!])
              }
              className={`relative w-[120px] h-[120px] rounded-xl overflow-hidden transition-all
                ${
                  hasImage
                    ? "bg-black/10 hover:scale-105"
                    : "bg-slate-300 cursor-default"
                }`}
            >
              {hasImage ? (
                <Image
                  src={step.before!}
                  alt={`Adım ${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : null}

              {/* Numara Badge */}
              <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                {String(index + 1).padStart(2, "0")}
              </div>
            </button>
          )
        })}
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
