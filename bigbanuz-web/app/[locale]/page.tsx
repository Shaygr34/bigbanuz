import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { homePageQuery, pageAboutQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import WorkGrid from "@/components/sections/WorkGrid";
import MiniAbout from "@/components/sections/MiniAbout";
import SocialShowcase from "@/components/sections/SocialShowcase";
import SocialFeed from "@/components/sections/SocialFeed";
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

interface AboutLocation {
  name: string;
  description?: string;
  status?: string;
}

interface AboutData {
  locations?: AboutLocation[];
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
  let aboutData: AboutData | null = null;

  try {
    [data, aboutData] = await Promise.all([
      client.fetch<HomePageData>(homePageQuery, { locale }, { next: { tags: ["sanity"] } }),
      client.fetch<AboutData>(pageAboutQuery, { locale }, { next: { tags: ["sanity"] } }),
    ]);
  } catch {
    // CMS not configured yet — render with fallback
  }

  // Flatten gallery images from featured galleries
  const galleryEntries: Array<{
    url: string;
    alt: string;
    blurDataURL?: string;
    source: SanityImage;
  }> = [];

  if (data?.featuredGallery) {
    for (const gallery of data.featuredGallery) {
      if (gallery.images) {
        for (const img of gallery.images) {
          const url = img.image?.asset?._ref
            ? urlFor(img.image).width(800).quality(85).auto("format").url()
            : "";
          if (url) {
            galleryEntries.push({
              url,
              alt: img.alt || "Photography by Amit Banuz",
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
      entry.blurDataURL = await getBlurDataURL(entry.source);
    })
  );

  const galleryImages = galleryEntries.map(({ url, alt, blurDataURL }) => ({
    url,
    alt,
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
        locations={aboutData?.locations}
      />
      <SocialShowcase
        title={t("instagramTitle")}
        followLabel={t("instagramFollow")}
      />
      <SocialFeed />
      <SimpleCTA
        title={t("ctaTitle")}
        buttonLabel={t("ctaButton")}
        secondaryLabel={t("ctaSecondary")}
        secondaryHref="/contact"
      />
    </>
  );
}
