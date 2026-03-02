import { NextResponse } from "next/server";
import { writeClient, client } from "@/lib/sanity/client";

// Idempotent seed route — creates initial CMS documents if they don't exist.
// Only works when SANITY_API_TOKEN is set (i.e. on Vercel).
// Safe to call multiple times; skips documents that already exist.

export async function GET() {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { error: "SANITY_API_TOKEN not configured" },
      { status: 500 }
    );
  }

  const results: Record<string, string> = {};

  try {
    // 1. Site Settings (singleton)
    const existingSettings = await client.fetch(
      `*[_type == "siteSettings"][0]._id`
    );
    if (!existingSettings) {
      await writeClient.create({
        _type: "siteSettings",
        siteName: "Smile Amigo",
        siteDescription:
          "Professional surf and event photography by Amit Banuz. Capturing moments in motion — from ocean waves to unforgettable events.",
        socialLinks: {
          instagram: "https://www.instagram.com/bigbanuz/",
          whatsapp: "972548194361",
          email: "iambigbanuz@gmail.com",
        },
        ctaWhatsappMessage:
          "Hey Amit! I saw your website and I'd love to chat about a shoot.",
        seoDefaults: {
          title: "Smile Amigo — Surf & Event Photography by Amit Banuz",
          description:
            "Professional surf and event photography by Amit Banuz. Premium event coverage with instant magnet prints, and in-water surf photography across the globe.",
        },
      });
      results.siteSettings = "created";
    } else {
      results.siteSettings = "already exists";
    }

    // 2. Homepage (singleton)
    const existingHome = await client.fetch(
      `*[_type == "pageHome"][0]._id`
    );
    if (!existingHome) {
      await writeClient.create({
        _type: "pageHome",
        heroHeadline: "Amit Banuz — Surf & Event Photographer",
        heroSubline:
          "Capturing moments in motion — from ocean waves to unforgettable events.",
        eventsPreview: {
          headline: "Event Photography & Magnets",
          bullets: [
            "Premium event coverage",
            "Instant magnet prints on-site",
            "Fast delivery of edited highlights",
          ],
          ctaText: "Explore Events",
        },
        surfPreview: {
          headline: "Surf Photography",
          bullets: [
            "In-water action photography",
            "Philippines · Sri Lanka · Israel · Australia",
            "Brand collaborations & editorial",
          ],
          ctaText: "Explore Surf",
        },
        bottomCtaText: "Ready to work together?",
      });
      results.pageHome = "created";
    } else {
      results.pageHome = "already exists";
    }

    // 3. Packages (3 tiers)
    const existingPackages = await client.fetch(
      `count(*[_type == "packages"])`
    );
    if (existingPackages === 0) {
      await writeClient.create({
        _type: "packages",
        title: "BASIC",
        slug: { _type: "slug", current: "basic" },
        priceILS: 1500,
        priceDisplay: "₪1,500",
        inclusions: [
          "Stills only",
          "Up to 4 hours",
          "Edited highlights",
          "Full-res digital gallery",
        ],
        ctaText: "Book This Package",
        featured: false,
        sortOrder: 1,
      });
      await writeClient.create({
        _type: "packages",
        title: "PLUS",
        slug: { _type: "slug", current: "plus" },
        priceILS: 2500,
        priceDisplay: "₪2,500",
        inclusions: [
          "Stills + magnets service",
          "Event coverage",
          "Magnet prints during event",
          "Full-res digital gallery",
        ],
        ctaText: "Book This Package",
        featured: true,
        sortOrder: 2,
      });
      await writeClient.create({
        _type: "packages",
        title: "PREMIUM",
        slug: { _type: "slug", current: "premium" },
        priceILS: 4500,
        priceDisplay: "₪4,500",
        inclusions: [
          "Stills + magnets + video",
          "Full event coverage",
          "Highlights film",
          "Optional album add-on",
          "Full-res digital gallery",
        ],
        ctaText: "Book This Package",
        featured: false,
        sortOrder: 3,
      });
      results.packages = "created 3 packages";
    } else {
      results.packages = `${existingPackages} already exist`;
    }

    // 4. Gallery placeholders (events + surf lanes)
    const existingGalleries = await client.fetch(
      `count(*[_type == "gallery"])`
    );
    if (existingGalleries === 0) {
      await writeClient.create({
        _type: "gallery",
        title: "Events Portfolio",
        slug: { _type: "slug", current: "events-portfolio" },
        lane: "events",
        category: "events",
        images: [],
        sortOrder: 1,
      });
      await writeClient.create({
        _type: "gallery",
        title: "Surf Action",
        slug: { _type: "slug", current: "surf-action" },
        lane: "surf",
        category: "action",
        images: [],
        sortOrder: 1,
      });
      await writeClient.create({
        _type: "gallery",
        title: "Surf Lifestyle",
        slug: { _type: "slug", current: "surf-lifestyle" },
        lane: "surf",
        category: "lifestyle",
        images: [],
        sortOrder: 2,
      });
      await writeClient.create({
        _type: "gallery",
        title: "Destinations",
        slug: { _type: "slug", current: "destinations" },
        lane: "surf",
        category: "destinations",
        images: [],
        sortOrder: 3,
      });
      results.galleries = "created 4 gallery docs (events + 3 surf categories)";
    } else {
      results.galleries = `${existingGalleries} already exist`;
    }

    // 5. Sample testimonials
    const existingTestimonials = await client.fetch(
      `count(*[_type == "testimonial"])`
    );
    if (existingTestimonials === 0) {
      await writeClient.create({
        _type: "testimonial",
        quote:
          "Amit captured our event perfectly. The magnet prints were a huge hit with our guests!",
        name: "Sample Client",
        context: "Event Photography",
        lane: "events",
        featured: true,
        sortOrder: 1,
      });
      await writeClient.create({
        _type: "testimonial",
        quote:
          "The in-water shots were incredible. Amit really knows how to capture the energy of the ocean.",
        name: "Sample Surfer",
        context: "Surf Photography, Siargao",
        lane: "surf",
        featured: true,
        sortOrder: 2,
      });
      results.testimonials = "created 2 sample testimonials";
    } else {
      results.testimonials = `${existingTestimonials} already exist`;
    }

    // 6. Sample story
    const existingStories = await client.fetch(
      `count(*[_type == "story"])`
    );
    if (existingStories === 0) {
      await writeClient.create({
        _type: "story",
        title: "Chasing Dawn in Siargao",
        slug: { _type: "slug", current: "chasing-dawn-siargao" },
        shortDescription:
          "A week of 5am wake-ups, glassy barrels, and the magic that happens when the light is just right.",
        body: "There's something about Siargao at dawn that you can't find anywhere else. The palm trees are still silhouettes, the ocean is glass, and the only sound is the distant rumble of Cloud 9.\n\nI spent a week here shooting before sunrise — paddling out in the dark with just a headlamp and my housing, waiting for that first golden ray to hit the water.\n\nThe surfers here are different too. They're not rushing. There's a respect for the ocean that shows in every turn, every duck dive. That energy translates directly into the images — you can feel the calm intensity.\n\nOne morning, a local kid paddled up next to me and asked if I could take his photo. He'd been surfing since he could walk, he said. I shot him for twenty minutes as the sun came up behind Cloud 9. Those are some of my favorite frames from the entire trip.\n\nSiargao taught me that the best shots come when you stop chasing them. You show up, you wait, and you let the moment find you.",
        publishedAt: new Date("2025-01-15").toISOString(),
        location: "Siargao, Philippines",
      });
      results.stories = "created 1 sample story";
    } else {
      results.stories = `${existingStories} already exist`;
    }

    return NextResponse.json({
      success: true,
      message:
        "CMS seeded! Go to /studio to edit content and upload images.",
      results,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Seed failed", details: String(err) },
      { status: 500 }
    );
  }
}
