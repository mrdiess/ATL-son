"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
import {
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

/* ================= TYPES ================= */

interface MediaItem {
  id: string
  url: string
  category?: string
  file_type: string
  created_at: string
}

interface Sponsor {
  id: string
  name: string
  logo_url: string
  sort_order: number
}

interface Project {
  id: string
  title: string
  slug: string
  location?: string
  featured_image_url?: string
}

/* ================= PAGE ================= */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  /* ================= MEDIA ================= */

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/media", { cache: "no-store" })
        const result = await res.json()

        if (!Array.isArray(result.data)) return

        const images = result.data
          .filter(
            (item: MediaItem) =>
              typeof item.file_type === "string" &&
              item.file_type.startsWith("image")
          )
          .map((item: MediaItem) => item.url)

        setGalleryImages(images)
      } catch {
        setGalleryImages([])
      }
    }

    fetchMedia()
  }, [])

  /* ================= SPONSORS ================= */

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await fetch("/api/sponsors", { cache: "no-store" })
        const result = await res.json()
        if (Array.isArray(result.data)) {
          setSponsors(result.data)
        }
      } catch {
        setSponsors([])
      }
    }

    fetchSponsors()
  }, [])

  /* ================= PROJECTS ================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" })
        const result = await res.json()

        if (Array.isArray(result.data)) {
          setProjects(result.data)
        } else {
          setProjects([])
        }
      } catch {
        setProjects([])
      } finally {
        setProjectsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  /* ================= SLIDER ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" alt="ATL" className="h-10 dark:hidden" />
            <img src="/darkmodelogo.png" alt="ATL" className="h-10 hidden dark:block" />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="hidden md:flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              <Phone className="w-4 h-4" /> Hemen Ara
            </a>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="h-screen relative pt-16">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={[
                "/steel-construction-industrial-factory-building.jpg",
                "/sandwich-panel-building-construction-modern.jpg",
                "/industrial-steel-factory-workers-warehouse.jpg",
              ][i]}
              alt="Hero"
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
          className="absolute left-4 top-1/2 z-10"
        >
          <ChevronLeft className="text-white w-8 h-8" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          className="absolute right-4 top-1/2 z-10"
        >
          <ChevronRight className="text-white w-8 h-8" />
        </button>
      </section>

      {/* ================= SPONSORS ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Uzun Soluklu İş Birlikleri
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sponsors.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-center p-6 border rounded-xl"
              >
                <Image
                  src={s.logo_url}
                  alt={s.name}
                  width={140}
                  height={70}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section id="projeler" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">
              Projelerimiz
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tamamlanan Çalışmalar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Çelik yapı, ferforje ve endüstriyel projelerimizden bazıları
            </p>
          </div>

          {projectsLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Projeler yükleniyor...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Henüz proje eklenmemiştir.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-56 bg-muted">
                    <img
                      src={
                        project.featured_image_url ||
                        "/steel-construction-industrial-factory-building.jpg"
                      }
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">
                      {project.title}
                    </h3>

                    {project.location && (
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.location}
                      </p>
                    )}

                    <a
                      href={`/projeler/${project.slug}`}
                      className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold text-sm"
                    >
                      Projeyi İncele →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      {lightboxOpen && (
        <PhotoLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
