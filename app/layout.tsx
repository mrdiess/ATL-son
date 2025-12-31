import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "latin-ext"] })

export const metadata: Metadata = {
  title: "ATL Çelik Yapı | Düzce Çelik Ev, Çelik Yapı, Dorse Kasa Yapımı ve Tamiri",
  description:
    "Düzce'nin lider çelik yapı firması. Çelik ev, çelik yapı, dorse kasa yapımı, dorse tamiri, treyler kasa imalatı, çelik konstrüksiyon, çatı sistemleri, sundurma ve metal işleme hizmetleri. Profesyonel çözümler için hemen arayın.",
  keywords: [
    "düzce çelik",
    "düzce çelik ev",
    "düzce çelik yapı",
    "çelik ev düzce",
    "çelik yapı düzce",
    "dorse kasa yapımı",
    "dorse kasa tamiri",
    "treyler kasa imalatı",
    "dorse tamiri düzce",
    "çelik konstrüksiyon düzce",
    "metal işleme düzce",
    "çatı sistemleri düzce",
    "sundurma düzce",
    "prefabrik çelik yapı",
    "hafif çelik yapı",
    "çelik ev fiyatları",
    "dorse kasa fiyatları",
  ],
  authors: [{ name: "ATL Çelik Yapı" }],
  creator: "ATL Çelik Yapı",
  publisher: "ATL Çelik Yapı",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://atlcelikyapi.com",
    siteName: "ATL Çelik Yapı",
    title: "ATL Çelik Yapı | Düzce Çelik Ev, Çelik Yapı, Dorse Kasa Yapımı",
    description:
      "Düzce'nin lider çelik yapı firması. Çelik ev, çelik yapı, dorse kasa yapımı ve tamiri, çelik konstrüksiyon hizmetleri.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 400,
        alt: "ATL Çelik Yapı - Düzce Çelik Ev ve Dorse Kasa Yapımı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATL Çelik Yapı | Düzce Çelik Ev, Dorse Kasa Yapımı",
    description: "Düzce'nin lider çelik yapı firması. Çelik ev, dorse kasa yapımı ve tamiri hizmetleri.",
    images: ["/logo.svg"],
  },
  alternates: {
    canonical: "https://atlcelikyapi.com",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "google-site-verification-code",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "ATL Çelik Yapı",
              description:
                "Düzce'nin lider çelik yapı firması. Çelik ev, çelik yapı, dorse kasa yapımı ve tamiri hizmetleri.",
              url: "https://atlcelikyapi.com",
              telephone: "+905373393947",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Düzce",
                addressRegion: "Düzce",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "40.8438",
                longitude: "31.1565",
              },
              openingHours: "Mo-Sa 08:00-18:00",
              priceRange: "$$",
              image: "https://atlcelikyapi.com/logo.svg",
              sameAs: [],
              serviceArea: {
                "@type": "Place",
                name: "Düzce, Türkiye",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Hizmetlerimiz",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Çelik Ev Yapımı",
                      description: "Düzce'de profesyonel çelik ev yapımı hizmetleri",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Dorse Kasa Yapımı",
                      description: "Dorse kasa imalatı ve montajı",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Dorse Tamiri",
                      description: "Profesyonel dorse kasa tamiri hizmetleri",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Çelik Konstrüksiyon",
                      description: "Endüstriyel çelik konstrüksiyon projeleri",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
