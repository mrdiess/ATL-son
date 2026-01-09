"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
import ConstructionProcess from "@/components/construction-process"
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

interface MediaItem {
  id: string
  url: string
  file_type: string
  category?: string
}

interface Sponsor {
  id: string
  name: string
}

interface Project {
  id: string
  title: string
  is_featured: boolean
}

const GOOGLE_MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753!2d31.1240669!3d40.8522558"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  /* -------------------- SLIDER -------------------- */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  /* -------------------- SCROLL -------------------- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* -------------------- DATA FETCH -------------------- */
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/media")
        const json = await res.json()

        const images = (json.data as unknown[])
          .filter(
            (item): item is MediaItem =>
              typeof item === "object" &&
              item !== null &&
              typeof (item as MediaItem).url === "string" &&
              typeof (item as MediaItem).file_type === "string" &&
              (item as MediaItem).file_type.startsWith("image"),
          )
          .map((item) => item.url)

        setGalleryImages(
          images.length > 0
            ? images
            : [
                "/steel-construction-industrial-factory-building.jpg",
                "/industrial-steel-factory-workers-warehouse.jpg",
                "/sandwich-panel-building-construction-modern.jpg",
              ],
        )
      } catch {
        setGalleryImages([
          "/steel-construction-industrial-factory-building.jpg",
          "/industrial-steel-factory-workers-warehouse.jpg",
          "/sandwich-panel-building-construction-modern.jpg",
        ])
      }
    }

    const fetchSponsors = async () => {
      try {
        const res = await fetch("/api/sponsors")
        const json = await res.json()
        setSponsors(json.data ?? [])
      } catch {}
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects")
        const json = await res.json()
        setProjects(json.data ?? [])
      } catch {}
    }

    fetchMedia()
    fetchSponsors()
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition ${
          isScrolled ? "bg-background/95 backdrop-blur border-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <img src="/images/logo.png" alt="ATL Çelik Yapı" className="h-12" />
          </Link>

          <nav className="hidden md:flex gap-6 font-medium">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#projeler">Projeler</a>
            <a href="#iletisim">İletişim</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Ara
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="anasayfa" className="h-screen relative">
        <Image
          src={galleryImages[0] ?? "/steel-construction-industrial-factory-building.jpg"}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8 text-white">
          <h1 className="text-5xl font-bold mb-6">ATL Çelik Yapı</h1>
          <Button className="bg-blue-500 w-fit">
            Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <button key={i} onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}>
              <Image src={img} alt="" width={400} height={300} className="rounded-lg object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="iletisim" className="py-20 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">İletişim</h2>
            <p>+90 537 339 39 47</p>
            <p>info@atlcelikyapi.com</p>
          </div>
          <iframe
            src={GOOGLE_MAPS_EMBED}
            className="w-full h-64 rounded-lg"
            loading="lazy"
          />
        </div>
      </section>

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
