"use client"

import { useState } from "react"
import Image from "next/image"

export function BeforeAfterModal({
  before,
  after,
}: {
  before: string
  after: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
        <Image src={after} alt="" width={400} height={300} />
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", gap: 20 }}>
            <Image src={before} alt="" width={400} height={300} />
            <Image src={after} alt="" width={400} height={300} />
          </div>
        </div>
      )}
    </>
  )
}
