"use client"

import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Trash2, Eye, ImageIcon, Film, X, Grid, List } from "lucide-react"
import Image from "next/image"

interface MediaItem {
  id: string
  filename: string
  url: string
  file_type: string
  category: string
  size: number
  created_at: string
}

interface VideoItem {
  id: string
  title: string
  youtube_url: string
  youtube_id: string
  thumbnail_url: string
  category: string
  sort_order: number
  is_active: boolean
  created_at: string
}

interface SponsorItem {
  id: string
  name: string
  logo_url: string
  website_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [sponsors, setSponsors] = useState<SponsorItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [videoFormData, setVideoFormData] = useState({
    title: "",
    youtube_url: "",
    category: "Üretim",
    sort_order: 0,
    is_active: true,
  })
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoFileUploading, setVideoFileUploading] = useState(false)

  const [sponsorFormData, setSponsorFormData] = useState({
    name: "",
    logo_url: "",
    website_url: "",
    sort_order: 0,
    is_active: true,
  })
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null)

  const mediaCategories = ["Tümü", "Depo", "Fabrika", "Hangar", "Ticari", "Tarımsal", "Spor", "Diğer"]

  const [uploadCategory, setUploadCategory] = useState("Depo")

  const videoCategories = ["Üretim", "Montaj", "Projeler"]

  const fetchMedia = useCallback(async () => {
    try {
      const response = await fetch("/api/media")
      if (!response.ok) throw new Error("Medya yüklenemedi")
      const data = await response.json()
      console.log("[v0] Media fetched:", data)
      if (data.data) {
        setMedia(data.data)
      }
    } catch (error) {
      console.error("[v0] Medya yüklenemedi:", error)
      setUploadMessage({ type: "error", text: "Medya yüklenirken hata oluştu" })
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch("/api/videos")
      if (!response.ok) throw new Error("Videolar yüklenemedi")
      const data = await response.json()
      console.log("[v0] Videos fetched:", data)
      if (data.data) {
        setVideos(data.data)
      }
    } catch (error) {
      console.error("[v0] Videolar yüklenemedi:", error)
    }
  }, [])

  const fetchSponsors = useCallback(async () => {
    try {
      const response = await fetch("/api/sponsors")
      if (!response.ok) throw new Error("Sponsorlar yüklenemedi")
      const data = await response.json()
      console.log("[v0] Sponsors fetched:", data)
      if (data.data) {
        setSponsors(data.data)
      }
    } catch (error) {
      console.error("[v0] Sponsorlar yüklenemedi:", error)
    }
  }, [])

  useEffect(() => {
    fetchMedia()
    fetchVideos()
    fetchSponsors()
  }, [fetchMedia, fetchVideos, fetchSponsors])

  const handleFileUpload = async (files: FileList) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadMessage(null)
    let successCount = 0
    let errorCount = 0

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("category", uploadCategory) // selectedCategory yerine uploadCategory

      try {
        console.log("[v0] Uploading file:", file.name)
        const response = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        })

        const result = await response.json()
        console.log("[v0] Upload response:", result)

        if (response.ok && result.success) {
          console.log("[v0] File uploaded successfully:", file.name)
          successCount++
          setTimeout(() => {
            fetchMedia()
          }, 500)
        } else {
          console.error("[v0] Upload failed:", result.error)
          errorCount++
        }
      } catch (error) {
        console.error("[v0] Upload error:", error)
        errorCount++
      }
    }

    setUploading(false)
    if (successCount > 0) {
      setUploadMessage({
        type: "success",
        text: `${successCount} dosya başarıyla yüklendi${errorCount > 0 ? `, ${errorCount} hata` : ""}`,
      })
      setTimeout(() => {
        fetchMedia()
      }, 1000)
    } else if (errorCount > 0) {
      setUploadMessage({ type: "error", text: `${errorCount} dosya yüklenemedi` })
    }
  }

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!videoFormData.title) {
      setUploadMessage({ type: "error", text: "Başlık gereklidir" })
      return
    }

    if (!videoFormData.youtube_url && !videoFile) {
      setUploadMessage({ type: "error", text: "YouTube URL veya MP4 dosya gereklidir" })
      return
    }

    setUploading(true)
    console.log("[v0] Video submit başladı:", videoFormData)

    try {
      let videoUrl = videoFormData.youtube_url

      if (videoFile && !editingVideoId) {
        setVideoFileUploading(true)
        const formData = new FormData()
        formData.append("file", videoFile)
        formData.append("type", "video/mp4")
        formData.append("category", "Videolar")

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json()
          throw new Error(uploadErr.error || "Video upload başarısız")
        }

        const uploadData = await uploadRes.json()
        videoUrl = uploadData.url
        setVideoFileUploading(false)
        setVideoFile(null)
      }

      const response = await fetch(editingVideoId ? `/api/videos?id=${editingVideoId}` : "/api/videos", {
        method: editingVideoId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...videoFormData,
          youtube_url: videoUrl,
        }),
      })

      const result = await response.json()
      console.log("[v0] Video submit response:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        result,
      })

      if (response.ok) {
        setUploadMessage({ type: "success", text: editingVideoId ? "Video güncellendi" : "Video eklendi" })
        setVideoFormData({ title: "", youtube_url: "", category: "Üretim", sort_order: 0, is_active: true })
        setEditingVideoId(null)
        setTimeout(() => fetchVideos(), 500)
      } else {
        const errorMsg = result?.error || result?.message || `Sunucu hatası: ${response.status}`
        console.error("[v0] Video submit başarısız:", { status: response.status, error: errorMsg, result })
        setUploadMessage({ type: "error", text: errorMsg })
      }
    } catch (error) {
      console.error("[v0] Video işlem hatası:", error)
      setUploadMessage({ type: "error", text: error instanceof Error ? error.message : "İşlem başarısız oldu" })
    } finally {
      setUploading(false)
      setVideoFileUploading(false)
    }
  }

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sponsorFormData.name || !sponsorFormData.logo_url) {
      setUploadMessage({ type: "error", text: "Ad ve logo URL gereklidir" })
      return
    }

    setUploading(true)

    try {
      const response = await fetch(editingSponsorId ? `/api/sponsors?id=${editingSponsorId}` : "/api/sponsors", {
        method: editingSponsorId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sponsorFormData),
      })

      const result = await response.json()

      if (response.ok) {
        setUploadMessage({ type: "success", text: editingSponsorId ? "İş ortağı güncellendi" : "İş ortağı eklendi" })
        setSponsorFormData({ name: "", logo_url: "", website_url: "", sort_order: 0, is_active: true })
        setEditingSponsorId(null)
        fetchSponsors()
      } else {
        setUploadMessage({ type: "error", text: result.error || "İşlem başarısız" })
      }
    } catch (error) {
      console.error("[v0] Sponsor işlem hatası:", error)
      setUploadMessage({ type: "error", text: "İşlem başarısız oldu" })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu dosyayı silmek istediğinize emin misiniz?")) return

    try {
      const response = await fetch(`/api/media?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        setMedia((prev) => prev.filter((item) => item.id !== id))
        setUploadMessage({ type: "success", text: "Dosya silindi" })
      } else {
        setUploadMessage({ type: "error", text: "Dosya silinirken hata oluştu" })
      }
    } catch (error) {
      console.error("[v0] Delete error:", error)
      setUploadMessage({ type: "error", text: "Silme işlemi başarısız oldu" })
    }
  }

  const handleDeleteVideo = async (id: string) => {
    if (!confirm("Bu videoyu silmek istediğinize emin misiniz?")) return

    try {
      const response = await fetch(`/api/videos?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id))
        setUploadMessage({ type: "success", text: "Video silindi" })
      } else {
        setUploadMessage({ type: "error", text: "Video silinirken hata oluştu" })
      }
    } catch (error) {
      console.error("[v0] Video silme hatası:", error)
      setUploadMessage({ type: "error", text: "Silme işlemi başarısız oldu" })
    }
  }

  const handleDeleteSponsor = async (id: string) => {
    if (!confirm("Bu iş ortağını silmek istediğinize emin misiniz?")) return

    try {
      const response = await fetch(`/api/sponsors?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        setSponsors((prev) => prev.filter((s) => s.id !== id))
        setUploadMessage({ type: "success", text: "İş ortağı silindi" })
      } else {
        setUploadMessage({ type: "error", text: "İş ortağı silinirken hata oluştu" })
      }
    } catch (error) {
      console.error("[v0] Sponsor silme hatası:", error)
      setUploadMessage({ type: "error", text: "Silme işlemi başarısız oldu" })
    }
  }

  const handleEditVideo = (video: VideoItem) => {
    setVideoFormData({
      title: video.title,
      youtube_url: video.youtube_url,
      category: video.category,
      sort_order: video.sort_order,
      is_active: video.is_active,
    })
    setEditingVideoId(video.id)
  }

  const handleEditSponsor = (sponsor: SponsorItem) => {
    setSponsorFormData({
      name: sponsor.name,
      logo_url: sponsor.logo_url,
      website_url: sponsor.website_url || "",
      sort_order: sponsor.sort_order,
      is_active: sponsor.is_active,
    })
    setEditingSponsorId(sponsor.id)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files)
    }
  }

  const filteredMedia = selectedCategory === "Tümü" ? media : media.filter((item) => item.category === selectedCategory)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" })
  }

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : ""
  }

  const tabs = ["Medya", "Videolar", "İş Ortakları", "Kullanıcılar", "Bildirimler", "Ayarlar"]

  return (
    <div className="space-y-4 md:space-y-6">
      <Tabs defaultValue="media" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="media" className="text-white data-[state=active]:bg-blue-500">
            Medya
          </TabsTrigger>
          <TabsTrigger value="videos" className="text-white data-[state=active]:bg-blue-500">
            Videolar
          </TabsTrigger>
          <TabsTrigger value="sponsors" className="text-white data-[state=active]:bg-blue-500">
            İş Ortakları
          </TabsTrigger>
        </TabsList>

        {/* Medya Tab */}
        <TabsContent value="media" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Medya Kütüphanesi</h1>
              <p className="text-sm md:text-base text-slate-400">Fotoğraflarınızı ve dosyalarınızı yönetin</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="bg-slate-800 border-slate-700"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="bg-slate-800 border-slate-700"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Status Message */}
          {uploadMessage && (
            <div
              className={`p-3 md:p-4 rounded-lg text-sm md:text-base ${
                uploadMessage.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-red-500/20 text-red-400 border border-red-500/50"
              }`}
            >
              {uploadMessage.text}
            </div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {mediaCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition ${
                  selectedCategory === cat ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Upload Section */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                <Upload className="w-4 md:w-5 h-4 md:h-5" />
                Dosya Yükle
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Fotoğraf veya video dosyası seçin (JPG, PNG, MP4, WebP)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 md:p-8 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-700 hover:border-blue-500/50"
                }`}
              >
                <div className="mb-4 flex gap-2 flex-wrap justify-center">
                  {mediaCategories
                    .filter((cat) => cat !== "Tümü")
                    .map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setUploadCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                          uploadCategory === cat
                            ? "bg-blue-500 text-white"
                            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                </div>

                <label className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2 md:gap-3">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Upload className="w-6 md:w-8 h-6 md:h-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Dosya seçmek için tıklayın</p>
                      <p className="text-xs md:text-sm text-slate-400 mt-1">veya sürükle bırak</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">JPG, PNG, WebP, MP4 (Maks: 50 MB)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e.target.files!)}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
              {uploading && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-blue-400 text-sm md:text-base">Yükleniyor...</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Media Grid */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-white text-lg md:text-xl">Medya Dosyaları ({filteredMedia.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ImageIcon className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 opacity-50" />
                  <p className="text-sm md:text-base">Henüz medya dosyası yüklenmemiş</p>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className="group relative bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                    >
                      <div className="aspect-square relative">
                        {item.file_type.startsWith("video") ? (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <Film className="w-8 md:w-12 h-8 md:h-12 text-slate-400" />
                          </div>
                        ) : (
                          <Image
                            src={item.url || "/placeholder.svg"}
                            alt={item.filename}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 md:gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 md:h-9 md:w-9"
                            onClick={() => setPreviewItem(item)}
                          >
                            <Eye className="w-3 md:w-4 h-3 md:h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8 md:h-9 md:w-9"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-2 md:p-3">
                        <p className="text-white text-xs md:text-sm font-medium truncate">{item.filename}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {formatFileSize(item.size)} • {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMedia.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 md:gap-4 p-2 md:p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                      <div className="w-12 md:w-16 h-12 md:h-16 relative rounded overflow-hidden flex-shrink-0">
                        {item.file_type.startsWith("video") ? (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <Film className="w-4 md:w-6 h-4 md:h-6 text-slate-400" />
                          </div>
                        ) : (
                          <Image
                            src={item.url || "/placeholder.svg"}
                            alt={item.filename}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs md:text-sm truncate">{item.filename}</p>
                        <p className="text-xs md:text-sm text-slate-400">
                          {formatFileSize(item.size)} • {item.category} • {formatDate(item.created_at)}
                        </p>
                      </div>
                      <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setPreviewItem(item)}
                          className="text-xs md:text-sm"
                        >
                          <Eye className="w-3 md:w-4 h-3 md:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                          className="text-xs md:text-sm"
                        >
                          <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Video Tab */}
        <TabsContent value="videos" className="space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Videolar</h1>
            <p className="text-sm md:text-base text-slate-400">YouTube videolarınızı yönetin</p>
          </div>

          {uploadMessage && (
            <div
              className={`p-3 md:p-4 rounded-lg text-sm md:text-base ${
                uploadMessage.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-red-500/20 text-red-400 border border-red-500/50"
              }`}
            >
              {uploadMessage.text}
            </div>
          )}

          {/* Video Form */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-white text-lg md:text-xl">
                {editingVideoId ? "Video Düzenle" : "Yeni Video Ekle"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVideoSubmit} className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Video Başlığı *</label>
                  <input
                    type="text"
                    value={videoFormData.title}
                    onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="Örn: Üretim Süreci"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">MP4 Video Dosya</label>
                  <input
                    type="file"
                    accept="video/mp4,.mp4"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    disabled={videoFileUploading}
                  />
                  {videoFile && <p className="text-green-400 text-xs mt-1">{videoFile.name} seçildi</p>}
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">YouTube URL (İsteğe Bağlı)</label>
                  <input
                    type="url"
                    value={videoFormData.youtube_url}
                    onChange={(e) => {
                      const url = e.target.value
                      setVideoFormData({ ...videoFormData, youtube_url: url })
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="https://youtube.com/watch?v=... (veya MP4 dosya kullanın)"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">Kategori</label>
                    <select
                      value={videoFormData.category}
                      onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    >
                      {videoCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-white text-sm mb-2 block">Sıra</label>
                    <input
                      type="number"
                      value={videoFormData.sort_order}
                      onChange={(e) =>
                        setVideoFormData({ ...videoFormData, sort_order: Number.parseInt(e.target.value) })
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={videoFormData.is_active}
                    onChange={(e) => setVideoFormData({ ...videoFormData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="is_active" className="text-white text-sm">
                    Aktif Yap
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={uploading || videoFileUploading}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {uploading || videoFileUploading ? "İşleniyor..." : editingVideoId ? "Güncelle" : "Ekle"}
                  </Button>
                  {editingVideoId && (
                    <Button
                      type="button"
                      onClick={() => {
                        setEditingVideoId(null)
                        setVideoFormData({
                          title: "",
                          youtube_url: "",
                          category: "Üretim",
                          sort_order: 0,
                          is_active: true,
                        })
                        setVideoFile(null)
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white"
                    >
                      İptal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Video List */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-white text-lg md:text-xl">Videolar ({videos.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : videos.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Film className="w-12 md:w-16 h-12 md:h-16 mx-auto mb-3 md:mb-4 opacity-50" />
                  <p className="text-sm md:text-base">Henüz video eklenmemiş</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
                    >
                      <div className="w-16 md:w-20 h-16 md:h-20 relative rounded overflow-hidden flex-shrink-0">
                        {video.thumbnail_url ? (
                          <Image
                            src={video.thumbnail_url || "/placeholder.svg"}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                            <Film className="w-6 md:w-8 h-6 md:h-8 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs md:text-base truncate">{video.title}</p>
                        <p className="text-xs md:text-sm text-slate-400 mt-1">
                          {video.category} • {"Aktif" in video && video.is_active ? "✓ Aktif" : "○ Pasif"}
                        </p>
                      </div>
                      <div className="flex gap-1 md:gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditVideo(video)}
                          className="text-xs md:text-sm"
                        >
                          Düzenle
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteVideo(video.id)}
                          className="text-xs md:text-sm"
                        >
                          <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sponsors Tab */}
        <TabsContent value="sponsors" className="space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">İş Ortaklarımız</h1>
            <p className="text-sm md:text-base text-slate-400">İş ortaklarınızı yönetin</p>
          </div>

          {uploadMessage && (
            <div
              className={`p-3 md:p-4 rounded-lg text-sm md:text-base ${
                uploadMessage.type === "success"
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-red-500/20 text-red-400 border border-red-500/50"
              }`}
            >
              {uploadMessage.text}
            </div>
          )}

          {/* Sponsor Form */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-white text-lg md:text-xl">
                {editingSponsorId ? "İş Ortağı Düzenle" : "Yeni İş Ortağı Ekle"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSponsorSubmit} className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">İş Ortağı Adı *</label>
                  <input
                    type="text"
                    value={sponsorFormData.name}
                    onChange={(e) => setSponsorFormData({ ...sponsorFormData, name: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="Örn: Bosch"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Logo URL *</label>
                  <input
                    type="url"
                    value={sponsorFormData.logo_url}
                    onChange={(e) => setSponsorFormData({ ...sponsorFormData, logo_url: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Website URL (Opsiyonel)</label>
                  <input
                    type="url"
                    value={sponsorFormData.website_url}
                    onChange={(e) => setSponsorFormData({ ...sponsorFormData, website_url: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">Sıra</label>
                  <input
                    type="number"
                    value={sponsorFormData.sort_order}
                    onChange={(e) =>
                      setSponsorFormData({ ...sponsorFormData, sort_order: Number.parseInt(e.target.value) })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                    min="0"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sponsor_active"
                    checked={sponsorFormData.is_active}
                    onChange={(e) => setSponsorFormData({ ...sponsorFormData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="sponsor_active" className="text-white text-sm">
                    Aktif Yap
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {uploading ? "İşleniyor..." : editingSponsorId ? "Güncelle" : "Ekle"}
                  </Button>
                  {editingSponsorId && (
                    <Button
                      type="button"
                      onClick={() => {
                        setEditingSponsorId(null)
                        setSponsorFormData({ name: "", logo_url: "", website_url: "", sort_order: 0, is_active: true })
                      }}
                      className="bg-slate-700 hover:bg-slate-600 text-white"
                    >
                      İptal
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sponsors List */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-white text-lg md:text-xl">İş Ortakları ({sponsors.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {sponsors.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm md:text-base">Henüz iş ortağı eklenmemiş</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="bg-slate-800 rounded-lg p-4 flex flex-col gap-3">
                      <div className="w-full h-20 bg-slate-700 rounded flex items-center justify-center overflow-hidden">
                        <Image
                          src={sponsor.logo_url || "/placeholder.svg"}
                          alt={sponsor.name}
                          width={100}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">{sponsor.name}</h3>
                        {sponsor.website_url && (
                          <a
                            href={sponsor.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-xs"
                          >
                            {sponsor.website_url}
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditSponsor(sponsor)}
                          className="flex-1 text-xs"
                        >
                          Düzenle
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteSponsor(sponsor.id)}
                          className="flex-1 text-xs"
                        >
                          Sil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kullanicilar">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Admin Kullanıcıları</CardTitle>
              <CardDescription>Sistem yöneticileri ve kullanıcılarını yönetin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-white">
                <p className="text-sm text-slate-400 mb-4">Kullanıcı yönetimi özellikleri yakında eklenecektir.</p>
                <p className="text-sm font-semibold">Ana Yönetici: admin@atlcelik.com</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bildirimler">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Teklif Formundan Bildirimler</CardTitle>
              <CardDescription>Gelen teklif istekleri ve iletişim mesajları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-white">
                <p className="text-sm text-slate-400">Henüz bildirim yok.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ayarlar">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Sistem Ayarları</CardTitle>
              <CardDescription>Site ayarlarını ve şirket bilgilerini yönetin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-white">
                <div>
                  <label className="text-sm font-semibold">Telefon Numarası</label>
                  <input
                    type="text"
                    defaultValue="05373393947"
                    disabled
                    className="w-full mt-2 px-3 py-2 bg-slate-800 text-slate-300 rounded border border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Şifre Reset Kodu</label>
                  <input
                    type="text"
                    defaultValue="14539073atl"
                    disabled
                    className="w-full mt-2 px-3 py-2 bg-slate-800 text-slate-300 rounded border border-slate-700"
                  />
                  <p className="text-xs text-slate-400 mt-2">Not: Bu bilgileri güvenli bir yerde saklayın.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 md:p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Button
              size="icon"
              variant="secondary"
              className="absolute -top-10 md:-top-12 right-0"
              onClick={() => setPreviewItem(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            {previewItem.file_type.startsWith("video") ? (
              <video src={previewItem.url} controls className="w-full rounded-lg" />
            ) : (
              <Image
                src={previewItem.url || "/placeholder.svg"}
                alt={previewItem.filename}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg object-contain max-h-[80vh]"
              />
            )}
            <div className="mt-3 md:mt-4 text-center">
              <p className="text-white font-medium text-sm md:text-base">{previewItem.filename}</p>
              <p className="text-xs md:text-sm text-slate-400">{formatFileSize(previewItem.size)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
