type Item = {
  before: string
  after: string
}

export default function BeforeAfterModal({
  item,
  onClose,
}: {
  item: Item | null
  onClose: () => void
}) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl max-w-4xl w-full">
        <div className="grid grid-cols-2 gap-4">
          <img src={item.before} className="w-full" />
          <img src={item.after} className="w-full" />
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm underline"
        >
          Kapat
        </button>
      </div>
    </div>
  )
}
