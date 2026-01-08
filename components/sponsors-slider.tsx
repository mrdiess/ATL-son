"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Sponsor {
  name: string
  logo: string
}

export default function SponsorsSlider() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch("/data/sponsors.json", { cache: "no-store" })
        const data = await response.json()
        setSponsors(data)
      } catch (error) {
        console.error("Sponsorlar yükleme hatası:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSponsors()
  }, [])

  useEffect(() => {
    if (sponsors.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % sponsors.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [sponsors.length])

  if (isLoading || sponsors.length === 0)
    return <div className="text-center py-8 text-slate-500">Sponsorlar yükleniyor...</div>

  const getVisibleSponsors = () => {
    const visible = []
    const count = Math.min(3, sponsors.length)
    for (let i = 0; i < count; i++) {
      visible.push(sponsors[(activeIndex + i) % sponsors.length])
    }
    return visible
  }

  return (
    <section className="py-8 md:py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-center text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-8">
          İş Ortaklarımız
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getVisibleSponsors().map((sponsor, idx) => (
            <div
              key={`${sponsor.name}-${activeIndex + idx}`}
              className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative w-full h-16">
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  fill
                  className="object-contain filter grayscale dark:invert-0"
                />
              </div>
            </div>
          ))}
        </div>

        {sponsors.length > 3 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {sponsors.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-blue-500 w-8" : "bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
