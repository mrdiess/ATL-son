"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showToggle, setShowToggle] = useState(true)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = saved === "dark" || (!saved && prefersDark)
    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)

    // Admin ayarlarindan dark mode gosterme durumunu kontrol et
    const siteSettings = localStorage.getItem("atl_site_settings")
    if (siteSettings) {
      const settings = JSON.parse(siteSettings)
      setShowToggle(settings.showDarkModeToggle !== false)
    }

    // Listen for settings changes
    const handleStorageChange = () => {
      const siteSettings = localStorage.getItem("atl_site_settings")
      if (siteSettings) {
        const settings = JSON.parse(siteSettings)
        setShowToggle(settings.showDarkModeToggle !== false)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    // Custom event for same-tab changes
    window.addEventListener("siteSettingsChanged", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("siteSettingsChanged", handleStorageChange)
    }
  }, [])

  const toggleTheme = () => {
    const newValue = !isDark
    setIsDark(newValue)
    document.documentElement.classList.toggle("dark", newValue)
    localStorage.setItem("theme", newValue ? "dark" : "light")
  }

  if (!mounted || !showToggle) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg hover:bg-muted"
      aria-label={isDark ? "Açık mod" : "Koyu mod"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
