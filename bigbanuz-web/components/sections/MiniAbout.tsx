import Image from "next/image";
import Link from "next/link";

const LOCATION_NAMES_HE: Record<string, string> = {
  "Philippines": "פיליפינים",
  "Sri Lanka": "סרי לנקה",
  "Israel": "ישראל",
  "Australia": "אוסטרליה",
};

interface MiniAboutProps {
  imageUrl: string;
  text: string;
  moreLabel: string;
  moreHref: string;
  locations?: Array<{ name: string; status?: string }>;
  locale?: string;
}

export default function MiniAbout({ imageUrl, text, moreLabel, moreHref, locations, locale }: MiniAboutProps) {
  return (
    <section className="bg-sand-dark py-section">
      <div className="mx-auto max-w-content px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Photo */}
          {imageUrl && (
            <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full">
              <Image
                src={imageUrl}
                alt="Amit Banuz"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          )}

          {/* Text + locations */}
          <div className={`flex-1 text-center ${imageUrl ? "md:text-start" : ""}`}>
            {text && (
              <p className="text-body text-ink-muted leading-relaxed max-w-text">{text}</p>
            )}

            {/* Locations strip */}
            {locations && locations.length > 0 && (
              <div className={`mt-6 flex flex-wrap gap-2 justify-center ${imageUrl ? "md:justify-start" : ""}`}>
                {locations.map((loc) => (
                  <span
                    key={loc.name}
                    className="inline-flex items-center gap-1 rounded-full bg-sand px-3 py-1 text-small text-ink-muted"
                  >
                    {locale === "he" ? (LOCATION_NAMES_HE[loc.name] || loc.name) : loc.name}
                    {loc.status === "coming-soon" && (
                      <span className="text-caption text-golden">&#10022;</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            <Link
              href={moreHref}
              className="mt-6 inline-block text-small font-medium text-ocean hover:text-ocean-dark transition-colors"
            >
              {moreLabel} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
