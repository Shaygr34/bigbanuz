import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { homePageQuery, pageAboutQuery, videoReelsQuery, brandsQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import VideoReelGrid from "@/components/sections/VideoReelGrid";
import WorkGrid from "@/components/sections/WorkGrid";
import MiniAbout from "@/components/sections/MiniAbout";
import BrandsBar from "@/components/sections/BrandsBar";
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

interface VideoReelData {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnail: SanityImage;
  tag?: string;
}

interface BrandData {
  _id: string;
  name: string;
  logo: SanityImage;
  url?: string;
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
  let videoReels: VideoReelData[] = [];
  let brands: BrandData[] = [];

  try {
    [data, aboutData, videoReels, brands] = await Promise.all([
      client.fetch<HomePageData>(homePageQuery, { locale }, { next: { tags: ["sanity"] } }),
      client.fetch<AboutData>(pageAboutQuery, { locale }, { next: { tags: ["sanity"] } }),
      client.fetch<VideoReelData[]>(videoReelsQuery, {}, { next: { tags: ["sanity"] } }),
      client.fetch<BrandData[]>(brandsQuery, {}, { next: { tags: ["sanity"] } }),
    ]);
  } catch {
    // CMS not configured yet — render with fallback
  }

  // Process video reels — generate thumbnail URLs + blur
  const processedReels = await Promise.all(
    (videoReels || []).map(async (reel) => {
      const thumbnailUrl = reel.thumbnail?.asset?._ref
        ? urlFor(reel.thumbnail).width(600).height(1067).quality(80).auto("format").url()
        : "";
      const thumbnailBlur = reel.thumbnail ? await getBlurDataURL(reel.thumbnail) : undefined;

      return {
        _id: reel._id,
        title: reel.title,
        videoUrl: reel.videoUrl || "",
        thumbnailUrl,
        thumbnailBlur,
        tag: reel.tag,
      };
    })
  );

  // Process brands — generate logo URLs
  const processedBrands = (brands || []).map((brand) => ({
    _id: brand._id,
    name: brand.name,
    logoUrl: brand.logo?.asset?._ref
      ? urlFor(brand.logo).height(80).auto("format").url()
      : "",
    url: brand.url,
  }));

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
            ? urlFor(img.image).width(1200).quality(85).auto("format").url()
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
      <VideoReelGrid
        reels={processedReels}
        title={t("videoTitle")}
        subtitle={t("videoSubtitle")}
      />
      <WorkGrid
        images={galleryImages}
        title={t("workTitle")}
        viewAllLabel={t("workViewAll")}
        viewAllHref="/work"
      />
      <BrandsBar
        brands={processedBrands}
        title={t("brandsTitle")}
      />
      <MiniAbout
        imageUrl={miniAboutImageUrl}
        text={data?.miniAboutText || ""}
        moreLabel={t("miniAboutMore")}
        moreHref="/about"
        locations={aboutData?.locations}
        locale={locale}
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
