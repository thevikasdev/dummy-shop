import type { Product, ProductsResponse, Category } from '../types/product'

const BASE = 'https://dummyjson.com'

const PRODUCT_FIELDS = 'id,title,price,rating,thumbnail,brand,category'

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export function fetchAllProducts(): Promise<ProductsResponse> {
  return request<ProductsResponse>(
    `${BASE}/products?limit=200&skip=0&select=${PRODUCT_FIELDS}`
  )
}

export function fetchProductsByCategory(category: string): Promise<ProductsResponse> {
  return request<ProductsResponse>(
    `${BASE}/products/category/${encodeURIComponent(category)}?limit=200&select=${PRODUCT_FIELDS}`
  )
}

export function fetchCategories(): Promise<Category[]> {
  return request<Category[]>(`${BASE}/products/categories`)
}

export function fetchProductById(id: string | number): Promise<Product> {
  return request<Product>(`${BASE}/products/${id}`)
}
