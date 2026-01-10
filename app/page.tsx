"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

/* =======================
   TİPLER
======================= */

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

/* =======================
   DEFAULT PHASES
   (ProjectStep ile %100 uyumlu)
======================= */

const DEFAULT_PHASES = (projectId: string): ProjectStep[] => [
  {
    id: "default-1",
    project_id: projectId,
    step_number: 1,
    title: "Planlama",
    description: "Proje planlama ve hazırlık aşaması",
    project_photos: [],
  },
  {
    id: "default-2",
    project_id: projectId,
    step_number: 2,
    title: "Uygulama",
    description: "Saha uygulama süreci",
    project_photos: [],
  },
  {
    id: "default-3",
    project_id: projectId,
    step_number: 3,
    title: "Teslim",
    description: "Projenin tamamlanması ve teslimi",
    project_photos: [],
  },
]

/* =======================
   PAGE
======================= */

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const projectId = params.id

  const [project, setProject] = useState<Project | null>(null)
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!projectId) return

    const fetchProject = async () => {
      try {
        /* PROJE */
        const projectRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`,
        )
        const projectData = await projectRes.json()
        setProject(projectData)

        /* STEPS */
        const stepsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/project_steps?project_id=${projectId}`,
        )
        const stepsData: ProjectStep[] = await stepsRes.json()

        if (Array.isArray(stepsData) && stepsData.length > 0) {
          setSteps(stepsData)
        } else {
          setSteps(DEFAULT_PHASES(projectId))
        }
      } catch (error) {
        console.error("Project fetch error:", error)
        setSteps(DEFAULT_PHASES(projectId))
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  if (loading) {
    return <div className="p-6">Yükleniyor...</div>
  }

  if (!project) {
    return <div className="p-6">Proje bulunamadı.</div>
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-gray-600 mt-2">{project.description}</p>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="border rounded-lg p-4 space-y-2"
          >
            <h2 className="text-xl font-semibold">
              {step.step_number}. {step.title}
            </h2>
            <p className="text-gray-600">{step.description}</p>

            {step.project_photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {step.project_photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={step.title}
                    className="rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
