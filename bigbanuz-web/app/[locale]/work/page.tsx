import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { client } from "@/lib/sanity/client";
import { allGalleriesQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import WorkGallery from "@/components/sections/WorkGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      languages: { en: "/en/work", he: "/he/work" },
    },
  };
}

interface SanityImageAsset {
  _id?: string;
  url?: string;
  metadata?: {
    dimensions?: {
      width?: number;
      height?: number;
      aspectRatio?: number;
    };
  };
}

interface SanityImage {
  asset?: SanityImageAsset | { _ref?: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface GalleryImage {
  image: SanityImage;
  alt?: string;
  caption?: string;
  location?: string;
  featured?: boolean;
}

interface GalleryDoc {
  _id: string;
  title: string;
  tags?: string[];
  images?: GalleryImage[];
}

export interface FlatImage {
  url: string;
  alt: string;
  tags: string[];
  width: number;
  height: number;
  blurDataURL?: string;
}

function getImageUrl(image?: SanityImage, width = 1200): string {
  if (!image?.asset) return "";
  try {
    return urlFor(image).width(width).quality(85).auto("format").url();
  } catch {
    return "";
  }
}

function getImageDimensions(image?: SanityImage): { width: number; height: number } {
  const asset = image?.asset as SanityImageAsset | undefined;
  const w = asset?.metadata?.dimensions?.width;
  const h = asset?.metadata?.dimensions?.height;
  if (w && h) return { width: w, height: h };
  return { width: 800, height: 600 }; // fallback
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Work");

  let galleries: GalleryDoc[] = [];

  try {
    galleries = await client.fetch<GalleryDoc[]>(
      allGalleriesQuery,
      { locale },
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // CMS not configured yet
  }

  // Flatten all images from all galleries, attaching parent gallery tags + real dimensions
  const flatImagesRaw = galleries.flatMap((gallery) =>
    (gallery.images || [])
      .map((img) => {
        const url = getImageUrl(img.image);
        if (!url) return null;
        const dims = getImageDimensions(img.image);
        return {
          url,
          alt: img.alt || gallery.title || "Photo by Amit Banuz",
          tags: gallery.tags || [],
          width: dims.width,
          height: dims.height,
          image: img.image,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  );

  // Generate blur placeholders in parallel
  const flatImages: FlatImage[] = await Promise.all(
    flatImagesRaw.map(async ({ image, ...rest }) => {
      let blurDataURL = "";
      try {
        blurDataURL = await getBlurDataURL(image);
      } catch {
        // skip blur for this image
      }
      return { ...rest, blurDataURL };
    })
  );

  // Build tag labels from i18n
  const tagLabels: Record<string, string> = {
    all: t("tagAll"),
    events: t("tagEvents"),
    magnets: t("tagMagnets"),
    corporate: t("tagCorporate"),
    private: t("tagPrivate"),
    outdoor: t("tagOutdoor"),
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-8 bg-sand">
        <div className="mx-auto max-w-content px-4 text-center">
          <h1 className="font-heading text-h1 font-bold text-ink">
            {t("title")}
          </h1>
        </div>
      </section>

      <Suspense>
        <WorkGallery
          images={flatImages}
          tagLabels={tagLabels}
          emptyTagMessage={t("emptyTag")}
        />
      </Suspense>
    </>
  );
}
