"use client"

import Image from "next/image"
import { useState } from "react"

type Props = {
  before: string
  after: string
  title?: string
}

export function BeforeAfterModal({ before, after, title }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left"
      >
        <div className="grid grid-cols-2 rounded-xl overflow-hidden border hover:shadow-lg transition">
          <Image src={before} alt="Önce" width={600} height={400} />
          <Image src={after} alt="Sonra" width={600} height={400} />
        </div>
        {title && (
          <div className="mt-2 font-semibold text-center">{title}</div>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-5xl w-full p-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-xl font-bold"
            >
              ×
            </button>

            <div className="grid grid-cols-2 gap-2">
              <Image src={before} alt="Önce" width={1000} height={700} />
              <Image src={after} alt="Sonra" width={1000} height={700} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
