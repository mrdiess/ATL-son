"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from "lucide-react"

interface Content {
  id: string
  title: string
  type: "hero" | "about" | "services" | "contact"
  content: string
  updatedAt: string
}

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([
    { id: "1", title: "Ana Başlık", type: "hero", content: "ATL Çelik Yapı", updatedAt: "2 saat önce" },
    { id: "2", title: "Hakkımızda", type: "about", content: "Firmamız 25 yıldan beri...", updatedAt: "3 gün önce" },
    {
      id: "3",
      title: "Hizmetlerimiz",
      type: "services",
      content: "Lazer kesim, sandviç panel...",
      updatedAt: "1 hafta önce",
    },
  ])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  const handleEdit = (id: string, currentContent: string) => {
    setEditingId(id)
    setEditText(currentContent)
  }

  const handleSave = (id: string) => {
    setContents((prev) =>
      prev.map((content) => (content.id === id ? { ...content, content: editText, updatedAt: "Şimdi" } : content)),
    )
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setContents((prev) => prev.filter((content) => content.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Site İçeriği</h1>
        <p className="text-slate-400">Site yazılarını ve başlıklarını düzenleyin</p>
      </div>

      <div className="space-y-3">
        {contents.map((content) => (
          <Card key={content.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <p className="text-white font-medium mb-2">{content.title}</p>
              <div className="mb-3">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{content.type}</span>
              </div>
              {editingId === content.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-sm"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSave(content.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Kaydet
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-slate-300 text-sm mb-3 line-clamp-2">{content.content}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(content.id, content.content)}>
                      <Edit2 className="w-4 h-4 mr-1" />
                      Düzenle
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(content.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-slate-500 ml-auto self-center">{content.updatedAt}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
