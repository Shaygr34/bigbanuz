"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";

function MapPinIcon() {
  return (
    <svg
      className="w-6 h-6 text-ocean"
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
  const t = useTranslations("Locations");

  const LOCATIONS = [
    { nameKey: "philippines" as const },
    { nameKey: "sriLanka" as const },
    { nameKey: "israel" as const },
    { nameKey: "australia" as const, upcoming: true },
  ];

  return (
    <section className="py-12">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-h3 font-heading font-semibold text-black text-center mb-8">
            {t("title")}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory justify-center flex-wrap">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.nameKey}
                className="snap-center shrink-0 flex flex-col items-center gap-2 px-6 py-4 bg-sand-light rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-normal min-w-[140px]"
              >
                <MapPinIcon />
                <span className="text-small font-medium text-black">
                  {t(loc.nameKey)}
                </span>
                {loc.upcoming && (
                  <span className="text-caption text-ocean font-medium">
                    {t("comingSoon")}
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
