"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, FolderOpen, ImageIcon, Upload } from "lucide-react"

interface Project {
  id: string
  title: string
  description?: string
  slug: string
  category: string
  location: string
  client_name?: string
  featured_image_url?: string
  is_active: boolean
  sort_order: number
}

interface ProjectStep {
  id: string
  project_id: string
  step_number: number
  title: string
  description?: string
  project_photos?: { id: string; photo_url: string; caption?: string }[]
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [steps, setSteps] = useState<ProjectStep[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState("projects")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [uploading, setUploading] = useState(false)

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    location: "",
    client_name: "",
    featured_image_url: "",
  })

  const [stepForm, setStepForm] = useState({
    step_number: 1,
    title: "",
    description: "",
  })

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects")
      const data = await res.json()
      if (data.success) {
        setProjects(data.data || [])
      }
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSteps = useCallback(async (projectId: string) => {
    try {
      const res = await fetch(`/api/project-steps?project_id=${projectId}`)
      const data = await res.json()
      if (data.success) {
        setSteps(data.data || [])
      }
    } catch (error) {
      console.error("Fetch steps error:", error)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (selectedProject) {
      fetchSteps(selectedProject.id)
    }
  }, [selectedProject, fetchSteps])

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 4000)
  }

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("category", "Projeler")

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (res.ok && data.url) {
        return data.url
      }
      return null
    } catch {
      return null
    }
  }

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectForm.title) {
      showMessage("error", "Proje adı gereklidir")
      return
    }

    setUploading(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...projectForm,
          slug: projectForm.slug || projectForm.title.toLowerCase().replace(/\s+/g, "-"),
          is_active: true,
          sort_order: projects.length,
        }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        showMessage("success", "Proje başarıyla eklendi!")
        setProjectForm({
          title: "",
          description: "",
          slug: "",
          category: "",
          location: "",
          client_name: "",
          featured_image_url: "",
        })
        fetchProjects()
      } else {
        showMessage("error", data.error || "Proje eklenemedi")
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("error", "Sunucu hatası")
    } finally {
      setUploading(false)
    }
  }

  const handleAddStep = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) {
      showMessage("error", "Lütfen proje seçin")
      return
    }
    if (!stepForm.title) {
      showMessage("error", "Adım başlığı gereklidir")
      return
    }

    setUploading(true)
    try {
      const res = await fetch("/api/project-steps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...stepForm,
          project_id: selectedProject.id,
        }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        showMessage("success", "Yapım aşaması eklendi!")
        setStepForm({ step_number: steps.length + 2, title: "", description: "" })
        fetchSteps(selectedProject.id)
      } else {
        showMessage("error", data.error || "Aşama eklenemedi")
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("error", "Sunucu hatası")
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Projeyi ve tüm aşamalarını silmek istediğinize emin misiniz?")) return

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" })
      const data = await res.json()

      if (res.ok && data.success) {
        showMessage("success", "Proje silindi!")
        if (selectedProject?.id === id) {
          setSelectedProject(null)
          setSteps([])
        }
        fetchProjects()
      } else {
        showMessage("error", data.error || "Proje silinemedi")
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("error", "Sunucu hatası")
    }
  }

  const handleDeleteStep = async (id: string) => {
    if (!confirm("Aşamayı silmek istediğinize emin misiniz?")) return

    try {
      const res = await fetch(`/api/project-steps?id=${id}`, { method: "DELETE" })
      const data = await res.json()

      if (res.ok && data.success) {
        showMessage("success", "Aşama silindi!")
        if (selectedProject) {
          fetchSteps(selectedProject.id)
        }
      } else {
        showMessage("error", data.error || "Aşama silinemedi")
      }
    } catch (error) {
      console.error("Error:", error)
      showMessage("error", "Sunucu hatası")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Yükleniyor...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projeler Yönetimi</h1>
        <p className="text-muted-foreground">Yapım aşamalarıyla projeleri yönetin</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${message.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"}`}
        >
          {message.text}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="projects">Projeler ({projects.length})</TabsTrigger>
          <TabsTrigger value="steps" disabled={!selectedProject}>
            Yapım Aşamaları {selectedProject && `(${steps.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
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
                    placeholder="Proje Adı *"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Slug (otomatik oluşturulur)"
                    value={projectForm.slug}
                    onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                  />
                  <Input
                    placeholder="Kategori (Merdiven, Depo, Fabrika)"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                  />
                  <Input
                    placeholder="Lokasyon (Sakarya, Düzce, vb.)"
                    value={projectForm.location}
                    onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  />
                  <Input
                    placeholder="Müşteri Adı"
                    value={projectForm.client_name}
                    onChange={(e) => setProjectForm({ ...projectForm, client_name: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Kapak Resmi URL"
                      value={projectForm.featured_image_url}
                      onChange={(e) => setProjectForm({ ...projectForm, featured_image_url: e.target.value })}
                      className="flex-1"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setUploading(true)
                            const url = await handleImageUpload(file)
                            if (url) {
                              setProjectForm({ ...projectForm, featured_image_url: url })
                              showMessage("success", "Resim yüklendi")
                            } else {
                              showMessage("error", "Resim yüklenemedi")
                            }
                            setUploading(false)
                          }
                        }}
                      />
                      <Button type="button" variant="outline" size="icon" disabled={uploading}>
                        <Upload className="w-4 h-4" />
                      </Button>
                    </label>
                  </div>
                </div>
                <Textarea
                  placeholder="Proje Açıklaması"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  rows={3}
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={uploading}>
                  {uploading ? "Ekleniyor..." : "Proje Ekle"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {projects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz proje eklenmemiş</p>
              </div>
            ) : (
              projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-colors ${selectedProject?.id === project.id ? "border-blue-500" : ""}`}
                  onClick={() => {
                    setSelectedProject(project)
                    setActiveTab("steps")
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        {project.featured_image_url && (
                          <img
                            src={project.featured_image_url || "/placeholder.svg"}
                            alt={project.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-bold text-lg">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.category && `${project.category} • `}
                            {project.location || "Lokasyon belirtilmemiş"}
                          </p>
                          {project.description && (
                            <p className="text-sm mt-1 line-clamp-2 text-muted-foreground">{project.description}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteProject(project.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="steps" className="space-y-6">
          {selectedProject && (
            <>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">Seçili Proje:</p>
                <h2 className="font-bold text-xl">{selectedProject.title}</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Yapım Aşaması Ekle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddStep} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Adım No"
                        value={stepForm.step_number}
                        onChange={(e) =>
                          setStepForm({ ...stepForm, step_number: Number.parseInt(e.target.value) || 1 })
                        }
                        min="1"
                      />
                      <Input
                        placeholder="Adım Başlığı (Temel Atma, Montaj, vb.) *"
                        value={stepForm.title}
                        onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <Textarea
                      placeholder="Adım Açıklaması"
                      value={stepForm.description}
                      onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                      rows={2}
                    />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={uploading}>
                      {uploading ? "Ekleniyor..." : "Aşama Ekle"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {steps.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Henüz yapım aşaması eklenmemiş</p>
                  </div>
                ) : (
                  steps.map((step) => (
                    <Card key={step.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <span className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shrink-0">
                              {step.step_number}
                            </span>
                            <div>
                              <h3 className="font-bold">{step.title}</h3>
                              {step.description && (
                                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                              )}
                              {step.project_photos && step.project_photos.length > 0 && (
                                <div className="flex gap-2 mt-3">
                                  {step.project_photos.map((photo) => (
                                    <img
                                      key={photo.id}
                                      src={photo.photo_url || "/placeholder.svg"}
                                      alt={photo.caption || ""}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteStep(step.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
