"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const stats = [
  { value: "+15", label: "Yıllık Tecrübe" },
  { value: "+500", label: "Tamamlanan Proje" },
  { value: "+50", label: "Uzman Personel" },
  { value: "+1000", label: "Mutlu Müşteri" },
]

export function QuoteSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <section className="py-20 bg-[#1a2e4a]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#3b9ec9] rounded-2xl p-8 text-center text-white">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quote Form */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Teklif Alma Formu</h2>
            <p className="text-white/70 mb-8">Formu Doldurarak Bizlerden Teklif Alın</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Adınız & Soyadınız"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border-0 h-12 rounded-lg"
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-0 h-12 rounded-lg"
              />
              <Input
                type="tel"
                placeholder="Telefon"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-0 h-12 rounded-lg"
              />
              <Textarea
                placeholder="Mesajınız"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white border-0 min-h-[120px] rounded-lg resize-none"
              />
              <Button
                type="submit"
                className="w-full bg-[#3b9ec9] hover:bg-[#2d8ab5] text-white h-12 rounded-lg font-semibold"
              >
                Teklif Al
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
