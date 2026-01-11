"use client"

import { useState } from "react"
import Image from "next/image"

type Props = {
  before: string
  after: string
}

export function BeforeAfterModal({ before, after }: Props) {
  const [open, setOpen] = useState(false)
  const [showAfter, setShowAfter] = useState(false)

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer", borderRadius: 12, overflow: "hidden" }}
      >
        <Image src={before} alt="Before" width={500} height={350} />
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.8)",
            zIndex: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "80%", maxWidth: 900 }}
          >
            <Image
              src={showAfter ? after : before}
              alt="Project"
              width={900}
              height={600}
              style={{ borderRadius: 12 }}
            />

            <button
              onClick={() => setShowAfter(!showAfter)}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                background: "#0ea5e9",
                color: "white",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
              }}
            >
              {showAfter ? "Önce" : "Sonra"}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
