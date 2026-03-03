import { defineField, defineType } from "sanity";

export default defineType({
  name: "feature",
  title: "Feature",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Article or collaboration title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author / Brand",
      type: "string",
      description: "Brand name or journalist",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Display Date",
      type: "string",
      description: 'e.g. "Jan 2025"',
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "url",
      description: "Link to article or IG post",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Sanity-hosted image (preferred)",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageUrl",
      title: "External Image URL",
      type: "url",
      description: "Fallback for external images (e.g. Shopify CDN)",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short description shown on the card",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrder",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author",
    },
  },
});
