export default function HomeLoading() {
  return (
    <>
      {/* Split Gateway skeleton */}
      <div className="h-screen flex flex-col md:flex-row">
        <div className="flex-1 bg-sand-dark animate-pulse" />
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>

      {/* Video Reel skeleton */}
      <div className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-sand-dark animate-pulse rounded mx-auto mb-8" />
          <div className="aspect-video bg-sand-dark animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Featured Gallery skeleton */}
      <div className="py-section">
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-56 bg-sand-dark animate-pulse rounded mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-sand-dark animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* CTA skeleton */}
      <div className="py-section bg-sand-dark">
        <div className="max-w-content mx-auto px-4 text-center">
          <div className="h-8 w-72 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-6" />
          <div className="flex justify-center gap-4">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}
