type Item = {
  id: string
  before: string
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
          className="relative aspect-video overflow-hidden rounded-xl"
        >
          <img
            src={item.after}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}
