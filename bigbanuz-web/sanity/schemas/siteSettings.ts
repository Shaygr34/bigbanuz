import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Amit Banuz",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Optional — text logo used in V1",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        }),
        defineField({
          name: "whatsapp",
          title: "WhatsApp Phone Number",
          type: "string",
          description: "International format, no +",
        }),
        defineField({
          name: "email",
          title: "Email Address",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ctaWhatsappMessage",
      title: "Default WhatsApp CTA Message",
      type: "string",
      initialValue:
        "Hi Amit! I found you on your website and wanted to get in touch.",
    }),
    defineField({
      name: "seoDefaults",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Default Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Default Description",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "ogImage",
          title: "Default OG Image",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "analyticsId",
      title: "GA4 Measurement ID",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
