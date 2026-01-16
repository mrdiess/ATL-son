"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { PhotoLightbox } from "@/components/photo-lightbox"
import ConstructionProcess from "@/components/construction-process"
import CustomManufacturing from "@/components/custom-manufacturing"
import {
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Building2,
  Building,
  Shield,
  Menu,
  X,
  ArrowRight,
  Wrench,
} from "lucide-react"

/* ================= TYPES ================= */

interface MediaItem {
  id: string
  filename: string
  url: string
  file_type: string
  category: string
  size: number
  created_at: string
  title?: string
  stage?: string
  project_slug?: string
}

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

interface PartnersData {
  partners: Partner[]
}

interface Project {
  id: string
  title: string
  slug: string
  description?: string
  category: string
  location: string
  building_type?: string
  project_duration?: string
  featured_image_url?: string
  is_featured: boolean
}

/* ================= COMPONENT ================= */

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activePhotoTab, setActivePhotoTab] = useState("Tümü")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const [mediaCategories, setMediaCategories] = useState<string[]>(["Tümü"])
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  /* ================= MEDIA ================= */

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media")
        const result = await response.json()

        if (Array.isArray(result.data)) {
          setAllMediaItems(result.data)

          // ✅ TS 5.0.2 SAFE – UI DEĞİŞMEDİ
          const categories: string[] = result.data
            .map((item: MediaItem) => item.category)
            .filter(
              (c: string | null | undefined): c is string =>
                typeof c === "string"
            )

          const uniqueCategories: string[] = ["Tümü", ...new Set(categories)]
          setMediaCategories(uniqueCategories)

          const images = result.data
            .filter((item: MediaItem) =>
              item.file_type.startsWith("image")
            )
            .map((item: MediaItem) => item.url)

          setGalleryImages(
            images.length
              ? images
              : [
                  "/steel-construction-industrial-factory-building.jpg",
                  "/industrial-steel-factory-workers-warehouse.jpg",
                  "/sandwich-panel-building-construction-modern.jpg",
                ]
          )
        }
      } catch (error) {
        console.error("Media fetch error:", error)
      }
    }

    const fetchPartners = async () => {
      try {
        const response = await fetch("/data/partners.json", {
          cache: "no-store",
        })
        const data: PartnersData = await response.json()
        setPartners(data.partners)
      } catch (error) {
        console.error("Partners fetch error:", error)
      }
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setProjects(data.data || [])
      } catch (error) {
        console.error("Projects fetch error:", error)
      }
    }

    fetchMedia()
    fetchPartners()
    fetchProjects()
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ⬇⬇⬇ BURADAN AŞAĞISI ZIP'TEKİ ORİJİNAL UI – DOKUNULMADI ⬇⬇⬇ */}

      {/* Header */}
      {/* ... (ZIP'TEKİ HEADER, HERO, SECTIONS, FOOTER AYNEN DEVAM EDER) ... */}

      {lightboxOpen && (
        <PhotoLightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
