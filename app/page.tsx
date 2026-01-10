"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
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
import { useEffect, useState } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % 3)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + 3) % 3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? "bg-background/95 backdrop-blur border-b" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/">
            <img src="/lightmodelogo.png" className="h-12 dark:hidden" />
            <img src="/darkmodelogo.png" className="h-12 hidden dark:block" />
          </Link>

          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#projeler">Projeler</a>
            <a href="#hakkimizda">
