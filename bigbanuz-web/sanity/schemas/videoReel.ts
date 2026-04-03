import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoReel",
  title: "Video Reel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "video",
      title: "Video File",
      description: "Upload a short vertical video (MP4/MOV, max 100MB). Best at 9:16 ratio.",
      type: "file",
      options: {
        accept: "video/*",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      description: "Cover image shown before video plays. Use a vertical 9:16 image.",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "string",
      options: {
        list: [
          { title: "Surf", value: "surf" },
          { title: "Events", value: "events" },
          { title: "Travel", value: "travel" },
          { title: "Lifestyle", value: "lifestyle" },
          { title: "Morocco", value: "morocco" },
          { title: "Behind the Scenes", value: "bts" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: true,
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
      title: "title",
      subtitle: "tag",
      media: "thumbnail",
    },
  },
});
