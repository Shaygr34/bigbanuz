const LOCATIONS = [
  { name: "Philippines", emoji: "🇵🇭" },
  { name: "Sri Lanka", emoji: "🇱🇰" },
  { name: "Israel", emoji: "🇮🇱" },
  { name: "Australia", emoji: "🇦🇺", upcoming: true },
];

export default function LocationsStrip() {
  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h3 font-heading font-semibold text-ocean-deep text-center mb-8">
          Locations
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory justify-center flex-wrap">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.name}
              className="snap-center shrink-0 flex flex-col items-center gap-2 px-6 py-4 bg-white-pure rounded-lg shadow-card min-w-[140px]"
            >
              <span className="text-3xl" aria-hidden="true">
                {loc.emoji}
              </span>
              <span className="text-small font-medium text-ocean-deep">
                {loc.name}
              </span>
              {loc.upcoming && (
                <span className="text-caption text-golden font-medium">
                  Coming Soon
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
