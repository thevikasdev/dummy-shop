export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200" />
          <div className="p-4 flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-5 bg-gray-200 rounded w-1/3 mt-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
