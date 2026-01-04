"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
import { VideoModal } from "@/components/video-modal"
import { Phone, Mail, MapPin, ChevronLeft, ChevronRight, Building2, Building, Sun, Shield, Menu, X } from "lucide-react"

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

interface VideoItem {
  id: string
  title: string
  youtube_id: string
  youtube_url: string
  category: string
  thumbnail_url?: string
  is_active: boolean
}

interface Sponsor {
  id: string
  name: string
  logo_url: string
  website_url?: string
  sort_order: number
}

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753!2d31.1240669!3d40.8522558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d9f3269fc678f%3A0xcd0d2bf0971b8ae4!2sATL%20%C3%87elik%20ve%20Metal%20%C4%B0%C5%9Fleme!5e0!3m2!1str!2str!4v1736012345678!5m2!1str!2str`

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activePhotoTab, setActivePhotoTab] = useState("Tümü")
  const [activeVideoTab, setActiveVideoTab] = useState("Tümü")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [selectedVideoId, setSelectedVideoId] = useState("")
  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [mediaLoading, setMediaLoading] = useState(true)
  const [videosLoading, setVideosLoading] = useState(true)

  const [visibleImageCount, setVisibleImageCount] = useState(8)

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const result = await response.json()
        if (result.data) {
          const images = result.data
            .filter((item: MediaItem) => item.file_type.startsWith("image"))
            .map((item: MediaItem) => item.url)
          setGalleryImages(
            images.length > 0
              ? images
              : [
                  "/steel-construction-industrial-factory-building.jpg",
                  "/steel-construction-building-project-warehouse-.jpg",
                  "/industrial-steel-factory-workers-warehouse.jpg",
                  "/sandwich-panel-building-construction-modern.jpg",
                  "/steel-construction-industrial-factory-building.jpg",
                  "/industrial-industrial-.jpg",
                  "/steel-construction-building-project-warehouse-.jpg",
                  "/laser-cutting-metal-industrial-sparks.jpg",
                ],
          )
        }
      } catch (error) {
        console.error("Media fetch error:", error)
        setGalleryImages([
          "/steel-construction-industrial-factory-building.jpg",
          "/steel-construction-building-project-warehouse-.jpg",
          "/industrial-steel-factory-workers-warehouse.jpg",
          "/sandwich-panel-building-construction-modern.jpg",
          "/steel-construction-industrial-factory-building.jpg",
          "/industrial-industrial-.jpg",
          "/steel-construction-building-project-warehouse-.jpg",
          "/laser-cutting-metal-industrial-sparks.jpg",
        ])
      } finally {
        setMediaLoading(false)
      }
    }

    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const result = await response.json()
        if (result.data && Array.isArray(result.data)) {
          setVideos(result.data)
        }
      } catch (error) {
        console.error("Videos fetch error:", error)
        setVideos([])
      } finally {
        setVideosLoading(false)
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
        setSponsors([])
      }
    }

    fetchMedia()
    fetchVideos()
    fetchSponsors()
  }, [])

  const slides = [
    {
      img: "/steel-construction-industrial-factory-building.jpg",
      title: "Çelik\nKonstrüksiyon",
      sub: "Endüstriyel tesis ve depo çözümleriniz için",
    },
    {
      img: "/laser-cutting-metal-industrial-sparks.jpg",
      title: "Lazer\nKesim",
      sub: "Yüksek hassasiyetli metal işleme",
    },
    {
      img: "/sandwich-panel-building-construction-modern.jpg",
      title: "Sandviç\nPanel",
      sub: "Profesyonel üretim ve montaj hizmetleri",
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

  const displayedImages = galleryImages.slice(0, visibleImageCount)
  const hasMoreImages = galleryImages.length > visibleImageCount

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img src="/images/logo.png" alt="ATL Çelik Yapı" className="h-10 md:h-14 dark:hidden" />
                <img src="/darkmodelogo.png" alt="ATL Çelik Yapı" className="h-10 md:h-14 hidden dark:block" />
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
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

            {/* Right side - Theme toggle and Phone button */}
            <div className="flex items-center gap-2 md:gap-4">
              <ThemeToggle />
              <a
                href="tel:+905373393947"
                className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm md:text-base font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Hemen Ara</span>
              </a>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-foreground">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
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

      {/* Hero Slider */}
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-12 max-w-7xl mx-auto">
          <p className="text-blue-400 text-xs mb-2 md:mb-4 tracking-wider font-bold md:text-lg">
            {slides[currentSlide].sub}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-8 leading-tight whitespace-pre-line text-white">
            {slides[currentSlide].title}
          </h1>
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-8 py-3 md:py-6 text-sm md:text-lg">
              Keşfet <ChevronRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
            </Button>
            <Button className="bg-transparent border border-white text-white hover:bg-white/10 px-4 md:px-8 py-3 md:py-6 text-sm md:text-lg">
              İletişime Geç
            </Button>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-black/50 hover:bg-black/70 rounded-full transition"
        >
          <ChevronLeft size={20} className="md:w-6 md:h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-black/50 hover:bg-black/70 rounded-full transition"
        >
          <ChevronRight size={20} className="md:w-6 md:h-6 text-white" />
        </button>
      </section>

      {/* Company Profile */}
      <section id="hakkimizda" className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="relative h-64 md:h-[500px] overflow-hidden rounded-2xl">
              <Image
                src="/industrial-steel-factory-workers-warehouse.jpg"
                alt="Fabrika"
                fill
                className="object-cover rounded-2xl hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 bg-background/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-500/50">
                <div className="text-3xl md:text-5xl font-bold text-blue-400">12+</div>
                <div className="text-sm md:text-base text-foreground">Yıllık Tecrübe</div>
              </div>
            </div>

            <div>
              <p className="text-blue-400 text-xs md:text-sm mb-2 md:mb-4 tracking-widest uppercase font-bold">
                Şirket Profil
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                Çelik Sektöründe Yüksek Standart
              </h2>
              <p className="text-muted-foreground mb-3 md:mb-6 leading-relaxed text-sm md:text-base">
                Düzce Küçük Sanayi Sitesinde; Sandviç Panel Satış ve Montajı, Sac Kesme ve Bükme, Demir Çelik Sac ve
                Profil Çeşitleri, Soğuk Hava Deposu panel Satışı ve Montajı ve Her türlü Kayıklı-Kayıksız Yapılar
                konusunda uzman teknik personel ve kaliteli ekipman ile hizmet vermekteyiz.
              </p>
              <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Firmamız; sektörün ihtiyaçlarına ve kalite beklentilerine uyumlu düzenleme ve değişikliklerle günümüz
                rekabet ortamında, gün geçtikçe artan bir rekabet gücüyle faaliyetlerine devam etmektedir.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-blue-500 text-balance">
            Çelik ve Metal İşleme Çözümleri
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
            Düzce'de 12+ yıllık tecrübemiz ile endüstriyel çelik yapı, metal işleme ve sandviç panel çözümleri
            sunuyoruz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Building2,
                title: "Çatı ve Sundurma",
                desc: "Dayanıklı ve estetik çatı sistemleri ile sundurma çözümleri",
              },
              {
                icon: Building,
                title: "Çelik Yapı",
                desc: "Endüstriyel ve ticari çelik yapı projeleri",
              },
              {
                icon: Sun,
                title: "Gölgelik",
                desc: "Modern tasarımlı gölgelik ve tente sistemleri",
              },
              {
                icon: Shield,
                title: "Kasa İmalat",
                desc: "Güvenli ve dayanıklı kasa imalatı çözümleri",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              >
                <service.icon className="w-12 h-12 mb-4 text-blue-500 dark:text-blue-400" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery - Sayfalama eklendi, sabit yükseklik */}
      <section id="projeler" className="py-12 md:py-16 px-4 md:px-6 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-blue-400 mb-2 md:mb-4 tracking-widest uppercase font-bold text-xl">
              Projelerimizden Kareler
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4">Foto Galeri</h2>
            <p className="text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto text-xs md:text-base">
              Tamamladığımız projelerin fotoğraflarını inceleyerek işçiliğimiz hakkında fikir edinin.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6">
              {["Tümü", "Depo", "Fabrika", "Hangar", "Ticari", "Tarımsal", "Spor"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePhotoTab(tab)}
                  className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full transition font-medium text-xs md:text-sm ${
                    activePhotoTab === tab
                      ? "bg-blue-500 text-white"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {displayedImages.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square group overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`Project ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>

          {hasMoreImages && (
            <div className="text-center mt-6">
              <Button
                onClick={() => setVisibleImageCount((prev) => prev + 8)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Daha Fazla Görsel ({galleryImages.length - visibleImageCount} kaldı)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-12 md:py-20 px-4 md:px-6 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <p className="text-blue-400 text-xs mb-2 md:mb-4 uppercase font-bold tracking-wider md:text-base">
                İletişim
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6">Bize Ulaşın</h2>
              <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                Projeleriniz için profesyonel çelik yapı çözümleri sunuyoruz. Detaylı bilgi almak ve ücretsiz keşif için
                bizimle iletişime geçin.
              </p>

              <div className="space-y-4 md:space-y-6">
                {[
                  { icon: Phone, label: "Telefon", value: "+90 537 339 39 47" },
                  { icon: Mail, label: "E-posta", value: "info@atlcelikyapi.com" },
                  { icon: MapPin, label: "Adres", value: "Küçük Sanayi Sitesi Merkez, Düzce, Türkiye" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 md:w-6 h-5 md:h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm md:text-base">{item.label}</div>
                      <div className="text-muted-foreground text-xs md:text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-4 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Teklif Formu</h3>
              <form className="space-y-3 md:space-y-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-secondary/50 border border-border rounded-lg px-3 md:px-4 py-2 md:py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition text-sm md:text-base"
                />
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  className="w-full bg-secondary/50 border border-border rounded-lg px-3 md:px-4 py-2 md:py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition text-sm md:text-base"
                />
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  className="w-full bg-secondary/50 border border-border rounded-lg px-3 md:px-4 py-2 md:py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition text-sm md:text-base"
                />
                <textarea
                  placeholder="Mesajınızı Girin"
                  rows={3}
                  className="w-full bg-secondary/50 border border-border rounded-lg px-3 md:px-4 py-2 md:py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500 transition resize-none text-sm md:text-base"
                />
                <Button className="w-full bg-blue-500 hover:bg-blue-600 py-3 md:py-6 text-sm md:text-lg font-semibold">
                  GÖNDER
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {sponsors.length > 0 && (
            <div className="mb-8 md:mb-12 pb-8 md:pb-12 border-b border-white/20">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">İş Ortaklarımız</h2>
              <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
                {sponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="text-white/90 text-base md:text-xl font-bold hover:text-white transition-colors duration-200"
                  >
                    {sponsor.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 md:mb-12 pb-8 md:pb-12 border-b border-white/20">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">Biz Neredeyiz?</h2>
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src={GOOGLE_MAPS_EMBED}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ATL Çelik Yapı Konum Haritası"
              ></iframe>
            </div>
          </div>

          {/* Footer Logo Section */}
          <div className="flex mb-8 items-stretch leading-7 mr-0 md:mb-0 flex-row gap-[0] text-left justify-center opacity-100">
            <div className="relative h-32 md:h-48 w-auto">
              <img src="/images/image.png" alt="ATL Çelik Yapı" className="h-full w-auto dark:hidden" />
              <img src="/darkmodelogo.png" alt="ATL Çelik Yapı" className="h-full w-auto hidden dark:block" />
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-8 md:pb-10 border-b border-white/20">
            <div>
              <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">Hizmetler</h3>
              <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
                {["Lazer Kesim", "Sandviç Panel", "Sac Metal İşleme", "Çelik Konstrüksiyon"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">Kurumsal</h3>
              <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
                {["Hakkımızda", "Ürünlerimiz", "Üretim", "İletişim"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">Destek</h3>
              <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
                {["Teklif Al", "SSS", "Referanslar"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm md:text-lg mb-3 md:mb-4 text-white">İletişim</h3>
              <ul className="space-y-1 md:space-y-2 text-white/80 text-xs md:text-sm">
                <li>
                  <a href="tel:+905373393947" className="hover:text-white transition">
                    0537 339 39 47
                  </a>
                </li>
                <li>
                  <a href="mailto:info@atlcelikyapi.com" className="hover:text-white transition">
                    info@atlcelikyapi.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Section */}
          <div className="pt-6 md:pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-sm text-white/80 text-center md:text-left">
            <p>© 2025 ATL Çelik Yapı. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
              <a href="#" className="hover:text-white transition">
                Gizlilik Politikası
              </a>
              <a href="#" className="hover:text-white transition">
                Kullanım Şartları
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Photo Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox images={galleryImages} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title={selectedVideoId} />
      )}
    </div>
  )
}
