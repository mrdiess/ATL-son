export type GalleryItem = {
  id: string
  src: string
  category: "villa" | "fabrika" | "cati" | "ic-mekan"
}

export const gallery: GalleryItem[] = [
  {
    id: "1",
    src: "https://lh3.googleusercontent.com/d/FILE_ID_1",
    category: "villa",
  },
  {
    id: "2",
    src: "https://lh3.googleusercontent.com/d/FILE_ID_2",
    category: "fabrika",
  },
  {
    id: "3",
    src: "https://lh3.googleusercontent.com/d/FILE_ID_3",
    category: "cati",
  },
]
