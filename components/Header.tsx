"use client"

import Link from "next/link"

export function Header() {
  return (
    <header style={{ padding: "16px 32px", borderBottom: "1px solid #eee" }}>
      <nav style={{ display: "flex", gap: 16 }}>
        <Link href="/">Ana Sayfa</Link>
        <Link href="/galeri">Galeri</Link>
      </nav>
    </header>
  )
}
