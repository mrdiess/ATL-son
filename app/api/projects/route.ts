import { NextResponse } from "next/server"
import { google } from "googleapis"

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
})

const drive = google.drive({ version: "v3", auth })

const PROJECTS_FOLDER_ID = process.env.GOOGLE_PROJECTS_FOLDER_ID!

function driveImageUrl(fileId: string) {
  return `https://drive.google.com/uc?id=${fileId}`
}

export async function GET() {
  try {
    // 1) PROJELER klasöründeki alt klasörleri al
    const foldersRes = await drive.files.list({
      q: `'${PROJECTS_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
    })

    const projects = []

    for (const folder of foldersRes.data.files || []) {
      // 2) Her proje klasörünün içindeki dosyaları al
      const filesRes = await drive.files.list({
        q: `'${folder.id}' in parents and trashed=false`,
        fields: "files(id, name)",
      })

      const before = filesRes.data.files?.find(
        (f) => f.name?.toLowerCase().startsWith("before")
      )
      const after = filesRes.data.files?.find(
        (f) => f.name?.toLowerCase().startsWith("after")
      )

      if (!before || !after) continue

      projects.push({
        id: folder.id,
        title: folder.name,
        before: driveImageUrl(before.id!),
        after: driveImageUrl(after.id!),
      })
    }

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Drive projects error:", error)
    return NextResponse.json({ error: "Projects fetch failed" }, { status: 500 })
  }
}
