"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface ProcessStep {
  id: number
  label: string
}

const STEPS: ProcessStep[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `${String(i + 1).padStart(2, "0")}`,
}))

export default function ConstructionProcess() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const currentStep = selectedStep ? STEPS.find((s) => s.id === selectedStep) : null

  return (
    <>
      {/* Compact Grid - Minimal Space */}
      <div className="grid grid-cols-10 gap-2 md:gap-3 max-w-4xl mx-auto">
        {STEPS.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => {
              setSelectedStep(step.id)
              setSliderPosition(50)
            }}
            className={`aspect-square rounded-lg font-bold text-xs md:text-sm transition-all duration-200 ${
              selectedStep === step.id
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105 border-2 border-blue-400"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700 hover:border-slate-600"
            }`}
            aria-label={`Adım ${step.label}`}
            title={`Adım ${step.label}`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Fullscreen Modal - BEFORE/AFTER Slider */}
      {selectedStep && currentStep && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedStep(null)}
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-all"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Before/After Container */}
            <div
              className="relative aspect-video bg-slate-800 overflow-hidden cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              {/* Before Image */}
              <Image
                src={`/process/before-${currentStep.id}.jpg`}
                alt="Yapım Öncesi"
                fill
                priority
                className="object-cover select-none pointer-events-none"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=600&width=1000&query=construction-before`
                }}
              />

              {/* After Image - Clipped */}
              <div
                className="absolute inset-0 overflow-hidden transition-all duration-75"
                style={{ width: `${sliderPosition}%` }}
              >
                <Image
                  src={`/process/after-${currentStep.id}.jpg`}
                  alt="Yapım Sonrası"
                  fill
                  className="object-cover select-none pointer-events-none"
                  onError={(e) => {
                    e.currentTarget.src = `/placeholder.svg?height=600&width=1000&query=construction-after`
                  }}
                />
              </div>

              {/* Divider Line */}
              <div
                className="absolute inset-y-0 w-1.5 bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  setIsDragging(true)
                }}
              />

              {/* Before/After Labels */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-white">
                Öncesi
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold text-white">
                Sonrası
              </div>
            </div>

            {/* Info Bar */}
            <div className="bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-blue-400 font-semibold text-sm">Adım {currentStep.label}</p>
                <p className="text-white font-bold text-lg">Yapım Süreci - Faz {currentStep.id}</p>
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

      {/* ESC Key Handler */}
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
