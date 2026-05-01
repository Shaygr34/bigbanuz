import { defineField, defineType } from "sanity";

export default defineType({
  name: "gallery",
  title: "עבודות",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "שם האוסף",
      description: "שם פנימי לאוסף התמונות (למשל: 'חתונה כהן 2026'). מופיע ברשימה בסטודיו.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "כתובת URL",
      description: "נוצר אוטומטית מהשם. לא צריך לשנות.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "tags",
      title: "קטגוריות",
      description: "בחר קטגוריות לסינון בעמוד הגלריה. ניתן לבחור יותר מאחת.",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "אירועים — Events", value: "events" },
          { title: "מגנטים — Magnets", value: "magnets" },
          { title: "חברות — Corporate", value: "corporate" },
          { title: "פרטי — Private", value: "private" },
          { title: "חוץ — Outdoor", value: "outdoor" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "תמונות",
      description: "הוסף תמונות לאוסף. כל תמונה צריכה טקסט חלופי (alt).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "תמונה",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "alt",
              title: "טקסט חלופי (alt)",
              description: "תיאור קצר של התמונה לנגישות ו-SEO.",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "כיתוב",
              description: "טקסט שמופיע מתחת לתמונה (אופציונלי).",
              type: "string",
            }),
            defineField({
              name: "location",
              title: "מיקום",
              description: "היכן צולמה התמונה (אופציונלי).",
              type: "string",
            }),
            defineField({
              name: "featured",
              title: "מובחרת",
              description: "סמן אם זו תמונה מובחרת.",
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
      title: "סדר תצוגה",
      description: "מספר נמוך = מוצג ראשון. השאר 0 לסדר ברירת מחדל.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      description: "הגדרות SEO לאוסף (אופציונלי).",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "כותרת SEO",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "תיאור SEO",
          type: "text",
          rows: 2,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "סדר תצוגה",
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
        subtitle: tags?.length ? tags.join(", ") : "ללא קטגוריות",
        media,
      };
    },
  },
});
