"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSlider } from "@/components/hero-slider"
import { CompanyProfile } from "@/components/company-profile"
import { WhyUs } from "@/components/why-us"
import { ServicesGrid } from "@/components/services-grid"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { GallerySection } from "@/components/gallery-section"
import { VideoGallery } from "@/components/video-gallery"
import { MaintenanceScreen } from "@/components/maintenance-screen"

interface MaintenanceSettings {
  enabled: boolean
  endTime: string | null
  note: string
}

export default function Home() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMaintenanceMode = () => {
      const settings = localStorage.getItem("maintenanceSettings")
      if (settings) {
        const parsed: MaintenanceSettings = JSON.parse(settings)
        setIsMaintenanceMode(parsed.enabled)
      }
    }

    checkMaintenanceMode()

    const siteSettings = localStorage.getItem("siteSettings")
    if (siteSettings) {
      const parsed = JSON.parse(siteSettings)
      const theme = parsed.defaultTheme || "light"
      const htmlElement = document.documentElement
      if (theme === "dark") {
        htmlElement.classList.add("dark")
      } else {
        htmlElement.classList.remove("dark")
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "maintenanceSettings") {
        checkMaintenanceMode()
      }
      if (e.key === "siteSettings") {
        const newSettings = e.newValue ? JSON.parse(e.newValue) : null
        if (newSettings) {
          const theme = newSettings.defaultTheme || "light"
          const htmlElement = document.documentElement
          if (theme === "dark") {
            htmlElement.classList.add("dark")
          } else {
            htmlElement.classList.remove("dark")
          }
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    const interval = setInterval(checkMaintenanceMode, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  if (!mounted) return null

  if (isMaintenanceMode) {
    return <MaintenanceScreen />
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <CompanyProfile />
      <WhyUs />
      <ServicesGrid />
      <GallerySection />
      <VideoGallery />
      <ContactSection />
      <Footer />
    </main>
  )
}
