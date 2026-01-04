"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit2, Plus } from "lucide-react"

interface Project {
  id: string
  title: string
  description?: string
  slug: string
  category: string
  location: string
  client_name?: string
  start_date?: string
  end_date?: string
  featured_image_url: string
  is_active: boolean
  sort_order: number
}

interface ProjectStep {
  id: string
  project_id: string
  step_number: number
  title: string
  description?: string
  start_date?: string
  end_date?: string
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("projects")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    location: "",
    client_name: "",
    start_date: "",
    end_date: "",
    featured_image_url: "",
    is_active: true,
  })

  const [stepForm, setStepForm] = useState({
    step_number: 1,
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data.data || [])
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSteps = async (projectId: string) => {
    try {
      const res = await fetch(`/api/project-steps?project_id=${projectId}`)
      const data = await res.json()
      setSteps(data.data || [])
      setSelectedProject(projectId)
    } catch (error) {
      console.error("Fetch error:", error)
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectForm),
      })
      if (res.ok) {
        alert("Proje eklendi!")
        setProjectForm({
          title: "",
          description: "",
          slug: "",
          category: "",
          location: "",
          client_name: "",
          start_date: "",
          end_date: "",
          featured_image_url: "",
          is_active: true,
        })
        fetchProjects()
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hata oluştu!")
    }
  }

  const handleAddStep = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) {
      alert("Lütfen proje seçin!")
      return
    }
    try {
      const res = await fetch("/api/project-steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...stepForm, project_id: selectedProject }),
      })
      if (res.ok) {
        alert("Adım eklendi!")
        setStepForm({ step_number: 1, title: "", description: "", start_date: "", end_date: "" })
        fetchSteps(selectedProject)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hata oluştu!")
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Projeyi silmek istediğinize emin misiniz?")) return
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" })
      if (res.ok) {
        alert("Proje silindi!")
        fetchProjects()
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projeler Yönetimi</h1>
        <p className="text-muted-foreground">Yapım aşamaları zaman çizelgesi ile projelerinizi yönetin</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="projects">Projeler ({projects.length})</TabsTrigger>
          <TabsTrigger value="steps">Yapım Aşamaları</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          {/* Add New Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Yeni Proje Ekle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Proje Adı"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Slug (sakarya-merdiven-projesi)"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Kategori (Merdiven, Depo, vb.)"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  />
                  <Input
                    placeholder="Lokasyon"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  />
                  <Input
                    placeholder="Müşteri Adı"
                    value={projectForm.client_name}
                    onChange={(e) => setProjectForm({ ...projectForm, client_name: e.target.value })}
                  />
                  <Input
                    type="url"
                    placeholder="Öne Çıkan Resim URL"
                    value={projectForm.featured_image_url}
                    onChange={(e) => setProjectForm({ ...projectForm, featured_image_url: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="Proje Açıklaması"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={3}
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                  Proje Ekle
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Projects List */}
          <div className="space-y-3">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.category} • {project.location}
                      </p>
                      {project.description && <p className="text-sm mt-2 line-clamp-2">{project.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => fetchSteps(project.id)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          {selectedProject ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Yapım Aşaması Ekle</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddStep} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Adım Numarası"
                        value={stepForm.step_number}
                        onChange={(e) =>
                          setStepForm({ ...stepForm, step_number: Number.parseInt(e.target.value) || 1 })
                        }
                        min="1"
                      />
                      <Input
                        placeholder="Adım Başlığı"
                        value={stepForm.title}
                        onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <Textarea
                      placeholder="Adım Açıklaması"
                      value={stepForm.description}
                      onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                      rows={3}
                    />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                      Adım Ekle
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {steps.map((step) => (
                  <Card key={step.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                              {step.step_number}
                            </span>
                            <h3 className="font-bold">{step.title}</h3>
                          </div>
                          {step.description && <p className="text-sm text-muted-foreground mt-2">{step.description}</p>}
                        </div>
                        <Button size="sm" variant="destructive" onClick={() => console.log("Delete step:", step.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-8">Aşama eklemek için proje seçin</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
