import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "./schemas";

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .id("root")
    .title("Amit Banuz")
    .items([
      // Singletons
      S.listItem()
        .id("siteSettings")
        .title("Site Settings")
        .icon(() => "⚙️")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .id("homepage")
        .title("Homepage")
        .icon(() => "🏠")
        .child(S.document().schemaType("pageHome").documentId("pageHome")),
      S.listItem()
        .id("aboutPage")
        .title("About Page")
        .icon(() => "👤")
        .child(S.document().schemaType("pageAbout").documentId("pageAbout")),
      S.divider(),
      // Content
      S.listItem()
        .id("videoReels")
        .title("Video Reels")
        .icon(() => "🎬")
        .child(S.documentTypeList("videoReel").title("Video Reels")),
      S.listItem()
        .id("work")
        .title("Work")
        .icon(() => "📸")
        .child(S.documentTypeList("gallery").title("Work")),
      S.listItem()
        .id("stories")
        .title("Stories")
        .icon(() => "📖")
        .child(S.documentTypeList("story").title("Stories")),
      S.listItem()
        .id("brands")
        .title("Brands")
        .icon(() => "🤝")
        .child(S.documentTypeList("brand").title("Brands")),
      S.divider(),
      // Hidden from nav but accessible
      S.listItem()
        .id("leads")
        .title("Leads")
        .icon(() => "📩")
        .child(S.documentTypeList("lead").title("Leads")),
      S.listItem()
        .id("features")
        .title("Features & Press")
        .icon(() => "📰")
        .child(S.documentTypeList("feature").title("Features & Press")),
    ]);

export default defineConfig({
  name: "amit-banuz",
  title: "Amit Banuz CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6q0h6ivm",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
