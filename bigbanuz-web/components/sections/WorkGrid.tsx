import Image from "next/image";
import Link from "next/link";

interface WorkGridImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

interface WorkGridProps {
  images: WorkGridImage[];
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
}

export default function WorkGrid({ images, title, viewAllLabel, viewAllHref }: WorkGridProps) {
  if (images.length === 0) return null;

  const displayImages = images.slice(0, 8);

  return (
    <section className="bg-sand py-section">
      <div className="mx-auto max-w-content px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-h2 font-bold text-ink">{title}</h2>
          <Link
            href={viewAllHref}
            className="text-small font-medium text-ocean hover:text-ocean-dark transition-colors"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="columns-2 md:columns-3 gap-3">
          {displayImages.map((img, i) => (
            <div
              key={i}
              className="mb-3 overflow-hidden rounded-md break-inside-avoid"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={img.url}
                alt={img.alt}
                width={img.width || 800}
                height={img.height || 600}
                quality={85}
                className="w-full h-auto object-cover transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
                sizes="(max-width: 768px) 50vw, 33vw"
                placeholder={img.blurDataURL ? "blur" : "empty"}
                blurDataURL={img.blurDataURL}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
