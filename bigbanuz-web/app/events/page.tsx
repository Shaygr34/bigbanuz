import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { packagesQuery, galleryByLaneQuery, testimonialsByLaneQuery } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import PackagesSection from "@/components/sections/PackagesSection";
import TrustSection from "@/components/sections/TrustSection";
import GalleryGrid from "@/components/ui/GalleryGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

export const metadata: Metadata = {
  title: "Event Photography & Magnets | bigbanuz",
  description:
    "Premium event photography and instant magnet prints by Amit Banuz. Three packages to fit your event. Fast delivery, personal attention, stunning results.",
};

interface SanityImage {
  asset?: { _ref?: string };
}

interface Package {
  _id: string;
  title: string;
  priceDisplay: string;
  priceILS: number;
  inclusions: string[];
  ctaText?: string;
  featured?: boolean;
  sortOrder: number;
}

interface GalleryDoc {
  _id: string;
  title: string;
  images?: Array<{
    image: SanityImage;
    alt: string;
    caption?: string;
    location?: string;
  }>;
}

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  context?: string;
  avatar?: SanityImage;
}

// Fallback packages if CMS is not yet configured
const FALLBACK_PACKAGES: Package[] = [
  {
    _id: "basic",
    title: "BASIC",
    priceDisplay: "₪1,500",
    priceILS: 1500,
    inclusions: [
      "Stills only",
      "Up to 4 hours",
      "Edited highlights",
      "Full-res digital gallery",
    ],
    ctaText: "Book This Package",
    featured: false,
    sortOrder: 1,
  },
  {
    _id: "plus",
    title: "PLUS",
    priceDisplay: "₪2,500",
    priceILS: 2500,
    inclusions: [
      "Stills + magnets service",
      "Event coverage",
      "Magnet prints during event",
      "Full-res digital gallery",
    ],
    ctaText: "Book This Package",
    featured: true,
    sortOrder: 2,
  },
  {
    _id: "premium",
    title: "PREMIUM",
    priceDisplay: "₪4,500",
    priceILS: 4500,
    inclusions: [
      "Stills + magnets + video",
      "Full event coverage",
      "Highlights film",
      "Optional album add-on",
      "Full-res digital gallery",
    ],
    ctaText: "Book This Package",
    featured: false,
    sortOrder: 3,
  },
];

function getImageUrl(image?: SanityImage, width = 800): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(80).auto("format").url();
  } catch {
    return "";
  }
}

export default async function EventsPage() {
  let packages: Package[] = [];
  let galleries: GalleryDoc[] = [];
  let testimonials: Testimonial[] = [];

  try {
    [packages, galleries, testimonials] = await Promise.all([
      client.fetch<Package[]>(packagesQuery, {}, { next: { tags: ["sanity"] } }),
      client.fetch<GalleryDoc[]>(galleryByLaneQuery, { lane: "events" }, { next: { tags: ["sanity"] } }),
      client.fetch<Testimonial[]>(testimonialsByLaneQuery, { lane: "events" }, { next: { tags: ["sanity"] } }),
    ]);
  } catch {
    // CMS not configured yet
  }

  const displayPackages = packages.length > 0 ? packages : FALLBACK_PACKAGES;

  // Build gallery images
  const galleryImages: GalleryImage[] = [];
  for (const gallery of galleries) {
    if (gallery.images) {
      for (const img of gallery.images) {
        const url = getImageUrl(img.image);
        if (url) {
          galleryImages.push({
            url,
            alt: img.alt || "Event photography",
            caption: img.caption,
            location: img.location,
          });
        }
      }
    }
  }

  // Build testimonials
  const displayTestimonials = testimonials.map((t) => ({
    _id: t._id,
    quote: t.quote,
    name: t.name,
    context: t.context,
    avatarUrl: getImageUrl(t.avatar, 80),
  }));

  return (
    <>
      <Hero
        imageUrl=""
        imageAlt="Event photography by Amit Banuz"
        headline="Event Photography & Magnets"
        subline="Premium photos and instant magnet prints for your event"
        ctas={[
          { label: "Check Availability", href: "https://wa.me/" },
        ]}
      />

      <PackagesSection packages={displayPackages} />

      <TrustSection />

      {galleryImages.length > 0 && (
        <section className="py-section">
          <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-heading font-bold text-ocean-deep text-center mb-8">
              Event Portfolio
            </h2>
            <GalleryGrid images={galleryImages} columns={3} gap="tight" />
          </div>
        </section>
      )}

      <TestimonialsSection testimonials={displayTestimonials} />

      <CtaSection
        headline="Let's make your event unforgettable"
        whatsappLabel="WhatsApp Me"
        emailLabel="Send Email"
        emailHref="/contact"
      />
    </>
  );
}
