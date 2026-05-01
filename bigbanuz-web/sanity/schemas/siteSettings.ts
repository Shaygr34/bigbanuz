import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "הגדרות האתר",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "שם האתר",
      description: "השם שמופיע בכותרת הדפדפן ובתוצאות גוגל.",
      type: "string",
      initialValue: "עמית בנוז",
    }),
    defineField({
      name: "siteDescription",
      title: "תיאור האתר",
      description: "תיאור קצר שמופיע בתוצאות גוגל.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "לוגו",
      description: "לוגו האתר (אופציונלי — כרגע משתמשים בטקסט).",
      type: "image",
    }),
    defineField({
      name: "socialLinks",
      title: "קישורים לרשתות חברתיות",
      type: "object",
      fields: [
        defineField({
          name: "instagram",
          title: "קישור לאינסטגרם",
          description: "הקישור המלא לפרופיל האינסטגרם.",
          type: "url",
        }),
        defineField({
          name: "whatsapp",
          title: "מספר וואטסאפ",
          description: "מספר טלפון בפורמט בינלאומי, בלי + (למשל: 972548194361).",
          type: "string",
        }),
        defineField({
          name: "email",
          title: "כתובת אימייל",
          description: "כתובת האימייל שמופיעה בעמוד יצירת קשר.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ctaWhatsappMessage",
      title: "הודעת וואטסאפ אוטומטית",
      description: "ההודעה שנפתחת אוטומטית כשלוחצים על כפתור וואטסאפ.",
      type: "string",
      initialValue: "היי עמית! מצאתי אותך באתר ורציתי לשמוע פרטים על צילום אירועים.",
    }),
    defineField({
      name: "seoDefaults",
      title: "ברירות מחדל SEO",
      description: "הגדרות SEO כלליות שחלות על כל העמודים.",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "כותרת ברירת מחדל",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "תיאור ברירת מחדל",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "ogImage",
          title: "תמונת שיתוף (OG Image)",
          description: "התמונה שמופיעה בשיתוף בפייסבוק/וואטסאפ.",
          type: "image",
        }),
      ],
    }),
    defineField({
      name: "analyticsId",
      title: "מזהה Google Analytics",
      description: "מזהה GA4 (מתחיל ב-G-).",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
