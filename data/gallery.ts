export type GalleryItem = {
  id: string
  src: string
  category: "ferforje" | "merdiven"
}

export const gallery: GalleryItem[] = [
  {
    id: "1",
    src: "https://drive.google.com/uc?export=view&id=1ZzX-UsEC1r9AeaBODtwadEFQL2Soek4-",
    category: "ferforje",
  },
  {
    id: "2",
    src: "https://drive.google.com/uc?export=view&id=1eCBetPTxXI9oBhd8gv9y_THE0AoeBF3T",
    category: "merdiven",
  },
]
