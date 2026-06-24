import { useState, useEffect } from 'react'
import { fetchCategories } from '../api/products'
import type { Category } from '../types/product'

interface UseCategoriesResult {
  categories: Category[]
  loading: boolean
  error: string | null
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading, error }
}
