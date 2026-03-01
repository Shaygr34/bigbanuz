import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      description: 'e.g., "Wedding Event, Tel Aviv" or "Surf Brand Collaboration"',
    }),
    defineField({
      name: "avatar",
      title: "Avatar",
      type: "image",
    }),
    defineField({
      name: "sourceLink",
      title: "Source Link",
      type: "url",
      description: "Link to IG post or Google review",
    }),
    defineField({
      name: "lane",
      title: "Lane",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Surf", value: "surf" },
          { title: "General", value: "general" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
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
      title: "name",
      subtitle: "context",
    },
  },
});
