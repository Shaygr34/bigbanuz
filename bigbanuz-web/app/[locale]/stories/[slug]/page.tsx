import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { client } from "@/lib/sanity/client";
import { storyBySlugQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface SanityImage {
  asset?: { _ref?: string };
}

interface Story {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImage;
  shortDescription?: string;
  body?: PortableTextBlock[] | string;
  publishedAt?: string;
  location?: string;
}

function getImageUrl(image?: SanityImage, width = 1200): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(85).auto("format").url();
  } catch {
    return "";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const story = await client.fetch<Story>(
      storyBySlugQuery,
      { slug },
      { next: { tags: ["sanity"] } }
    );
    if (!story) return {};

    const ogImage = story.image?.asset?._ref
      ? urlFor(story.image).width(1200).height(630).quality(80).auto("format").url()
      : undefined;

    return {
      title: `${story.title} | Smile Amigo`,
      description: story.shortDescription || `A story by Amit Banuz`,
      openGraph: {
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      },
      alternates: {
        languages: {
          en: `/en/stories/${slug}`,
          he: `/he/stories/${slug}`,
        },
      },
    };
  } catch {
    return {};
  }
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Stories");

  let story: Story | null = null;
  try {
    story = await client.fetch<Story>(
      storyBySlugQuery,
      { slug },
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // CMS not configured
  }

  if (!story) notFound();

  const heroUrl = getImageUrl(story.image, 1920);
  const heroBlur = story.image?.asset?._ref
    ? await getBlurDataURL(story.image)
    : "";

  const formattedDate = story.publishedAt
    ? new Date(story.publishedAt).toLocaleDateString(locale === "he" ? "he-IL" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* Hero Image */}
      {heroUrl && (
        <div className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={heroUrl}
            alt={story.title}
            fill
            className="object-cover"
            priority
            {...(heroBlur ? { placeholder: "blur" as const, blurDataURL: heroBlur } : {})}
          />
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
              <ScrollReveal>
                <h1 className="text-hero font-heading font-bold text-white mb-3">
                  {story.title}
                </h1>
                {(story.location || formattedDate) && (
                  <p className="text-body text-gray-300">
                    {[story.location, formattedDate].filter(Boolean).join(" · ")}
                  </p>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      )}

      {/* If no hero image, show text header */}
      {!heroUrl && (
        <section className="pt-32 pb-8">
          <div className="max-w-text mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h1 className="text-h1 font-heading font-bold text-black mb-3">
                {story.title}
              </h1>
              {(story.location || formattedDate) && (
                <p className="text-body text-ink-muted">
                  {[story.location, formattedDate].filter(Boolean).join(" · ")}
                </p>
              )}
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="py-section">
        <div className="max-w-text mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            {story.body ? (
              Array.isArray(story.body) ? (
                <div className="prose prose-lg max-w-none text-ink-muted">
                  <PortableText value={story.body} />
                </div>
              ) : (
                <div className="text-body text-ink-muted leading-relaxed whitespace-pre-line">
                  {story.body}
                </div>
              )
            ) : (
              <p className="text-body text-ink-muted italic">
                {t("fullStorySoon")}
              </p>
            )}
          </ScrollReveal>

          {/* Back link + CTA */}
          <ScrollReveal delay={100}>
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/stories"
                className="text-small font-semibold text-ink-muted hover:text-black transition-colors inline-flex items-center gap-1"
              >
                <span className="rtl:rotate-180">&larr;</span> {t("allStories")}
              </Link>
              <Button href="/contact" variant="primary" size="md">
                {t("workWithMe")}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
