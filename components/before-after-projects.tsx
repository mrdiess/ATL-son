"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

interface Project {
  title: string
  before: string
  after: string
}

export default function BeforeAfterProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [sliderPositions, setSliderPositions] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useState(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json", { cache: "no-store" })
        const data = await response.json()
        setProjects(data)
        // Initialize slider positions
        const positions: Record<number, number> = {}
        data.forEach((_, idx) => {
          positions[idx] = 50
        })
        setSliderPositions(positions)
      } catch (error) {
        console.error("Projeler yükleme hatası:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPositions((prev) => ({
      ...prev,
      [index]: percentage,
    }))
  }

  if (isLoading) return <div className="text-center py-8 text-slate-500">Projeler yükleniyor...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group relative aspect-square bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          {/* Before Image */}
          <Image
            src={project.before || "/placeholder.svg"}
            alt={`${project.title} - Before`}
            fill
            className="object-cover"
          />

          {/* After Image with slider overlay */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - (sliderPositions[index] || 50)}% 0 0)`,
            }}
          >
            <Image
              src={project.after || "/placeholder.svg"}
              alt={`${project.title} - After`}
              fill
              className="object-cover"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-blue-500 cursor-col-resize"
            style={{
              left: `${sliderPositions[index] || 50}%`,
            }}
            onMouseMove={(e) => handleSliderChange(e, index)}
            onTouchMove={(e) => {
              const touch = e.touches[0]
              const rect = e.currentTarget.parentElement?.getBoundingClientRect()
              if (rect) {
                const x = touch.clientX - rect.left
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                setSliderPositions((prev) => ({
                  ...prev,
                  [index]: percentage,
                }))
              }
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-2 left-2 text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded">
            Önce
          </div>
          <div className="absolute top-2 right-2 text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded">
            Sonra
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium">{project.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
