"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
        zIndex: 100,
        background: scrolled
          ? "rgba(10,22,40,0.96)"
          : "linear-gradient(to bottom, rgba(10,22,40,0.9), rgba(10,22,40,0))",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "14px 24px",
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
            width={150}
            height={42}
            priority
            style={{
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </Link>

        {/* MENU */}
        <nav style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {[
            ["Ana Sayfa", "/"],
            ["Hakkımızda", "/hakkimizda"],
            ["Hizmetler", "/hizmetler"],
            ["Projeler", "/projeler"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: 500,
                opacity: 0.9,
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/iletisim"
            style={{
              marginLeft: "8px",
              padding: "10px 22px",
              backgroundColor: "#0ea5e9",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Hemen Ara
          </Link>
        </nav>
      </div>
    </header>
  )
}
