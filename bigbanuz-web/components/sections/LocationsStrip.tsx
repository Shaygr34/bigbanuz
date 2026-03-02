import ScrollReveal from "@/components/ui/ScrollReveal";

const LOCATIONS = [
  { name: "Philippines" },
  { name: "Sri Lanka" },
  { name: "Israel" },
  { name: "Australia", upcoming: true },
];

function MapPinIcon() {
  return (
    <svg
      className="w-6 h-6 text-accent"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

export default function LocationsStrip() {
  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-h3 font-heading font-semibold text-black text-center mb-8">
            Locations
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory justify-center flex-wrap">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.name}
                className="snap-center shrink-0 flex flex-col items-center gap-2 px-6 py-4 bg-white-pure rounded-lg shadow-card min-w-[140px]"
              >
                <MapPinIcon />
                <span className="text-small font-medium text-black">
                  {loc.name}
                </span>
                {loc.upcoming && (
                  <span className="text-caption text-accent font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
