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

  const navBtn: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.15s',
  }

  const pageBtn: React.CSSProperties = {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.15s',
  }

  const activePage: React.CSSProperties = {
    ...pageBtn,
    backgroundColor: '#2563eb',
    color: 'white',
    border: '1px solid #2563eb',
  }

  const disabledBtn: React.CSSProperties = {
    ...navBtn,
    opacity: 0.4,
    cursor: 'not-allowed',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '20px 0' }}>
      {/* Previous */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        style={page === 1 ? disabledBtn : navBtn}
        onMouseEnter={(e) => { if (page !== 1) e.currentTarget.style.backgroundColor = '#f9fafb' }}
        onMouseLeave={(e) => { if (page !== 1) e.currentTarget.style.backgroundColor = 'white' }}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`el-${i}`} style={{ width: '36px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            style={p === page ? activePage : pageBtn}
            onMouseEnter={(e) => { if (p !== page) e.currentTarget.style.backgroundColor = '#f9fafb' }}
            onMouseLeave={(e) => { if (p !== page) e.currentTarget.style.backgroundColor = 'white' }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        style={page === totalPages ? disabledBtn : navBtn}
        onMouseEnter={(e) => { if (page !== totalPages) e.currentTarget.style.backgroundColor = '#f9fafb' }}
        onMouseLeave={(e) => { if (page !== totalPages) e.currentTarget.style.backgroundColor = 'white' }}
      >
        Next
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
