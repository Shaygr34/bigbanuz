export default function SurfLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="relative h-[70vh] bg-gray-light animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="h-10 w-64 bg-gray-200 rounded mb-4" />
          <div className="h-5 w-80 bg-gray-200 rounded mb-8" />
          <div className="h-12 w-40 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Filter tabs skeleton */}
      <div className="py-section">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-3 mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-28 bg-gray-light animate-pulse rounded-full" />
            ))}
          </div>

          {/* Gallery skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-light animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Locations skeleton */}
      <div className="py-section bg-gray-light">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-8" />
          <div className="flex justify-center gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 w-24 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
