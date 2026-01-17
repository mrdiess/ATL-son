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

const GOOGLE_MAPS_EMBED = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d753!2d31.1240669!3d40.8522558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x409d9f3269fc678f%3A0xcd0d2bf0971b8ae4!2sATL%20%C3%87elik%20ve%20Metal%20%C4%B0%C5%9Fleme!5e0!3m2!1str!2str!4v1736012345678!5m2!1str!2str`

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroImages, setHeroImages] = useState<string[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /* ================= HERO ================= */
  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch(DRIVE_API, { cache: "no-store" })
      const data = await res.json()
      if (Array.isArray(data.hero)) setHeroImages(data.hero)
    }
    fetchHero()
  }, [])

  useEffect(() => {
    if (!heroImages.length) return
    const timer = setInterval(
      () => setCurrentSlide((p) => (p + 1) % heroImages.length),
      5000,
    )
    return () => clearInterval(timer)
  }, [heroImages])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="bg-background text-foreground">
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled
            ? "bg-background/95 backdrop-blur border-b"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" className="h-12 dark:hidden" />
            <img src="/darkmodelogo.png" className="h-12 hidden dark:block" />
          </Link>

          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hakkimizda">Hakkımızda</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#projeler">Projeler</a>
            <a href="#iletisim">İletişim</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex gap-2"
            >
              <Phone className="w-4 h-4" /> Hemen Ara
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section id="anasayfa" className="relative h-screen pt-20">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 text-white">
          <p className="text-blue-400 font-bold mb-4">
            Endüstriyel çelik yapı çözümleri
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            ATL Çelik Yapı
          </h1>
          <div className="flex gap-4">
            <Button className="bg-blue-500">
              Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-white text-white">
              Projelerimiz
            </Button>
          </div>
        </div>

        <button
          onClick={() =>
            setCurrentSlide(
              (p) => (p - 1 + heroImages.length) % heroImages.length,
            )
          }
          className="absolute left-4 top-1/2 bg-black/50 p-3 rounded-full"
        >
          <ChevronLeft className="text-white" />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((p) => (p + 1) % heroImages.length)
          }
          className="absolute right-4 top-1/2 bg-black/50 p-3 rounded-full"
        >
          <ChevronRight className="text-white" />
        </button>
      </section>

      {/* ================= HAKKIMIZDA ================= */}
      <section id="hakkimizda" className="relative py-28">
        <Image
          src="/images/hakkimizda-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 text-white">
          <div />
          <div>
            <span className="text-blue-400 uppercase text-sm font-semibold">
              Hakkımızda
            </span>
            <h2 className="text-4xl font-bold my-6">
              Çelik Sektöründe Güvenilir Çözüm Ortağı
            </h2>
            <p className="mb-6 text-white/85">
              Düzce merkezli olmakla birlikte 81 ilde profesyonel hizmet
              vermekteyiz.
            </p>
            <ul className="grid grid-cols-2 gap-3 mb-8 text-sm">
              {[
                "ISO 9001 Belgeli",
                "CE Sertifikalı",
                "Zamanında Teslimat",
                "Garantili İşçilik",
              ].map((i) => (
                <li key={i} className="flex gap-2 items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  {i}
                </li>
              ))}
            </ul>
            <Button className="bg-blue-500">Daha Fazla Bilgi</Button>
          </div>
        </div>
      </section>

      {/* ================= HİZMETLER ================= */}
      <section id="hizmetler" className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {[
            [Building2, "Endüstriyel Yapılar"],
            [Building, "Sandviç Panel"],
            [Wrench, "Metal İşleme"],
            [Shield, "Soğuk Hava Deposu"],
          ].map(([Icon, title], i) => (
            <div
              key={i}
              className="p-6 border rounded-xl text-center hover:shadow"
            >
              <Icon className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="font-bold">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROJELER ================= */}
      <section
        id="projeler"
        className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold">Yapım Süreci</h2>
          <p className="text-slate-300 mt-4">
            Projelerimiz nasıl hayata geçiyor?
          </p>
        </div>
        <ConstructionProcess />
      </section>

      {/* ================= İLETİŞİM ================= */}
      <section id="iletisim" className="py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">İletişim</h2>
            <p className="flex gap-3 mb-2">
              <Phone /> +90 537 339 39 47
            </p>
            <p className="flex gap-3 mb-2">
              <Mail /> info@atlcelikyapi.com
            </p>
            <p className="flex gap-3">
              <MapPin /> Düzce
            </p>
          </div>

          <iframe
            src={GOOGLE_MAPS_EMBED}
            className="w-full h-[350px] rounded-xl border"
            loading="lazy"
          />
        </div>
      </section>

      {/* ================= MAP ================= */}
      <iframe
        src={GOOGLE_MAPS_EMBED}
        className="w-full h-[280px] border-0"
        loading="lazy"
      />

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div>
            <img src="/darkmodelogo.png" className="h-12 mb-4" />
            <p className="text-slate-300 text-sm">
              Düzce'de 12+ yıllık tecrübeyle profesyonel çelik yapı çözümleri.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Çelik Konstrüksiyon</li>
              <li>Sandviç Panel</li>
              <li>Metal İşleme</li>
              <li>Özel Üretim</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Hakkımızda</li>
              <li>Projeler</li>
              <li>Referanslar</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Destek</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Teklif Al</li>
              <li>SSS</li>
              <li>İletişim</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 py-6 text-center text-sm text-slate-400">
          © 2025 ATL Çelik Yapı · Tasarım: rootbarann
        </div>
      </footer>
    </div>
  )
}
