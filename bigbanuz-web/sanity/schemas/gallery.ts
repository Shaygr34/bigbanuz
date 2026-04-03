import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "Work",
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
    }),
    defineField({
      name: "lane",
      title: "Lane",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Surf", value: "surf" },
          { title: "Mixed", value: "mixed" },
        ],
      },
      initialValue: "mixed",
      hidden: true,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Ocean", value: "ocean" },
          { title: "Golden Hour", value: "golden-hour" },
          { title: "People", value: "people" },
          { title: "Energy", value: "energy" },
          { title: "Travel", value: "travel" },
          { title: "Events", value: "events" },
          { title: "Surf", value: "surf" },
        ],
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      hidden: true,
      type: "string",
      options: {
        list: [
          { title: "Action", value: "action" },
          { title: "Lifestyle", value: "lifestyle" },
          { title: "Destinations", value: "destinations" },
          { title: "Behind the Lens", value: "behind-the-lens" },
          { title: "Events", value: "events" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
            defineField({
              name: "featured",
              title: "Featured",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "alt",
              media: "image",
            },
          },
        },
      ],
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "SEO Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "SEO Description",
          type: "text",
          rows: 2,
        }),
      ],
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
      tags: "tags",
      media: "images.0.image",
    },
    prepare({ title, tags, media }) {
      return {
        title,
        subtitle: tags?.length ? tags.join(", ") : "no tags",
        media,
      };
    },
  },
});
