interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  const delta = 2
  const left = Math.max(1, page - delta)
  const right = Math.min(totalPages, page + delta)

  if (left > 1) pages.push(1)
  if (left > 2) pages.push('...')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < totalPages - 1) pages.push('...')
  if (right < totalPages) pages.push(totalPages)

  const btn = 'min-w-[40px] h-10 px-4 rounded-lg text-sm font-medium transition-colors'

  return (
    <div className="flex items-center justify-center gap-2 mt-10 pb-4">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${btn} border border-gray-200 disabled:opacity-40 hover:bg-gray-100`}
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-3 text-gray-400">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btn} ${
              p === page
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={`${btn} border border-gray-200 disabled:opacity-40 hover:bg-gray-100`}
      >
        ›
      </button>
    </div>
  )
}
