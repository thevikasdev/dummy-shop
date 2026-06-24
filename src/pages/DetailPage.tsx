import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { fetchProductById } from '../api/products'
import StarRating from '../components/ui/StarRating'
import Spinner from '../components/ui/Spinner'
import ErrorMessage from '../components/ui/ErrorMessage'
import Header from '../components/layout/Header'
import type { Product } from '../types/product'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)

  const backSearch = new URLSearchParams(location.search).toString()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    fetchProductById(id)
      .then((data) => { setProduct(data); setSelectedImage(0) })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const goBack = () => navigate(backSearch ? `/?${backSearch}` : '/')

  if (loading) return <div className="min-h-screen bg-gray-100"><Header sidebarOpen={false} onToggleSidebar={() => {}} /><Spinner /></div>

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header sidebarOpen={false} onToggleSidebar={() => {}} />
        <div className="max-w-5xl mx-auto px-6 py-6">
          <ErrorMessage message={error ?? 'Product not found'} onRetry={goBack} />
        </div>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const discountedPrice = product.price * (1 - (product.discountPercentage ?? 0) / 100)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header sidebarOpen={false} onToggleSidebar={() => {}} />

      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Back button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="md:w-80 shrink-0">
            <div className="bg-white rounded-xl overflow-hidden aspect-square flex items-center justify-center p-6">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors bg-white ${
                      i === selectedImage ? 'border-blue-600' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">${discountedPrice.toFixed(0)}</span>
              <StarRating rating={product.rating} />
              {(product.discountPercentage ?? 0) > 0 && (
                <span className="text-sm text-gray-400 line-through">${product.price.toFixed(0)}</span>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
              {product.brand && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Brand:</span> {product.brand}
                </p>
              )}
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-base font-bold text-gray-900 mb-2">Description</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.reviews && product.reviews.length > 0 && (
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-base font-bold text-gray-900 mb-3">Reviews</h2>
                <div className="flex flex-col gap-4">
                  {product.reviews.map((review, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-semibold text-gray-800">{review.reviewerName}</span>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
