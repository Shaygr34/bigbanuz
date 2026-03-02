import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { galleryByLaneQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import SurfGallery from "@/components/sections/SurfGallery";
import type { SurfGalleryImage } from "@/components/sections/SurfGallery";
import LocationsStrip from "@/components/sections/LocationsStrip";
import CollabForm from "@/components/ui/CollabForm";
import CtaSection from "@/components/sections/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { INSTAGRAM_URL } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Surf Photography | Smile Amigo",
  description:
    "In-water surf photography by Amit Banuz. Shooting across Philippines, Sri Lanka, Israel, and Australia. Available for brand collaborations and editorial projects.",
};

interface SanityImage {
  asset?: { _ref?: string };
}

interface GalleryDoc {
  _id: string;
  title: string;
  category?: string;
  images?: Array<{
    image: SanityImage;
    alt: string;
    caption?: string;
    location?: string;
  }>;
}

function getImageUrl(image?: SanityImage, width = 800): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(80).auto("format").url();
  } catch {
    return "";
  }
}

export default async function SurfPage() {
  let galleries: GalleryDoc[] = [];

  try {
    galleries = await client.fetch<GalleryDoc[]>(
      galleryByLaneQuery,
      { lane: "surf" },
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // CMS not configured yet
  }

  // Build gallery images with category info, collecting source refs for blur
  const galleryEntries: { image: SurfGalleryImage; source: SanityImage }[] = [];
  for (const gallery of galleries) {
    if (gallery.images) {
      for (const img of gallery.images) {
        const url = getImageUrl(img.image);
        if (url) {
          galleryEntries.push({
            image: {
              url,
              alt: img.alt || "Surf photography",
              caption: img.caption,
              location: img.location,
              category: gallery.category || "action",
            },
            source: img.image,
          });
        }
      }
    }
  }

  // Use first gallery image as hero if available
  const heroSource = galleries[0]?.images?.[0]?.image;
  const surfHeroUrl = galleryEntries.length > 0 ? getImageUrl(heroSource, 1920) : "";

  // Generate blur placeholders in parallel (hero + gallery)
  const [heroBlur] = await Promise.all([
    heroSource?.asset?._ref ? getBlurDataURL(heroSource) : Promise.resolve(""),
    ...galleryEntries.map(async (entry) => {
      entry.image.blurDataURL = await getBlurDataURL(entry.source);
    }),
  ]);

  const galleryImages = galleryEntries.map((e) => e.image);

  return (
    <>
      <Hero
        imageUrl={surfHeroUrl}
        imageAlt="In-water surf photography by Amit Banuz"
        blurDataURL={heroBlur}
        headline="Surf Photography"
        subline="Philippines · Sri Lanka · Israel · Australia"
        ctas={[
          { label: "Work With Me", href: "#work-with-me" },
        ]}
      />

      <SurfGallery images={galleryImages} />

      <LocationsStrip />

      {/* Work With Me Section */}
      <section id="work-with-me" className="py-section bg-gray-light">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-black text-center mb-4">
              Work With Me
            </h2>
            <p className="text-body text-gray-mid text-center max-w-text mx-auto mb-12">
              Looking for a surf photographer for your brand, publication, or
              personal project? Let&apos;s create something amazing together.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <CollabForm />
          </ScrollReveal>
        </div>
      </section>

      <CtaSection
        headline="See more on Instagram"
        instagramLabel="Follow @bigbanuz"
        instagramHref={INSTAGRAM_URL}
        whatsappLabel="WhatsApp Me"
      />
    </>
  );
}
