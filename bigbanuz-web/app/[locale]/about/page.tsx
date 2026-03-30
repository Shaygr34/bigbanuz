import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { client } from "@/lib/sanity/client";
import { pageAboutQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import SimpleCTA from "@/components/sections/SimpleCTA";
import ScrollReveal from "@/components/ui/ScrollReveal";

const LOCATION_NAMES_HE: Record<string, string> = {
  "Philippines": "פיליפינים",
  "Sri Lanka": "סרי לנקה",
  "Israel": "ישראל",
  "Australia": "אוסטרליה",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      languages: { en: "/en/about", he: "/he/about" },
    },
  };
}

interface SanityImage {
  asset?: { _ref?: string };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface AboutData {
  headline?: string;
  subline?: string;
  bio?: string;
  approachTitle?: string;
  approach?: string;
  locations?: Array<{
    name: string;
    description?: string;
    status?: string;
  }>;
  heroImage?: SanityImage;
}

function getImageUrl(image?: SanityImage, width = 1920): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(85).auto("format").url();
  } catch {
    return "";
  }
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  let aboutData: AboutData | null = null;
  let heroUrl = "";
  let heroBlur = "";

  try {
    aboutData = await client.fetch<AboutData | null>(
      pageAboutQuery,
      { locale },
      { next: { tags: ["sanity"] } }
    );

    heroUrl = getImageUrl(aboutData?.heroImage);
    if (aboutData?.heroImage?.asset?._ref) {
      heroBlur = await getBlurDataURL(aboutData.heroImage);
    }
  } catch {
    // CMS not configured yet
  }

  // CMS-first with i18n fallback
  const headline = aboutData?.headline || t("heroHeadline");
  const subline = aboutData?.subline || t("heroSubline");
  const bio = aboutData?.bio || `${t("storyP1")} ${t("storyP2")} ${t("storyP3")}`;
  const approachTitle = aboutData?.approachTitle || t("approachTitle");
  const approach = aboutData?.approach || `${t("approachP1")} ${t("approachP2")}`;

  const locations = aboutData?.locations?.length
    ? aboutData.locations
    : [
        { name: t("locationPhilippines") },
        { name: t("locationSriLanka") },
        { name: t("locationIsrael") },
        { name: t("locationAustralia"), status: "coming-soon" },
      ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
        {heroUrl ? (
          <Image
            src={heroUrl}
            alt={t("heroImageAlt")}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            {...(heroBlur ? { placeholder: "blur" as const, blurDataURL: heroBlur } : {})}
          />
        ) : (
          <div className="absolute inset-0 bg-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 text-center px-4">
          <h1 className="font-heading text-hero font-bold text-white">{headline}</h1>
          <p className="mt-3 text-h3 font-light text-white/80">{subline}</p>
        </div>
      </section>

      {/* Bio Section — single paragraph */}
      <section className="bg-sand py-section">
        <div className="mx-auto max-w-text px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-body text-ink-muted leading-relaxed">{bio}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Locations — pill style */}
      <section className="bg-sand-dark py-section">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-h2 font-bold text-ink mb-8">
              {t("locationsTitle")}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {locations.map((loc) => (
                <span
                  key={loc.name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-sand px-4 py-2 text-body text-ink-muted"
                >
                  {locale === "he" ? (LOCATION_NAMES_HE[loc.name] || loc.name) : loc.name}
                  {loc.status === "coming-soon" && (
                    <span className="text-caption text-golden">&#10022;</span>
                  )}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Approach — single paragraph */}
      <section className="bg-sand py-section">
        <div className="mx-auto max-w-text px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="font-heading text-h2 font-bold text-ink mb-6">
              {approachTitle}
            </h2>
            <p className="text-body text-ink-muted leading-relaxed">{approach}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <SimpleCTA
        title={t("ctaHeadline")}
        buttonLabel={t("ctaGetInTouch")}
        secondaryLabel={t("ctaFollowBigbanuz")}
        secondaryHref="https://www.instagram.com/bigbanuz/"
      />
    </>
  );
}
