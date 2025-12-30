"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AnimatedSection } from "@/components/animated-section"

interface VideoItem {
  id: string
  title: string
  thumbnail: string
  youtubeId: string
  category: string
}

const videos: VideoItem[] = [
  {
    id: "1",
    title: "Çelik Konstrüksiyon Üretim Süreci",
    thumbnail: "/steel-construction-manufacturing-process-factory.jpg",
    youtubeId: "dQw4w9WgXcQ",
    category: "Üretim",
  },
  {
    id: "2",
    title: "Fabrika Montaj Çalışmaları",
    thumbnail: "/factory-assembly-steel-structure-workers.jpg",
    youtubeId: "jNQXAC9IVRw",
    category: "Montaj",
  },
  {
    id: "3",
    title: "Depo Projesi Tamamlanma",
    thumbnail: "/warehouse-steel-building-completed-project.jpg",
    youtubeId: "M7lc1UVf-VE",
    category: "Projeler",
  },
  {
    id: "4",
    title: "Lazer Kesim Teknolojisi",
    thumbnail: "/laser-cutting-metal-steel-industrial-machine.jpg",
    youtubeId: "y6120QOlsfU",
    category: "Üretim",
  },
  {
    id: "5",
    title: "Sandviç Panel Üretimi",
    thumbnail: "/sandwich-panel-production-manufacturing-line.jpg",
    youtubeId: "rokGy0huYEA",
    category: "Üretim",
  },
  {
    id: "6",
    title: "Hangar Projesi Kurulum",
    thumbnail: "/aircraft-hangar-steel-construction-installation.jpg",
    youtubeId: "QH2-TGUlwu4",
    category: "Projeler",
  },
]

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [activeCategory, setActiveCategory] = useState("Tümü")

  const categories = ["Tümü", ...new Set(videos.map((v) => v.category))]
  const filteredVideos = activeCategory === "Tümü" ? videos : videos.filter((v) => v.category === activeCategory)

  return (
    <section id="video-galeri" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Videolarımız</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 mt-2">Video Galeri</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Üretim süreçlerimizi ve tamamlanan projelerimizi videolarımızda izleyin
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <AnimatedSection key={video.id} animation="scale" delay={index * 0.1}>
              <div
                className="group relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer border border-border"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary mb-1 block">{video.category}</span>
                  <h3 className="font-semibold text-foreground line-clamp-2">{video.title}</h3>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            {selectedVideo && (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
