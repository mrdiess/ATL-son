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
import { Phone, Mail, MapPin, Building2, Building, Shield, Menu, X, Wrench } from "lucide-react"

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
  description?: string
  category: string
  location: string
  building_type?: string
  project_duration?: string
  featured_image_url?: string
  is_featured: boolean
}

interface HeroImage {
  id: string
  name: string
  url: string
  createdAt: string
}

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753!2d31.1240669!3d40.8522558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d9f3269fc678f%3A0xcd0d2bf0971b8ae4!2sATL%20%C3%87elik%20ve%20Metal%20%C4%B0%C5%9Fleme!5e0!3m2!1str!2str!4v1736012345678!5m2!1str!2str`

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activePhotoTab, setActivePhotoTab] = useState("Tümü")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
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
  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [quoteSubmitting, setQuoteSubmitting] = useState(false)
  const [quoteMessage, setQuoteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [heroImages, setHeroImages] = useState<HeroImage[]>([])
  const [heroLoading, setHeroLoading] = useState(true)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % (heroImages.length || 1))
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + (heroImages.length || 1)) % (heroImages.length || 1))

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
          setGalleryImages(images.length > 0 ? images : [])
          const heroSliderImages = imageItems.slice(0, 3).map((item: MediaItem) => ({
            id: item.id,
            name: item.title || item.filename,
            url: item.url,
            createdAt: item.created_at,
          }))
          setHeroImages(heroSliderImages.length > 0 ? heroSliderImages : [])
        }
      } catch (error) {
        console.error("Media fetch error:", error)
        setGalleryImages([])
        setHeroImages([])
      } finally {
        setMediaLoading(false)
      }
    }

    const fetchSponsors = async () => {
      try {
        const response = await fetch("/api/sponsors")
        if (!response.ok) {
          console.error("[v0] Sponsors response not ok:", response.status, response.statusText)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        if (result.data && Array.isArray(result.data)) {
          setSponsors(result.data)
        } else {
          console.warn("[v0] Sponsors data is not an array:", result)
        }
      } catch (error) {
        console.error("[v0] Sponsors fetch error:", error)
        setSponsors([])
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

  useEffect(() => {
    if (heroImages.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/data/partners.json", {
          cache: "no-store",
        })
        if (!response.ok) throw new Error("Partners verisi yüklenemedi")
        const data: PartnersData = await response.json()
        setPartners(data.partners)
      } catch (error) {
        console.error("[v0] Partners yükleme hatası:", error)
      }
    }
    fetchPartners()
  }, [])

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteSubmitting(true)
    setQuoteMessage(null)

    // Form validasyonu
    if (
      !quoteFormData.name.trim() ||
      !quoteFormData.email.trim() ||
      !quoteFormData.phone.trim() ||
      !quoteFormData.message.trim()
    ) {
      setQuoteMessage({ type: "error", text: "Lütfen tüm alanları doldurunuz" })
      setQuoteSubmitting(false)
      return
    }

    try {
      // Google Form endpoint - bu URL'yi kendi Google Form'unuzun action URL'siyle değiştirin
      const GOOGLE_FORM_URL = "https://docs.google.com/forms/u/0/d/1FAIpQLSc_EXAMPLE_ID/formResponse"

      // FormData oluştur - Google Forms entry.xxxxx mapping'i
      const formData = new FormData()
      formData.append("entry.123456789", quoteFormData.name) // Ad-Soyad
      formData.append("entry.987654321", quoteFormData.email) // E-posta
      formData.append("entry.555555555", quoteFormData.phone) // Telefon
      formData.append("entry.777777777", quoteFormData.message) // Mesaj

      // Google Forms'a POST et
      const response = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors", // CORS hatalarını önle
      })

      // no-cors modunda response kontrolü yapılamaz, always success yap
      setQuoteMessage({
        type: "success",
        text: "Teklif formu başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.",
      })
      setQuoteFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Form submission error:", error)
      setQuoteMessage({ type: "error", text: "Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz." })
    } finally {
      setQuoteSubmitting(false)
    }
  }

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
                <img src="/lightmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 dark:hidden" />
                <img src="/darkmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 hidden dark:block" />
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
              <Link href="/galeri" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Galeri
              </Link>
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
                <Link
                  href="/galeri"
                  onClick={handleNavClick}
                  className="text-foreground hover:text-blue-500 transition-colors font-medium py-2"
                >
                  Galeri
                </Link>
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

      <section
        id="anasayfa"
        className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Slider container */}
        {heroImages.length > 0 && (
          <div className="absolute inset-0 overflow-hidden">
            {heroImages[currentSlide]?.url && (
              <Image
                src={heroImages[currentSlide].url || "/placeholder.svg"}
                alt={heroImages[currentSlide].name || "Hero"}
                fill
                className="object-cover"
                priority={currentSlide === 0}
              />
            )}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-8 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">ATL Çelik Yapı</h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Endüstriyel çelik yapı, metal işleme ve özel üretim hizmetleri ile 20 yılın tecrübesi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => document.getElementById("iletisim")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Teklif Al
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("projeler")?.scrollIntoView({ behavior: "smooth" })}
                className="border-slate-400 text-white hover:bg-slate-800 px-8"
              >
                Projelerimiz
              </Button>
            </div>
          </div>
        </div>

        {heroImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors"
            >
              <span className="text-white">←</span>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors"
            >
              <span className="text-white">→</span>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
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

      {/* Construction Process */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Yapım Süreci</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Projelerimiz Nasıl Hayata Geçiyor?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Her projemiz 6 ana aşamadan geçerek profesyonel standartlarda tamamlanır.
            </p>
          </div>
          <ConstructionProcess />
        </div>
      </section>

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

      {/* Custom Manufacturing */}
      <CustomManufacturing />

      {/* Partners */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-500 font-bold uppercase tracking-wider mb-2">İş Ortaklarımız</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Uzun Soluklu İş Birlikleri</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uzun soluklu iş birlikleriyle güçlü yapılar üretiyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.length > 0 ? (
              partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-6 bg-slate-900/50 dark:bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 hover:opacity-80 transition-all duration-300"
                >
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ))
            ) : (
              <div className="col-span-2 md:col-span-3 lg:col-span-5 text-center text-slate-500 py-8">
                İş ortakları yükleniyor...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="py-16 md:py-24 px-4 md:px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left side - Contact info */}
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

            {/* Right side - Quote form */}
            <div className="bg-card border rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold mb-6">Teklif Formu</h3>

              {/* Feedback message */}
              {quoteMessage && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    quoteMessage.type === "success"
                      ? "bg-green-500/10 text-green-700 dark:text-green-400"
                      : "bg-red-500/10 text-red-700 dark:text-red-400"
                  }`}
                >
                  {quoteMessage.text}
                </div>
              )}

              {/* Quote form */}
              <form className="space-y-4" onSubmit={handleQuoteSubmit}>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={quoteFormData.name}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  value={quoteFormData.email}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  value={quoteFormData.phone}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
                  required
                />
                <textarea
                  placeholder="Mesajınız"
                  value={quoteFormData.message}
                  onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-secondary/50 border rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
                <Button
                  type="submit"
                  disabled={quoteSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 py-3 font-semibold"
                >
                  {quoteSubmitting ? "Gönderiliyor..." : "GÖNDER"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 md:py-16 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Logo Section */}
            <div className="md:col-span-1">
              <Link href="/">
                <img src="/darkmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 mb-4" />
              </Link>
              <p className="text-slate-300 text-sm mb-4">
                Düzce'de 12+ yıllık tecrübeyle profesyonel çelik yapı çözümleri.
              </p>

              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.instagram.com/atl_muhendislik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-500 flex items-center justify-center transition-colors"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7.5 3h9c1.866 0 3 1.134 3 3v9c0 1.866-1.134 3-3 3h-9c-1.866 0-3-1.134-3-3v-9c0-1.866 1.134-3 3-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9a3 3 0 100 6 3 3 0 000-6z"
                    />
                    <circle cx="18" cy="6" r="0.75" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-700 hover:bg-blue-500 flex items-center justify-center transition-colors"
                  title="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.26 0 .52.04.77.12V9.24A5.1 5.1 0 0 0 9.14 9c-2.8 0-5.3 2.26-5.3 5.13 0 2.87 2.13 5.28 5 5.28s5.3-2.39 5.3-5.28v-5.02c1.86 1.43 4.35 2.33 7.07 2.33v-3.72c-1.45-.37-2.78-1.04-3.89-1.95z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services Section */}
            <div className="md:col-span-1">
              <h3 className="font-bold mb-4">Hizmetler</h3>
              <ul className="space-y-2 text-sm">
                {["Çelik Konstrüksiyon", "Sandviç Panel", "Metal İşleme", "Özel Üretim"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate Section */}
            <div className="md:col-span-1">
              <h3 className="font-bold mb-4">Kurumsal</h3>
              <ul className="space-y-2 text-sm">
                {["Hakkımızda", "Projeler", "Referanslar"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Section */}
            <div className="md:col-span-1">
              <h3 className="font-bold mb-4">Destek</h3>
              <ul className="space-y-2 text-sm">
                {["Teklif Al", "SSS", "İletişim"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-blue-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
            <p>© 2025 ATL Çelik Yapı. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-6">
              <span className="text-slate-400">Tasarım: rootbarann</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/atl_muhendislik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                  title="Instagram"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7.5 3h9c1.866 0 3 1.134 3 3v9c0 1.866-1.134 3-3 3h-9c-1.866 0-3-1.134-3-3v-9c0-1.866 1.134-3 3-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9a3 3 0 100 6 3 3 0 000-6z"
                    />
                    <circle cx="18" cy="6" r="0.75" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors"
                  title="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.26 0 .52.04.77.12V9.24A5.1 5.1 0 0 0 9.14 9c-2.8 0-5.3 2.26-5.3 5.13 0 2.87 2.13 5.28 5 5.28s5.3-2.39 5.3-5.28v-5.02c1.86 1.43 4.35 2.33 7.07 2.33v-3.72c-1.45-.37-2.78-1.04-3.89-1.95z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {lightboxOpen && (
        <PhotoLightbox images={galleryImages} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  )
}
