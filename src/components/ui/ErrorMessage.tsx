interface Props {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <p className="text-red-600 font-medium mb-1">Something went wrong</p>
      <p className="text-red-400 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}
