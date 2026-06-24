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
      className="bg-white rounded-xl border border-gray-100 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden p-5">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="px-4 pt-3 pb-4 flex flex-col gap-2">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1 leading-snug">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-gray-900">${product.price.toFixed(0)}</span>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </div>
  )
}
