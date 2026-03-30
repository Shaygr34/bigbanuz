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

interface SanityImage {
  asset?: { _ref?: string };
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
  lane?: string;
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
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(80).auto("format").url();
  } catch {
    return "";
  }
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

  // Flatten all images from all galleries, attaching parent gallery tags + blur placeholders
  const flatImagesRaw = galleries.flatMap((gallery) =>
    (gallery.images || [])
      .map((img) => {
        const url = getImageUrl(img.image);
        if (!url) return null;
        return {
          url,
          alt: img.alt || gallery.title || "Photo by Amit Banuz",
          tags: gallery.tags || [],
          width: 800,
          height: 600,
          image: img.image, // keep ref for blur generation
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  );

  // Generate blur placeholders in parallel
  const flatImages: FlatImage[] = await Promise.all(
    flatImagesRaw.map(async ({ image, ...rest }) => {
      let blurDataURL = "";
      if (image?.asset?._ref) {
        blurDataURL = await getBlurDataURL(image);
      }
      return { ...rest, blurDataURL };
    })
  );

  // Build tag labels from i18n
  const tagLabels: Record<string, string> = {
    all: t("tagAll"),
    ocean: t("tagOcean"),
    "golden-hour": t("tagGoldenHour"),
    people: t("tagPeople"),
    energy: t("tagEnergy"),
    travel: t("tagTravel"),
    events: t("tagEvents"),
    surf: t("tagSurf"),
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
