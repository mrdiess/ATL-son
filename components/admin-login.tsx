"use client"
import { useState } from "react"
import type React from "react"

import { Eye, EyeOff, Lock, User, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdminLoginProps {
  onLogin: (user: { id: string; username: string; role: string; name: string }) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetError, setResetError] = useState("")
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Giriş başarısız")
        setIsLoading(false)
        return
      }

      onLogin(data.user)
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.")
    }
    setIsLoading(false)
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetError("")
    setResetSuccess(false)

    if (newPassword !== confirmPassword) {
      setResetError("Şifreler eşleşmiyor")
      return
    }

    if (newPassword.length < 6) {
      setResetError("Şifre en az 6 karakter olmalıdır")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recoveryCode: resetCode,
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setResetError(data.error || "Şifre sıfırlama başarısız")
        setIsLoading(false)
        return
      }

      setResetSuccess(true)
      setResetCode("")
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        setShowReset(false)
        setResetSuccess(false)
      }, 2000)
    } catch (err) {
      setResetError("Bir hata oluştu. Lütfen tekrar deneyin.")
    }
    setIsLoading(false)
  }

  if (showReset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 dark:bg-slate-900 dark:border-slate-800">
          <CardHeader className="text-center space-y-4 pb-8 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900">
            <div className="mx-auto w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold dark:text-white">Şifremi Unuttum</CardTitle>
              <CardDescription className="mt-2 dark:text-slate-400">
                Şifrenizi sıfırlamak için doğrulama kodu girin
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reset-code" className="dark:text-slate-200">
                  Doğrulama Kodu
                </Label>
                <Input
                  id="reset-code"
                  type="text"
                  placeholder="Doğrulama kodunu girin"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="dark:text-slate-200">
                  Yeni Şifre
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Yeni şifre girin"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="dark:text-slate-200">
                  Şifreyi Onayla
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Şifreyi tekrar girin"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                  required
                />
              </div>

              {resetError && (
                <div className="bg-destructive/10 text-destructive dark:bg-red-950 dark:text-red-200 text-sm p-3 rounded-lg text-center">
                  {resetError}
                </div>
              )}

              {resetSuccess && (
                <div className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 text-sm p-3 rounded-lg text-center">
                  Şifreniz başarıyla sıfırlandı!
                </div>
              )}

              <Button
                type="submit"
                className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    İşleniyor...
                  </span>
                ) : (
                  "Şifreyi Sıfırla"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full dark:text-slate-300 dark:hover:bg-slate-800"
                onClick={() => {
                  setShowReset(false)
                  setResetCode("")
                  setNewPassword("")
                  setConfirmPassword("")
                  setResetError("")
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 dark:bg-slate-900 dark:border-slate-800">
        <CardHeader className="text-center space-y-4 pb-8 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900">
          <div className="mx-auto w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold dark:text-white">Admin Paneli</CardTitle>
            <CardDescription className="mt-2 dark:text-slate-400">
              ATL Çelik Yapı yönetim paneline giriş yapın
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="dark:text-slate-200">
                Kullanıcı Adı
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-slate-500" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="dark:text-slate-200">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive dark:bg-red-950 dark:text-red-200 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full dark:bg-blue-600 dark:hover:bg-blue-700"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Giriş yapılıyor...
                </span>
              ) : (
                "Giriş Yap"
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full dark:text-blue-400 dark:hover:bg-slate-800"
              onClick={() => setShowReset(true)}
            >
              Şifremi Unuttum
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
