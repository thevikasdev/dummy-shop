interface Props {
  searchQuery?: string
  onSearchChange?: (q: string) => void
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Header({ searchQuery = '', onSearchChange, sidebarOpen, onToggleSidebar }: Props) {
  return (
    <header
      style={{ height: '56px', backgroundColor: '#1e293b', gap: '16px', padding: '0 20px' }}
      className="flex items-center sticky top-0 z-20 shadow-md text-white"
    >
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        style={{ padding: '8px', borderRadius: '6px', flexShrink: 0 }}
        className="hover:bg-slate-700 active:bg-slate-600 transition-colors"
      >
        {sidebarOpen ? (
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Brand */}
      <span style={{ fontSize: '18px', fontWeight: 700, flexShrink: 0, letterSpacing: '-0.3px' }}>
        ShopZone
      </span>

      {/* Search — fills remaining space */}
      <div style={{ flex: 1, maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
        <svg
          width="16" height="16"
          fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', flexShrink: 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          style={{
            width: '100%',
            borderRadius: '9999px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'white',
            color: '#1f2937',
            fontSize: '14px',
            padding: '8px 16px 8px 40px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        {/* Cart */}
        <button
          title="Cart"
          style={{ position: 'relative', padding: '8px', borderRadius: '6px' }}
          className="hover:bg-slate-700 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', backgroundColor: '#60a5fa', borderRadius: '9999px' }} />
        </button>

        {/* Wishlist */}
        <button
          title="Wishlist"
          style={{ padding: '8px', borderRadius: '6px' }}
          className="hover:bg-slate-700 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318a4.5 4.5 0 1 1 6.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 0 1 0-6.364z" />
          </svg>
        </button>

        {/* Profile */}
        <button
          title="Account"
          style={{ padding: '8px', borderRadius: '6px' }}
          className="hover:bg-slate-700 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
