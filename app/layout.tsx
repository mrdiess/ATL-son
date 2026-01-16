import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
}

export const metadata: Metadata = {
  title: "ATL Çelik Yapı - Düzce Çelik Konstrüksiyon ve Metal İşleme | 81 İle Hizmet",
  description:
    "Düzce merkezli, 81 ile çelik konstrüksiyon, sandviç panel ve metal işleme alanında 12+ yıllık tecrübeli hizmet. ATL Çelik Yapı ile profesyonel çelik yapı çözümleri.",
  keywords:
    "düzce çelik, çelik konstrüksiyon, metal işleme, sandviç panel, çelik yapı, düzce çelik konstrüksiyon, özel üretim",
  metadataBase: new URL("https://atlcelikyapi.com"),
  openGraph: {
    title: "ATL Çelik Yapı - Düzce Çelik Konstrüksiyon",
    description: "Düzce'de 12+ yıllık tecrübeyle 81 ile çelik konstrüksiyon, metal işleme ve sandviç panel hizmetleri",
    siteName: "ATL Çelik Yapı",
    locale: "tr_TR",
    type: "website",
  },
  alternates: {
    canonical: "https://atlcelikyapi.com",
  },
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
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
      <body className={`font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
