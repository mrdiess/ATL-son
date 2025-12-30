"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  LogIn,
  LogOut,
  Upload,
  Trash2,
  Edit2,
  Settings,
  User,
  AlertTriangle,
  Download,
  Clock,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface ActivityLogEntry {
  id: string
  userId: string
  userName: string
  userRole: string
  action: string
  actionType: "login" | "logout" | "upload" | "delete" | "edit" | "settings" | "maintenance" | "create" | "view"
  details: string
  timestamp: string
  ip?: string
}

const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case "login":
      return <LogIn className="w-4 h-4 text-green-500" />
    case "logout":
      return <LogOut className="w-4 h-4 text-gray-500" />
    case "upload":
      return <Upload className="w-4 h-4 text-blue-500" />
    case "delete":
      return <Trash2 className="w-4 h-4 text-red-500" />
    case "edit":
      return <Edit2 className="w-4 h-4 text-orange-500" />
    case "settings":
      return <Settings className="w-4 h-4 text-purple-500" />
    case "maintenance":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    case "create":
      return <User className="w-4 h-4 text-green-500" />
    case "view":
      return <Activity className="w-4 h-4 text-gray-400" />
    default:
      return <Activity className="w-4 h-4" />
  }
}

const getActionBadge = (actionType: string) => {
  switch (actionType) {
    case "login":
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Giris</Badge>
    case "logout":
      return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Cikis</Badge>
    case "upload":
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Yukleme</Badge>
    case "delete":
      return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Silme</Badge>
    case "edit":
      return <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Duzenleme</Badge>
    case "settings":
      return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">Ayar</Badge>
    case "maintenance":
      return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Bakim</Badge>
    case "create":
      return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Olusturma</Badge>
    default:
      return <Badge variant="outline">{actionType}</Badge>
  }
}

export function addActivityLog(entry: Omit<ActivityLogEntry, "id" | "timestamp">) {
  const logs = JSON.parse(localStorage.getItem("atl_activity_logs") || "[]")
  const newEntry: ActivityLogEntry = {
    ...entry,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
  }
  logs.unshift(newEntry)
  // Son 500 kaydi tut
  if (logs.length > 500) logs.pop()
  localStorage.setItem("atl_activity_logs", JSON.stringify(logs))
}

export function ActivityLog() {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [userFilter, setUserFilter] = useState<string>("all")

  useEffect(() => {
    const stored = localStorage.getItem("atl_activity_logs")
    if (stored) {
      setLogs(JSON.parse(stored))
    }
  }, [])

  const filteredLogs = logs.filter((log) => {
    if (filter !== "all" && log.actionType !== filter) return false
    if (userFilter !== "all" && log.userName !== userFilter) return false
    return true
  })

  const uniqueUsers = Array.from(new Set(logs.map((l) => l.userName)))

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const clearLogs = () => {
    if (confirm("Tum aktivite loglarini silmek istediginize emin misiniz?")) {
      localStorage.removeItem("atl_activity_logs")
      setLogs([])
    }
  }

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `aktivite-log-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Aktivite Loglari</h3>
          <p className="text-sm text-muted-foreground">Tum admin paneli aktivitelerini goruntuluyin</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Disa Aktar
          </Button>
          <Button variant="destructive" size="sm" onClick={clearLogs}>
            <Trash2 className="w-4 h-4 mr-2" />
            Temizle
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Islem Turu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tum Islemler</SelectItem>
            <SelectItem value="login">Giris</SelectItem>
            <SelectItem value="logout">Cikis</SelectItem>
            <SelectItem value="upload">Yukleme</SelectItem>
            <SelectItem value="delete">Silme</SelectItem>
            <SelectItem value="edit">Duzenleme</SelectItem>
            <SelectItem value="settings">Ayarlar</SelectItem>
            <SelectItem value="maintenance">Bakim</SelectItem>
          </SelectContent>
        </Select>

        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Kullanici" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tum Kullanicilar</SelectItem>
            {uniqueUsers.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
            {filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henuz aktivite kaydedilmemis</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    {getActionIcon(log.actionType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{log.userName}</span>
                      <Badge variant="outline" className="text-xs">
                        {log.userRole}
                      </Badge>
                      {getActionBadge(log.actionType)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDate(log.timestamp)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
