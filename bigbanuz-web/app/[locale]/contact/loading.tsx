export default function ContactLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-accent-soft via-white to-white-pure">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-sand-dark animate-pulse mx-auto mb-6" />
          <div className="h-10 w-72 bg-sand-dark animate-pulse rounded mx-auto mb-4" />
          <div className="h-5 w-96 max-w-full bg-sand-dark animate-pulse rounded mx-auto mb-3" />
          <div className="h-4 w-56 bg-sand-dark animate-pulse rounded mx-auto" />
        </div>
      </section>

      {/* Contact cards skeleton */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl p-8 bg-sand-dark animate-pulse h-48" />
            ))}
          </div>

          {/* Form skeleton */}
          <div className="max-w-text mx-auto">
            <div className="bg-gradient-to-b from-accent-soft/40 to-transparent rounded-2xl p-8 sm:p-12">
              <div className="w-20 h-1 bg-sand-dark rounded-full mx-auto mb-8" />
              <div className="h-8 w-48 bg-sand-dark animate-pulse rounded mx-auto mb-8" />
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="h-4 w-20 bg-sand-dark animate-pulse rounded mb-2" />
                    <div className="h-12 w-full bg-sand-dark animate-pulse rounded-lg" />
                  </div>
                ))}
                <div className="h-12 w-full bg-sand-dark animate-pulse rounded-full mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
