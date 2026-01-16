export type DriveData = {
  galeri: Record<string, string[]>
  isOrtaklari: string[]
  projeler: {
    slug: string
    before: string | null
    after: string | null
  }[]
}

export async function fetchDriveData(): Promise<DriveData> {
  const res = await fetch(process.env.DRIVE_API_URL!, {
    next: { revalidate: 300 }
  })

  if (!res.ok) {
    throw new Error("Drive API error")
  }

  return res.json()
}
