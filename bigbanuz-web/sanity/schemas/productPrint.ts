import { defineField, defineType } from "sanity";

// V2-ready schema — no UI in V1
export default defineType({
  name: "productPrint",
  title: "Print Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sizeOptions",
      title: "Size Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "dimensions",
              title: "Dimensions",
              type: "string",
            }),
            defineField({
              name: "priceILS",
              title: "Price (ILS)",
              type: "number",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "ILS",
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "fulfillmentProviderId",
      title: "Fulfillment Provider ID",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
