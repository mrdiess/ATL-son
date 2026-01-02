"use client"

import type React from "react"
import { useState } from "react"
import {
  Menu,
  X,
  LogOut,
  ImageIcon,
  Layers,
  Video,
  Users2,
  FileText,
  BarChart3,
  Users,
  CogIcon as LogIcon,
  Settings,
  Sun,
  Moon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const navItems = [
    { label: "Medya", href: "/admin/medya", icon: ImageIcon },
    { label: "Slider", href: "/admin/slider", icon: Layers },
    { label: "Video", href: "/admin/video", icon: Video },
    { label: "Sponsor", href: "/admin/sponsor", icon: Users2 },
    { label: "İçerik", href: "/admin/content", icon: FileText },
    { label: "Analiz", href: "/admin/analytics", icon: BarChart3 },
    { label: "Kullanıcı", href: "/admin/users", icon: Users },
    { label: "Log", href: "/admin/logs", icon: LogIcon },
    { label: "Ayarlar", href: "/admin/settings", icon: Settings },
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    const html = document.documentElement
    if (!isDarkMode) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 transform md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-sidebar-border">
            <Image src="/logo.png" alt="ATL Logo" width={140} height={40} className="h-12 w-auto object-contain" />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href === "/admin/medya" && pathname === "/admin")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${
                    isActive
                      ? "bg-sidebar-primary/20 text-sidebar-primary border border-sidebar-primary/30"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 space-y-2 border-t border-sidebar-border">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-2 px-4 py-2 text-sidebar-foreground/60 hover:text-sidebar-foreground text-sm rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden sm:inline">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sidebar-foreground/60 hover:text-white text-sm rounded-lg hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-4 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
            <h1 className="text-foreground font-bold hidden sm:block">ATL Çelik Yapı Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:block">admin</span>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-background">
          <div className="p-4 md:p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
