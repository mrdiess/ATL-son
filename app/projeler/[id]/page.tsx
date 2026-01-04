"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { PhotoLightbox } from "@/components/photo-lightbox"
import { ChevronLeft, MapPin } from "lucide-react"
import Link from "next/link"

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
  start_date?: string
  end_date?: string
  project_photos: ProjectPhoto[]
}

interface Project {
  id: string
  title: string
  description?: string
  slug: string
  category: string
  location: string
  client_name?: string
  start_date?: string
  end_date?: string
  featured_image_url: string
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [allPhotos, setAllPhotos] = useState<ProjectPhoto[]>([])

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        // Fetch project
        const projectRes = await fetch(`/api/projects?id=${params.id}`)
        const projectData = await projectRes.json()
        if (projectData.data && projectData.data.length > 0) {
          setProject(projectData.data[0])
        }

        // Fetch steps with photos
        const stepsRes = await fetch(`/api/project-steps?project_id=${params.id}`)
        const stepsData = await stepsRes.json()
        if (stepsData.data) {
          setSteps(stepsData.data)
          // Collect all photos for lightbox
          const photos: ProjectPhoto[] = []
          stepsData.data.forEach((step: ProjectStep) => {
            if (step.project_photos) {
              photos.push(...step.project_photos)
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
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">Yükleniyor...</div>
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
      <div className="pt-20 pb-12 px-4 md:px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <Link href="/#projeler" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6">
            <ChevronLeft className="w-4 h-4" />
            Projelere Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 md:gap-6 text-muted-foreground">
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            )}
            {project.category && <span className="text-blue-500 font-medium">{project.category}</span>}
          </div>
          {project.description && <p className="mt-6 text-lg text-muted-foreground max-w-3xl">{project.description}</p>}
        </div>
      </div>

      {/* Timeline with Photos */}
      <div className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {steps.length === 0 ? (
            <div className="text-center text-muted-foreground">Yapım aşamaları bulunamadı</div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 -translate-x-1/2" />

              {/* Steps */}
              <div className="space-y-12 md:space-y-16">
                {steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-start`}
                  >
                    {/* Timeline Dot */}
                    <div className="hidden md:flex flex-1 justify-end">
                      <div className="relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold ring-4 ring-background z-10">
                        {step.step_number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="md:hidden mb-4 inline-block bg-blue-500 text-white rounded-full px-4 py-2 font-bold">
                        Adım {step.step_number}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      {step.description && <p className="text-muted-foreground mb-6">{step.description}</p>}

                      {/* Photos Grid */}
                      {step.project_photos && step.project_photos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                          {step.project_photos.map((photo, photoIdx) => (
                            <div
                              key={photo.id}
                              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                              onClick={() => {
                                const globalIndex = allPhotos.findIndex((p) => p.id === photo.id)
                                setLightboxIndex(globalIndex)
                                setLightboxOpen(true)
                              }}
                            >
                              <Image
                                src={photo.photo_url || "/placeholder.svg"}
                                alt={photo.caption || `Step ${step.step_number}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
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

      {/* Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox
          images={allPhotos.map((p) => p.photo_url)}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
