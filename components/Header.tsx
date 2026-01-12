"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "rgba(10,22,40,0.95)" : "transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png"
            alt="ATL Çelik Yapı"
            width={140}
            height={40}
            priority
            style={{
              filter: scrolled ? "none" : "brightness(0) invert(1)",
              transition: "filter 0.3s ease",
            }}
          />
        </Link>

        {/* NAV */}
        <nav
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            fontWeight: 500,
          }}
        >
          <Link
            href="/"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            Ana Sayfa
          </Link>
          <Link
            href="/hakkimizda"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            Hakkımızda
          </Link>
          <Link
            href="/hizmetler"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            Hizmetler
          </Link>
          <Link
            href="/projeler"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              opacity: 0.9,
            }}
          >
            Projeler
          </Link>

          {/* CTA */}
          <Link
            href="/iletisim"
            style={{
              padding: "10px 20px",
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Hemen Ara
          </Link>
        </nav>
      </div>
    </header>
  )
}
