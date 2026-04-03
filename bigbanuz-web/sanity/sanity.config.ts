import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deskStructure = (S: any) =>
  S.list()
    .id("root")
    .title("Amit Banuz")
    .items([
      S.listItem()
        .id("siteSettings")
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("GIeLRwpwGsiztVDy2VqNxj")
        ),
      S.listItem()
        .id("homepage")
        .title("Homepage")
        .child(
          S.document()
            .schemaType("pageHome")
            .documentId("01V69ip6laclT1AsFy4mXf")
        ),
      S.listItem()
        .id("aboutPage")
        .title("About Page")
        .child(
          S.document()
            .schemaType("pageAbout")
            .documentId("692ee9e6-8bf7-4819-b968-a3c5c0e30547")
        ),
      S.divider(),
      S.listItem()
        .id("videoReels")
        .title("Video Reels")
        .child(S.documentTypeList("videoReel").title("Video Reels")),
      S.listItem()
        .id("work")
        .title("Work")
        .child(S.documentTypeList("gallery").title("Work")),
      S.listItem()
        .id("stories")
        .title("Stories")
        .child(S.documentTypeList("story").title("Stories")),
      S.listItem()
        .id("brands")
        .title("Brands")
        .child(S.documentTypeList("brand").title("Brands")),
      S.divider(),
      S.listItem()
        .id("leads")
        .title("Leads")
        .child(S.documentTypeList("lead").title("Leads")),
      S.listItem()
        .id("features")
        .title("Features & Press")
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
