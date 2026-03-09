# Smile Amigo — CLAUDE.md

## Project
Photography portfolio + brand site for Amit Banuz (@bigbanuz / Smile Amigo).
Dual-lane: Events (Israel, Hebrew-primary) + Surf (international, English-primary).

## Stack
- Next.js 14.2.5 (App Router, RSC)
- Sanity V3 (embedded Studio at /studio, project 6q0h6ivm, dataset production, workspace `smile-amigo`)
- Tailwind CSS 3.4.3
- next-intl 4.8.0 (EN + HE, RTL support)
- Resend (email), Vercel (deploy)

## Key Paths
- Pages: app/[locale]/
- Components: components/ (sections/, ui/, layout/, analytics/)
- Sanity schemas: sanity/schemas/
- GROQ queries: lib/sanity/queries.ts
- Server actions: lib/actions/
- i18n: messages/en.json, messages/he.json
- Design tokens: app/globals.css + tailwind.config.ts
- Docs: docs/ (v3-scope.md, decision-log.md, links-hub.md)

## Operational Rules
1. Never push to main without verifying all routes render
2. All CMS changes through Sanity client programmatically
3. All fetches use { next: { tags: ["sanity"] } }
4. All user-facing strings in both en.json and he.json
5. Images: next/image with responsive sizes + blur placeholders
6. Forms: server actions → Sanity lead + Resend email
7. Sanity MCP calls require `workspaceName: "smile-amigo"` (not "default")
8. Schema deploy: `cd sanity && npx sanity@latest schema deploy`
9. GROQ i18n pattern: `coalesce(field[$locale], field)` for flat strings, `coalesce(field[$locale], field.en)` for bilingual objects

## Schema Types (11)
siteSettings, pageHome, pageAbout, packages, gallery, testimonial, lead, productPrint, story, feature, socialHighlight

## V3 Status
All milestones complete (M0–M5). See docs/v3-scope.md for details and manual steps.

## Brand
- Display: "Smile Amigo"
- Instagram: @bigbanuz
- Email: iambigbanuz@gmail.com (temporary)
- Logo: current Sanity asset (basic, client upgrading later)
