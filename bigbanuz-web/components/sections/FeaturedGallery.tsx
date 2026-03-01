import GalleryGrid from "@/components/ui/GalleryGrid";
import type { GalleryImage } from "@/components/ui/GalleryGrid";
import Link from "next/link";

interface FeaturedGalleryProps {
  images: GalleryImage[];
}

export default function FeaturedGallery({ images }: FeaturedGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-section">
      <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-heading font-bold text-ocean-deep text-center mb-8">
          Portfolio
        </h2>
        <GalleryGrid images={images} columns={3} gap="tight" />
        <div className="mt-8 text-center">
          <Link
            href="/surf"
            className="text-ocean-mid hover:text-golden transition-colors duration-normal font-medium"
          >
            View Full Portfolio &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
