"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FileUploaderProps {
  onUploadComplete: (url: string, path: string) => void
  bucket?: string
  accept?: string
  maxSize?: number
  currentImage?: string
}

export function FileUploader({
  onUploadComplete,
  bucket = "media",
  accept = "image/*",
  maxSize = 5,
  currentImage,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`)
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("bucket", bucket)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      onUploadComplete(data.url, data.path)
    } catch (err) {
      console.error("[v0] Upload error:", err)
      setError(err instanceof Error ? err.message : "Yükleme başarısız")
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <Card className="p-4">
          <div className="relative">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-32 object-contain rounded" />
            <Button size="icon" variant="destructive" className="absolute top-2 right-2" onClick={clearPreview}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Dosya yüklemek için tıklayın</p>
                <p className="text-xs text-muted-foreground mt-1">Maks. {maxSize}MB</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept={accept} onChange={handleFileChange} disabled={uploading} />
        </label>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
