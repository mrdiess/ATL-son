"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface ProjectStep {
  id: string
  slug: string
  before?: string
  after?: string
  title?: string
}

const FALLBACK_STEPS: ProjectStep[] = [
  {
    id: "demo-1",
    slug: "step-1",
    title: "Hazırlık ve Planlama",
    before: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&h=600&fit=crop",
    after: "https://images.unsplash.com/photo-1581092160562-40fed08d04ac?w=1000&h=600&fit=crop",
  },
  {
    id: "demo-2",
    slug: "step-2",
    title: "Temel ve Altyapı",
    before: "https://images.unsplash.com/photo-1581092162562-40fed08d04ac?w=1000&h=600&fit=crop",
    after: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&h=600&fit=crop",
  },
  {
    id: "demo-3",
    slug: "step-3",
    title: "Yapı Kurulumu",
    before: "https://images.unsplash.com/photo-1581092160562-40fed08d04ac?w=1000&h=600&fit=crop",
    after: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1000&h=600&fit=crop",
  },
]

export default function ConstructionProcess() {
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [selectedStep, setSelectedStep] = useState<ProjectStep | null>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const result = await response.json()

        if (result.success && Array.isArray(result.data)) {
          const validSteps = result.data.filter((project: any) => project.before && project.after)
          if (validSteps.length > 0) {
            setSteps(validSteps)
            console.log("[v0] Construction process steps loaded:", validSteps.length)
          } else {
            setSteps(FALLBACK_STEPS)
            console.log("[v0] Using fallback construction steps")
          }
        } else {
          setSteps(FALLBACK_STEPS)
          console.log("[v0] Using fallback construction steps")
        }
      } catch (error) {
        console.error("[v0] Failed to fetch construction steps:", error)
        setSteps(FALLBACK_STEPS)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  if (loading) {
    return null
  }

  if (steps.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <button
            key={step.id || index}
            onClick={() => {
              setSelectedStep(step)
              setSliderPosition(50)
            }}
            className="group relative aspect-square rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            aria-label={`Adım ${index + 1}`}
            title={step.title || `Adım ${index + 1}`}
          >
            {step.after && (
              <Image
                src={step.after || "/placeholder.svg"}
                alt={`Yapım Adımı ${index + 1}`}
                fill
                className="object-cover select-none pointer-events-none"
              />
            )}

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />

            <div className="absolute bottom-2 right-2 bg-blue-600/80 backdrop-blur px-2 py-1 rounded text-xs md:text-sm font-bold text-white">
              {String(index + 1).padStart(2, "0")}
            </div>
          </button>
        ))}
      </div>

      {selectedStep && selectedStep.before && selectedStep.after && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedStep(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-all"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            <div
              className="relative aspect-video bg-slate-800 overflow-hidden cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              {selectedStep.before && (
                <Image
                  src={selectedStep.before || "/placeholder.svg"}
                  alt="Yapım Öncesi"
                  fill
                  priority
                  className="object-cover select-none pointer-events-none"
                />
              )}

              <div
                className="absolute inset-0 overflow-hidden transition-all duration-75"
                style={{ width: `${sliderPosition}%` }}
              >
                {selectedStep.after && (
                  <Image
                    src={selectedStep.after || "/placeholder.svg"}
                    alt="Yapım Sonrası"
                    fill
                    className="object-cover select-none pointer-events-none"
                  />
                )}
              </div>

              <div
                className="absolute inset-y-0 w-1.5 bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  setIsDragging(true)
                }}
              />

              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-white">
                Öncesi
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-white">
                Sonrası
              </div>
            </div>

            <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-blue-400 font-semibold text-sm">{selectedStep.title || "Yapım Adımı"}</p>
                <p className="text-white font-bold text-lg">Yapım Süreci</p>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-32 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
                aria-label="Slider"
              />
            </div>
          </div>
        </div>
      )}

      {typeof window !== "undefined" && selectedStep && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') window.location.reload();
              });
            `,
          }}
        />
      )}
    </>
  )
}
