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

type Project = {
  id: string
  title: string
  description: string
}

const createDefaultPhases = (projectId: string): ProjectStep[] => [
  {
    id: "phase-1",
    project_id: projectId,
    step_number: 1,
    title: "Planlama",
    description: "Proje planlama süreci",
    project_photos: [],
  },
  {
    id: "phase-2",
    project_id: projectId,
    step_number: 2,
    title: "Uygulama",
    description: "Saha uygulama süreci",
    project_photos: [],
  },
  {
    id: "phase-3",
    project_id: projectId,
    step_number: 3,
    title: "Teslim",
    description: "Teslim ve kontrol",
    project_photos: [],
  },
]

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        const projectRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`
        )
        const projectData = await projectRes.json()
        setProject(projectData)

        const stepsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/project_steps?project_id=${id}`
        )
        const stepsData = await stepsRes.json()

        if (Array.isArray(stepsData) && stepsData.length > 0) {
          setSteps(stepsData)
        } else {
          setSteps(createDefaultPhases(id))
        }
      } catch (e) {
        setSteps(createDefaultPhases(id))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  if (loading) return <div>Yükleniyor...</div>
  if (!project) return <div>Proje bulunamadı</div>

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      <p className="text-gray-600">{project.description}</p>

      {steps.map((step) => (
        <div key={step.id} className="border rounded p-4">
          <h2 className="font-semibold">
            {step.step_number}. {step.title}
          </h2>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  )
}
