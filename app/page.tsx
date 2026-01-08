"use client"

import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import BeforeAfterSlider from "@/components/before-after-slider"
import ConstructionProcess from "@/components/construction-process"
import CustomManufacturing from "@/components/custom-manufacturing"
import Link from "next/link"

interface Project {
  title: string
  before: string
  after: string
}

interface Sponsor {
  name: string
  logo: string
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

      if (apiUrl) {
        try {
          const response = await fetch(apiUrl, { cache: "no-store" })
          if (response.ok) {
            const data = await response.json()
            setProjects(Array.isArray(data.projects) ? data.projects : [])
            setSponsors(Array.isArray(data.sponsors) ? data.sponsors : [])
          }
        } catch (error) {
          console.error("[v0] Fetch error:", error)
        }
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/">
              <img src="/lightmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 dark:hidden" />
              <img src="/darkmodelogo.png" alt="ATL Çelik Yapı" className="h-12 md:h-16 hidden dark:block" />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#anasayfa" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Ana Sayfa
              </a>
              <a href="#ınşaat" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                İnşaat Süreci
              </a>
              <a href="#hakkimizda" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Hakkımızda
              </a>
              <a href="#hizmetler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Hizmetler
              </a>
              <a href="#ozel-uretimler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Özel Üretimler
              </a>
              <a href="#projeler" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Projeler
              </a>
              <Link href="/galeri" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                Galeri
              </Link>
              <a href="#iletisim" className="text-foreground hover:text-blue-500 transition-colors font-medium">
                İletişim
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a
                href="tel:+905373393947"
                className="hidden md:inline px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-semibold"
              >
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="anasayfa" className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-blue-500">ATL Çelik Yapı</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
            Düzce merkezli, 81 ile profesyonel çelik konstrüksiyon ve metal işleme hizmetleri
          </p>
        </div>
      </section>

      {/* Construction Process */}
      <section id="ınşaat" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-center">20 Adımlı İnşaat Süreci</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-12">
            Her adımda kalite kontrol ve profesyonel hizmet
          </p>
          <ConstructionProcess />
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimizda" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Hakkımızda</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                12+ yıllık tecrübemiz ile Düzce ve 81 ile çelik konstrüksiyon, sandviç panel ve metal işleme alanında
                hizmet vermekteyiz.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Müşteri memnuniyeti ve kaliteli işçiliği ilke edinerek projelerimizi tamamlamaktayız.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg h-64 flex items-center justify-center text-white text-center p-8">
              <p className="text-2xl font-bold">ATL Çelik Yapı - Kurumsal Hizmetler</p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">İşyeri & Ürün Galeri</h3>
            <ConstructionProcess />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Çelik Konstrüksiyon", "Sandviç Panel", "Metal İşleme"].map((service) => (
              <div key={service} className="p-8 bg-background dark:bg-slate-800 rounded-lg border shadow-sm">
                <h3 className="text-xl font-bold mb-4">{service}</h3>
                <p className="text-slate-600 dark:text-slate-400">Profesyonel {service.toLowerCase()} hizmetleri</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Manufacturing */}
      <section id="ozel-uretimler" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Özel Üretimler</h2>
          <CustomManufacturing />
        </div>
      </section>

      {/* Projects */}
      <section id="projeler" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2 text-center">Tamamlanan Projeler</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-12">Before/After karşılaştırmaları</p>
          {projects.length > 0 && <BeforeAfterSlider projects={projects} />}
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">İş Ortaklarımız</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center p-6 bg-background dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:opacity-80 transition-all duration-300"
              >
                <div className="w-full h-16 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                  <span className="text-slate-500 text-sm">Partner {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">İletişim</h2>
          <p className="text-lg mb-8">Profesyonel teklif ve hizmetler için bize ulaşın</p>
          <a
            href="tel:+905373393947"
            className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
          >
            Hemen Ara: +90 537 339 39 47
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold mb-4 text-white">Hızlı Linkler</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#anasayfa" className="hover:text-blue-400 transition-colors">
                    Ana Sayfa
                  </a>
                </li>
                <li>
                  <a href="#hakkimizda" className="hover:text-blue-400 transition-colors">
                    Hakkımızda
                  </a>
                </li>
                <li>
                  <a href="#hizmetler" className="hover:text-blue-400 transition-colors">
                    Hizmetler
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Hizmetler</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#ozel-uretimler" className="hover:text-blue-400 transition-colors">
                    Özel Üretimler
                  </a>
                </li>
                <li>
                  <a href="#projeler" className="hover:text-blue-400 transition-colors">
                    Projeler
                  </a>
                </li>
                <li>
                  <a href="/galeri" className="hover:text-blue-400 transition-colors">
                    Galeri
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">İletişim</h3>
              <ul className="space-y-2">
                <li>
                  <a href="tel:+905373393947" className="hover:text-blue-400 transition-colors">
                    +90 537 339 39 47
                  </a>
                </li>
                <li className="hover:text-blue-400 transition-colors">Düzce, Türkiye</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-white">Sosyal Medya</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-4.358-.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.355c-.834 0-1.509-.675-1.509-1.509s.675-1.509 1.509-1.509 1.509.675 1.509 1.509-.783 1.509-1.509 1.509z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="mb-2">© 2026 ATL Çelik Yapı. Tüm hakları saklıdır.</p>
            <p className="text-sm">
              Tasarım: <span className="text-blue-400">rootbarann</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
