"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Video {
  id: string
  title: string
  youtubeUrl: string
  category: string
  addedAt: string
  thumbnail?: string
}

export default function VideoPage() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Çelik Yapı Üretim Süreci",
      youtubeUrl: "https://youtube.com/watch?v=abc123",
      category: "Üretim",
      addedAt: "3 gün önce",
    },
    {
      id: "2",
      title: "Proje Galeri",
      youtubeUrl: "https://youtube.com/watch?v=def456",
      category: "Galeri",
      addedAt: "1 hafta önce",
    },
  ])
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Üretim")

  const extractYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/)
    return match ? match[1] : null
  }

  const handleAddVideo = () => {
    if (!youtubeUrl.trim() || !title.trim()) {
      alert("Lütfen başlık ve YouTube linki girin")
      return
    }

    const youtubeId = extractYoutubeId(youtubeUrl)
    if (!youtubeId) {
      alert("Geçerli bir YouTube linki girin")
      return
    }

    const newVideo: Video = {
      id: Math.random().toString(),
      title,
      youtubeUrl,
      category,
      addedAt: "Şimdi",
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
    }

    setVideos((prev) => [newVideo, ...prev])
    setYoutubeUrl("")
    setTitle("")
    setCategory("Üretim")
    alert("Video başarıyla eklendi!")
  }

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((video) => video.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Video Galeri</h1>
        <p className="text-slate-400">YouTube videolarını yönetin</p>
      </div>

      {/* Add Video Section */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Yeni Video Ekle</CardTitle>
          <CardDescription>YouTube linki ile video ekleyin</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Video Başlığı</label>
            <Input
              placeholder="Örn: Fabrika Turu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">YouTube Linki</label>
            <Input
              placeholder="https://youtube.com/watch?v=... veya https://youtu.be/..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2"
            >
              <option>Üretim</option>
              <option>Galeri</option>
              <option>Testimonial</option>
              <option>Diğer</option>
            </select>
          </div>
          <Button onClick={handleAddVideo} className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Video Ekle
          </Button>
        </CardContent>
      </Card>

      {/* Videos Grid */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Videolar ({videos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => {
              const youtubeId = extractYoutubeId(video.youtubeUrl)
              return (
                <div
                  key={video.id}
                  className="bg-slate-800 rounded-lg overflow-hidden hover:bg-slate-700 transition-colors"
                >
                  <div className="aspect-video bg-slate-700 flex items-center justify-center overflow-hidden">
                    {youtubeId && (
                      <img
                        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                        }}
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-white font-medium text-sm line-clamp-2">{video.title}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{video.category}</span>
                      <span className="text-xs text-slate-500">{video.addedAt}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 text-xs h-8 bg-transparent">
                        <Edit2 className="w-3 h-3 mr-1" />
                        Düzenle
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 text-xs h-8"
                        onClick={() => handleDelete(video.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
