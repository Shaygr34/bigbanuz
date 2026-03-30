import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { client } from "@/lib/sanity/client";
import { storiesQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import StoryCard from "@/components/ui/StoryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SocialShowcase from "@/components/sections/SocialShowcase";
import SocialFeed from "@/components/sections/SocialFeed";

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

      {/* Instagram CTA + Live Feed */}
      <SocialShowcase
        title={t("socialTitle")}
        followLabel={t("allStories")}
      />
      <SocialFeed />

      {/* Story cards */}
      {storyEntries.length > 0 && (
        <section className="bg-sand py-section">
          <div className="mx-auto max-w-content px-4">
            <ScrollReveal>
              <h2 className="font-heading text-h2 font-bold text-ink mb-8 text-center">
                {t("fieldNotesTitle")}
              </h2>
            </ScrollReveal>
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
          </div>
        </section>
      )}
    </>
  );
}
