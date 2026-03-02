export default function EventsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="relative h-[70vh] bg-gray-light animate-pulse">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="h-10 w-80 bg-gray-200 rounded mb-4" />
          <div className="h-5 w-64 bg-gray-200 rounded mb-8" />
          <div className="h-12 w-44 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Packages skeleton */}
      <div className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-light animate-pulse rounded mx-auto mb-4" />
          <div className="h-5 w-72 bg-gray-light animate-pulse rounded mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-gray-light animate-pulse p-6 lg:p-8 h-96" />
            ))}
          </div>
        </div>
      </div>

      {/* Gallery skeleton */}
      <div className="py-section">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-light animate-pulse rounded mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-light animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
