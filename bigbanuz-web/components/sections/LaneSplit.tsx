import Image from "next/image";
import Button from "@/components/ui/Button";

interface LaneCardData {
  imageUrl?: string;
  imageAlt?: string;
  headline: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
}

interface LaneSplitProps {
  events: LaneCardData;
  surf: LaneCardData;
}

function LaneCard({ data }: { data: LaneCardData }) {
  return (
    <div className="group relative bg-white-pure rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-normal">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {data.imageUrl ? (
          <Image
            src={data.imageUrl}
            alt={data.imageAlt || data.headline}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="w-full h-full bg-sky-light flex items-center justify-center">
            <span className="text-text-muted text-h3">{data.headline}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h2 className="text-h3 font-heading font-bold text-ocean-deep">
          {data.headline}
        </h2>
        <ul className="mt-4 space-y-2">
          {data.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-body text-text-secondary"
            >
              <span className="text-golden mt-1.5 text-xs" aria-hidden="true">
                &#9679;
              </span>
              {bullet}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button href={data.ctaHref} variant="primary">
            {data.ctaText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LaneSplit({ events, surf }: LaneSplitProps) {
  return (
    <section className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <LaneCard data={events} />
          <LaneCard data={surf} />
        </div>
      </div>
    </section>
  );
}
