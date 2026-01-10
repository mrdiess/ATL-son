"use client"

import { useState } from "react"
import Image from "next/image"

type Props = {
  title: string
  before: string
  after: string
}

export default function BeforeAfterModal({ title, before, after }: Props) {
  const [open, setOpen] = useState(false)
  const [slider, setSlider] = useState(50)

  if (!open) return null

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(2,6,23,0.85)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          background: "#020617",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* KAPAT */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#020617",
            color: "white",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* GÖRSEL */}
        <div style={{ position: "relative", height: 520 }}>
          <Image src={after} alt="After" fill style={{ objectFit: "cover" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              width: `${slider}%`,
            }}
          >
            <Image
              src={before}
              alt="Before"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* SLIDER */}
          <input
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={(e) => setSlider(Number(e.target.value))}
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
            }}
          />
        </div>

        {/* ALT BİLGİ */}
        <div style={{ padding: 24 }}>
          <p style={{ color: "#38bdf8", fontWeight: 600 }}>Before / After</p>
          <h3 style={{ fontSize: 26, fontWeight: 800 }}>{title}</h3>
        </div>
      </div>
    </div>
  )
}

/* Hook gibi kullanabilmek için */
export function useBeforeAfterModal() {
  const [data, setData] = useState<Props | null>(null)
  return {
    modal: data ? (
      <BeforeAfterModal {...data} />
    ) : null,
    open: (p: Props) => setData(p),
    close: () => setData(null),
  }
}
