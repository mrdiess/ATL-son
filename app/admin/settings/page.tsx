"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "ATL Çelik Yapı",
    slogan: "Güvenilir Çelik Çözümleri",
    phone: "+90 537 339 39 47",
    email: "admin@atlcelikyapi.com",
    address: "Düzce Yeni Sanayi Sitesi, Düzce",
    maintenanceMode: false,
    siteActive: true,
    themeDark: true,
    notifyEmail: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleToggle = (key: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Başarılı",
        description: "Ayarlar başarıyla kaydedildi.",
        variant: "default",
      })
    } catch (error) {
      console.error("[v0] Ayar kaydetme hatası:", error)
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Site Ayarları</h1>
        <p className="text-muted-foreground">Site, logo, favicon ve bakım ayarlarını yönetin</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="maintenance">Bakım</TabsTrigger>
        </TabsList>

        {/* Genel Tab */}
        <TabsContent value="general" className="space-y-4 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>Site, logo, favicon ve bakım ayarlarını yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Firma Adı</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slogan">Slogan</Label>
                  <Input
                    id="slogan"
                    name="slogan"
                    value={formData.slogan}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adres</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="bg-secondary border-border"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-4 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Logo ve Branding</CardTitle>
              <CardDescription>Logo ve favicon yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input id="logo" defaultValue="/logo.png" className="bg-secondary border-border" disabled />
                <div className="mt-4 p-4 bg-secondary rounded-lg flex items-center justify-center h-32">
                  <img src="/logo.png" alt="Logo Preview" className="max-h-full max-w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bakım Tab */}
        <TabsContent value="maintenance" className="space-y-4 mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Bakım Modu</CardTitle>
              <CardDescription>Site bakım durumunu yönetin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">Bakım Modu</p>
                  <p className="text-sm text-muted-foreground">Siteyi geçici olarak kapatın</p>
                </div>
                <Switch checked={formData.maintenanceMode} onCheckedChange={() => handleToggle("maintenanceMode")} />
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">Site Aktif</p>
                  <p className="text-sm text-muted-foreground">Siteyi yayında tutun</p>
                </div>
                <Switch checked={formData.siteActive} onCheckedChange={() => handleToggle("siteActive")} />
              </div>

              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="font-medium">Koyu Tema</p>
                  <p className="text-sm text-muted-foreground">Varsayılan olarak koyu mod kullanın</p>
                </div>
                <Switch checked={formData.themeDark} onCheckedChange={() => handleToggle("themeDark")} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} disabled={saving} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
        {saving ? "Kaydediliyor..." : "Ayarları Kaydet"}
      </Button>
    </div>
  )
}
