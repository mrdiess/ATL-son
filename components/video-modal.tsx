"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
}

export function VideoModal({ isOpen, onClose, title }: VideoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4">
        <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-gray-300 transition">
          <X className="w-8 h-8" />
        </button>
        <div className="relative bg-black rounded-lg overflow-hidden">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${title}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
