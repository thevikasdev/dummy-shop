import { useState } from 'react'
import { useCategories } from '../../hooks/useCategories'
import type { Filters } from '../../types/product'

type FilterUpdate = Partial<Filters>

interface Props {
  filters: Filters & { availableBrands: string[] }
  onChange: (updates: FilterUpdate) => void
}

const sectionStyle: React.CSSProperties = {
  padding: '16px',
  borderBottom: '1px solid #f3f4f6',
}

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#374151',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '12px',
  display: 'block',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  backgroundColor: '#f9fafb',
  outline: 'none',
  boxSizing: 'border-box',
  color: '#111827',
}

export default function FilterSidebar({ filters, onChange }: Props) {
  const { categories, loading: catsLoading } = useCategories()
  const { category, minPrice, maxPrice, brands, availableBrands } = filters

  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  const toggleBrand = (brand: string) => {
    const next = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand]
    onChange({ brands: next, page: 1 })
  }

  const toggleCategory = (slug: string) => {
    onChange({ category: category === slug ? '' : slug, brands: [], page: 1 })
  }

  const applyPrice = () => {
    onChange({ minPrice: localMin, maxPrice: localMax, page: 1 })
  }

  const handleClear = () => {
    setLocalMin('')
    setLocalMax('')
    onChange({ category: '', minPrice: '', maxPrice: '', brands: [], page: 1 })
  }

  return (
    <aside
      style={{
        width: '210px',
        flexShrink: 0,
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        alignSelf: 'flex-start',
        position: 'sticky',
        top: '68px',
        overflow: 'hidden',
      }}
    >
      {/* Categories */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Categories</span>
        {catsLoading ? (
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>Loading…</p>
        ) : (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={category === cat.slug}
                    onChange={() => toggleCategory(cat.slug)}
                    style={{ width: '15px', height: '15px', flexShrink: 0, accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <span style={{
                    fontSize: '13px',
                    lineHeight: '1.4',
                    color: category === cat.slug ? '#2563eb' : '#374151',
                    fontWeight: category === cat.slug ? 600 : 400,
                  }}>
                    {cat.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div style={sectionStyle}>
        <span style={labelStyle}>Price Range</span>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button
          onClick={applyPrice}
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '9px 0',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Apply
        </button>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div style={sectionStyle}>
          <span style={labelStyle}>Brands</span>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            {availableBrands.map((brand) => (
              <li key={brand}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    style={{ width: '15px', height: '15px', flexShrink: 0, accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '13px', color: '#374151', lineHeight: '1.4' }}>{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clear */}
      <div style={{ padding: '16px' }}>
        <button
          onClick={handleClear}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '9px 0',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Clear all filters
        </button>
      </div>
    </aside>
  )
}
