type Item = {
  id: string
  title: string
  after: string
}

export default function BeforeAfterGrid({
  items,
  onSelect,
}: {
  items: Item[]
  onSelect: (item: Item) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="relative aspect-video overflow-hidden rounded-xl border"
        >
          <img
            src={item.after}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm">
            {item.title}
          </div>
        </button>
      ))}
    </div>
  )
}
