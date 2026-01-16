export type DriveProject = {
  slug: string
  before: string | null
  after: string | null
}

export type DriveData = {
  galeri: Record<string, string[]>
  isOrtaklari: string[]
  projeler: DriveProject[]
}

export async function fetchDriveData(): Promise<DriveData> {
  const res = await fetch(process.env.DRIVE_API_URL as string, {
    next: { revalidate: 300 }
  })

  if (!res.ok) {
    throw new Error("Drive API fetch failed")
  }

  return res.json()
}
