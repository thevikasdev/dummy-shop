import { useState, useEffect, useCallback } from 'react'
import { fetchAllProducts, fetchProductsByCategory } from '../api/products'
import type { Product, Filters } from '../types/product'

const PAGE_SIZE = 12

interface UseProductsResult {
  products: Product[]
  totalProducts: number
  totalPages: number
  uniqueBrands: string[]
  loading: boolean
  error: string | null
  retry: () => void
}

export function useProducts(filters: Filters, searchQuery = ''): UseProductsResult {
  const { category, minPrice, maxPrice, brands, page } = filters

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = category
        ? await fetchProductsByCategory(category)
        : await fetchAllProducts()
      setAllProducts(data.products)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { load() }, [load])

  const min = minPrice !== '' ? parseFloat(minPrice) : null
  const max = maxPrice !== '' ? parseFloat(maxPrice) : null
  const q = searchQuery.toLowerCase().trim()

  const filtered = allProducts.filter((p) => {
    if (q && !p.title.toLowerCase().includes(q) && !p.brand?.toLowerCase().includes(q)) return false
    if (min !== null && p.price < min) return false
    if (max !== null && p.price > max) return false
    if (brands.length > 0 && !brands.includes(p.brand ?? '')) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const uniqueBrands = [
    ...new Set(allProducts.map((p) => p.brand).filter((b): b is string => Boolean(b))),
  ].sort()

  return {
    products: paginated,
    totalProducts: filtered.length,
    totalPages,
    uniqueBrands,
    loading,
    error,
    retry: load,
  }
}
