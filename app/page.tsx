"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import ConstructionProcess from "@/components/construction-process"
import CustomManufacturing from "@/components/custom-manufacturing"
import {
  Phone,
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
import { useEffect, useState } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % 3)
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + 3) % 3)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % 3)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition ${
          isScrolled ? "bg-background/95 backdrop-blur border-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" className="h-12 dark:hidden" />
            <img src="/darkmodelogo.png" className="h-12 hidden dark:block" />
          </Link>

          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#projeler">Projeler</a>
            <a href="#hakkimizda">Hakkımızda</a>
            <Link href="/galeri">Galeri</Link>
            <a href="#iletisim">İletişim</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Ara
            </a>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t px-6 py-4 flex flex-col gap-3">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#projeler">Projeler</a>
            <a href="#hakkimizda">Hakkımızda</a>
            <Link href="/galeri">Galeri</Link>
            <a href="#iletisim">İletişim</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="anasayfa" className="relative h-screen pt-20">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
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
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            ATL Çelik Yapı
          </h1>
          <p className="max-w-xl mb-8">
            Çelik konstrüksiyon, sandviç panel ve metal işleme çözümleri
          </p>
          <Button className="bg-blue-500 w-fit">
            Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 text-white">
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 text-white">
          <ChevronRight />
        </button>
      </section>

      {/* SERVICES */}
      <section id="hizmetler" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            { icon: Building2, title: "Endüstriyel Yapılar" },
            { icon: Building, title: "Sandviç Panel" },
            { icon: Wrench, title: "Metal İşleme" },
            { icon: Shield, title: "Soğuk Hava Deposu" },
          ].map((s, i) => (
            <div key={i} className="p-6 border rounded-xl text-center">
              <s.icon className="mx-auto mb-4 text-blue-500" />
              <h3 className="font-bold">{s.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <ConstructionProcess />
      <CustomManufacturing />

      <footer className="bg-slate-900 text-white py-12 text-center text-sm">
        © 2025 ATL Çelik Yapı
      </footer>
    </div>
  )
}
