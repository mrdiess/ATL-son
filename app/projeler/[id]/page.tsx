"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { PhotoLightbox } from "@/components/photo-lightbox"
import { ChevronLeft, MapPin, Clock, Building, CheckCircle2 } from "lucide-react"

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

// Default construction phases for fallback
const DEFAULT_PHASES = [
  {
    id: "phase-1",
    step_number: 1,
    title: "Saha Hazırlığı ve Temel",
    description: "Arazinin hazırlanması, temel kazısı ve beton döküm işlemleri",
    project_photos: [],
  },
  {
    id: "phase-2",
    step_number: 2,
    title: "Çelik Yapı Montajı",
    description: "Ana taşıyıcı kolonların ve kirişlerin montajı",
    project_photos: [],
  },
  {
    id: "phase-3",
    step_number: 3,
    title: "Çatı ve Duvar Panelleri",
    description: "Sandwich panel ve çatı kaplama işlemleri",
    project_photos: [],
  },
  {
    id: "phase-4",
    step_number: 4,
    title: "Tamamlama ve Teslim",
    description: "Son kontroller ve proje teslimi",
    project_photos: [],
  },
]

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
        if (stepsData.data && stepsData.data.length > 0) {
          setSteps(stepsData.data)
          const photos: string[] = []
          stepsData.data.forEach((step: ProjectStep) => {
            if (step.project_photos) {
              step.project_photos.forEach((p) => photos.push(p.photo_url))
            }
          })
          setAllPhotos(photos)
        } else {
          // Use default phases if no steps exist
          setSteps(DEFAULT_PHASES as ProjectStep[])
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        setSteps(DEFAULT_PHASES as ProjectStep[])
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
          <Link href="/#projeler" className="text-blue-500 hover:underline">
            Projelere dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Project Header */}
      <div className="pt-24 pb-12 px-4 md:px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#projeler"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 mb-6 font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Projelere Dön
          </Link>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                {project.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{project.location}</span>
                  </div>
                )}
                {project.building_type && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-500" />
                    <span>{project.building_type}</span>
                  </div>
                )}
                {project.project_duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{project.project_duration}</span>
                  </div>
                )}
              </div>

              {project.description && <p className="text-muted-foreground leading-relaxed">{project.description}</p>}
            </div>

            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <Image
                src={project.featured_image_url || "/placeholder.svg?height=400&width=600&query=steel construction"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Construction Phases Timeline */}
      <div className="py-16 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Yapım Aşamaları</h2>
            <p className="text-muted-foreground">Proje temelden teslimata kadar adım adım</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Desktop */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300" />

            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={step.id} className="relative">
                  {/* Step Cover Photo */}
                  {step.project_photos && step.project_photos.length > 0 && (
                    <div className="mb-4 h-48 md:h-64 rounded-xl overflow-hidden relative">
                      <Image
                        src={step.project_photos[0].photo_url || "/placeholder.svg"}
                        alt={`${step.title} - Kapak`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                          Adım {step.step_number}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="md:ml-20 bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    {/* Step Number - Desktop */}
                    <div className="hidden md:flex absolute left-0 top-6 w-16 h-16 bg-blue-500 rounded-full items-center justify-center text-white text-xl font-bold shadow-lg">
                      {step.step_number}
                    </div>

                    {/* Step Header */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Step Number - Mobile */}
                      <div className="md:hidden flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step_number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                        {step.description && <p className="text-muted-foreground text-sm">{step.description}</p>}
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    </div>

                    {/* Phase Photos */}
                    {step.project_photos && step.project_photos.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        {step.project_photos.map((photo, photoIdx) => (
                          <div
                            key={photo.id}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => {
                              const globalIndex = allPhotos.indexOf(photo.photo_url)
                              setLightboxIndex(globalIndex >= 0 ? globalIndex : 0)
                              setLightboxOpen(true)
                            }}
                          >
                            <Image
                              src={photo.photo_url || "/placeholder.svg"}
                              alt={photo.caption || `${step.title} - Fotoğraf ${photoIdx + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4 p-8 bg-secondary/30 rounded-lg text-center">
                        <p className="text-muted-foreground text-sm">Bu aşamaya ait fotoğraflar yakında eklenecek</p>
                      </div>
                    )}
                  </div>

                  {/* Connector Line - Between steps */}
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute left-[31px] top-[88px] w-0.5 h-8 bg-blue-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Back to Projects */}
          <div className="text-center mt-12">
            <Link
              href="/#projeler"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Diğer Projeleri Gör
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && allPhotos.length > 0 && (
        <PhotoLightbox images={allPhotos} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  )
}
