"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BatchUploaderProps {
  onUploadComplete: (urls: Array<{ url: string; path: string }>) => void
  bucket?: string
  maxFiles?: number
}

export function BatchUploader({ onUploadComplete, bucket = "media", maxFiles = 200 }: BatchUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedCount, setUploadedCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])

    if (selectedFiles.length > maxFiles) {
      setError(`Maksimum ${maxFiles} dosya yükleyebilirsiniz`)
      return
    }

    setFiles(selectedFiles)
    setError(null)
  }

  const handleUploadAll = async () => {
    if (files.length === 0) return

    setUploading(true)
    setUploadedCount(0)
    setError(null)
    const uploadedUrls: Array<{ url: string; path: string }> = []

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("bucket", bucket)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          console.error(`[v0] Upload error for ${file.name}:`, data.error)
          continue
        }

        uploadedUrls.push({ url: data.url, path: data.path })
        setUploadedCount(i + 1)
        setUploadProgress(((i + 1) / files.length) * 100)
      } catch (err) {
        console.error(`[v0] Upload error:`, err)
      }
    }

    setUploading(false)
    if (uploadedUrls.length > 0) {
      onUploadComplete(uploadedUrls)
      setFiles([])
      setUploadProgress(0)
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center py-8">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">
                  Yükleniyor ({uploadedCount}/{files.length})
                </p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Toplu resim yükle</p>
                <p className="text-xs text-muted-foreground mt-1">Maksimum {maxFiles} dosya</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
          />
        </label>

        {files.length > 0 && !uploading && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{files.length} dosya seçildi</p>
              <Button variant="outline" size="sm" onClick={() => setFiles([])}>
                Temizle
              </Button>
            </div>
            <Button onClick={handleUploadAll} className="w-full">
              Tümünü Yükle
            </Button>
          </div>
        )}

        {uploading && (
          <div className="mt-4 space-y-2">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-xs text-muted-foreground text-center">
              {uploadedCount} / {files.length} yüklendi
            </p>
          </div>
        )}
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
