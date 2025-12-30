"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Eye, Globe, Monitor, Smartphone, Tablet, TrendingUp, Clock } from "lucide-react"

interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  pageViews: Record<string, number>
  deviceTypes: Record<string, number>
  dailyVisits: Record<string, number>
  recentVisits: Array<{
    id: string
    page_path: string
    device_type: string
    created_at: string
  }>
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30")

  useEffect(() => {
    loadAnalytics()
  }, [period])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics?days=${period}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error("Load analytics error:", error)
    }
    setLoading(false)
  }

  const getDeviceIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "tablet":
        return <Tablet className="w-4 h-4" />
      default:
        return <Monitor className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Analitikler yükleniyor...</p>
        </div>
      </div>
    )
  }

  const topPages = analytics?.pageViews
    ? Object.entries(analytics.pageViews)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    : []

  const deviceStats = analytics?.deviceTypes ? Object.entries(analytics.deviceTypes).sort(([, a], [, b]) => b - a) : []

  const totalDevices = deviceStats.reduce((acc, [, count]) => acc + count, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Site Analizleri</h2>
          <p className="text-muted-foreground">Ziyaretçi istatistiklerini görüntüleyin</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Son 7 gün</SelectItem>
            <SelectItem value="30">Son 30 gün</SelectItem>
            <SelectItem value="90">Son 90 gün</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Toplam Ziyaret</p>
                <p className="text-2xl font-bold">{analytics?.totalVisits || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tekil Ziyaretçi</p>
                <p className="text-2xl font-bold">{analytics?.uniqueVisitors || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sayfa Görüntüleme</p>
                <p className="text-2xl font-bold">{Object.keys(analytics?.pageViews || {}).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Günlük Ortalama</p>
                <p className="text-2xl font-bold">
                  {Math.round((analytics?.totalVisits || 0) / Number.parseInt(period))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">En Çok Ziyaret Edilen Sayfalar</CardTitle>
          </CardHeader>
          <CardContent>
            {topPages.length > 0 ? (
              <div className="space-y-4">
                {topPages.map(([page, count], index) => (
                  <div key={page} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm truncate max-w-[200px]">{page}</span>
                    </div>
                    <span className="text-sm font-medium">{count} ziyaret</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz veri yok</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Device Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cihaz Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            {deviceStats.length > 0 ? (
              <div className="space-y-4">
                {deviceStats.map(([device, count]) => (
                  <div key={device} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(device)}
                        <span className="text-sm capitalize">{device || "Bilinmiyor"}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {count} ({totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${totalDevices > 0 ? (count / totalDevices) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz veri yok</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Visits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Son Ziyaretler</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics?.recentVisits && analytics.recentVisits.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentVisits.slice(0, 10).map((visit) => (
                <div key={visit.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(visit.device_type)}
                    <span className="text-sm">{visit.page_path}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(visit.created_at).toLocaleString("tr-TR")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Henüz ziyaret kaydı yok</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
