import { defineField, defineType } from "sanity";

export default defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
      description: "Brief summary shown on story cards (max 200 characters)",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 20,
      description: "Full story content. Paragraph breaks are preserved.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
  ],
  orderings: [
    {
      title: "Published Date",
      name: "publishedAt",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
    },
  },
});
