# Amit Banuz — CLAUDE.md

## Project
Creator-brand personal site for Amit Banuz (@bigbanuz).
Pivoted from "Smile Amigo" dual-lane portfolio → unified "Amit Banuz — צלם · יוצר" brand.

## Stack
- Next.js 14.2.5 (App Router, RSC)
- Sanity V3 (embedded Studio at /studio, project 6q0h6ivm, dataset production, workspace `smile-amigo`)
- Tailwind CSS 3.4.3
- next-intl 4.8.0 (EN + HE, RTL support)
- Resend (email), Vercel (deploy)

## Design System
- Colors: ocean #0A8A8F, golden #D4943A, sand #F5F0E8, deep #1A2E3E, ink #1A1A1A
- EN headings: Syne | HE headings: Secular One | Body: Inter / Heebo
- No dark mode. Sand-warm light theme.

## Key Paths
- Pages: app/[locale]/ (5 routes: /, /work, /about, /stories, /contact)
- Components: components/ (sections/, ui/, layout/)
- Sanity schemas: sanity/schemas/ (9 active types)
- GROQ queries: lib/sanity/queries.ts
- Server actions: lib/actions/
- Instagram API: lib/instagram.ts (Graph API v21.0, ISR 1hr)
- Token refresh cron: app/api/cron/refresh-instagram/route.ts
- i18n: messages/en.json, messages/he.json
- Design tokens: app/globals.css + tailwind.config.ts

## Operational Rules
1. Never push to main without verifying all routes render
2. All CMS changes through Sanity client programmatically
3. All fetches use { next: { tags: ["sanity"] } }
4. All user-facing strings in both en.json and he.json
5. Images: next/image with responsive sizes + blur placeholders
6. Forms: server actions → Sanity lead + Resend email
7. Sanity MCP calls require `workspaceName: "smile-amigo"` (not "default")
8. Schema deploy: `cd sanity && npx sanity@latest schema deploy`
9. GROQ i18n pattern: `coalesce(field[$locale], field)` for flat strings
10. No "Smile Amigo" in user-facing content — brand is "Amit Banuz"
11. Hebrew copy: casual, young Israeli voice. No formal "אנו" or business jargon.
12. Instagram embeds DON'T WORK (Meta login wall). Use Graph API image fetch only.
13. **Workspace name MUST stay "smile-amigo"** — changing it breaks Studio caching. Title is "Amit Banuz CMS".
14. **Custom desk structure breaks in production** — use schema-level title/ordering instead.

## Nav Structure
Work (/work) | About (/about) | Stories (/stories) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts`.
Killed routes: /events → /work?tag=events, /surf → /work?tag=ocean (301 redirects)

## Schema Types (9 active in Studio)
siteSettings, pageHome, pageAbout, videoReel, brand, gallery (titled "Work"), story, lead, feature

**Removed from Studio sidebar:** testimonial, packages, productPrint (schemas still in repo but not in index.ts)

## Homepage Layout (V1.5)
Hero → VideoReelGrid → WorkGrid → BrandsBar → MiniAbout → SocialShowcase → SocialFeed → SimpleCTA

All content sections are "content-gated" — return null when empty. Sections only appear when CMS has data.

## V1.5 Status (April 3, 2026)
41 commits total (6 in this session). Studio overhaul + video/brands infrastructure.

### What's New (V1.5)
- Studio renamed "Amit Banuz CMS", sidebar cleaned (dead types removed)
- Gallery renamed to "Work" in Studio, preview shows tags instead of lane
- `videoReel` schema: file upload + thumbnail + tag + featured flag
- `brand` schema: logo + name + URL
- `VideoReelGrid` component: 9:16 vertical videos, autoplay on scroll via IntersectionObserver
- `BrandsBar` component: grayscale logos with hover color reveal
- Homepage layout updated: Hero → Reels → Work → Brands → About → Social → CTA
- All 4 gallery collections have proper tags (surf, ocean, events, people, energy, golden-hour, travel)
- Tag filtering on /work page now works correctly
- GROQ queries added: videoReelsQuery, brandsQuery
- i18n strings added: videoTitle, videoSubtitle, brandsTitle (en/he)

### What's Live
- Full-viewport hero with ocean photo + "עמית בנוז · צלם · יוצר"
- Work highlights grid (photos from Surf Action + Events Portfolio + Surf Lifestyle)
- MiniAbout with Hebrew bio + location pills
- Instagram CTA section
- WhatsApp CTA
- /work unified portfolio with working tag filtering
- Sanity Studio fully editable at /studio

## Blocked On
- Instagram tokens (awaiting Amit credentials)
- Morocco content (video reels, hero video, new gallery photos)
- Photo of Amit (miniAbout + About hero)
- Brand logos (Amit needs to provide)

## Brand
- Display: "Amit Banuz"
- Instagram: @bigbanuz
- Email: iambigbanuz@gmail.com
- Domain: `bigbanuz.vercel.app` (target: smile-amigo.com, not purchased)
