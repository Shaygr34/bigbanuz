import GalleryGrid from "@/components/ui/GalleryGrid";
import type { GalleryImage } from "@/components/ui/GalleryGrid";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface FeaturedGalleryProps {
  images: GalleryImage[];
}

export default function FeaturedGallery({ images }: FeaturedGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-section">
      <div className="max-w-wide mx-auto px-2 sm:px-4">
        <ScrollReveal>
          <h2 className="text-h2 font-heading font-bold text-black text-center mb-2">
            Selected Work
          </h2>
          <p className="text-body text-gray-mid text-center max-w-text mx-auto mb-8">
            A collection of recent surf and event photography from around the world.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <GalleryGrid images={images} columns={3} gap="tight" />
        </ScrollReveal>
        <div className="mt-8 text-center">
          <Button href="/surf" variant="secondary" size="lg">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
