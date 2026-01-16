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

interface Sponsor {
  id: string
  name: string
  logo_url: string
  website_url?: string
  sort_order: number
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
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [mediaCategories, setMediaCategories] = useState<string[]>(["Tümü"])
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [allMediaItems, setAllMediaItems] = useState<MediaItem[]>([])
  const [mediaLoading, setMediaLoading] = useState(true)
  const [visibleImageCount, setVisibleImageCount] = useState(8)
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3)

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media")
        if (!response.ok) throw new Error("Media fetch error")
        const result = await response.json()

        if (result.data) {
          setAllMediaItems(result.data)

          /* 🔧 TEK DÜZELTİLEN YER (UI AYNI) */
          const uniqueCategories: string[] = [
            "Tümü",
            ...Array.from(
              new Set(
                result.data
                  .map((item: MediaItem) => item.category)
                  .filter((c): c is string => typeof c === "string")
              )
            ),
          ]
          setMediaCategories(uniqueCategories)
          /* 🔧 TEK DÜZELTİLEN YER BİTTİ */

          const imageItems = result.data.filter((item: MediaItem) =>
            item.file_type.startsWith("image")
          )
          const images = imageItems.map((item: MediaItem) => item.url)

          setGalleryImages(
            images.length > 0
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
      } finally {
        setMediaLoading(false)
      }
    }

    fetchMedia()
  }, [])

  /* ================= DEVAMI UI AYNI ================= */
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* … */}
    </div>
  )
}
