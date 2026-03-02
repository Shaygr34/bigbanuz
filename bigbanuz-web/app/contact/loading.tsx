export default function ContactLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="pt-32 pb-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-light animate-pulse mx-auto mb-6" />
          <div className="h-10 w-80 bg-gray-light animate-pulse rounded mx-auto mb-4" />
          <div className="h-5 w-96 bg-gray-light animate-pulse rounded mx-auto mb-3" />
          <div className="h-4 w-56 bg-gray-light animate-pulse rounded mx-auto" />
        </div>
      </section>

      {/* Contact cards skeleton */}
      <section className="pb-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl p-8 bg-gray-light animate-pulse h-52" />
            ))}
          </div>

          {/* Form skeleton */}
          <div className="max-w-text mx-auto">
            <div className="rounded-2xl p-8 sm:p-12 bg-gray-light/40">
              <div className="w-20 h-1 bg-gray-light animate-pulse rounded-full mx-auto mb-8" />
              <div className="h-8 w-48 bg-gray-light animate-pulse rounded mx-auto mb-8" />
              <div className="space-y-6">
                <div className="h-12 w-full bg-gray-light animate-pulse rounded-lg" />
                <div className="h-12 w-full bg-gray-light animate-pulse rounded-lg" />
                <div className="h-32 w-full bg-gray-light animate-pulse rounded-lg" />
                <div className="h-12 w-40 bg-gray-light animate-pulse rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
