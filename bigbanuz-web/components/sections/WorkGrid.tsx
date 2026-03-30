import Image from "next/image";
import Link from "next/link";

interface WorkGridImage {
  url: string;
  alt: string;
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-gallery">
          {images.slice(0, 9).map((img, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                quality={85}
                className="object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:brightness-105"
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
