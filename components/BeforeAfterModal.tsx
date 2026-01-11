"use client"

import Image from "next/image"
import { useEffect } from "react"

type Props = {
  before: string
  after: string
  open: boolean
  onClose: () => void
}

export function BeforeAfterModal({ before, after, open, onClose }: Props) {
  // Sayfa değişince body kilidi temizlensin
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: 1100,
          background: "#0b1a2a",
          borderRadius: 16,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
        >
          <Image src={before} alt="Önce" width={500} height={350} />
          <Image src={after} alt="Sonra" width={500} height={350} />
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            padding: "10px 24px",
            background: "#0ea5e9",
            color: "white",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          Kapat
        </button>
      </div>
    </div>
  )
}
