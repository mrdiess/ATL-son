"use client"
import { useState, useEffect } from "react"
import { Plus, Trash2, Edit2, User, Shield, UserCog, Eye, EyeOff, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { addActivityLog } from "@/components/activity-log"

interface AdminUser {
  username: string
  password: string
  role: string
  name: string
  createdAt?: string
  lastLogin?: string
}

function getCurrentUser(): { name: string; role: string } | null {
  const stored = localStorage.getItem("atl_current_user")
  return stored ? JSON.parse(stored) : null
}

export function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    name: "",
    role: "editor",
  })

  useEffect(() => {
    const stored = localStorage.getItem("atl_admin_users")
    if (stored) {
      setUsers(JSON.parse(stored))
    } else {
      const defaultUsers = [
        {
          username: "admin",
          password: "admin123",
          role: "admin",
          name: "Yonetici",
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("atl_admin_users", JSON.stringify(defaultUsers))
      setUsers(defaultUsers)
    }
  }, [])

  const saveUsers = (updatedUsers: AdminUser[]) => {
    localStorage.setItem("atl_admin_users", JSON.stringify(updatedUsers))
    setUsers(updatedUsers)
  }

  const handleAddUser = () => {
    if (!newUser.username || !newUser.password || !newUser.name) return

    const exists = users.find((u) => u.username === newUser.username)
    if (exists) {
      alert("Bu kullanici adi zaten mevcut!")
      return
    }

    const updatedUsers = [...users, { ...newUser, createdAt: new Date().toISOString() }]
    saveUsers(updatedUsers)

    const currentUser = getCurrentUser()
    if (currentUser) {
      addActivityLog({
        userId: newUser.username,
        userName: currentUser.name,
        userRole: currentUser.role,
        action: "Kullanici Olusturma",
        actionType: "create",
        details: `${newUser.name} (${newUser.username}) kullanicisi ${newUser.role} rolunde olusturuldu`,
      })
    }

    setNewUser({ username: "", password: "", name: "", role: "editor" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteUser = (username: string) => {
    if (username === "admin") {
      alert("Ana admin hesabi silinemez!")
      return
    }

    const userToDelete = users.find((u) => u.username === username)
    const updatedUsers = users.filter((u) => u.username !== username)
    saveUsers(updatedUsers)

    const currentUser = getCurrentUser()
    if (currentUser && userToDelete) {
      addActivityLog({
        userId: username,
        userName: currentUser.name,
        userRole: currentUser.role,
        action: "Kullanici Silme",
        actionType: "delete",
        details: `${userToDelete.name} (${username}) kullanicisi silindi`,
      })
    }
  }

  const handleUpdateUser = () => {
    if (!editingUser) return
    const updatedUsers = users.map((u) => (u.username === editingUser.username ? editingUser : u))
    saveUsers(updatedUsers)

    const currentUser = getCurrentUser()
    if (currentUser) {
      addActivityLog({
        userId: editingUser.username,
        userName: currentUser.name,
        userRole: currentUser.role,
        action: "Kullanici Duzenleme",
        actionType: "edit",
        details: `${editingUser.name} kullanicisi guncellendi`,
      })
    }

    setEditingUser(null)
  }

  const togglePasswordVisibility = (username: string) => {
    setShowPasswords((prev) => ({ ...prev, [username]: !prev[username] }))
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Admin</Badge>
      case "editor":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Editor</Badge>
      case "viewer":
        return <Badge className="bg-gray-500/10 text-gray-500 border-gray-500/20">Izleyici</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Kullanici Yonetimi</h3>
          <p className="text-sm text-muted-foreground">Admin paneline erisim yetkisi olan kullanicilari yonetin</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Kullanici
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Kullanici Ekle</DialogTitle>
              <DialogDescription>Admin paneline erisim icin yeni bir kullanici olusturun</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Ad Soyad</Label>
                <Input
                  placeholder="Kullanici adi"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Kullanici Adi</Label>
                <Input
                  placeholder="Giris icin kullanilacak"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Sifre</Label>
                <Input
                  type="password"
                  placeholder="En az 6 karakter"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin - Tam Yetki</SelectItem>
                    <SelectItem value="editor">Editor - Duzenleme Yetkisi</SelectItem>
                    <SelectItem value="viewer">Izleyici - Sadece Goruntuleme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddUser} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Kullanici Olustur
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanici</TableHead>
                <TableHead>Kullanici Adi</TableHead>
                <TableHead>Sifre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead className="text-right">Islemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.username}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        {user.role === "admin" ? (
                          <Shield className="w-4 h-4 text-primary" />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium block">{user.name}</span>
                        {user.lastLogin && (
                          <span className="text-xs text-muted-foreground">
                            Son giris: {new Date(user.lastLogin).toLocaleDateString("tr-TR")}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{user.username}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {showPasswords[user.username] ? user.password : "••••••••"}
                      </span>
                      <button
                        onClick={() => togglePasswordVisibility(user.username)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {showPasswords[user.username] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingUser(user)}>
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Kullanici Duzenle</DialogTitle>
                          </DialogHeader>
                          {editingUser && (
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label>Ad Soyad</Label>
                                <Input
                                  value={editingUser.name}
                                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Yeni Sifre</Label>
                                <Input
                                  type="password"
                                  placeholder="Degistirmek icin yeni sifre girin"
                                  value={editingUser.password}
                                  onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Rol</Label>
                                <Select
                                  value={editingUser.role}
                                  onValueChange={(v) => setEditingUser({ ...editingUser, role: v })}
                                  disabled={editingUser.username === "admin"}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="viewer">Izleyici</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button onClick={handleUpdateUser} className="w-full">
                                <Save className="w-4 h-4 mr-2" />
                                Kaydet
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            disabled={user.username === "admin"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Kullaniciyi Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              {user.name} kullanicisini silmek istediginize emin misiniz? Bu islem geri alinamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Iptal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteUser(user.username)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rol Yetkileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border bg-red-500/5 border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-red-500">Admin</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tam yetki: Kullanici yonetimi, site ayarlari, tum icerikler
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-blue-500/5 border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <UserCog className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-blue-500">Editor</span>
              </div>
              <p className="text-sm text-muted-foreground">Icerik duzenleme: Medya, slider, galeri ve videolar</p>
            </div>
            <div className="p-4 rounded-lg border bg-gray-500/5 border-gray-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-500">Izleyici</span>
              </div>
              <p className="text-sm text-muted-foreground">Sadece goruntuleme: Icerikleri gorebilir, duzenleyemez</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
