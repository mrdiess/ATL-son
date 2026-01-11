import "./globals.css"
import { Header } from "@/components/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <Header />
        <div style={{ paddingTop: 80 }}>{children}</div>
      </body>
    </html>
  )
}
