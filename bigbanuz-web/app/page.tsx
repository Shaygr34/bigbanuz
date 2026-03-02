import { client } from "@/lib/sanity/client";
import { homePageQuery, galleryByLaneQuery, testimonialsQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import SplitGateway from "@/components/sections/SplitGateway";
import VideoReel from "@/components/sections/VideoReel";
import FeaturedGallery from "@/components/sections/FeaturedGallery";
import PressSection from "@/components/sections/PressSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import type { GalleryImage } from "@/components/ui/GalleryGrid";
import { INSTAGRAM_URL } from "@/lib/utils/constants";

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
  eventsPreview?: {
    image?: SanityImage;
  };
  surfPreview?: {
    image?: SanityImage;
  };
  featuredGallery?: Array<{
    _id: string;
    title: string;
    images?: SanityGalleryImage[];
  }>;
  bottomCtaText?: string;
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
  let eventsGalleries: GalleryDoc[] = [];
  let surfGalleries: GalleryDoc[] = [];
  let testimonials: Testimonial[] = [];

  try {
    [data, eventsGalleries, surfGalleries, testimonials] = await Promise.all([
      client.fetch<HomePageData>(homePageQuery, {}, { next: { tags: ["sanity"] } }),
      client.fetch<GalleryDoc[]>(galleryByLaneQuery, { lane: "events" }, { next: { tags: ["sanity"] } }),
      client.fetch<GalleryDoc[]>(galleryByLaneQuery, { lane: "surf" }, { next: { tags: ["sanity"] } }),
      client.fetch<Testimonial[]>(testimonialsQuery, {}, { next: { tags: ["sanity"] } }),
    ]);
  } catch {
    // CMS not configured yet
  }

  // Split-screen images: prefer CMS preview images, fall back to first gallery image
  const eventsImageUrl =
    getSanityImageUrl(data?.eventsPreview?.image) ||
    getSanityImageUrl(eventsGalleries[0]?.images?.[0]?.image);

  const surfImageUrl =
    getSanityImageUrl(data?.surfPreview?.image) ||
    getSanityImageUrl(surfGalleries[0]?.images?.[0]?.image);

  // Build featured gallery images from CMS, collecting source refs for blur generation
  const galleryEntries: { galleryImage: GalleryImage; source: SanityImage }[] = [];
  if (data?.featuredGallery) {
    for (const gallery of data.featuredGallery) {
      if (gallery.images) {
        for (const img of gallery.images) {
          const url = getSanityImageUrl(img.image, 800);
          if (url) {
            galleryEntries.push({
              galleryImage: {
                url,
                alt: img.alt || "Photography by Amit Banuz",
                caption: img.caption,
                location: img.location,
              },
              source: img.image,
            });
          }
        }
      }
    }
  }

  // Generate blur placeholders in parallel
  await Promise.all(
    galleryEntries.map(async (entry) => {
      entry.galleryImage.blurDataURL = await getBlurDataURL(entry.source);
    })
  );

  const galleryImages = galleryEntries.map((e) => e.galleryImage);

  const displayTestimonials = testimonials.map((t) => ({
    _id: t._id,
    quote: t.quote,
    name: t.name,
    context: t.context,
    avatarUrl: getSanityImageUrl(t.avatar, 80),
  }));

  return (
    <>
      <SplitGateway
        eventsImage={eventsImageUrl}
        surfImage={surfImageUrl}
      />

      <VideoReel />

      {galleryImages.length > 0 && (
        <FeaturedGallery images={galleryImages.slice(0, 9)} />
      )}

      <PressSection />

      <TestimonialsSection testimonials={displayTestimonials} />

      <CtaSection
        headline={data?.bottomCtaText || "Let's create something amazing"}
        whatsappLabel="WhatsApp Me"
        instagramLabel="Follow @bigbanuz"
        instagramHref={INSTAGRAM_URL}
      />
    </>
  );
}
