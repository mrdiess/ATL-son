"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { PhotoLightbox } from "@/components/photo-lightbox"
import { ChevronLeft, MapPin, Clock, Building } from "lucide-react"

interface ProjectPhoto {
  id: string
  photo_url: string
  caption?: string
  sort_order: number
}

interface ProjectStep {
  id: string
  project_id: string
  step_number: number
  title: string
  description?: string
  technical_details?: string
  project_photos: ProjectPhoto[]
}

interface Project {
  id: string
  title: string
  description?: string
  slug: string
  category: string
  location: string
  building_type?: string
  project_duration?: string
  featured_image_url: string
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [allPhotos, setAllPhotos] = useState<string[]>([])

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectRes = await fetch(`/api/projects?id=${resolvedParams.id}`)
        const projectData = await projectRes.json()
        if (projectData.data && projectData.data.length > 0) {
          setProject(projectData.data[0])
        }

        const stepsRes = await fetch(`/api/project-steps?project_id=${resolvedParams.id}`)
        const stepsData = await stepsRes.json()
        if (stepsData.data) {
          setSteps(stepsData.data)
          const photos: string[] = []
          stepsData.data.forEach((step: ProjectStep) => {
            if (step.project_photos) {
              step.project_photos.forEach((p) => photos.push(p.photo_url))
            }
          })
          setAllPhotos(photos)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectData()
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Yükleniyor...</div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Proje bulunamadı</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pt-24 pb-12 px-4 md:px-6 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#projeler"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6 font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Projelere Dön
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h1>

          <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            )}
            {project.building_type && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{project.building_type}</span>
              </div>
            )}
            {project.project_duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{project.project_duration}</span>
              </div>
            )}
          </div>

          <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full">{project.category}</span>

          {project.description && <p className="mt-6 text-muted-foreground max-w-3xl">{project.description}</p>}
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Yapım Aşamaları</h2>

          {steps.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">Yapım aşamaları henüz eklenmemiş</div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2" />

              <div className="space-y-12">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-start`}
                  >
                    {/* Step Number */}
                    <div className="hidden md:flex flex-1 justify-end">
                      <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold ring-4 ring-background z-10">
                        {step.step_number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="md:hidden mb-4">
                        <span className="inline-block bg-blue-500 text-white rounded-full px-4 py-2 font-bold">
                          Adım {step.step_number}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      {step.description && <p className="text-muted-foreground mb-4">{step.description}</p>}
                      {step.technical_details && (
                        <p className="text-sm text-muted-foreground/80 mb-4 italic">{step.technical_details}</p>
                      )}

                      {step.project_photos && step.project_photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {step.project_photos.map((photo) => (
                            <div
                              key={photo.id}
                              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                              onClick={() => {
                                const globalIndex = allPhotos.indexOf(photo.photo_url)
                                setLightboxIndex(globalIndex >= 0 ? globalIndex : 0)
                                setLightboxOpen(true)
                              }}
                            >
                              <Image
                                src={photo.photo_url || "/placeholder.svg"}
                                alt={photo.caption || `Adım ${step.step_number}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <PhotoLightbox images={allPhotos} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  )
}
