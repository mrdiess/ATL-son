"use client"

import { useState } from "react"
import BeforeAfterGrid from "../../components/BeforeAfterGrid"
import BeforeAfterModal from "../../components/BeforeAfterModal"

const items = [
  {
    id: "1",
    before: "/before/1.jpg",
    after: "/after/1.jpg",
  },
]

export default function ProjectsPage() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="container py-20 space-y-10">
      <h1 className="text-3xl font-bold">Projeler</h1>

      <BeforeAfterGrid
        items={items}
        onSelect={setSelected}
      />

      <BeforeAfterModal
        item={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
