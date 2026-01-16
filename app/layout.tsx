import "./globals.css"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "ATL Çelik Yapı",
  description: "Çelik ve metal işleme çözümleri",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-[#0a1628] text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
  
<body className="bg-[#0a1628] text-white antialiased">

<body/>

}
