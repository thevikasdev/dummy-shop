import ProductCard from './ProductCard'
import type { Product } from '../../types/product'

interface Props {
  products: Product[]
  searchParams: string
}

export default function ProductGrid({ products, searchParams }: Props) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <p className="text-5xl mb-4">🔍</p>
        <p className="font-semibold text-gray-500 text-base">No products match your filters</p>
        <p className="text-sm mt-1 text-gray-400">Try adjusting the filters on the left</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} searchParams={searchParams} />
      ))}
    </div>
  )
}
