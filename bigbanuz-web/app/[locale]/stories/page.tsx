import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { storiesQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import StoryCard from "@/components/ui/StoryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
    },
    alternates: {
      languages: { en: "/en/stories", he: "/he/stories" },
    },
  };
}

interface SanityImage {
  asset?: { _ref?: string };
}

interface Story {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImage;
  shortDescription?: string;
  publishedAt?: string;
  location?: string;
}

function getImageUrl(image?: SanityImage, width = 800): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(80).auto("format").url();
  } catch {
    return "";
  }
}

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Stories");

  let stories: Story[] = [];

  try {
    // NOTE: Stories use document-level localization (language field).
    // If a story doesn't have `language` set in Sanity, it appears in ALL locales.
    // To restrict a story to one language, set its `language` field in the CMS.
    stories = await client.fetch<Story[]>(
      storiesQuery,
      { locale },
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // CMS not configured yet
  }

  // Resolve story images + blur placeholders
  const storyEntries = await Promise.all(
    stories.map(async (story) => {
      const imageUrl = getImageUrl(story.image);
      let blurDataURL = "";
      if (story.image?.asset?._ref) {
        blurDataURL = await getBlurDataURL(story.image);
      }
      return { story, imageUrl, blurDataURL };
    })
  );

  return (
    <>
      {/* Page Header */}
      <section className="bg-sand pt-32 pb-8">
        <div className="mx-auto max-w-content px-4 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-h1 font-bold text-ink mb-4">
              {t("title")}
            </h1>
            <p className="text-body text-ink-muted mx-auto max-w-text">
              {t("subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story cards */}
      <section className="bg-sand pb-section">
        <div className="mx-auto max-w-content px-4">
          {storyEntries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {storyEntries.map((entry, i) => (
                <ScrollReveal key={entry.story._id} delay={i * 100}>
                  <StoryCard
                    title={entry.story.title}
                    slug={entry.story.slug.current}
                    imageUrl={entry.imageUrl}
                    blurDataURL={entry.blurDataURL}
                    shortDescription={entry.story.shortDescription}
                    publishedAt={entry.story.publishedAt}
                    location={entry.story.location}
                    locale={locale}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="mx-auto max-w-text rounded-lg bg-sand-dark py-20 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ocean/10">
                  <svg className="h-7 w-7 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-h3 font-heading font-semibold text-ink mb-2">
                  {t("empty")}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
