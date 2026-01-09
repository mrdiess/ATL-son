"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type ProjectPhoto = {
  id: string
  url: string
}

type ProjectStep = {
  id: string
  project_id: string
  step_number: number
  title: string
  description: string
  project_photos: ProjectPhoto[]
}

const DEFAULT_PHASES = [
  {
    id: "phase-1",
    step_number: 1,
    title: "Keşif & Planlama",
    description: "Proje alanı incelenir ve ihtiyaçlar belirlenir.",
  },
  {
    id: "phase-2",
    step_number: 2,
    title: "Üretim",
    description: "Çelik yapı ve bileşenler üretilir.",
  },
  {
    id: "phase-3",
    step_number: 3,
    title: "Montaj",
    description: "Sahada montaj işlemleri tamamlanır.",
  },
]

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}?project_id=${id}`,
          { cache: "no-store" },
        )

        const data = await res.json()

        if (Array.isArray(data?.steps) && data.steps.length > 0) {
          setSteps(data.steps)
        } else {
          // DEFAULT_PHASES → ProjectStep uyarlama
          const fallbackSteps: ProjectStep[] = DEFAULT_PHASES.map(
            (phase) => ({
              ...phase,
              project_id: id,
              project_photos: [],
            }),
          )

          setSteps(fallbackSteps)
        }
      } catch (error) {
        console.error("Error fetching project:", error)

        const fallbackSteps: ProjectStep[] = DEFAULT_PHASES.map((phase) => ({
          ...phase,
          project_id: id,
          project_photos: [],
        }))

        setSteps(fallbackSteps)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  if (loading) {
    return <p className="p-8">Yükleniyor…</p>
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Proje Süreci</h1>

      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="border rounded-lg p-6 bg-background"
          >
            <h2 className="text-xl font-semibold mb-2">
              {step.step_number}. {step.title}
            </h2>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
