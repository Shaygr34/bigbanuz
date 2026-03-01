import { defineField, defineType } from "sanity";

export default defineType({
  name: "packages",
  title: "Packages",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Package Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "priceILS",
      title: "Price (ILS)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "priceDisplay",
      title: "Price Display",
      type: "string",
      description: 'Formatted price, e.g., "₪1,500"',
    }),
    defineField({
      name: "inclusions",
      title: "Inclusions",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points of what's included",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show on homepage",
      initialValue: false,
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Book This Package",
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
      subtitle: "priceDisplay",
    },
  },
});
