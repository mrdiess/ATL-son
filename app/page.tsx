"use client"

import { useEffect, useState } from "react"
import { BeforeAfterGrid } from "@/components/before-after"

type Project = {
  id: string
  title: string
  before: string
  after: string
}

type ApiResponse = {
  beforeAfter: Project[]
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbyvmIgjGp0qXucZ6yIC2Tj1d2kBJNfXhuNSYZ52mEWcE-IWCOgiGv-aLR14JvDMyxIA/exec"
    )
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.beforeAfter) {
          setProjects(data.beforeAfter)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <>
      {/* HERO */}
      {/* SERVICES */}
      {/* GALERİ */}

      {projects.length > 0 && (
        <BeforeAfterGrid projects={projects} />
      )}
    </>
  )
}
