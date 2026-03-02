export default function StoriesLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="pt-32 pb-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 w-40 bg-gray-light animate-pulse rounded mx-auto mb-4" />
          <div className="h-5 w-80 bg-gray-light animate-pulse rounded mx-auto" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white-pure shadow-card">
                <div className="aspect-[16/9] bg-gray-light animate-pulse" />
                <div className="p-5">
                  <div className="h-3 w-28 bg-gray-light animate-pulse rounded mb-3" />
                  <div className="h-6 w-full bg-gray-light animate-pulse rounded mb-2" />
                  <div className="h-4 w-full bg-gray-light animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-gray-light animate-pulse rounded mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
