import { defineField, defineType } from "sanity";

export default defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Events Contact", value: "events-contact" },
          { title: "Surf Collaboration", value: "surf-collab" },
          { title: "General Contact", value: "general-contact" },
        ],
      },
    }),
    defineField({
      name: "packageInterest",
      title: "Package Interest",
      type: "string",
    }),
    defineField({
      name: "projectDescription",
      title: "Project Description",
      type: "text",
    }),
    defineField({
      name: "budgetRange",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Converted", value: "converted" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
    }),
  ],
  orderings: [
    {
      title: "Created At",
      name: "createdAt",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "source",
    },
  },
});
