type Props = {
  index: number
  title: string
  image: string
}

export default function ProjectCard({ index, title, image }: Props) {
  return (
    <div className="relative bg-[#d6d6d6] rounded-xl h-[110px] overflow-hidden shadow-sm">
      {/* Görsel */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        loading="lazy"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Başlık */}
      <span className="relative z-10 text-xs font-medium text-white text-center px-2 mt-4 block">
        {title}
      </span>

      {/* Numara */}
      <div className="absolute bottom-2 right-2 z-10 bg-blue-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
        {String(index).padStart(2, "0")}
      </div>
    </div>
  )
}
