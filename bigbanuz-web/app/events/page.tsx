import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { packagesQuery, galleryByLaneQuery, testimonialsByLaneQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import PackagesSection from "@/components/sections/PackagesSection";
import TrustSection from "@/components/sections/TrustSection";
import GalleryGrid from "@/components/ui/GalleryGrid";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { GalleryImage } from "@/components/ui/GalleryGrid";

export const metadata: Metadata = {
  title: "Event Photography & Magnets | Smile Amigo",
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

  // Build gallery images, collecting source refs for blur
  const galleryEntries: { galleryImage: GalleryImage; source: SanityImage }[] = [];
  for (const gallery of galleries) {
    if (gallery.images) {
      for (const img of gallery.images) {
        const url = getImageUrl(img.image);
        if (url) {
          galleryEntries.push({
            galleryImage: {
              url,
              alt: img.alt || "Event photography",
              caption: img.caption,
              location: img.location,
            },
            source: img.image,
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

  // Use first gallery image as hero if available
  const heroSource = galleries[0]?.images?.[0]?.image;
  const eventsHeroUrl = galleryEntries.length > 0 ? getImageUrl(heroSource, 1920) : "";

  // Generate blur placeholders in parallel (hero + gallery)
  const [heroBlur] = await Promise.all([
    heroSource?.asset?._ref ? getBlurDataURL(heroSource) : Promise.resolve(""),
    ...galleryEntries.map(async (entry) => {
      entry.galleryImage.blurDataURL = await getBlurDataURL(entry.source);
    }),
  ]);

  const galleryImages = galleryEntries.map((e) => e.galleryImage);

  return (
    <>
      <Hero
        imageUrl={eventsHeroUrl}
        imageAlt="Event photography by Amit Banuz"
        blurDataURL={heroBlur}
        headline="Event Photography & Magnets"
        subline="Premium photos and instant magnet prints for your event"
        ctas={[
          { label: "Check Availability", href: "#packages" },
        ]}
      />

      <PackagesSection packages={displayPackages} />

      <TrustSection />

      {galleryImages.length > 0 && (
        <section className="py-section">
          <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-h2 font-heading font-bold text-black text-center mb-8">
                Event Portfolio
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <GalleryGrid images={galleryImages} columns={3} gap="tight" />
            </ScrollReveal>
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
