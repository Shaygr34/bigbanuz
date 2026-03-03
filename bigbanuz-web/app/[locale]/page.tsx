import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { homePageQuery, galleryByLaneQuery, testimonialsQuery, featuresQuery } from "@/lib/sanity/queries";
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

interface Feature {
  _id: string;
  title: string;
  author: string;
  date?: string;
  url: string;
  image?: SanityImage;
  imageUrl?: string;
  excerpt?: string;
}

function getSanityImageUrl(image?: SanityImage, width = 1920): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(85).auto("format").url();
  } catch {
    return "";
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  let data: HomePageData | null = null;
  let eventsGalleries: GalleryDoc[] = [];
  let surfGalleries: GalleryDoc[] = [];
  let testimonials: Testimonial[] = [];
  let features: Feature[] = [];

  try {
    [data, eventsGalleries, surfGalleries, testimonials, features] = await Promise.all([
      client.fetch<HomePageData>(homePageQuery, { locale }, { next: { tags: ["sanity"] } }),
      client.fetch<GalleryDoc[]>(galleryByLaneQuery, { lane: "events", locale }, { next: { tags: ["sanity"] } }),
      client.fetch<GalleryDoc[]>(galleryByLaneQuery, { lane: "surf", locale }, { next: { tags: ["sanity"] } }),
      client.fetch<Testimonial[]>(testimonialsQuery, { locale }, { next: { tags: ["sanity"] } }),
      client.fetch<Feature[]>(featuresQuery, { locale }, { next: { tags: ["sanity"] } }),
    ]);
  } catch {
    // CMS not configured yet
  }

  const eventsImageUrl =
    getSanityImageUrl(data?.eventsPreview?.image) ||
    getSanityImageUrl(eventsGalleries[0]?.images?.[0]?.image);

  const surfImageUrl =
    getSanityImageUrl(data?.surfPreview?.image) ||
    getSanityImageUrl(surfGalleries[0]?.images?.[0]?.image);

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

  await Promise.all(
    galleryEntries.map(async (entry) => {
      entry.galleryImage.blurDataURL = await getBlurDataURL(entry.source);
    })
  );

  const galleryImages = galleryEntries.map((e) => e.galleryImage);

  const displayFeatures = features.map((f) => ({
    title: f.title,
    author: f.author,
    date: f.date || "",
    url: f.url,
    image: getSanityImageUrl(f.image, 800) || f.imageUrl || "",
    excerpt: f.excerpt,
  }));

  const displayTestimonials = testimonials.map((tm) => ({
    _id: tm._id,
    quote: tm.quote,
    name: tm.name,
    context: tm.context,
    avatarUrl: getSanityImageUrl(tm.avatar, 80),
  }));

  return (
    <>
      <SplitGateway
        eventsImage={eventsImageUrl}
        surfImage={surfImageUrl}
        eventsHeadline={t("eventsHeadline")}
        eventsSubline={t("eventsSubline")}
        eventsCta={t("eventsCta")}
        surfHeadline={t("surfHeadline")}
        surfSubline={t("surfSubline")}
        surfCta={t("surfCta")}
      />

      <VideoReel
        title={t("videoTitle")}
        subtitle={t("videoSubtitle")}
      />

      {galleryImages.length > 0 && (
        <FeaturedGallery
          images={galleryImages.slice(0, 9)}
          title={t("galleryTitle")}
          subtitle={t("gallerySubtitle")}
          viewAllLabel={t("galleryViewAll")}
        />
      )}

      <PressSection
        features={displayFeatures}
        title={t("pressTitle")}
        readArticleLabel={t("pressReadArticle")}
      />

      <TestimonialsSection
        testimonials={displayTestimonials}
        title={t("testimonialsTitle")}
      />

      <CtaSection
        headline={data?.bottomCtaText || t("ctaDefault")}
        whatsappLabel={t("whatsappMe")}
        instagramLabel={t("followBigbanuz")}
        instagramHref={INSTAGRAM_URL}
      />
    </>
  );
}
