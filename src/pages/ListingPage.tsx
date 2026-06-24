import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import FilterSidebar from '../components/filters/FilterSidebar'
import ProductGrid from '../components/product/ProductGrid'
import ProductSkeleton from '../components/product/ProductSkeleton'
import Pagination from '../components/ui/Pagination'
import ErrorMessage from '../components/ui/ErrorMessage'
import Header from '../components/layout/Header'
import type { Filters } from '../types/product'

type FilterUpdate = Partial<Filters>

function parseFilters(searchParams: URLSearchParams): Filters {
  return {
    category: searchParams.get('category') ?? '',
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    brands: searchParams.getAll('brand'),
    page: parseInt(searchParams.get('page') ?? '1', 10),
  }
}

export default function ListingPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const debouncedSearch = useDebounce(searchQuery, 400)
  const filters = parseFilters(searchParams)

  const updateFilters = (updates: FilterUpdate) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([key, val]) => {
        if (key === 'brands') {
          next.delete('brand')
          ;(val as string[]).forEach((b) => next.append('brand', b))
        } else if (val === '' || val == null) {
          next.delete(key)
        } else {
          next.set(key, String(val))
        }
      })
      return next
    })
  }

  const { products, totalProducts, totalPages, uniqueBrands, loading, error, retry } =
    useProducts(filters, debouncedSearch)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      <div className="max-w-screen-xl mx-auto px-5 py-5 flex gap-5 items-start">

        {/* Sidebar — slides in/out with transition */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden shrink-0 ${
            sidebarOpen ? 'w-52 xl:w-56 opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <FilterSidebar
            filters={{ ...filters, availableBrands: uniqueBrands }}
            onChange={updateFilters}
          />
        </div>

        {/* Main content */}
        <main
          className="flex-1 min-w-0 flex flex-col"
          style={{ minHeight: 'calc(100vh - 56px - 40px)' }}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm3 5a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 0 1 1-1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1-1-1z" />
              </svg>
              <h2 className="text-base font-semibold text-gray-800">Products</h2>
            </div>
            {!loading && (
              <span className="text-sm text-gray-400">
                {totalProducts} product{totalProducts !== 1 ? 's' : ''} found
              </span>
            )}
          </div>

          {error && <ErrorMessage message={error} onRetry={retry} />}
          {loading && !error && <ProductSkeleton />}
          {!loading && !error && (
            <ProductGrid products={products} searchParams={searchParams.toString()} />
          )}

          {/* Pagination pinned to bottom */}
          <div className="mt-auto pt-2">
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onChange={(p) => updateFilters({ page: p })}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
