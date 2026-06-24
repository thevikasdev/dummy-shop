import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
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
    useProducts(filters)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8 items-start min-h-[calc(100vh-72px)]">
        <FilterSidebar
          filters={{ ...filters, availableBrands: uniqueBrands }}
          onChange={updateFilters}
        />

        <main className="flex-1 min-w-0 flex flex-col" style={{ minHeight: 'calc(100vh - 72px - 64px)' }}>
          <p className="text-sm text-gray-500 mb-6">
            {loading ? 'Loading products…' : `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found`}
          </p>

          {error && <ErrorMessage message={error} onRetry={retry} />}

          {loading && !error && <ProductSkeleton />}

          {!loading && !error && (
            <>
              <ProductGrid products={products} searchParams={searchParams.toString()} />
            </>
          )}

          <div className="mt-auto">
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
