import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageAbout",
  title: "עמוד אודות",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "תמונת רקע",
      description: "תמונה גדולה בראש עמוד ה'עליי'. מומלץ תמונה של עמית בעבודה.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "headline",
      title: "כותרת",
      description: "הכותרת הראשית בעמוד האודות.",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "אנגלית" },
        { name: "he", type: "string", title: "עברית" },
      ],
    }),
    defineField({
      name: "subline",
      title: "תת-כותרת",
      description: "מופיעה מתחת לכותרת הראשית.",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "אנגלית" },
        { name: "he", type: "string", title: "עברית" },
      ],
    }),
    defineField({
      name: "bio",
      title: "אודות / ביוגרפיה",
      description: "הטקסט הראשי בעמוד — מי את/ה, מה עושים. הפרד פסקאות עם שורה ריקה.",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "אנגלית", rows: 6 },
        { name: "he", type: "text", title: "עברית", rows: 6 },
      ],
    }),
    defineField({
      name: "approachTitle",
      title: "כותרת 'הגישה שלי'",
      description: "כותרת הסקציה השנייה בעמוד.",
      type: "object",
      fields: [
        { name: "en", type: "string", title: "אנגלית" },
        { name: "he", type: "string", title: "עברית" },
      ],
    }),
    defineField({
      name: "approach",
      title: "טקסט 'הגישה שלי'",
      description: "הסבר על גישת העבודה. הפרד פסקאות עם שורה ריקה.",
      type: "object",
      fields: [
        { name: "en", type: "text", title: "אנגלית", rows: 4 },
        { name: "he", type: "text", title: "עברית", rows: 4 },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "עמוד אודות" };
    },
  },
});
