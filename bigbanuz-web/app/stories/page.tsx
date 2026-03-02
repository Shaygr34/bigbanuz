import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { storiesQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import StoryCard from "@/components/ui/StoryCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Stories | Smile Amigo",
  description:
    "Stories from the field — behind-the-scenes tales, travel adventures, and the moments that make every shoot unique. By Amit Banuz.",
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

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

export default async function StoriesPage() {
  let stories: Story[] = [];

  try {
    stories = await client.fetch<Story[]>(
      storiesQuery,
      {},
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // CMS not configured yet
  }

  // Build story entries with blur
  const storyEntries = stories.map((story) => ({
    story,
    imageUrl: getImageUrl(story.image),
    source: story.image,
  }));

  await Promise.all(
    storyEntries.map(async (entry) => {
      if (entry.source?.asset?._ref) {
        (entry as { blurDataURL?: string }).blurDataURL = await getBlurDataURL(entry.source);
      }
    })
  );

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-h1 font-heading font-bold text-black mb-4">
              Stories
            </h1>
            <p className="text-body text-gray-mid max-w-text mx-auto">
              Behind-the-scenes tales, travel adventures, and the moments that
              make every shoot unique.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          {storyEntries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {storyEntries.map((entry, i) => (
                <ScrollReveal key={entry.story._id} delay={i * 100}>
                  <StoryCard
                    title={entry.story.title}
                    slug={entry.story.slug.current}
                    imageUrl={entry.imageUrl}
                    blurDataURL={(entry as { blurDataURL?: string }).blurDataURL}
                    shortDescription={entry.story.shortDescription}
                    publishedAt={entry.story.publishedAt}
                    location={entry.story.location}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="text-center py-16">
                <p className="text-body text-gray-mid">
                  Stories coming soon. Stay tuned!
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
