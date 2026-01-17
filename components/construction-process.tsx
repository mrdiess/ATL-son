"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

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

  const [activeStep, setActiveStep] = useState<ProjectStep | null>(null)
  const [sliderValue, setSliderValue] = useState(50)

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

  if (loading) {
    return <div className="text-center text-slate-400 py-12">Yükleniyor…</div>
  }

  return (
    <>
      {/* GRID */}
      <div className="flex flex-wrap justify-center gap-4">
        {Array.from({ length: 20 }).map((_, index) => {
          const step = steps[index]
          const hasImage = step?.before && step?.after

          return (
            <button
              key={index}
              disabled={!hasImage}
              onClick={() => {
                setActiveStep(step)
                setSliderValue(50)
              }}
              className={`relative w-[120px] h-[120px] rounded-xl overflow-hidden
                ${
                  hasImage
                    ? "bg-black/10 hover:scale-105 transition-transform"
                    : "bg-slate-300 cursor-default"
                }`}
            >
              {hasImage && (
                <Image
                  src={step.before!}
                  alt={`Adım ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}

              <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                {String(index + 1).padStart(2, "0")}
              </div>
            </button>
          )
        })}
      </div>

      {/* MODAL */}
      {activeStep && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden">
            {/* Close */}
            <button
              onClick={() => setActiveStep(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full"
            >
              <X className="text-white w-5 h-5" />
            </button>

            {/* Images */}
            <div className="relative w-full h-[420px] overflow-hidden">
              {/* AFTER */}
              <Image
                src={activeStep.after!}
                alt="Sonrası"
                fill
                className="object-cover"
              />

              {/* BEFORE */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderValue}%` }}
              >
                <Image
                  src={activeStep.before!}
                  alt="Öncesi"
                  fill
                  className="object-cover grayscale"
                />
              </div>

              {/* Labels */}
              <span className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded">
                Öncesi
              </span>
              <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded">
                Sonrası
              </span>
            </div>

            {/* Slider */}
            <div className="px-6 py-4 bg-slate-800">
              <input
                type="range"
                min={0}
                max={100}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                className="w-full"
              />

              <div className="mt-4 text-white">
                <div className="text-blue-400 text-sm font-semibold">
                  Adım 01
                </div>
                <div className="font-bold">
                  Yapım Süreci – {activeStep.slug}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
