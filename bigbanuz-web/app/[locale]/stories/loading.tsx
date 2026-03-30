export default function StoriesLoading() {
  return (
    <>
      {/* Header skeleton */}
      <section className="pt-32 pb-8">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-10 w-40 bg-sand-dark animate-pulse rounded mx-auto mb-4" />
          <div className="h-5 w-80 bg-sand-dark animate-pulse rounded mx-auto" />
        </div>
      </section>

      {/* Social grid skeleton */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-56 bg-sand-dark animate-pulse rounded" />
            <div className="h-4 w-24 bg-sand-dark animate-pulse rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-sand-dark animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>

      {/* Field Notes skeleton */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-40 bg-sand-dark animate-pulse rounded mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-sand-light shadow-card">
                <div className="aspect-[16/9] bg-sand-dark animate-pulse" />
                <div className="p-5">
                  <div className="h-3 w-28 bg-sand-dark animate-pulse rounded mb-3" />
                  <div className="h-6 w-full bg-sand-dark animate-pulse rounded mb-2" />
                  <div className="h-4 w-full bg-sand-dark animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-sand-dark animate-pulse rounded mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
