import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageHome",
  title: "עמוד הבית",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "תמונת רקע ראשית",
      description: "התמונה הגדולה שמופיעה בראש עמוד הבית. מומלץ תמונה רחבה באיכות גבוהה.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroVideo",
      title: "סרטון רקע (אופציונלי)",
      description: "קישור לסרטון שירוץ ברקע במקום התמונה. אם ריק — תוצג התמונה.",
      type: "url",
    }),
    defineField({
      name: "heroHeadline",
      title: "כותרת ראשית",
      description: "השם שמופיע בגדול על תמונת הרקע בעמוד הבית.",
      type: "string",
      initialValue: "עמית בנוז",
    }),
    defineField({
      name: "heroSubline",
      title: "תת-כותרת",
      description: "הטקסט שמופיע מתחת לשם בעמוד הבית (למשל: 'צלם אירועים').",
      type: "string",
      initialValue: "צלם אירועים",
    }),
    defineField({
      name: "miniAboutImage",
      title: "תמונה באזור ה'קצת עליי'",
      description: "תמונה עגולה שמופיעה ליד הטקסט הקצר על עמית בעמוד הבית.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "miniAboutText",
      title: "טקסט קצר 'קצת עליי'",
      description: "2-3 משפטים על עמית שמופיעים בעמוד הבית. מופיע ליד התמונה העגולה.",
      type: "object",
      fields: [
        defineField({
          name: "en",
          title: "אנגלית",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "he",
          title: "עברית",
          type: "text",
          rows: 3,
        }),
      ],
    }),
    defineField({
      name: "featuredGallery",
      title: "תמונות מובחרות",
      description: "בחר אוספי עבודות להצגה בעמוד הבית. 6-8 תמונות מומלץ.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "gallery" }] }],
    }),
    defineField({
      name: "bottomCtaText",
      title: "כותרת כפתור יצירת קשר (תחתית)",
      description: "הטקסט שמופיע מעל כפתור הוואטסאפ בתחתית עמוד הבית.",
      type: "string",
      initialValue: "רוצים צלם לאירוע?",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      media: "heroImage",
    },
  },
});
