"use client"

import { useState } from "react"
import Image from "next/image"

type Props = {
  before: string
  after: string
}

export function BeforeAfterModal({ before, after }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer", borderRadius: 8, overflow: "hidden" }}
      >
        <Image
          src={after}
          alt="Proje Sonrası"
          width={400}
          height={300}
          style={{ objectFit: "cover" }}
        />
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#000",
              padding: 20,
              borderRadius: 8,
              maxWidth: 900,
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <Image src={before} alt="Önce" width={450} height={300} />
              <Image src={after} alt="Sonra" width={450} height={300} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
