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
  const [maintenanceNote, setMaintenanceNote] = useState("")
  const [maintenanceEndTime, setMaintenanceEndTime] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkMaintenanceMode = async () => {
      try {
        const response = await fetch("/api/admin/settings")
        const data = await response.json()

        if (data.maintenance) {
          setIsMaintenanceMode(data.maintenance.enabled || false)
          setMaintenanceNote(data.maintenance.note || "")
          setMaintenanceEndTime(data.maintenance.endTime || null)
        }
      } catch (error) {
        console.error("Error checking maintenance mode:", error)
        // Fallback to localStorage for development
        const settings = localStorage.getItem("maintenanceSettings")
        if (settings) {
          const parsed: MaintenanceSettings = JSON.parse(settings)
          setIsMaintenanceMode(parsed.enabled)
          setMaintenanceNote(parsed.note || "")
          setMaintenanceEndTime(parsed.endTime || null)
        }
      }
    }

    checkMaintenanceMode()

    const loadTheme = async () => {
      try {
        const response = await fetch("/api/admin/settings")
        const data = await response.json()

        if (data.theme?.defaultTheme) {
          const theme = data.theme.defaultTheme
          const htmlElement = document.documentElement
          if (theme === "dark") {
            htmlElement.classList.add("dark")
          } else {
            htmlElement.classList.remove("dark")
          }
        }
      } catch (error) {
        // Fallback to localStorage
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
      }
    }

    loadTheme()

    // Poll for maintenance mode changes every 30 seconds
    const interval = setInterval(checkMaintenanceMode, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!mounted) return null

  if (isMaintenanceMode) {
    return <MaintenanceScreen note={maintenanceNote} endTime={maintenanceEndTime} />
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
