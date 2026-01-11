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
      {/* Thumbnail */}
      <div
        onClick={() => setOpen(true)}
        style={{
          cursor: "pointer",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <Image
          src={before}
          alt="Before"
          width={400}
          height={300}
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              maxWidth: "90%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Image src={before} alt="Before" width={500} height={350} />
            <Image src={after} alt="After" width={500} height={350} />
          </div>
        </div>
      )}
    </>
  )
}
