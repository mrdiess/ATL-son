import "./globals.css"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "ATL Çelik Yapı",
  description: "Çelik konstrüksiyon ve anahtar teslim çözümler",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
