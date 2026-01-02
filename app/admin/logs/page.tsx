"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Trash2 } from "lucide-react"

interface Log {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
  status: "success" | "warning" | "error"
}

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([
    {
      id: "1",
      action: "Medya yüklendi",
      user: "Admin",
      timestamp: "10:30 AM",
      details: "fabrika.jpg yüklendi",
      status: "success",
    },
    {
      id: "2",
      action: "Slider güncellendi",
      user: "Editor",
      timestamp: "09:15 AM",
      details: "3 slayt güncellendi",
      status: "success",
    },
    {
      id: "3",
      action: "Video eklendi",
      user: "Admin",
      timestamp: "08:45 AM",
      details: "YouTube linki başarısız",
      status: "error",
    },
    {
      id: "4",
      action: "Ayarlar kaydedildi",
      user: "Admin",
      timestamp: "Dün 5:30 PM",
      details: "Logo güncellemesi",
      status: "success",
    },
  ])

  const handleDelete = (id: string) => {
    setLogs((prev) => prev.filter((log) => log.id !== id))
  }

  const handleExport = () => {
    const csv = logs.map((log) => `${log.timestamp},${log.action},${log.user},${log.status}`).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "logs.csv"
    a.click()
  }

  const statusColors = {
    success: "bg-green-500/20 text-green-400",
    warning: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Aktivite Logları</h1>
          <p className="text-slate-400">Tüm sistem aktivitelerini görüntüleyin</p>
        </div>
        <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          İndir (CSV)
        </Button>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <Card key={log.id} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-white font-medium">{log.action}</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[log.status]}`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{log.details}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {log.user} • {log.timestamp}
                  </p>
                </div>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(log.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
