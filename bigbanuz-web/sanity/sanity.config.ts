import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "amit-banuz",
  title: "Amit Banuz CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "6q0h6ivm",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Amit Banuz")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("GIeLRwpwGsiztVDy2VqNxj")
              ),
            S.listItem()
              .title("Homepage")
              .child(
                S.document()
                  .schemaType("pageHome")
                  .documentId("01V69ip6laclT1AsFy4mXf")
              ),
            S.listItem()
              .title("About Page")
              .child(
                S.document()
                  .schemaType("pageAbout")
                  .documentId("692ee9e6-8bf7-4819-b968-a3c5c0e30547")
              ),
            S.divider(),
            S.listItem()
              .title("Video Reels")
              .child(S.documentTypeList("videoReel").title("Video Reels")),
            S.listItem()
              .title("Work")
              .child(S.documentTypeList("gallery").title("Work")),
            S.listItem()
              .title("Stories")
              .child(S.documentTypeList("story").title("Stories")),
            S.listItem()
              .title("Brands")
              .child(S.documentTypeList("brand").title("Brands")),
            S.divider(),
            S.listItem()
              .title("Leads")
              .child(S.documentTypeList("lead").title("Leads")),
            S.listItem()
              .title("Features & Press")
              .child(S.documentTypeList("feature").title("Features & Press")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
