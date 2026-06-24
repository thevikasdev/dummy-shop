export interface Category {
  slug: string
  name: string
  url: string
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  category: string
  thumbnail: string
  images: string[]
  sku?: string
  weight?: number
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  reviews?: Review[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Filters {
  category: string
  minPrice: string
  maxPrice: string
  brands: string[]
  page: number
}
