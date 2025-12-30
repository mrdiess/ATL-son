"use client"
import { useState, useEffect } from "react"
import {
  Upload,
  ImageIcon,
  Trash2,
  Edit2,
  Plus,
  Save,
  Eye,
  FileVideo,
  Grid3x3,
  List,
  Youtube,
  AlertTriangle,
  Power,
  Settings,
  Moon,
  Building,
  Type,
  Users,
  LogOut,
  Activity,
  Sun,
  Handshake,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AdminLogin } from "@/components/admin-login"
import { UserManagement } from "@/components/user-management"
import { ActivityLog } from "@/components/activity-log"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { uploadImage, deleteImage } from "@/lib/supabase/storage"

interface MediaItem {
  id: string
  name: string
  url: string
  type: "image" | "video" | "document"
  category: string
  size: string
  uploadedAt: string
  alt?: string
}

interface SliderItem {
  id: number
  title: string
  subtitle: string
  image: string
  active: boolean
}

interface YouTubeVideo {
  id: string
  title: string
  youtubeId: string
  thumbnail: string
  category: string
  addedAt: string
}

interface MaintenanceSettings {
  enabled: boolean
  endTime: string | null
  note: string
}

interface SiteSettings {
  companyName: string
  companySlogan: string
  phone: string
  email: string
  address: string
  showDarkModeToggle: boolean
  logoUrl?: string // Added logoUrl
  faviconUrl?: string // Added faviconUrl
}

interface ContentItem {
  id: string
  section: string
  key: string
  title: string
  value: string
  type: "text" | "textarea" | "image"
}

interface User {
  id: string
  username: string
  role: string
  name: string
}

interface Sponsor {
  id: string
  name: string
  logo: string
  website?: string
  active: boolean
}

const initialMedia: MediaItem[] = [
  {
    id: "1",
    name: "steel-structure-warehouse.jpg",
    url: "/modern-warehouse-steel-construction-building.jpg",
    type: "image",
    category: "Depo",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    alt: "Depo Projesi",
  },
  {
    id: "2",
    name: "factory-building-steel.jpg",
    url: "/industrial-factory-steel-metal-building-production.jpg",
    type: "image",
    category: "Fabrika",
    size: "1.8 MB",
    uploadedAt: "2024-01-15",
    alt: "Fabrika Binası",
  },
  {
    id: "3",
    name: "steel-hangar-aircraft.jpg",
    url: "/large-aircraft-hangar-steel-structure-construction.jpg",
    type: "image",
    category: "Hangar",
    size: "3.1 MB",
    uploadedAt: "2024-01-15",
    alt: "Hangar Projesi",
  },
  {
    id: "4",
    name: "shopping-mall-steel.jpg",
    url: "/modern-shopping-mall-steel-structure-interior.jpg",
    type: "image",
    category: "Ticari",
    size: "2.7 MB",
    uploadedAt: "2024-01-15",
    alt: "AVM Projesi",
  },
  {
    id: "5",
    name: "office-building-steel.jpg",
    url: "/modern-office-building-steel-frame-architecture.jpg",
    type: "image",
    category: "Ticari",
    size: "2.2 MB",
    uploadedAt: "2024-01-15",
    alt: "Ofis Binasi",
  },
  {
    id: "6",
    name: "greenhouse-steel.jpg",
    url: "/agricultural-greenhouse-farm-steel-metal-structure.jpg",
    type: "image",
    category: "Tarimsal",
    size: "1.9 MB",
    uploadedAt: "2024-01-15",
    alt: "Sera Projesi",
  },
]

const initialSlider: SliderItem[] = [
  {
    id: 1,
    title: "Lazer Kesim",
    subtitle: "Yüksek hassasiyet ve teknoloji ile metal işleme",
    image: "/laser-cutting-machine-industrial-metal-processing.jpg",
    active: true,
  },
  {
    id: 2,
    title: "Sandviç Panel",
    subtitle: "Profesyonel üretim ve montaj hizmetleri",
    image: "/sandwich-panel-production-manufacturing-line.jpg",
    active: true,
  },
  {
    id: 3,
    title: "Çelik Konstrüksiyon",
    subtitle: "Endüstriyel tesis ve depo çözümleriniz için",
    image: "/steel-construction-industrial.jpg",
    active: true,
  },
]

const initialVideos: YouTubeVideo[] = [
  {
    id: "1",
    title: "Çelik Yapı Üretim Süreci",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/steel-construction-manufacturing-process-factory.jpg",
    category: "Üretim",
    addedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Fabrika Montaj İşlemi",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/factory-assembly-steel-structure-workers.jpg",
    category: "Montaj",
    addedAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Depo Projesi Tamamlandı",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: "/warehouse-steel-building-completed-project.jpg",
    category: "Projeler",
    addedAt: "2024-01-15",
  },
]

const initialSponsors: Sponsor[] = [
  { id: "1", name: "Bosch", logo: "/bosch-logo.jpg", website: "https://bosch.com", active: true },
  { id: "2", name: "Makita", logo: "/makita-logo.jpg", website: "https://makita.com", active: true },
  { id: "3", name: "DeWalt", logo: "/dewalt-logo.jpg", website: "https://dewalt.com", active: true },
  { id: "4", name: "Hilti", logo: "/hilti-logo.jpg", website: "https://hilti.com", active: true },
  { id: "5", name: "Karcher", logo: "/karcher-logo.jpg", website: "https://karcher.com", active: true },
]

const initialContent: ContentItem[] = [
  { id: "1", section: "Hero", key: "hero_title", title: "Ana Başlık", value: "ATL Çelik Yapı", type: "text" },
  {
    id: "2",
    section: "Hero",
    key: "hero_subtitle",
    title: "Alt Başlık",
    value: "Güvenilir Çelik Çözümleri",
    type: "text",
  },
  {
    id: "3",
    section: "Hakkımızda",
    key: "about_title",
    title: "Başlık",
    value: "25 Yıllık Tecrübe",
    type: "text",
  },
  {
    id: "4",
    section: "Hakkımızda",
    key: "about_desc",
    title: "Açıklama",
    value: "Çelik yapı sektöründe lider firma...",
    type: "textarea",
  },
  { id: "5", section: "Hizmetler", key: "services_title", title: "Başlık", value: "Hizmetlerimiz", type: "text" },
  {
    id: "6",
    section: "İletişim",
    key: "contact_title",
    title: "Başlık",
    value: "Bizimle İletişime Geçin",
    type: "text",
  },
]

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [media, setMedia] = useState<MediaItem[]>([])
  const [slider, setSlider] = useState<SliderItem[]>(initialSlider)
  const [videos, setVideos] = useState<YouTubeVideo[]>(initialVideos)
  const [content, setContent] = useState<ContentItem[]>(initialContent)
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors)
  const [newSponsor, setNewSponsor] = useState({ name: "", logo: "", website: "" })
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [newVideo, setNewVideo] = useState({ title: "", url: "", category: "Üretim" })
  const [maintenance, setMaintenance] = useState<MaintenanceSettings>({
    enabled: false,
    endTime: null,
    note: "",
  })
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    companyName: "ATL Çelik Yapı",
    companySlogan: "Güvenilir Çelik Çözümleri",
    phone: "+90 537 339 39 47",
    email: "admin@atlcelikyapi.com",
    address: "Düzce Yeni Sanayi Sitesi, Düzce",
    showDarkModeToggle: true,
    logoUrl: "/atl-celik-yapi-logo.png", // Initial logo URL
    faviconUrl: "/favicon.ico", // Initial favicon URL
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("/api/admin/session")
        const data = await response.json()

        if (data.user) {
          setIsLoggedIn(true)
          setCurrentUser(data.user)
        }
      } catch (error) {
        console.error("Session check error:", error)
      }
      setIsLoading(false)
    }

    checkSession()

    // Load dark mode preference
    const saved = localStorage.getItem("atl_admin_dark_mode")
    const isDark = saved ? JSON.parse(saved) : false
    setDarkMode(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      loadSettings()
      loadSponsors()
    }
  }, [isLoggedIn])

  // Fetch media from database
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/api/media")
        const data = await response.json()
        setMedia(data)
      } catch (error) {
        console.error("[v0] Error fetching media:", error)
      }
    }

    fetchMedia()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      const data = await response.json()

      if (data.company) {
        setSiteSettings({
          companyName: data.company.name || siteSettings.companyName,
          companySlogan: data.company.slogan || siteSettings.companySlogan,
          phone: data.company.phone || siteSettings.phone,
          email: data.company.email || siteSettings.email,
          address: data.company.address || siteSettings.address,
          logoUrl: data.company.logoUrl || siteSettings.logoUrl, // Load logoUrl
          faviconUrl: data.company.faviconUrl || siteSettings.faviconUrl, // Load faviconUrl
          showDarkModeToggle: data.theme?.showDarkModeToggle ?? true,
        })
      }

      if (data.maintenance) {
        setMaintenance(data.maintenance)
      }
    } catch (error) {
      console.error("Load settings error:", error)
    }
  }

  const loadSponsors = async () => {
    try {
      const response = await fetch("/api/admin/sponsors")
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setSponsors(data)
      }
    } catch (error) {
      console.error("Load sponsors error:", error)
    }
  }

  const toggleAdminDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle("dark", newDarkMode)
    localStorage.setItem("atl_admin_dark_mode", JSON.stringify(newDarkMode))
  }

  const categories = ["Tümü", "Depo", "Fabrika", "Hangar", "Ticari", "Tarımsal", "Spor"]

  const filteredMedia = selectedCategory === "Tümü" ? media : media.filter((item) => item.category === selectedCategory)

  const deleteMedia = async (id: string) => {
    const item = media.find((m) => m.id === id)
    if (!item) return

    try {
      // Delete from database first
      await fetch(`/api/media/${id}`, { method: "DELETE" })

      // Delete from storage
      const filename = item.url.split("/").pop()
      if (filename) {
        await deleteImage(filename, "media")
      }

      setMedia(media.filter((m) => m.id !== id))
    } catch (error) {
      console.error("[v0] Error deleting media:", error)
    }
  }

  const extractYoutubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const addMedia = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file, "media")
      if (!imageUrl) {
        alert("Yükleme başarısız oldu")
        return
      }

      const newMedia: MediaItem = {
        id: Date.now().toString(),
        name: file.name,
        url: imageUrl,
        type: file.type.startsWith("image") ? "image" : "document",
        category: selectedCategory || "Diğer",
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploadedAt: new Date().toLocaleDateString("tr-TR"),
      }

      // Save to database
      await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMedia),
      })

      setMedia([newMedia, ...media])
    } catch (error) {
      console.error("[v0] Error adding media:", error)
      alert("Medya eklenirken hata oluştu")
    }
  }

  const addVideo = () => {
    const youtubeId = extractYoutubeId(newVideo.url)
    if (!youtubeId || !newVideo.title) return

    const video: YouTubeVideo = {
      id: Date.now().toString(),
      title: newVideo.title,
      youtubeId,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      category: newVideo.category,
      addedAt: new Date().toISOString().split("T")[0],
    }
    setVideos([...videos, video])
    setNewVideo({ title: "", url: "", category: "Üretim" })
  }

  const deleteVideo = (id: string) => {
    setVideos(videos.filter((v) => v.id !== id))
  }

  const toggleMaintenance = async () => {
    const newMaintenance = { ...maintenance, enabled: !maintenance.enabled }
    setMaintenance(newMaintenance)

    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "maintenance", value: newMaintenance }),
      })
    } catch (error) {
      console.error("Save maintenance error:", error)
    }
  }

  const saveMaintenance = async () => {
    setIsSaving(true)
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "maintenance", value: maintenance }),
      })
    } catch (error) {
      console.error("Save maintenance error:", error)
    }
    setIsSaving(false)
  }

  const saveSiteSettings = async () => {
    setIsSaving(true)
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "company",
          value: {
            name: siteSettings.companyName,
            slogan: siteSettings.companySlogan,
            phone: siteSettings.phone,
            email: siteSettings.email,
            address: siteSettings.address,
            logoUrl: siteSettings.logoUrl, // Save logoUrl
            faviconUrl: siteSettings.faviconUrl, // Save faviconUrl
          },
        }),
      })

      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "theme",
          value: { showDarkModeToggle: siteSettings.showDarkModeToggle },
        }),
      })

      window.dispatchEvent(new Event("siteSettingsChanged"))
    } catch (error) {
      console.error("Save settings error:", error)
    }
    setIsSaving(false)
  }

  const updateContent = (id: string, value: string) => {
    setContent(content.map((item) => (item.id === id ? { ...item, value } : item)))
  }

  const saveContent = () => {
    localStorage.setItem("atl_content", JSON.stringify(content))
  }

  const addSponsor = async () => {
    if (!newSponsor.name || !newSponsor.logo) return

    try {
      const response = await fetch("/api/admin/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSponsor.name,
          logo: newSponsor.logo,
          website: newSponsor.website || null,
          active: true,
        }),
      })

      const data = await response.json()
      if (data.id) {
        setSponsors([...sponsors, data])
        setNewSponsor({ name: "", logo: "", website: "" })
      }
    } catch (error) {
      console.error("Add sponsor error:", error)
    }
  }

  const deleteSponsor = async (id: string) => {
    try {
      await fetch(`/api/admin/sponsors?id=${id}`, { method: "DELETE" })
      setSponsors(sponsors.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Delete sponsor error:", error)
    }
  }

  const toggleSponsorActive = async (id: string) => {
    const sponsor = sponsors.find((s) => s.id === id)
    if (!sponsor) return

    try {
      await fetch("/api/admin/sponsors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...sponsor, active: !sponsor.active }),
      })
      setSponsors(sponsors.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
    } catch (error) {
      console.error("Toggle sponsor error:", error)
    }
  }

  const updateSponsor = async () => {
    if (!editingSponsor) return

    try {
      await fetch("/api/admin/sponsors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSponsor),
      })
      setSponsors(sponsors.map((s) => (s.id === editingSponsor.id ? editingSponsor : s)))
      setEditingSponsor(null)
    } catch (error) {
      console.error("Update sponsor error:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    }
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <AdminLogin
        onLogin={(user) => {
          setIsLoggedIn(true)
          setCurrentUser(user)
        }}
      />
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
                  {/* Dynamically render logo from settings */}
                  {siteSettings.logoUrl ? (
                    <img
                      src={siteSettings.logoUrl || "/placeholder.svg"}
                      alt="Company Logo"
                      className="max-h-full max-w-full p-1"
                    />
                  ) : (
                    <span className="text-primary-foreground font-bold">ATL</span>
                  )}
                </div>
                <div>
                  <h1 className="font-bold text-lg">{siteSettings.companyName} Admin</h1>
                  <p className="text-xs text-muted-foreground">{siteSettings.companySlogan}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                {maintenance.enabled && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="hidden sm:inline">Bakım Modu Aktif</span>
                  </Badge>
                )}
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{currentUser?.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {currentUser?.role}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleAdminDarkMode} className="p-2">
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline ml-2">Çıkış</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="media" className="space-y-6">
            <TabsList className="grid grid-cols-5 sm:grid-cols-9 w-full max-w-5xl gap-1">
              <TabsTrigger value="media" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <ImageIcon className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Medya</span>
              </TabsTrigger>
              <TabsTrigger value="slider" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <FileVideo className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Slider</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <Youtube className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Video</span>
              </TabsTrigger>
              <TabsTrigger value="sponsors" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <Handshake className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Sponsor</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <Type className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">İçerik</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Analiz</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Kullanıcı</span>
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Log</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col sm:flex-row items-center gap-1 px-2 py-2">
                <Settings className="w-4 h-4" />
                <span className="text-[10px] sm:text-sm">Ayar</span>
              </TabsTrigger>
            </TabsList>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">Medya Kütüphanesi</h2>
                  <p className="text-muted-foreground">Fotoğraflarınızı ve dosyalarınızı yönetin</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Yükle
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Medya Yükle</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <Label htmlFor="media-upload">Dosya Seç</Label>
                        <Input
                          id="media-upload"
                          type="file"
                          className="mt-2"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              addMedia(e.target.files[0])
                            }
                          }}
                        />
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label>Kategori</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredMedia.map((item) => (
                    <Card key={item.id} className="group overflow-hidden">
                      <div className="relative aspect-square">
                        <img
                          src={item.url || "/placeholder.svg"}
                          alt={item.alt || item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="destructive" onClick={() => deleteMedia(item.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Önizleme</TableHead>
                        <TableHead>Dosya Adı</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Boyut</TableHead>
                        <TableHead>Tarih</TableHead>
                        <TableHead className="text-right">İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMedia.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt={item.alt || item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category}</Badge>
                          </TableCell>
                          <TableCell>{item.size}</TableCell>
                          <TableCell>{item.uploadedAt}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => deleteMedia(item.id)}>
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </TabsContent>

            {/* Slider Tab */}
            <TabsContent value="slider" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Hero Slider</h2>
                  <p className="text-muted-foreground">Ana sayfa slider görsellerini yönetin</p>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Slayt
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slider.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${item.active ? "bg-green-500" : "bg-gray-500"}`}>
                        {item.active ? "Aktif" : "Pasif"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{item.subtitle}</p>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Edit2 className="w-4 h-4 mr-2" />
                              Düzenle
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Slayt Düzenle</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label>Başlık</Label>
                                <Input defaultValue={item.title} />
                              </div>
                              <div className="space-y-2">
                                <Label>Alt Başlık</Label>
                                <Input defaultValue={item.subtitle} />
                              </div>
                              <div className="space-y-2">
                                <Label>Görsel URL</Label>
                                <Input defaultValue={item.image} />
                              </div>
                              <Button className="w-full">
                                <Save className="w-4 h-4 mr-2" />
                                Kaydet
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setSlider(slider.map((s) => (s.id === item.id ? { ...s, active: !s.active } : s)))
                          }
                        >
                          <Power className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Video Galeri</h2>
                  <p className="text-muted-foreground">YouTube videolarınızı yönetin</p>
                </div>
              </div>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Yeni Video Ekle</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Video Başlığı</Label>
                    <Input
                      placeholder="Video başlığını girin"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>YouTube URL</Label>
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      value={newVideo.url}
                      onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select value={newVideo.category} onValueChange={(v) => setNewVideo({ ...newVideo, category: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Üretim">Üretim</SelectItem>
                        <SelectItem value="Montaj">Montaj</SelectItem>
                        <SelectItem value="Projeler">Projeler</SelectItem>
                        <SelectItem value="Tanıtım">Tanıtım</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addVideo} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Ekle
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden group">
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Youtube className="w-12 h-12 text-red-500" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{video.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline">{video.category}</Badge>
                        <Button variant="ghost" size="icon" onClick={() => deleteVideo(video.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sponsors Tab */}
            <TabsContent value="sponsors" className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">İş Ortakları Yönetimi</h2>
                  <p className="text-muted-foreground">Sponsor ve iş ortaklarınızı yönetin</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni Sponsor Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni Sponsor Ekle</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="sponsor-name">Sponsor Adı</Label>
                        <Input
                          id="sponsor-name"
                          value={newSponsor.name}
                          onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                          placeholder="Örn: Bosch"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sponsor-logo">Logo URL</Label>
                        <Input
                          id="sponsor-logo"
                          value={newSponsor.logo}
                          onChange={(e) => setNewSponsor({ ...newSponsor, logo: e.target.value })}
                          placeholder="/sponsor-logo.jpg veya https://..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="sponsor-website">Website (Opsiyonel)</Label>
                        <Input
                          id="sponsor-website"
                          value={newSponsor.website}
                          onChange={(e) => setNewSponsor({ ...newSponsor, website: e.target.value })}
                          placeholder="https://sponsor.com"
                        />
                      </div>
                      <Button onClick={addSponsor} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Sponsor Ekle
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sponsors.map((sponsor) => (
                  <Card key={sponsor.id} className={`relative ${!sponsor.active ? "opacity-50" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={sponsor.logo || "/placeholder.svg"}
                            alt={sponsor.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{sponsor.name}</h3>
                          {sponsor.website && (
                            <p className="text-xs text-muted-foreground truncate">{sponsor.website}</p>
                          )}
                          <Badge variant={sponsor.active ? "default" : "secondary"} className="mt-2">
                            {sponsor.active ? "Aktif" : "Pasif"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <Switch checked={sponsor.active} onCheckedChange={() => toggleSponsorActive(sponsor.id)} />
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setEditingSponsor(sponsor)}>
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Sponsor Düzenle</DialogTitle>
                              </DialogHeader>
                              {editingSponsor && (
                                <div className="space-y-4 mt-4">
                                  <div>
                                    <Label>Sponsor Adı</Label>
                                    <Input
                                      value={editingSponsor.name}
                                      onChange={(e) => setEditingSponsor({ ...editingSponsor, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label>Logo URL</Label>
                                    <Input
                                      value={editingSponsor.logo}
                                      onChange={(e) => setEditingSponsor({ ...editingSponsor, logo: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label>Website</Label>
                                    <Input
                                      value={editingSponsor.website || ""}
                                      onChange={(e) =>
                                        setEditingSponsor({ ...editingSponsor, website: e.target.value })
                                      }
                                    />
                                  </div>
                                  <Button onClick={updateSponsor} className="w-full">
                                    <Save className="w-4 h-4 mr-2" />
                                    Kaydet
                                  </Button>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="destructive" size="sm" onClick={() => deleteSponsor(sponsor.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">İçerik Yönetimi</h2>
                  <p className="text-muted-foreground">Site yazılarını ve başlıklarını düzenleyin</p>
                </div>
                <Button onClick={saveContent}>
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </Button>
              </div>

              <div className="grid gap-6">
                {["Hero", "Hakkımızda", "Hizmetler", "İletişim"].map((section) => (
                  <Card key={section} className="p-6">
                    <h3 className="font-semibold text-lg mb-4 border-b pb-2">{section}</h3>
                    <div className="grid gap-4">
                      {content
                        .filter((item) => item.section === section)
                        .map((item) => (
                          <div key={item.id} className="space-y-2">
                            <Label>{item.title}</Label>
                            {item.type === "textarea" ? (
                              <Textarea
                                value={item.value}
                                onChange={(e) => updateContent(item.id, e.target.value)}
                                rows={4}
                              />
                            ) : (
                              <Input value={item.value} onChange={(e) => updateContent(item.id, e.target.value)} />
                            )}
                          </div>
                        ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            {/* Activity Logs Tab */}
            <TabsContent value="logs">
              <ActivityLog />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Ayarlar</h2>
                <p className="text-muted-foreground">Site, logo, favicon ve bakım ayarlarını yönetin</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Logo and Branding Settings */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Logo ve Branding</h3>
                      <p className="text-sm text-muted-foreground">Logo ve favicon yönetin</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Logo URL</Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        value={siteSettings.logoUrl || ""}
                        onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                      />
                      {siteSettings.logoUrl && (
                        <div className="mt-2 p-3 border rounded-lg flex items-center justify-center bg-muted">
                          <img
                            src={siteSettings.logoUrl || "/placeholder.svg"}
                            alt="Logo preview"
                            className="max-h-16"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Favicon URL</Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/favicon.ico"
                        value={siteSettings.faviconUrl || ""}
                        onChange={(e) => setSiteSettings({ ...siteSettings, faviconUrl: e.target.value })}
                      />
                      {siteSettings.faviconUrl && (
                        <div className="mt-2 p-3 border rounded-lg flex items-center justify-center bg-muted">
                          <img
                            src={siteSettings.faviconUrl || "/placeholder.svg"}
                            alt="Favicon preview"
                            className="w-8 h-8"
                          />
                        </div>
                      )}
                    </div>

                    <Button onClick={saveSiteSettings} className="w-full" disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Kaydediliyor..." : "Logo ve Favicon'ı Kaydet"}
                    </Button>
                  </div>
                </Card>

                {/* Maintenance Settings */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Bakım Modu</h3>
                      <p className="text-sm text-muted-foreground">Siteyi geçici olarak bakım moduna alın</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Power className={`w-5 h-5 ${maintenance.enabled ? "text-red-500" : "text-green-500"}`} />
                        <div>
                          <p className="font-medium">Bakım Modu</p>
                          <p className="text-sm text-muted-foreground">
                            {maintenance.enabled ? "Site bakımda" : "Site aktif"}
                          </p>
                        </div>
                      </div>
                      <Switch checked={maintenance.enabled} onCheckedChange={toggleMaintenance} />
                    </div>

                    <div className="space-y-2">
                      <Label>Tahmini Bitiş Zamanı</Label>
                      <Input
                        type="datetime-local"
                        value={maintenance.endTime || ""}
                        onChange={(e) => setMaintenance({ ...maintenance, endTime: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Bakım Notu</Label>
                      <Textarea
                        placeholder="Ziyaretçilere gösterilecek mesaj..."
                        value={maintenance.note}
                        onChange={(e) => setMaintenance({ ...maintenance, note: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <Button onClick={saveMaintenance} className="w-full" disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Kaydediliyor..." : "Bakım Ayarlarını Kaydet"}
                    </Button>
                  </div>
                </Card>

                {/* Site Settings - Simplified */}
                <Card className="p-6 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Building className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Site Ayarları</h3>
                      <p className="text-sm text-muted-foreground">Firma ve iletişim bilgilerini düzenleyin</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Firma Adı</Label>
                      <Input
                        value={siteSettings.companyName}
                        onChange={(e) => setSiteSettings({ ...siteSettings, companyName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Slogan</Label>
                      <Input
                        value={siteSettings.companySlogan}
                        onChange={(e) => setSiteSettings({ ...siteSettings, companySlogan: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefon</Label>
                      <Input
                        value={siteSettings.phone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>E-posta</Label>
                      <Input
                        value={siteSettings.email}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Adres</Label>
                      <Textarea
                        value={siteSettings.address}
                        onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg md:col-span-2">
                      <div>
                        <p className="font-medium">Tema Değiştirici</p>
                        <p className="text-sm text-muted-foreground">Kullanıcılara tema seçeneği göster</p>
                      </div>
                      <Switch
                        checked={siteSettings.showDarkModeToggle}
                        onCheckedChange={(checked) => setSiteSettings({ ...siteSettings, showDarkModeToggle: checked })}
                      />
                    </div>

                    <Button onClick={saveSiteSettings} className="w-full md:col-span-2" disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Kaydediliyor..." : "Tüm Ayarları Kaydet"}
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
