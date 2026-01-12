type Props = {
  index: number
  title: string
}

export default function ProjectCard({ index, title }: Props) {
  return (
    <div className="relative bg-[#d6d6d6] rounded-2xl h-[160px] flex flex-col items-center justify-center shadow-sm">
      {/* Başlık */}
      <span className="text-sm font-medium text-black mb-6">
        {title}
      </span>

      {/* Numara */}
      <div className="absolute bottom-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-md">
        {String(index).padStart(2, "0")}
      </div>
    </div>
  )
}
