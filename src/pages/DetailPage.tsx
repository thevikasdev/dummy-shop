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
      .then((data) => {
        setProduct(data)
        setSelectedImage(0)
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const goBack = () => navigate(backSearch ? `/?${backSearch}` : '/')

  if (loading) return <div className="min-h-screen bg-gray-50"><Header /><Spinner /></div>

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-6">
          <ErrorMessage message={error ?? 'Product not found'} onRetry={goBack} />
        </div>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.thumbnail]
  const discountedPrice = product.price * (1 - (product.discountPercentage ?? 0) / 100)

  const details: [string, string][] = [
    ['Stock', product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'],
    ['SKU', product.sku ?? '—'],
    ['Weight', product.weight ? `${product.weight}g` : '—'],
    ['Warranty', product.warrantyInformation ?? '—'],
    ['Shipping', product.shippingInformation ?? '—'],
    ['Return', product.returnPolicy ?? '—'],
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to results
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-12 flex flex-col md:flex-row gap-10">
          {/* Image Gallery */}
          <div className="md:w-1/2 flex flex-col gap-3">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain p-6"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-blue-600' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 flex flex-col gap-5">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wide w-fit">
              {product.category}
            </span>

            <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>

            {product.brand && (
              <p className="text-sm text-gray-500">
                by <span className="font-medium text-gray-700">{product.brand}</span>
              </p>
            )}

            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-gray-400">
                ({product.reviews?.length ?? 0} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-blue-600">
                ${discountedPrice.toFixed(2)}
              </span>
              {(product.discountPercentage ?? 0) > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    -{product.discountPercentage?.toFixed(0)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-5">
              {details.map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <button className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors tracking-wide">
                Add to Cart
              </button>
              <button className="px-5 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-gray-400 hover:text-red-500 text-xl">
                ♡
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
