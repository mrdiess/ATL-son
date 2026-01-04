"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
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

export const dynamic = "force-dynamic";


interface MediaItem {
  id: string
  filename: string
  url: string
  file_type: string
  category: string
  size: number
  created_at: string
  title?: string
  stage?: string
  project_slug?: string
}

interface Sponsor {
  id: string
  name: string
  logo_url: string
  website_url?: string
  sort_order: number
}

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  category: string
  location: string
  building_type?: string
  project_duration?: string
  featured_image_url?: string
  is_featured: boolean
}

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753!2d31.1240669!3d40.8522558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d9f3269fc678f%3A0xcd0d2bf0971b8ae4!2sATL%20%C3%87elik%20ve%20Metal%20%C4%B0%C5%9Fleme!5e0!3m2!1str!2str!4v1736012345678!5m2!1str!2str`

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activePhotoTab, setActivePhotoTab] = useState("Tümü")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [mediaCategories, setMediaCategories] = useState<string[]>(["Tümü"])
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([])
  const [mediaLoading, setMediaLoading] = useState(true)
  const [visibleImageCount, setVisibleImageCount] = useState(8)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [phaseModalOpen, setPhaseModalOpen] = useState(false)
  const [phaseModalIndex, setPhaseModalIndex] = useState(0)
  const [currentPhaseImages, setCurrentPhaseImages] = useState<string[]>([])

  const constructionPhases = [
    {
      id: 1,
      title: "Temel & Saha Hazırlığı",
      description: "Zemin etüdü, temel kazısı ve ankraj montajı ile projenin sağlam temelleri atılır.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 2,
      title: "Çelik Kolon & Kiriş Montajı",
      description: "Prefabrik çelik kolonlar ve ana taşıyıcı kirişler vinç yardımıyla monte edilir.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 3,
      title: "Çatı & Duvar Panelleri",
      description: "Sandviç panel çatı ve duvar kaplamaları ile yapı dış etkilerden korunur.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 4,
      title: "Tamamlama & Teslim",
      description: "Son kontroller, boya işleri ve kalite testleri ile proje müşteriye teslim edilir.",
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
  ]

  const openPhaseModal = (images: string[], index: number) => {
    setCurrentPhaseImages(images)
    setPhaseModalIndex(index)
    setPhaseModalOpen(true)
  }

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const result = await response.json()
        if (result.data) {
          setAllMediaItems(result.data)
          const uniqueCategories = [
            "Tümü",
            ...Array.from(new Set(result.data.map((item: MediaItem) => item.category).filter(Boolean))),
          ]
          setMediaCategories(uniqueCategories)
          const imageItems = result.data.filter((item: MediaItem) => item.file_type.startsWith("image"))
          const images = imageItems.map((item: MediaItem) => item.url)
          setGalleryImages(
            images.length > 0
              ? images
              : [
                  "/steel-construction-industrial-factory-building.jpg",
                  "/industrial-steel-factory-workers-warehouse.jpg",
                  "/sandwich-panel-building-construction-modern.jpg",
                ],
          )
        }
      } catch (error) {
        console.error("Media fetch error:", error)
        setGalleryImages([
          "/steel-construction-industrial-factory-building.jpg",
          "/industrial-steel-factory-workers-warehouse.jpg",
          "/sandwich-panel-building-construction-modern.jpg",
        ])
      } finally {
        setMediaLoading(false)
      }
    }

    const fetchSponsors = async () => {
      try {
        const response = await fetch("/api/sponsors")
        if (response.ok) {
          const result = await response.json()
          setSponsors(result.data || [])
        }
      } catch (error) {
        console.error("Sponsors fetch error:", error)
      }
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const result = await response.json()
          setProjects(result.data || [])
        }
      } catch (error) {
        console.error("Projects fetch error:", error)
      } finally {
        setProjectsLoading(false)
      }
    }

    fetchMedia()
    fetchSponsors()
    fetchProjects()
  }, [])

  const slides = [
    {
      img: "/steel-construction-industrial-factory-building.jpg",
      title: "Çelik Konstrüksiyon",
      sub: "Endüstriyel tesis ve depo çözümleriniz için",
    },
    {
      img: "/sandwich-panel-building-construction-modern.jpg",
      title: "Sandviç Panel",
      sub: "Profesyonel üretim ve montaj hizmetleri",
    },
    {
      img: "/industrial-steel-factory-workers-warehouse.jpg",
      title: "Metal İşleme",
      sub: "Kaliteli ve hızlı metal işleme çözümleri",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const filteredImages =
    activePhotoTab === "Tümü"
      ? galleryImages
      : galleryImages.filter((_, i) => allMediaItems[i]?.category === activePhotoTab)

  const displayedImages = filteredImages.slice(0, visibleImageCount)
  const hasMoreImages = filteredImages.length > visibleImageCount

  const featuredProjects = projects.filter((p) => p.is_featured).slice(0, 3)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/">
                <img src="/images/logo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 dark:hidden" />
                <img src="/images/logo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 hidden dark:block" />
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#anasayfa" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Ana Sayfa
              </a>
              <a href="#hizmetler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Hizmetler
              </a>
              <a href="#projeler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Projeler
              </a>
              <a href="#hakkimizda" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Hakkımızda
              </a>
              <a href="#iletisim" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                İletişim
              </a>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <a
                href="tel:+905373393947"
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm md:text-base font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Hemen Ara</span>
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t bg-background/95 backdrop-blur-md">
              <div className="flex flex-col gap-4">
                <a
                  href="#anasayfa"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Ana Sayfa
                </a>
                <a
                  href="#hizmetler"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Hizmetler
                </a>
                <a
                  href="#projeler"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Projeler
                </a>
                <a
                  href="#hakkimizda"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Hakkımızda
                </a>
                <a
                  href="#iletisim"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  İletişim
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="anasayfa" className="relative h-screen pt-16 md:pt-20">
        <div className="absolute inset-0">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === i ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={slide.img || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12 max-w-7xl mx-auto">
          <p className="text-blue-400 text-sm mb-2 md:mb-4 tracking-wider font-bold md:text-lg">
            {slides[currentSlide].sub}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight text-white">
            {slides[currentSlide].title}
          </h1>

          <div className="flex gap-8 mb-8 text-white/90">
            <div>
              <span className="text-3xl md:text-4xl font-bold text-blue-400">12+</span>
              <p className="text-sm">Yıl Tecrübe</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-blue-400">1000+</span>
              <p className="text-sm">Proje</p>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-bold text-blue-400">81</span>
              <p className="text-sm">İl</p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 md:px-8 py-3 md:py-6 text-sm md:text-lg font-semibold">
              Teklif Al <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
            </Button>
            <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-6 md:px-8 py-3 md:py-6 text-sm md:text-lg font-semibold">
              Projelerimiz
            </Button>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Services */}
      <section id="hizmetler" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">Hizmetlerimiz</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Çelik Yapı Çözümleri</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Düzce merkezli, 81 ile profesyonel hizmet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Endüstriyel Yapılar", desc: "Fabrika, depo ve ticari yapılar" },
              { icon: Building, title: "Sandviç Panel", desc: "Satış ve montaj hizmetleri" },
              { icon: Wrench, title: "Metal İşleme", desc: "Sac kesme, bükme, kaynak" },
              { icon: Shield, title: "Soğuk Hava Deposu", desc: "Panel satışı ve montajı" },
            ].map((service, idx) => (
              <div key={idx} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-all text-center">
                <service.icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Construction Process Showcase */}
      <section id="projeler" className="py-16 md:py-24 px-4 md:px-6 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-blue-500 font-semibold text-sm uppercase tracking-wider">Yapım Süreci</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Projelerimiz Nasıl Hayata Geçiyor?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Her projemiz 4 ana aşamadan geçerek profesyonel standartlarda tamamlanır.
            </p>
          </div>

          {/* Construction Phases Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-blue-500/20" />

            {/* Phases */}
            <div className="space-y-12">
              {constructionPhases.map((phase, phaseIndex) => (
                <div key={phase.id} className="relative pl-20 md:pl-28">
                  {/* Phase Number Circle */}
                  <div className="absolute left-4 md:left-8 top-0 w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base z-10">
                    {phase.id}
                  </div>

                  {/* Phase Content */}
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    {/* Phase Title & Description */}
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{phase.title}</h3>
                    <p className="text-muted-foreground mb-6">{phase.description}</p>

                    {/* Phase Images Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {phase.images.map((img, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => openPhaseModal(phase.images, imgIndex)}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`${phase.title} - Görsel ${imgIndex + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Sizin projeniz için de aynı kaliteyi sunmak istiyoruz.</p>
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <a href="#iletisim">Ücretsiz Keşif Talep Et</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Phase Images Lightbox Modal */}
      {phaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setPhaseModalOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={() => setPhaseModalIndex((prev) => (prev > 0 ? prev - 1 : currentPhaseImages.length - 1))}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={currentPhaseImages[phaseModalIndex] || "/placeholder.svg"}
              alt="Yapım aşaması görseli"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() => setPhaseModalIndex((prev) => (prev < currentPhaseImages.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {phaseModalIndex + 1} / {currentPhaseImages.length}
          </div>
        </div>
      )}

      {/* About */}
      <section id="hakkimizda" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 md:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="/industrial-steel-factory-workers-warehouse.jpg"
                alt="Fabrika"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur rounded-xl p-4 border">
                <div className="text-4xl font-bold text-blue-500">12+</div>
                <div className="text-sm">Yıllık Tecrübe</div>
              </div>
            </div>

            <div>
              <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">Hakkımızda</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Çelik Sektöründe Güvenilir Çözüm Ortağı</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Düzce merkezli olmakla birlikte 81 ile profesyonel hizmet vermekteyiz. Sandviç Panel, Sac Kesme-Bükme,
                Demir Çelik Profil, Soğuk Hava Deposu ve her türlü kaynaklı yapılar konusunda uzman ekibimizle
                yanınızdayız.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {["ISO 9001 Belgeli", "CE Sertifikalı", "Zamanında Teslimat", "Garantili İşçilik"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">Daha Fazla Bilgi</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="py-16 md:py-24 px-4 md:px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">İletişim</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bize Ulaşın</h2>
              <p className="text-muted-foreground mb-8">
                Projeleriniz için profesyonel çelik yapı çözümleri sunuyoruz.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Telefon", value: "+90 537 339 39 47" },
                  { icon: Mail, label: "E-posta", value: "info@atlcelikyapi.com" },
                  { icon: MapPin, label: "Adres", value: "Küçük Sanayi Sitesi, Düzce" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-muted-foreground text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6">Teklif Formu</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Mesajınız"
                  rows={4}
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"
                />
                <Button className="w-full bg-blue-500 hover:bg-blue-600 py-3 font-semibold">GÖNDER</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {sponsors.length > 0 && (
            <div className="mb-12 pb-12 border-b border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">İş Ortaklarımız</h2>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="text-white/90 text-lg font-bold">
                    {sponsor.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12 pb-12 border-b border-white/20">
            <h2 className="text-xl font-bold text-white mb-6 text-center">Biz Neredeyiz?</h2>
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={GOOGLE_MAPS_EMBED}
                allowFullScreen
                loading="lazy"
                title="Konum"
              ></iframe>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <img src="/images/logo.png" alt="ATL Çelik Yapı" className="h-20 md:h-24" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-white/20">
            <div>
              <h3 className="font-bold mb-4 text-white">Hizmetler</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                {["Çelik Konstrüksiyon", "Sandviç Panel", "Metal İşleme", "Özel Üretim"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Kurumsal</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                {["Hakkımızda", "Projeler", "Referanslar"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Destek</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                {["Teklif Al", "SSS", "İletişim"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">İletişim</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>
                  <a href="tel:+905373393947" className="hover:text-white">
                    0537 339 39 47
                  </a>
                </li>
                <li>
                  <a href="mailto:info@atlcelikyapi.com" className="hover:text-white">
                    info@atlcelikyapi.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <p>© 2025 ATL Çelik Yapı. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/atlcelikyapi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@atlcelikyapi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <span className="text-white/60 text-xs">
              Designed by{" "}
              <a
                href="https://github.com/rootbarann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                @rootbarann
              </a>
            </span>
          </div>
        </div>
      </footer>

      {lightboxOpen && (
        <PhotoLightbox images={galleryImages} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  )
}
