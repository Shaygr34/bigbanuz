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
- Sanity schemas: sanity/schemas/
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

## Nav Structure
Work (/work) | About (/about) | Stories (/stories) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts`.
Killed routes: /events → /work?tag=events, /surf → /work?tag=ocean (301 redirects)

## Schema Types (10)
siteSettings, pageHome, pageAbout, packages (hidden), gallery, testimonial (hidden), lead, productPrint (hidden), story, feature

## V1.4 Status (March 30, 2026)
35 commits. Full redesign from "Smile Amigo" split-gateway to unified creator brand.
- Syne + Secular One typography
- Ocean/golden/sand palette, no dark mode
- Full-viewport hero, highlights grid, mini-about, Instagram CTA, WhatsApp CTA
- /work unified portfolio with tag filtering
- Casual Hebrew copy throughout
- Image quality: hero 90/2560, gallery 85/1200

## Blocked On
- Instagram tokens (awaiting Amit credentials)
- Morocco content (Amit returning March 30)
- Photo of Amit (miniAbout + About hero)
- Gallery content diversification (needs surf photos in highlights)

## Brand
- Display: "Amit Banuz"
- Instagram: @bigbanuz
- Email: iambigbanuz@gmail.com
- Domain: `bigbanuz.vercel.app` (target: smile-amigo.com, not purchased)
