"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Giriş başarısız")
        return
      }

      router.push("/admin")
    } catch (err) {
      setError("Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.png"
              alt="ATL Çelik Yapı"
              width={180}
              height={70}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>
          <CardTitle className="text-2xl text-white">Admin Paneline Giriş</CardTitle>
          <CardDescription className="text-slate-400">ATL Çelik Yapı Yönetim Sistemi</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert className="bg-red-900/20 border-red-800 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Kullanıcı Adı</label>
              <Input
                type="text"
                placeholder="Kullanıcı adınızı girin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Şifre</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400 text-center">
              Şifrenizi mi unuttunuz?{" "}
              <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300">
                Sıfırla
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
