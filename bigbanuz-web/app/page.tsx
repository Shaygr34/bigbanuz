import { client } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import LaneSplit from "@/components/sections/LaneSplit";
import FeaturedGallery from "@/components/sections/FeaturedGallery";
import CtaSection from "@/components/sections/CtaSection";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

interface SanityImage {
  asset?: { _ref?: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface SanityGalleryImage {
  image: SanityImage;
  alt: string;
  caption?: string;
  location?: string;
  featured?: boolean;
}

interface HomePageData {
  heroImage?: SanityImage;
  heroHeadline?: string;
  heroSubline?: string;
  eventsPreview?: {
    image?: SanityImage;
    headline?: string;
    bullets?: string[];
    ctaText?: string;
  };
  surfPreview?: {
    image?: SanityImage;
    headline?: string;
    bullets?: string[];
    ctaText?: string;
  };
  featuredGallery?: Array<{
    _id: string;
    title: string;
    images?: SanityGalleryImage[];
  }>;
  bottomCtaText?: string;
}

function getSanityImageUrl(image?: SanityImage, width = 1920): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(85).auto("format").url();
  } catch {
    return "";
  }
}

export default async function HomePage() {
  let data: HomePageData | null = null;

  try {
    data = await client.fetch<HomePageData>(homePageQuery, {}, { next: { tags: ["sanity"] } });
  } catch {
    // CMS not configured yet — use fallback content
  }

  const heroUrl = getSanityImageUrl(data?.heroImage);
  const headline = data?.heroHeadline || "Amit Banuz — Surf & Event Photographer";
  const subline = data?.heroSubline || "Capturing moments in motion — from ocean waves to unforgettable events.";

  // Build gallery images from CMS
  const galleryImages: GalleryImage[] = [];
  if (data?.featuredGallery) {
    for (const gallery of data.featuredGallery) {
      if (gallery.images) {
        for (const img of gallery.images) {
          const url = getSanityImageUrl(img.image, 800);
          if (url) {
            galleryImages.push({
              url,
              alt: img.alt || "Photography by Amit Banuz",
              caption: img.caption,
              location: img.location,
            });
          }
        }
      }
    }
  }

  const eventsCard = {
    imageUrl: getSanityImageUrl(data?.eventsPreview?.image, 800),
    imageAlt: "Event Photography",
    headline: data?.eventsPreview?.headline || "Event Photography & Magnets",
    bullets: data?.eventsPreview?.bullets || [
      "Premium event coverage",
      "Instant magnet prints on-site",
      "Fast delivery of edited highlights",
    ],
    ctaText: data?.eventsPreview?.ctaText || "Explore Events",
    ctaHref: "/events",
  };

  const surfCard = {
    imageUrl: getSanityImageUrl(data?.surfPreview?.image, 800),
    imageAlt: "Surf Photography",
    headline: data?.surfPreview?.headline || "Surf Photography",
    bullets: data?.surfPreview?.bullets || [
      "In-water action photography",
      "Philippines · Sri Lanka · Israel · Australia",
      "Brand collaborations & editorial",
    ],
    ctaText: data?.surfPreview?.ctaText || "Explore Surf",
    ctaHref: "/surf",
  };

  return (
    <>
      <Hero
        imageUrl={heroUrl}
        imageAlt="Surf photography by Amit Banuz"
        headline={headline}
        subline={subline}
        ctas={[
          { label: "Events & Magnets", href: "/events" },
          { label: "Surf Photography", href: "/surf", variant: "secondary" },
        ]}
      />

      <LaneSplit events={eventsCard} surf={surfCard} />

      {galleryImages.length > 0 && (
        <FeaturedGallery images={galleryImages.slice(0, 9)} />
      )}

      <CtaSection
        headline={data?.bottomCtaText || "Ready to work together?"}
        whatsappLabel="WhatsApp Me"
        emailLabel="Send Email"
        emailHref="/contact"
      />
    </>
  );
}
