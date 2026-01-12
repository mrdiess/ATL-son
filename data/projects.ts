export type Project = {
  id: number
  title: string
  image?: string
}

export const projects: Project[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Yapım Adımı ${String(i + 1).padStart(2, "0")}`,
  image: undefined, // ileride gerçek görsel eklenecek
}))
