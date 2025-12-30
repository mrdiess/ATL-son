"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  hizmetler: [
    { label: "Lazer Kesim", href: "#hizmetlerimiz" },
    { label: "Sandviç Panel", href: "#hizmetlerimiz" },
    { label: "Sac Metal İşleme", href: "#hizmetlerimiz" },
    { label: "Çelik Konstrüksiyon", href: "#hizmetlerimiz" },
  ],
  kurumsal: [
    { label: "Hakkımızda", href: "#kurumsal" },
    { label: "Ürünlerimiz", href: "#urunler" },
    { label: "Üretim", href: "#uretim" },
    { label: "İletişim", href: "#iletisim" },
  ],
  destek: [
    { label: "Teklif Al", href: "#iletisim" },
    { label: "SSS", href: "#" },
    { label: "Referanslar", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

const defaultSponsors = [
  { id: "1", name: "Bosch", logo: "/bosch-logo.jpg", active: true },
  { id: "2", name: "Makita", logo: "/makita-logo.jpg", active: true },
  { id: "3", name: "DeWalt", logo: "/dewalt-logo.jpg", active: true },
  { id: "4", name: "Hilti", logo: "/hilti-logo.jpg", active: true },
  { id: "5", name: "Karcher", logo: "/karcher-logo.jpg", active: true },
]

export function Footer() {
  const [sponsors, setSponsors] = useState(defaultSponsors)

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const response = await fetch("/api/admin/sponsors")

        if (!response.ok) {
          console.error("[v0] Sponsors API status:", response.status)
          return
        }

        const data = await response.json()
        const sponsorsList = Array.isArray(data) ? data : data?.sponsors || []

        if (sponsorsList.length > 0) {
          setSponsors(sponsorsList)
        }
      } catch (error) {
        console.error("[v0] Failed to load sponsors:", error instanceof Error ? error.message : String(error))
      }
    }

    loadSponsors()
  }, [])

  // Filter only active sponsors
  const activeSponsors = sponsors.filter((s) => s.active)

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      {activeSponsors.length > 0 && (
        <div className="border-b border-white/10 py-12 md:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <div className="text-center">
                <h3 className="text-lg md:text-2xl font-bold text-white">İş Ortaklarımız</h3>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 w-full px-4">
                {activeSponsors.map((sponsor) => (
                  <div
                    key={sponsor.id}
                    className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <img
                      src={sponsor.logo || "/placeholder.svg"}
                      alt={sponsor.name}
                      className="h-14 md:h-20 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-16">
            {/* Brand - Logo eklendi */}
            <div className="sm:col-span-2 lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.png"
                  alt="ATL Çelik Yapı"
                  width={240}
                  height={80}
                  className="h-16 md:h-20 w-auto brightness-0 invert"
                  priority
                />
              </Link>
              <p className="text-white/70 text-sm md:text-base mb-6 max-w-sm leading-relaxed">
                Çelik sektöründe 12+ yıllık tecrübemizle sandviç panel, lazer kesim ve metal işleme alanında profesyonel
                çözümler sunuyoruz.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Küçük Sanayi Sitesi Merkez, Düzce</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>+90 537 339 39 47</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>info@atlcelikyapi.com</span>
                </div>
              </div>

              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4 md:mb-6 text-base md:text-lg">Hizmetler</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.hizmetler.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary text-sm md:text-base transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 md:mb-6 text-base md:text-lg">Kurumsal</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.kurumsal.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary text-sm md:text-base transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 md:mb-6 text-base md:text-lg">Destek</h4>
              <ul className="space-y-2 md:space-y-3">
                {footerLinks.destek.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary text-sm md:text-base transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ATL Çelik Yapı. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-4 md:gap-6 text-sm text-white/50 items-center flex-wrap justify-center">
              <Link href="#" className="hover:text-primary transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Kullanım Şartları
              </Link>
              <span className="hidden md:inline">|</span>
              <a
                href="https://instagram.com/rootbarann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-primary transition-colors flex items-center gap-1"
              >
                <span>Designed by</span>
                <Instagram className="w-4 h-4" />
                @rootbarann
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
