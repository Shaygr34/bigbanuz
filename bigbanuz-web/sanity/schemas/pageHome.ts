import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageHome",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "Amit Banuz — Surf & Event Photographer",
    }),
    defineField({
      name: "heroSubline",
      title: "Hero Subline",
      type: "string",
      initialValue: "Capturing moments in motion — from ocean waves to unforgettable events.",
    }),
    defineField({
      name: "eventsPreview",
      title: "Events Preview Card",
      hidden: true,
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Preview Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Event Photography & Magnets",
        }),
        defineField({
          name: "bullets",
          title: "Highlight Bullets",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "ctaText",
          title: "CTA Text",
          type: "string",
          initialValue: "Explore Events",
        }),
      ],
    }),
    defineField({
      name: "surfPreview",
      title: "Surf Preview Card",
      hidden: true,
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Preview Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Surf Photography",
        }),
        defineField({
          name: "bullets",
          title: "Highlight Bullets",
          type: "array",
          of: [{ type: "string" }],
        }),
        defineField({
          name: "ctaText",
          title: "CTA Text",
          type: "string",
          initialValue: "Explore Surf",
        }),
      ],
    }),
    defineField({
      name: "miniAboutImage",
      title: "Mini About Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "miniAboutText",
      title: "Mini About Text",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "he",
          title: "Hebrew",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "featuredPosts",
      title: "Featured Social Posts",
      description: "Paste Instagram or TikTok post URLs. They will be embedded on the homepage.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "url",
              title: "Post URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "YouTube", value: "youtube" },
                ],
              },
              initialValue: "instagram",
            }),
          ],
          preview: {
            select: { title: "url", subtitle: "platform" },
          },
        },
      ],
    }),
    defineField({
      name: "featuredGallery",
      title: "Featured Work",
      type: "array",
      of: [{ type: "reference", to: [{ type: "gallery" }] }],
    }),
    defineField({
      name: "bottomCtaText",
      title: "Bottom CTA Text",
      type: "string",
      initialValue: "Ready to work together?",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      media: "heroImage",
    },
  },
});
