import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import WorkGrid from "@/components/sections/WorkGrid";
import MiniAbout from "@/components/sections/MiniAbout";
import SocialShowcase from "@/components/sections/SocialShowcase";
import SimpleCTA from "@/components/sections/SimpleCTA";

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
  heroVideo?: string;
  heroHeadline?: string;
  heroSubline?: string;
  miniAboutImage?: SanityImage;
  miniAboutText?: string;
  featuredGallery?: Array<{
    _id: string;
    title: string;
    tags?: string[];
    images?: SanityGalleryImage[];
  }>;
  bottomCtaText?: string;
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

  try {
    data = await client.fetch<HomePageData>(
      homePageQuery,
      { locale },
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // CMS not configured yet — render with fallback
  }

  // Flatten gallery images from featured galleries
  const galleryEntries: Array<{
    url: string;
    alt: string;
    width: number;
    height: number;
    blurDataURL?: string;
    source: SanityImage;
  }> = [];

  if (data?.featuredGallery) {
    for (const gallery of data.featuredGallery) {
      if (gallery.images) {
        for (const img of gallery.images) {
          const asset = img.image?.asset as Record<string, unknown> | undefined;
          let url = "";
          try {
            url = asset ? urlFor(img.image).width(1200).quality(85).auto("format").url() : "";
          } catch {
            continue;
          }
          if (url) {
            const meta = asset?.metadata as { dimensions?: { width?: number; height?: number } } | undefined;
            galleryEntries.push({
              url,
              alt: img.alt || "Photography by Amit Banuz",
              width: meta?.dimensions?.width || 800,
              height: meta?.dimensions?.height || 600,
              source: img.image,
            });
          }
        }
      }
    }
  }

  // Get blur data URLs in parallel
  await Promise.all(
    galleryEntries.map(async (entry) => {
      try {
        entry.blurDataURL = await getBlurDataURL(entry.source);
      } catch {
        // skip blur
      }
    })
  );

  const galleryImages = galleryEntries.map(({ url, alt, width, height, blurDataURL }) => ({
    url,
    alt,
    width,
    height,
    blurDataURL,
  }));

  // MiniAbout image
  const miniAboutImageUrl = data?.miniAboutImage?.asset?._ref
    ? urlFor(data.miniAboutImage).width(512).quality(85).auto("format").url()
    : "";

  return (
    <>
      <Hero
        heroImage={data?.heroImage}
        heroVideo={data?.heroVideo}
        name={t("name")}
        subtitle={t("subtitle")}
      />
      <WorkGrid
        images={galleryImages}
        title={t("workTitle")}
        viewAllLabel={t("workViewAll")}
        viewAllHref="/work"
      />
      <MiniAbout
        imageUrl={miniAboutImageUrl}
        text={data?.miniAboutText || ""}
        moreLabel={t("miniAboutMore")}
        moreHref="/about"
      />
      <SocialShowcase
        title={t("instagramTitle")}
        followLabel={t("instagramFollow")}
      />
      <SimpleCTA
        title={t("ctaTitle")}
        buttonLabel={t("ctaButton")}
        secondaryLabel={t("ctaSecondary")}
        secondaryHref="/contact"
      />
    </>
  );
}
