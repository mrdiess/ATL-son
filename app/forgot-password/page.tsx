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

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<"verify" | "reset">("verify")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const ADMIN_RESET_CODE = "90731453arl"

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (resetCode !== ADMIN_RESET_CODE) {
      setError("Hatalı sıfırlama kodu")
      return
    }

    setStep("reset")
    setMessage("Kodu başarıyla doğrulandı. Yeni şifre belirleyin.")
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setLoading(true)

    // Validasyon
    if (newPassword.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      setLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Şifreler eşleşmiyor")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Şifre sıfırlama başarısız")
        return
      }

      setMessage("Şifre başarıyla sıfırlandı. Giriş sayfasına yönlendiriliyorsunuz...")
      setTimeout(() => router.push("/login"), 2000)
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
              width={160}
              height={60}
              className="h-16 w-auto brightness-0 invert"
            />
          </div>
          <CardTitle className="text-2xl text-white">Şifre Sıfırla</CardTitle>
          <CardDescription className="text-slate-400">Admin paneli şifrenizi sıfırlayın</CardDescription>
        </CardHeader>
        <CardContent>
          {step === "verify" ? (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              {error && (
                <Alert className="bg-red-900/20 border-red-800 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {message && (
                <Alert className="bg-green-900/20 border-green-800 text-green-200">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Sıfırlama Kodu</label>
                <Input
                  type="text"
                  placeholder="Sıfırlama kodunu girin"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Kodu Doğrula
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <Alert className="bg-red-900/20 border-red-800 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {message && (
                <Alert className="bg-green-900/20 border-green-800 text-green-200">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Yeni Şifre</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Şifre Onayla</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading ? "Sıfırlanıyor..." : "Şifre Sıfırla"}
              </Button>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400 text-center">
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Giriş sayfasına dön
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
