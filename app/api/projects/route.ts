import { NextResponse } from "next/server"
import { google } from "googleapis"

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
})

const drive = google.drive({ version: "v3", auth })

const FOLDER_ID = process.env.GOOGLE_PROJECTS_FOLDER_ID!

const img = (id: string) =>
  `https://drive.google.com/uc?id=${id}`

export async function GET() {
  try {
    if (!FOLDER_ID) {
      throw new Error("GOOGLE_PROJECTS_FOLDER_ID missing")
    }

    const foldersRes = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id, name)",
    })

    const projects = []

    for (const folder of foldersRes.data.files || []) {
      const filesRes = await drive.files.list({
        q: `'${folder.id}' in parents and trashed=false`,
        fields: "files(id, name)",
      })

      const before = filesRes.data.files?.find(f =>
        f.name?.toLowerCase().startsWith("before")
      )

      const after = filesRes.data.files?.find(f =>
        f.name?.toLowerCase().startsWith("after")
      )

      if (!before || !after) continue

      projects.push({
        id: folder.id,
        title: folder.name,
        before: img(before.id!),
        after: img(after.id!),
      })
    }

    return NextResponse.json({
      success: true,
      data: projects,
    })
  } catch (err: any) {
    console.error("PROJECT API ERROR:", err)

    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    )
  }
}
