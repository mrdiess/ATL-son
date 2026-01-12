"use client"

import { useState } from "react"
import { beforeAfterItems } from "../../data/beforeAfter"
import BeforeAfterGrid from "../../components/BeforeAfterGrid"
import BeforeAfterModal from "../../components/BeforeAfterModal"

export default function ProjectsPage() {
  const [selected, setSelected] = useState<any>(null)

  return (
    <section className="container py-20 space-y-10">
      <h1 className="text-3xl font-bold">Projeler</h1>

      <BeforeAfterGrid
        items={beforeAfterItems}
        onSelect={setSelected}
      />

      <BeforeAfterModal
        item={
          selected
            ? { before: selected.before, after: selected.after }
            : null
        }
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
