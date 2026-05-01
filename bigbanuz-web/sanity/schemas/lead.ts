import { defineField, defineType } from "sanity";

export default defineType({
  name: "lead",
  title: "פניות",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      description: "שם הפונה מטופס יצירת קשר.",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "אימייל",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "טלפון",
      type: "string",
    }),
    defineField({
      name: "source",
      title: "מקור",
      description: "מאיפה הגיעה הפנייה.",
      type: "string",
      options: {
        list: [
          { title: "אירוע", value: "events-contact" },
          { title: "מגנטים", value: "magnets" },
          { title: "יצירת קשר כללי", value: "general-contact" },
        ],
      },
    }),
    defineField({
      name: "projectDescription",
      title: "תיאור הפרויקט",
      description: "ההודעה שנכתבה בטופס.",
      type: "text",
    }),
    defineField({
      name: "status",
      title: "סטטוס",
      description: "מצב הטיפול בפנייה.",
      type: "string",
      options: {
        list: [
          { title: "חדש", value: "new" },
          { title: "יצרתי קשר", value: "contacted" },
          { title: "סגור — הצלחה", value: "converted" },
          { title: "ארכיון", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "הערות פנימיות",
      description: "הערות לשימוש פנימי בלבד.",
      type: "text",
    }),
  ],
  orderings: [
    {
      title: "תאריך יצירה",
      name: "createdAt",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "status",
    },
  },
});
