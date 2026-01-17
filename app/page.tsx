"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
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

const DRIVE_API =
  "https://script.google.com/macros/s/AKfycbz6KD5v8emprNcAvzqvzlsqXSCmArK17wwumahmm04h8E1MivpdKUQDVTGytqiXXmPl/exec"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroImages, setHeroImages] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /* ================= HERO (DRIVE) ================= */
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(DRIVE_API, { cache: "no-store" })
        const data = await res.json()
        if (Array.isArray(data.hero)) setHeroImages(data.hero)
      } catch (e) {
        console.error("Hero fetch error:", e)
      }
    }
    fetchHero()
  }, [])

  useEffect(() => {
    if (!heroImages.length) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages])

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      heroImages.length ? (prev + 1) % heroImages.length : 0,
    )

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      heroImages.length
        ? (prev - 1 + heroImages.length) % heroImages.length
        : 0,
    )

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-foreground dark:bg-background">
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled
            ? "bg-white/90 dark:bg-background/90 backdrop-blur border-b"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" className="h-12 dark:hidden" />
            <img src="/darkmodelogo.png" className="h-12 hidden dark:block" />
          </Link>

          <nav className="hidden md:flex gap-8 font-medium">
            {[
              ["#anasayfa", "Ana Sayfa"],
              ["#hakkimizda", "Hakkımızda"],
              ["#hizmetler", "Hizmetler"],
              ["#projeler", "Projeler"],
              ["#iletisim", "İletişim"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-blue-500">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Hemen Ara</span>
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

      {/* ================= HERO ================= */}
      <section id="anasayfa" className="relative h-screen pt-20">
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === i ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={`Hero ${i + 1}`}
                fill
                className="object-cover"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 text-white">
          <p className="text-blue-400 font-bold mb-4">
            Endüstriyel çelik yapı çözümleri
          </p>
          <h1 className="text-4xl md:text-7xl font-bold mb-8">
            ATL Çelik Yapı
          </h1>

          <div className="flex gap-4">
            <Button className="bg-blue-500 hover:bg-blue-600">
              Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-white text-white">
              Projelerimiz
            </Button>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full"
        >
          <ChevronRight className="text-white" />
        </button>
      </section>

      {/* ================= HAKKIMIZDA ================= */}
      <section
        id="hakkimizda"
        className="relative py-24 overflow-hidden bg-white dark:bg-background"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hakkimizda-bg.jpg"
            alt="ATL Çelik Yapı"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-white/80 dark:bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div />

          <div className="text-foreground dark:text-white">
            <span className="text-blue-500 font-semibold uppercase text-sm">
              Hakkımızda
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
              Çelik Sektöründe Güvenilir Çözüm Ortağı
            </h2>
            <p className="mb-6 leading-relaxed">
              Düzce merkezli olmakla birlikte 81 ilde profesyonel hizmet
              vermekteyiz. Sandviç Panel, Sac Kesme–Bükme, Demir Çelik Profil,
              Soğuk Hava Deposu ve her türlü kaynaklı yapılar konusunda uzman
              ekibimizle yanınızdayız.
            </p>

            <ul className="grid grid-cols-2 gap-3 mb-8 text-sm">
              {[
                "ISO 9001 Belgeli",
                "CE Sertifikalı",
                "Zamanında Teslimat",
                "Garantili İşçilik",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>

            <Button className="bg-blue-500 hover:bg-blue-600">
              Daha Fazla Bilgi
            </Button>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="hizmetler" className="py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            [Building2, "Endüstriyel Yapılar"],
            [Building, "Sandviç Panel"],
            [Wrench, "Metal İşleme"],
            [Shield, "Soğuk Hava Deposu"],
          ].map(([Icon, title], i) => (
            <div
              key={i}
              className="p-6 border rounded-xl text-center hover:shadow-lg"
            >
              <Icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-bold">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section
        id="projeler"
        className="py-24 bg-white text-foreground dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 dark:text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Yapım Süreci</h2>
            <p className="mt-4 opacity-80">
              Projelerimiz nasıl hayata geçiyor?
            </p>
          </div>
          <ConstructionProcess />
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="iletisim" className="py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">İletişim</h2>
          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <Phone className="text-blue-500" /> +90 537 339 39 47
            </p>
            <p className="flex items-center gap-3">
              <Mail className="text-blue-500" /> info@atlcelikyapi.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-blue-500" /> Düzce
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
