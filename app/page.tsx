"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
import ConstructionProcess from "@/components/construction-process"
import CustomManufacturing from "@/components/custom-manufacturing"
import {
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
  Building,
  Shield,
  Menu,
  X,
  ArrowRight,
  Wrench,
} from "lucide-react"

/* ================= TYPES ================= */

interface MediaItem {
  id: string
  filename: string
  url: string
  file_type: string
  category: string
  size: number
  created_at: string
}

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

interface PartnersData {
  partners: Partner[]
}

interface Project {
  id: string
  title: string
  slug: string
  is_featured: boolean
}

/* ================= COMPONENT ================= */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activePhotoTab, setActivePhotoTab] = useState("Tümü")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [mediaCategories, setMediaCategories] = useState<string[]>(["Tümü"])
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  /* ================= SLIDER ================= */

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % 3)
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + 3) % 3)

  /* ================= MEDIA ================= */

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/media")
        const result = await res.json()

        if (Array.isArray(result.data)) {
          setAllMediaItems(result.data)

          // ✅ FINAL TS FIX
          const categories: string[] = result.data
            .map((item: MediaItem) => item.category)
            .filter(
              (c: string | null | undefined): c is string =>
                typeof c === "string"
            )

          setMediaCategories(["Tümü", ...new Set(categories)])

          const images = result.data
            .filter((i: MediaItem) => i.file_type.startsWith("image"))
            .map((i: MediaItem) => i.url)

          setGalleryImages(
            images.length
              ? images
              : [
                  "/steel-construction-industrial-factory-building.jpg",
                  "/industrial-steel-factory-workers-warehouse.jpg",
                  "/sandwich-panel-building-construction-modern.jpg",
                ]
          )
        }
      } catch (e) {
        console.error(e)
      }
    }

    const fetchPartners = async () => {
      try {
        const res = await fetch("/data/partners.json", { cache: "no-store" })
        const data: PartnersData = await res.json()
        setPartners(data.partners)
      } catch (e) {
        console.error(e)
      }
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        const data = await res.json()
        setProjects(data.data || [])
      } catch (e) {
        console.error(e)
      }
    }

    fetchMedia()
    fetchPartners()
    fetchProjects()
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? "bg-background/90 backdrop-blur border-b" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" className="h-12 dark:hidden" />
            <img src="/darkmodelogo.png" className="h-12 hidden dark:block" />
          </Link>

          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#projeler">Projeler</a>
            <Link href="/galeri">Galeri</Link>
            <a href="#iletisim">İletişim</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              <Phone className="inline w-4 h-4 mr-1" /> Ara
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="anasayfa" className="h-screen relative pt-16">
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
              alt="ATL Çelik Yapı"
              fill
              className="object-cover"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Çelik Yapıda Güven
          </h1>
          <Button className="bg-blue-500 w-fit">
            Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-20 text-white"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-20 text-white"
        >
          <ChevronRight />
        </button>
      </section>

      {/* PROCESS */}
      <ConstructionProcess />

      {/* CUSTOM */}
      <CustomManufacturing />

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-10 text-center">
        © 2025 ATL Çelik Yapı
      </footer>

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
