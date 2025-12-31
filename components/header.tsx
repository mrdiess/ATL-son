"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "#anasayfa", label: "Ana Sayfa" },
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#projeler", label: "Projeler" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <svg
              alt="ATL Çelik Yapı - Düzce Çelik Ev ve Dorse Kasa Yapımı"
              className="h-12 md:h-16 w-auto text-foreground"
              style={{ maxWidth: "200px", color: "currentColor" }}
              viewBox="0 0 1200 400"
              width="1200"
              height="400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="blue-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <g transform="translate(80,60)">
                <polygon points="0,0 120,0 150,60 30,60" fill="currentColor" opacity="0.9" />
                <polygon points="0,80 120,80 150,140 30,140" fill="currentColor" opacity="0.9" />
                <polygon points="0,160 120,160 150,220 30,220" fill="currentColor" opacity="0.9" />
                <g filter="url(#blue-glow)">
                  <polygon points="170,160 290,160 320,220 200,220" fill="#1E6BFF" />
                  <polygon points="170,240 290,240 320,300 200,300" fill="#1E6BFF" />
                </g>
              </g>

              <g transform="translate(440,210)">
                <text
                  fontSize="92"
                  fill="currentColor"
                  dominantBaseline="middle"
                  fontFamily="Segoe UI, Arial, sans-serif"
                  fontWeight="700"
                >
                  ATL
                </text>
                <text
                  x="0"
                  y="110"
                  fontSize="72"
                  fill="currentColor"
                  fontFamily="Segoe UI, Arial, sans-serif"
                  fontWeight="700"
                >
                  ÇELİK YAPI
                </text>
              </g>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="tel:+905373393947" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Hemen Ara</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menü">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-2 bg-primary hover:bg-primary/90">
                <a href="tel:+905373393947" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Hemen Ara</span>
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
