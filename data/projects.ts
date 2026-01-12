export type Project = {
  id: number
  title: string
  image: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Yapım Adımı 01",
    image: "https://lh3.googleusercontent.com/d/1ZzX-UsEC1r9AeaBODtwadEFQL2Soek4-",
  },
  {
    id: 2,
    title: "Yapım Adımı 02",
    image: "https://lh3.googleusercontent.com/d/1eCBetPTxXI9oBhd8gv9y_THE0AoeBF3T",
  },

  // şimdilik placeholder – sonra tek tek doldururuz
  ...Array.from({ length: 18 }).map((_, i) => ({
    id: i + 3,
    title: `Yapım Adımı ${String(i + 3).padStart(2, "0")}`,
    image: "https://via.placeholder.com/300x200?text=ATL",
  })),
]
