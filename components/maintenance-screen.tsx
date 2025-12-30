"use client"

import { useState, useEffect } from "react"
import { Construction, Mail, Phone, Clock, FileText } from "lucide-react"

interface MaintenanceSettings {
  enabled: boolean
  endTime: string | null
  note: string
}

export function MaintenanceScreen() {
  const [settings, setSettings] = useState<MaintenanceSettings>({
    enabled: true,
    endTime: null,
    note: "",
  })
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("maintenanceSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updated = localStorage.getItem("maintenanceSettings")
      if (updated) {
        setSettings(JSON.parse(updated))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    const interval = setInterval(handleStorageChange, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!settings.endTime) {
      setTimeLeft("")
      return
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = new Date(settings.endTime!).getTime()
      const diff = end - now

      if (diff <= 0) {
        setTimeLeft("Bitiş zamanı geçti")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days} gün ${hours} saat ${minutes} dakika`)
      } else if (hours > 0) {
        setTimeLeft(`${hours} saat ${minutes} dakika ${seconds} saniye`)
      } else {
        setTimeLeft(`${minutes} dakika ${seconds} saniye`)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [settings.endTime])

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <Construction className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-primary/30 rounded-full animate-ping" />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Site Bakımda</h1>

        {/* Description */}
        <p className="text-slate-300 text-lg mb-6 leading-relaxed">
          Sitemiz şu anda bakım çalışmaları nedeniyle geçici olarak hizmet dışıdır. En kısa sürede tekrar sizinle
          olacağız.
        </p>

        {settings.note && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/10">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-slate-200 text-sm text-left">{settings.note}</p>
            </div>
          </div>
        )}

        {timeLeft && (
          <div className="bg-primary/20 backdrop-blur-sm px-6 py-4 rounded-xl mb-8 border border-primary/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Tahmini Kalan Süre</span>
            </div>
            <p className="text-2xl font-bold text-white">{timeLeft}</p>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <p className="text-slate-400 text-sm mb-4">Acil durumlar için bize ulaşın:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+905373393947"
              className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+90 537 339 39 47</span>
            </a>
            <span className="hidden sm:block text-slate-600">|</span>
            <a
              href="mailto:info@atlcelikyapi.com"
              className="flex items-center gap-2 text-white hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@atlcelikyapi.com</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-slate-500 text-xs mt-8">Anlayışınız için teşekkür ederiz.</p>
      </div>
    </div>
  )
}
