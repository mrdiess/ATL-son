"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { setTheme, getStoredTheme, getSystemTheme } from "@/lib/theme"

export function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark" | "system">("system")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setThemeState(getStoredTheme())
  }, [])

  if (!mounted) return null

  const handleToggle = () => {
    const current = getStoredTheme()
    const next: typeof current = current === "dark" ? "light" : "dark"
    setTheme(next)
    setThemeState(next)
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} className="hover:bg-slate-800" title="Temayı değiştir">
      {theme === "dark" || (theme === "system" && getSystemTheme() === "dark") ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-400" />
      )}
    </Button>
  )
}
