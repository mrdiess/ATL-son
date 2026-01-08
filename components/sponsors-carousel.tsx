"use client"

import { useEffect, useState } from "react"

interface Sponsor {
  name: string
  logo: string
}

export function SponsorsCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  const [position, setPosition] = useState(0)

  const displaySponsors = sponsors.length > 0 ? sponsors : []
  const extendedSponsors = [...displaySponsors, ...displaySponsors]

  useEffect(() => {
    if (displaySponsors.length === 0) return

    const interval = setInterval(() => {
      setPosition((prev) => {
        const newPos = prev + 1
        if (newPos >= displaySponsors.length) {
          return 0
        }
        return newPos
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [displaySponsors.length])

  if (displaySponsors.length === 0) {
    return <div className="text-center py-12 text-slate-500">İş ortakları yükleniyor...</div>
  }

  // Desktop: 5 logo, Tablet: 3, Mobile: 2
  const itemsPerView =
    typeof window !== "undefined" ? (window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 5) : 5

  return (
    <div className="relative w-full overflow-hidden bg-slate-900/50 rounded-xl p-8">
      <div className="flex gap-8">
        {extendedSponsors.map((sponsor, idx) => (
          <div
            key={idx}
            style={{
              transform: `translateX(calc(-${position * 100}% - ${position * 32}px))`,
              transition: "transform 0.5s ease-in-out",
              flex: `0 0 calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 32) / itemsPerView}px)`,
            }}
            className="flex items-center justify-center p-4 bg-black/20 rounded-lg border border-slate-700 hover:border-slate-600 transition-all"
          >
            <img
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              className="object-contain max-w-full h-auto filter grayscale hover:grayscale-0 transition-all"
              style={{ maxWidth: "100px", maxHeight: "50px" }}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {displaySponsors.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPosition(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === position ? "bg-blue-500 w-6" : "bg-slate-600"}`}
          />
        ))}
      </div>
    </div>
  )
}
