import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "ATL Çelik Yapı - Çelik Konstrüksiyon ve Metal İşleme",
  description:
    "Çeliği hayallerinize dönüştürüyoruz. ATL Çelik Yapı olarak çatı, sundurma, çelik yapı, gölgelik, korkuluk sistemleri, merdiven, soğuk hava deposu ve tır-kamyon bakım hizmetleri sunuyoruz.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
