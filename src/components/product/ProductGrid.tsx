import ProductCard from './ProductCard'
import type { Product } from '../../types/product'

interface Props {
  products: Product[]
  searchParams: string
}

export default function ProductGrid({ products, searchParams }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-medium text-gray-500">No products match your filters</p>
        <p className="text-sm mt-1">Try adjusting the filters on the left</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} searchParams={searchParams} />
      ))}
    </div>
  )
}
