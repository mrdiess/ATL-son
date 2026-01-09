"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Ocak", visitors: 2400, clicks: 1200, conversions: 240 },
  { month: "Şubat", visitors: 3000, clicks: 1398, conversions: 280 },
  { month: "Mart", visitors: 2800, clicks: 9800, conversions: 320 },
  { month: "Nisan", visitors: 3900, clicks: 3908, conversions: 390 },
  { month: "Mayıs", visitors: 4300, clicks: 4800, conversions: 430 },
  { month: "Haziran", visitors: 5200, clicks: 3800, conversions: 520 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analiz</h1>
        <p className="text-slate-400">Site istatistiklerini görüntüleyin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Toplam Ziyaret", value: "24.5K", change: "+12%" },
          { title: "Tıklama", value: "8.2K", change: "+8%" },
          { title: "Dönüşüm", value: "2.4K", change: "+15%" },
          { title: "Ortalama Oturum", value: "5m 42s", change: "+3%" },
        ].map((stat) => (
          <Card key={stat.title} className="bg-slate-900 border-slate-800">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-400">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              <p className="text-xs text-green-400 mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">Ziyaretçi Grafik</CardTitle>
          <CardDescription>Son 6 aylık istatistikler</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }} />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="conversions" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
