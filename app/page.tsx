import { ThemeToggle } from "@/components/theme-toggle"
import BeforeAfterSlider from "@/components/before-after-slider"
import SponsorsCarousel from "@/components/sponsors-carousel"
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

async function fetchFromAPI() {
  const apiUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL

  if (!apiUrl) {
    console.warn("[v0] API URL not configured - using example data")
    return {
      projects: [
        {
          title: "Çelik Yapı Projesi",
          before: "/placeholder.svg?height=400&width=600",
          after: "/placeholder.svg?height=400&width=600",
        },
      ],
      sponsors: [{ name: "İş Ortağı 1", logo: "/placeholder.svg?height=60&width=120" }],
    }
  }

  try {
    const response = await fetch(apiUrl, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      projects: Array.isArray(data.projects) ? data.projects : [],
      sponsors: Array.isArray(data.sponsors) ? data.sponsors : [],
    }
  } catch (error) {
    console.error("[v0] Fetch error:", error)
    return { projects: [], sponsors: [] }
  }
}

export default async function HomePage() {
  const { projects, sponsors } = await fetchFromAPI()

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
      <section id="anasayfa" className="pt-20 pb-12 md:pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-500">ATL Çelik Yapı</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Profesyonel çelik yapı, merdivenler ve endüstriyel tasarım çözümleri
          </p>
        </div>
      </section>

      <section id="projeler" className="py-16 px-4 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">Özel Üretimler</h2>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-12">
            Tamamladığımız projelerden before/after karşılaştırmaları
          </p>
          <BeforeAfterSlider projects={projects} />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">İş Ortaklarımız</h2>
          <SponsorsCarousel sponsors={sponsors} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-sm">© 2026 ATL Çelik Yapı. Tüm hakları saklıdır.</p>
          <p className="text-xs text-slate-500 mt-2">Tasarım: rootbarann</p>
        </div>
      </footer>
    </div>
  )
}
