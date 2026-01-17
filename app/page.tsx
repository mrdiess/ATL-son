"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

/* ================= TYPES ================= */

interface Sponsor {
  id: string
  name: string
  logo_url: string
  sort_order: number
}

interface BeforeAfterProject {
  slug: string
  before: string | null
  after: string | null
}

/* ================= PAGE ================= */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  const [projects, setProjects] = useState<BeforeAfterProject[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  /* ================= SLIDER ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
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

  /* ================= PROJECTS (BEFORE / AFTER) ================= */

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

      {/* ================= BEFORE / AFTER ================= */}
      <section id="projeler" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">
              Projelerimiz
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Öncesi / Sonrası
            </h2>
          </div>

          {projectsLoading ? (
            <div className="text-center text-muted-foreground py-12">
              Projeler yükleniyor...
            </div>
          ) : (
            <div className="space-y-20">
              {projects.map((project) => (
                <div key={project.slug}>
                  <h3 className="text-xl font-bold mb-6 text-center">
                    {project.slug}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* BEFORE */}
                    <div className="relative rounded-xl overflow-hidden border">
                      {project.before ? (
                        <img
                          src={project.before}
                          alt={`${project.slug} Öncesi`}
                          className="w-full h-80 object-cover"
                        />
                      ) : (
                        <div className="h-80 flex items-center justify-center text-muted-foreground">
                          Öncesi görseli yok
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded">
                        Öncesi
                      </span>
                    </div>

                    {/* AFTER */}
                    <div className="relative rounded-xl overflow-hidden border">
                      {project.after ? (
                        <img
                          src={project.after}
                          alt={`${project.slug} Sonrası`}
                          className="w-full h-80 object-cover"
                        />
                      ) : (
                        <div className="h-80 flex items-center justify-center text-muted-foreground">
                          Sonrası görseli yok
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded">
                        Sonrası
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

