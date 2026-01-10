"use client"

import { useState } from "react"
import Image from "next/image"

type Props = {
  before: string
  after: string
  title?: string
}

export default function BeforeAfter({ before, after, title }: Props) {
  const [value, setValue] = useState(50)

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
        borderRadius: 20,
        overflow: "hidden",
        background: "#020617",
      }}
    >
      {title && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 5,
            color: "white",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
      )}

      {/* AFTER */}
      <Image
        src={after}
        alt="After"
        width={1200}
        height={700}
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* BEFORE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${value}%`,
          overflow: "hidden",
        }}
      >
        <Image
          src={before}
          alt="Before"
          width={1200}
          height={700}
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      {/* SLIDER */}
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          zIndex: 10,
        }}
      />
    </div>
  )
}
