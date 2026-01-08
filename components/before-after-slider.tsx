"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"

interface Project {
  title: string
  before: string
  after: string
}

export function BeforeAfterSlider({ projects }: { projects: Project[] }) {
  const [sliderPositions, setSliderPositions] = useState<{ [key: number]: number }>({})
  const containerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  if (!projects || projects.length === 0) {
    return <div className="text-center py-12 text-slate-500">Proje verisi yükleniyor...</div>
  }

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRefs.current[index]
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPositions((prev) => ({ ...prev, [index]: percentage }))
  }

  const handleTouchMove = (index: number, e: React.TouchEvent<HTMLDivElement>) => {
    const container = containerRefs.current[index]
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPositions((prev) => ({ ...prev, [index]: percentage }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => {
        const position = sliderPositions[index] ?? 50

        return (
          <div
            key={index}
            ref={(el) => {
              containerRefs.current[index] = el
            }}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onTouchMove={(e) => handleTouchMove(index, e)}
            className="relative aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden cursor-col-resize group"
          >
            {/* Before görsel */}
            <Image src={project.after || "/placeholder.svg"} alt="After" fill className="object-cover" />

            {/* After overlay */}
            <div
              style={{ width: `${position}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden transition-none"
            >
              <Image src={project.before || "/placeholder.svg"} alt="Before" fill className="object-cover" />
            </div>

            {/* Slider handle */}
            <div
              style={{ left: `${position}%` }}
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg transition-none"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l6-7z" />
                  <path d="M16 5v14l6-7z" transform="translate(-6)" />
                </svg>
              </div>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-sm font-medium">{project.title}</p>
            </div>

            {/* Before/After labels */}
            <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded">Before</div>
            <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              After
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BeforeAfterSlider
