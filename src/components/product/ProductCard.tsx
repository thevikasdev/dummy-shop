import { useNavigate } from 'react-router-dom'
import StarRating from '../ui/StarRating'
import type { Product } from '../../types/product'

interface Props {
  product: Product
  searchParams: string
}

export default function ProductCard({ product, searchParams }: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/product/${product.id}?${searchParams}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col"
    >
      <div className="aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {product.brand && (
          <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </div>
  )
}
