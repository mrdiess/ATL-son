"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  joinedAt: string
  status: "active" | "inactive"
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Ali Yılmaz", email: "ali@example.com", role: "admin", joinedAt: "15.01.2024", status: "active" },
    {
      id: "2",
      name: "Ayşe Demir",
      email: "ayse@example.com",
      role: "editor",
      joinedAt: "20.01.2024",
      status: "active",
    },
    { id: "3", name: "Can Kaya", email: "can@example.com", role: "viewer", joinedAt: "25.01.2024", status: "inactive" },
  ])

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const roleColors = {
    admin: "bg-red-500/20 text-red-400",
    editor: "bg-blue-500/20 text-blue-400",
    viewer: "bg-green-500/20 text-green-400",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Kullanıcılar</h1>
        <p className="text-slate-400">Admin panel kullanıcılarını yönetin</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-slate-300">Ad Soyadı</th>
              <th className="text-left py-3 px-4 text-slate-300">E-posta</th>
              <th className="text-left py-3 px-4 text-slate-300">Rol</th>
              <th className="text-left py-3 px-4 text-slate-300">Durum</th>
              <th className="text-left py-3 px-4 text-slate-300">Katılım</th>
              <th className="text-left py-3 px-4 text-slate-300">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-4 text-white">{user.name}</td>
                <td className="py-3 px-4 text-slate-400">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${roleColors[user.role]}`}>{user.role}</span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"}`}
                  >
                    {user.status === "active" ? "Aktif" : "İnaktif"}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400">{user.joinedAt}</td>
                <td className="py-3 px-4">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
