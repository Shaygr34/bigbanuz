import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { galleryByLaneQuery } from "@/lib/sanity/queries";
import { urlFor, getBlurDataURL } from "@/lib/sanity/image";
import Hero from "@/components/sections/Hero";
import CtaSection from "@/components/sections/CtaSection";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { INSTAGRAM_URL } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "About Amit Banuz | Smile Amigo",
  description:
    "The story behind the lens. Amit Banuz — combat veteran turned surf and event photographer. Based in Israel, shooting worldwide.",
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
};

const LOCATIONS = [
  { name: "Philippines", description: "Siargao, Cloud 9 and beyond" },
  { name: "Sri Lanka", description: "Where the journey of clarity began" },
  { name: "Israel", description: "Home base — Mediterranean waves and events" },
  { name: "Australia", description: "Next destination — 2026" },
];

interface SanityImage {
  asset?: { _ref?: string };
}

interface GalleryDoc {
  _id: string;
  title: string;
  images?: Array<{
    image: SanityImage;
    alt: string;
  }>;
}

function getImageUrl(image?: SanityImage, width = 800): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(80).auto("format").url();
  } catch {
    return "";
  }
}

export default async function AboutPage() {
  let heroUrl = "";
  let heroBlur = "";

  try {
    const galleries = await client.fetch<GalleryDoc[]>(
      galleryByLaneQuery,
      { lane: "surf" },
      { next: { tags: ["sanity"] } }
    );
    const firstImage = galleries?.[0]?.images?.[0]?.image;
    heroUrl = getImageUrl(firstImage, 1920);
    if (firstImage?.asset?._ref) {
      heroBlur = await getBlurDataURL(firstImage);
    }
  } catch {
    // CMS not configured yet
  }

  return (
    <>
      <Hero
        imageUrl={heroUrl}
        imageAlt="Amit Banuz — Surf & Event Photographer"
        blurDataURL={heroBlur}
        headline="About Amit"
        subline="The story behind the lens"
      />

      {/* Story Section */}
      <section className="py-section">
        <div className="max-w-text mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-black mb-8">
              The Story
            </h2>
            <div className="space-y-6 text-body text-gray-mid leading-relaxed">
              <p>
                I&apos;m Amit Banuz — a photographer who found his calling through
                an unconventional path. After serving as a combat soldier in the
                Israeli military, I experienced a motorcycle accident that changed
                my perspective on life. During recovery, I picked up a camera and
                never put it down.
              </p>
              <p>
                A transformative trip to Sri Lanka brought clarity to what I wanted
                my life to be about: capturing authentic moments and the raw energy
                of the ocean. Since then, I&apos;ve been shooting surf and events
                across the Philippines, Sri Lanka, Israel, and soon Australia.
              </p>
              <p>
                My approach is personal. Whether I&apos;m in the water with surfers
                or documenting your event, I focus on the real moments — the
                energy, the emotion, the connections. No forced poses. No
                artificial setups. Just life as it happens, through my lens.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-section bg-gray-light">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-black text-center mb-12">
              Where I Shoot
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc, i) => (
              <ScrollReveal key={loc.name} delay={i * 100}>
                <div className="bg-white-pure rounded-lg p-6 shadow-card text-center">
                  <h3 className="text-h3 font-heading font-semibold text-black mb-2">
                    {loc.name}
                  </h3>
                  <p className="text-small text-gray-mid">
                    {loc.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-section">
        <div className="max-w-text mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-h2 font-heading font-bold text-black mb-8">
              My Approach
            </h2>
            <div className="space-y-6 text-body text-gray-mid leading-relaxed">
              <p>
                I shoot in-water for surf — getting as close to the action as
                possible. For events, I blend into the crowd to capture natural
                reactions and genuine moments. My editing style is clean and
                cinematic, letting the subject speak for itself.
              </p>
              <p>
                Every shoot is a personal connection. I want to understand your
                vision, your energy, and what makes your moment unique. That&apos;s
                what shows up in the final images.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaSection
        headline="Let's work together"
        whatsappLabel="Get in Touch"
        emailLabel="View Events"
        emailHref="/events"
        instagramLabel="Follow @bigbanuz"
        instagramHref={INSTAGRAM_URL}
      />
    </>
  );
}
