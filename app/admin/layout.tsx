"use client"

import type React from "react"
import { useState } from "react"
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ImageIcon,
  Palette,
  FileText,
  Handshake,
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
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Galeri", href: "/admin/galeri", icon: ImageIcon },
    { label: "Özel Tasarımlar", href: "/admin/ozel-tasarimlar", icon: Palette },
    { label: "Teklif Talepleri", href: "/admin/teklif-talepleri", icon: FileText },
    { label: "İş Ortakları", href: "/admin/is-ortaklari", icon: Handshake },
    { label: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
  ]

  const handleLogout = async () => {
    router.push("/login")
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800 transition-transform duration-300 transform md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <Image
              src="/darkmodelogo.png"
              alt="ATL Logo"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 border border-blue-600/40 shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 space-y-2 border-t border-slate-800">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-slate-200 text-sm rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-400 text-sm rounded-lg hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Top Bar */}
        <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-slate-200" /> : <Menu className="w-6 h-6 text-slate-200" />}
            </button>
            <h1 className="text-slate-200 font-bold text-lg">ATL Çelik Yapı Admin Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 hidden md:block">Administrator</span>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
              A
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
