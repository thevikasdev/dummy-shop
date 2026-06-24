import { useCategories } from '../../hooks/useCategories'
import type { Filters } from '../../types/product'

type FilterUpdate = Partial<Filters>

interface Props {
  filters: Filters & { availableBrands: string[] }
  onChange: (updates: FilterUpdate) => void
}

export default function FilterSidebar({ filters, onChange }: Props) {
  const { categories, loading: catsLoading } = useCategories()
  const { category, minPrice, maxPrice, brands, availableBrands } = filters

  const toggleBrand = (brand: string) => {
    const next = brands.includes(brand)
      ? brands.filter((b) => b !== brand)
      : [...brands, brand]
    onChange({ brands: next, page: 1 })
  }

  const handleCategoryClick = (slug: string) => {
    onChange({ category: category === slug ? '' : slug, brands: [], page: 1 })
  }

  const handleClear = () => {
    onChange({ category: '', minPrice: '', maxPrice: '', brands: [], page: 1 })
  }

  return (
    <aside className="w-64 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-7 self-start sticky top-4">
      <Section title="Category">
        {catsLoading ? (
          <p className="text-sm text-gray-400">Loading…</p>
        ) : (
          <ul className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    category === cat.slug
                      ? 'bg-blue-600 text-white font-medium'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Price Range">
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value, page: 1 })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400 shrink-0">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value, page: 1 })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Section>

      {availableBrands.length > 0 && (
        <Section title="Brand">
          <ul className="flex flex-col gap-1.5 max-h-60 overflow-y-auto pr-1">
            {availableBrands.map((brand) => (
              <li key={brand}>
                <label className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="accent-blue-600 w-4 h-4 shrink-0"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <button
        onClick={handleClear}
        className="mt-auto px-4 py-2.5 rounded-lg border border-red-200 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors text-center font-medium"
      >
        Clear all filters
      </button>
    </aside>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h2>
      {children}
    </div>
  )
}
