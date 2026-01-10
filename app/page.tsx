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

/* ================= GEÇİCİ VERİLER (ADIM 3’TE SİLİNECEK) ================= */

const galleryImages: string[] = []
const sponsors: { name: string; logo: string }[] = []
const projects: { title: string; before: string; after: string }[] = []

/* ======================================================================= */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [quoteFormData, setQuoteFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [quoteSubmitting, setQuoteSubmitting] = useState(false)
  const [quoteMessage, setQuoteMessage] =
    useState<{ type: "success" | "error"; text: string } | null>(null)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteSubmitting(true)
    setQuoteMessage(null)

    if (
      !quoteFormData.name ||
      !quoteFormData.email ||
      !quoteFormData.phone ||
      !quoteFormData.message
    ) {
      setQuoteMessage({ type: "error", text: "Lütfen tüm alanları doldurunuz" })
      setQuoteSubmitting(false)
      return
    }

    setTimeout(() => {
      setQuoteMessage({
        type: "success",
        text: "Form gönderildi (geçici).",
      })
      setQuoteFormData({ name: "", email: "", phone: "", message: "" })
      setQuoteSubmitting(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? "bg-background/95 backdrop-blur border-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" className="h-10 dark:hidden" />
            <img src="/darkmodelogo.png" className="h-10 hidden dark:block" />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a
              href="tel:+905373393947"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              <Phone className="w-4 h-4 inline mr-1" />
              Ara
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen pt-16">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity ${
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

        <button onClick={prevSlide} className="absolute left-4 top-1/2 z-10">
          <ChevronLeft className="text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 z-10">
          <ChevronRight className="text-white" />
        </button>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-4">
          {[
            { icon: Building2, title: "Endüstriyel Yapılar" },
            { icon: Building, title: "Sandviç Panel" },
            { icon: Wrench, title: "Metal İşleme" },
            { icon: Shield, title: "Soğuk Hava Deposu" },
          ].map((s, i) => (
            <div key={i} className="border rounded-xl p-6 text-center">
              <s.icon className="mx-auto text-blue-500 mb-4" />
              <h3 className="font-bold">{s.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <ConstructionProcess />
      <CustomManufacturing />

      {/* CONTACT */}
      <section className="py-20 bg-secondary/10">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Teklif Formu</h2>

          {quoteMessage && (
            <div className="mb-4 text-sm">{quoteMessage.text}</div>
          )}

          <form className="space-y-4" onSubmit={handleQuoteSubmit}>
            <input className="w-full border p-3 rounded" placeholder="Ad Soyad" />
            <input className="w-full border p-3 rounded" placeholder="E-posta" />
            <input className="w-full border p-3 rounded" placeholder="Telefon" />
            <textarea className="w-full border p-3 rounded" placeholder="Mesaj" />
            <Button type="submit" className="w-full">
              Gönder
            </Button>
          </form>
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
