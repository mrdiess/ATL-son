"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Phone } from "lucide-react"

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  location: string
  featured_image_url?: string
  is_featured: boolean
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        if (!res.ok) throw new Error("Projects fetch failed")
        const json = await res.json()
        setProjects(json.data || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const featuredProjects = projects.filter(p => p.is_featured)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            ATL Çelik Yapı
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              Hemen Ara
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Çelik Yapıda Güvenilir Çözüm Ortağınız
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Endüstriyel çelik yapılar, sandviç panel ve metal işleme alanlarında
          profesyonel hizmet.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">
          Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>

      {/* PROJECTS */}
      <section id="projeler" className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Öne Çıkan Projelerimiz
            </h2>
            <p className="text-muted-foreground">
              Gerçekleştirdiğimiz bazı seçili projeler
            </p>
          </div>

          {loading && (
            <p className="text-center text-muted-foreground">
              Projeler yükleniyor...
            </p>
          )}

          {!loading && featuredProjects.length === 0 && (
            <p className="text-center text-muted-foreground">
              Henüz proje eklenmedi.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <div
                key={project.id}
                className="bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative h-56">
                  <Image
                    src={project.featured_image_url || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.location}
                  </p>

                  <Link
                    href={`/projeler/${project.slug}`}
                    className="text-blue-500 font-semibold text-sm hover:underline"
                  >
                    Projeyi İncele →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-muted-foreground">
        © 2025 ATL Çelik Yapı. Tüm hakları saklıdır.
      </footer>
    </div>
  )
}
