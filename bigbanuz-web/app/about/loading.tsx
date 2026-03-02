export default function AboutLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="relative h-[70vh] bg-gray-light animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="h-10 w-56 bg-gray-200 rounded mb-4" />
          <div className="h-5 w-48 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Story skeleton */}
      <div className="py-section">
        <div className="max-w-text mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-36 bg-gray-light animate-pulse rounded mb-8" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-light animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-light animate-pulse rounded" />
            <div className="h-4 w-5/6 bg-gray-light animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-light animate-pulse rounded" />
            <div className="h-4 w-4/5 bg-gray-light animate-pulse rounded" />
            <div className="h-8 w-0" />
            <div className="h-4 w-full bg-gray-light animate-pulse rounded" />
            <div className="h-4 w-full bg-gray-light animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-gray-light animate-pulse rounded" />
          </div>
        </div>
      </div>

      {/* Locations skeleton */}
      <div className="py-section bg-gray-light">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white-pure rounded-lg p-6 h-28 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
