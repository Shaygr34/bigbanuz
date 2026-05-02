# Amit Banuz — CLAUDE.md

## Project
Events photography landing page for Amit Banuz (@bigbanuz).
Pivoted May 2026 from surf/creator brand → events & magnets photography, targeting Israeli event clients.
Site is in final handoff sprint — Amit manages everything through Sanity Studio after this.

## Stack
- Next.js 14.2.5 (App Router, RSC)
- Sanity V3 (embedded Studio at /studio, project `6q0h6ivm`, dataset `production`, workspace `smile-amigo`)
- Tailwind CSS 3.4.3
- next-intl 4.8.0 (EN + HE, RTL support)
- Resend (email), Vercel (deploy)

## Design System
- Colors: ocean #0A8A8F, golden #D4943A, sand #F5F0E8, deep #1A2E3E, ink #1A1A1A
- EN headings: Syne | HE headings: Secular One | Body: Inter / Heebo
- No dark mode. Sand-warm light theme.

## Key Paths
- Pages: app/[locale]/ (4 routes: /, /work, /about, /contact)
- Components: components/ (sections/, ui/, layout/)
- Sanity schemas: sanity/schemas/ (5 active types)
- GROQ queries: lib/sanity/queries.ts
- Server actions: lib/actions/
- i18n: messages/en.json, messages/he.json
- Design tokens: app/globals.css + tailwind.config.ts
- Instagram API: lib/instagram.ts (Graph API v21.0 — NOT WORKING, awaiting Amit tokens)

## Operational Rules
1. Never push to main without verifying all routes render
2. All CMS changes through Sanity client programmatically
3. All fetches use { next: { tags: ["sanity"] } }
4. All user-facing strings in both en.json and he.json
5. Images: next/image with responsive sizes + blur placeholders
6. Forms: server actions → Sanity lead + Resend email
7. Sanity MCP calls require `workspaceName: "smile-amigo"` (not "default")
8. Schema deploy: `cd sanity && npx sanity@latest schema deploy` (from sanity/ subdir, NOT repo root)
9. GROQ i18n pattern: `coalesce(field[$locale], field)` for flat strings
10. No "Smile Amigo" in user-facing content — brand is "Amit Banuz"
11. Hebrew copy: casual, young Israeli voice. No formal "אנו" or business jargon.
12. Instagram embeds DON'T WORK (Meta login wall). Use Graph API image fetch only.
13. **Workspace name MUST stay "smile-amigo"** — changing it breaks Studio caching. Title is "Amit Banuz CMS".
14. **Custom desk structure breaks in production** — use schema-level title/ordering instead.
15. **Schema deployed to Sanity cloud** — MCP can read it. Re-deploy after schema changes.

## Nav Structure
Work (/work) | About (/about) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts`.
301 redirects: /events → /work?tag=events, /surf → /work?tag=ocean, /stories → /

## Schema Types (5 active in Studio)
הגדרות האתר (siteSettings), עמוד הבית (pageHome), עמוד אודות (pageAbout), עבודות (gallery), פניות (lead)

**Removed from index.ts (files kept in repo):** videoReel, brand, feature, story, testimonial, packages, productPrint

**All schema fields have Hebrew titles + descriptions** — handoff-ready. Each field explains WHERE on the site it appears.

## Gallery Tags (events photography pivot)
events (אירועים), magnets (מגנטים), corporate (חברות), private (פרטי), outdoor (חוץ)

## Homepage Layout (V2.0)
Hero → WorkGrid (masonry) → MiniAbout → SocialShowcase → SimpleCTA

All content sections are "content-gated" — return null when empty.

**Removed sections:** VideoReelGrid, BrandsBar, SocialFeed

## Gallery Layout
Both homepage preview (WorkGrid) and /work page (WorkGallery) use **CSS columns masonry** (`columns-1 sm:columns-2 lg:columns-3`). Images display at natural aspect ratios using real dimensions from Sanity asset metadata (`asset->metadata.dimensions`).

## V2.0 Status (May 2, 2026)
42 commits total. Full events photography pivot + handoff prep.

### What Changed (V2.0 — May 2026)
- **Pivot**: All copy changed from surf/creator to events photography (HE + EN)
- **Stories removed**: Page, route, schema, nav link deleted. 301 redirect to homepage.
- **Masonry gallery**: CSS columns layout replacing uniform 4:3 grid. Real image dimensions from Sanity.
- **Tags pivot**: ocean/golden-hour/surf/energy/travel → events/magnets/corporate/private/outdoor
- **Schema cleanup**: 9 types → 5 types. All with Hebrew titles + descriptions.
- **About simplified**: Removed locations strip (Philippines/Sri Lanka/Australia), reduced to 2 paragraphs
- **Homepage simplified**: Removed VideoReelGrid, BrandsBar, SocialFeed sections
- **Dead code removed**: 825 net lines deleted. Dead queries, components, i18n strings cleaned out.
- **Contact form**: "Surf Collab" subject → "Magnets"

### What's Live
- Full-viewport hero with "עמית בנוז · צלם אירועים"
- Masonry gallery preview from featured Work collections
- MiniAbout section (text + circular photo)
- Instagram CTA section
- WhatsApp CTA ("רוצים צלם לאירוע?")
- /work masonry gallery with events-relevant tag filtering + lightbox
- /about simplified (2 sections: bio + approach)
- /contact WhatsApp-first + form
- Sanity Studio at /studio — all Hebrew, handoff-ready

### What Amit Needs to Do
- Upload new hero image (events photo, not ocean)
- Upload profile photo for MiniAbout
- Update miniAboutText to events-focused Hebrew copy
- Re-tag existing gallery images with new categories
- Upload new event photography content
- (Optional) Record event highlight videos if wanting to re-enable video section

### Blocked On
- Instagram tokens (awaiting Amit credentials for Graph API)
- New event photography content from Amit
- Hero + profile photos from Amit

## Brand
- Display: "עמית בנוז" / "Amit Banuz"
- Tagline: "צלם אירועים" / "Event Photographer"
- Instagram: @bigbanuz
- Email: iambigbanuz@gmail.com
- WhatsApp: 972548194361
- Domain: `bigbanuz.vercel.app` / `amitbanuz.com`

## Dead Components (kept in repo, not imported)
- VideoReelGrid.tsx, BrandsBar.tsx, SocialFeed.tsx, SurfGallery.tsx
- FeaturedGallery.tsx, LocationsStrip.tsx
- StoryCard.tsx, TestimonialCard.tsx, PackageCard.tsx, PackageComparisonTable.tsx, CollabForm.tsx, ViewToggle.tsx, CategoryFilter.tsx
