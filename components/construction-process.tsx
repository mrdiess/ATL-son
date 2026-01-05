"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProcessStep {
  id: number
  label: string
}

const STEPS: ProcessStep[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `${String(i + 1).padStart(2, "0")}`,
}))

export default function ConstructionProcess() {
  const [active, setActive] = useState(0)
  const [position, setPosition] = useState(50)

  const currentStep = STEPS[active]

  const handlePrev = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))
    setPosition(50)
  }

  const handleNext = () => {
    setActive((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))
    setPosition(50)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Yapım Süreci</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">20 Adımlı Dönüşüm</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Her adımda profesyonel standartlar, her aşamada kalite kontrolü
          </p>
        </div>

        {/* Mini Carousel - Step Selector */}
        <div className="relative mb-12">
          <div className="flex justify-between items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setActive(idx)
                  setPosition(50)
                }}
                className={`flex-shrink-0 w-12 h-12 rounded-lg font-bold text-sm transition-all duration-300 ${
                  idx === active
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-110"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
                }`}
                aria-label={`Adım ${step.label}`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Main Container */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900">
            {/* Before Image */}
            <Image
              src={`/process/before-${currentStep.id}.jpg`}
              alt="Yapım Öncesi"
              fill
              priority
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = `/placeholder.svg?height=600&width=960&id=${currentStep.id}`
              }}
            />

            {/* After Image - Clipped by width */}
            <div
              className="absolute inset-0 overflow-hidden transition-all duration-300 ease-out"
              style={{ width: `${position}%` }}
            >
              <Image
                src={`/process/after-${currentStep.id}.jpg`}
                alt="Yapım Sonrası"
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=600&width=960&id=${currentStep.id}`
                }}
              />
            </div>

            {/* Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent shadow-lg"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            />

            {/* Labels */}
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-sm font-semibold text-white">
              Yapım Öncesi
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-sm font-semibold text-white">
              Yapım Sonrası
            </div>

            {/* Step Badge */}
            <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg">
              Adım {currentStep.label}
            </div>
          </div>

          {/* Slider Control */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-full max-w-xs h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
            aria-label="Slider"
          />

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Önceki adım"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:scale-110"
            aria-label="Sonraki adım"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Info & Progress */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Adım {active + 1} / {STEPS.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
              style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
