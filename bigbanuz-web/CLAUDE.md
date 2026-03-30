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
- Instagram API: lib/instagram.ts (Graph API v21.0, ISR 1hr)
- Token refresh cron: app/api/cron/refresh-instagram/route.ts
- Cron config: vercel.json (1st/15th monthly)
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

## Nav Structure
Gallery (/) | Stories (/stories) | About (/about) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts` — single source for Navbar, MobileMenu, 404 page.
Events (/events) and Surf (/surf) routes still exist but are not in nav.

## Schema Types (10)
siteSettings, pageHome, pageAbout, packages, gallery, testimonial, lead, productPrint, story, feature

## V3 Status
All milestones complete (M0–M5) + V3-final polish. See docs/v3-scope.md for details.

### V3-Final Session (March 2026)
- **Instagram Graph API**: SocialFeed component (self-fetching async RSC), long-lived token refresh via Vercel cron (1st/15th monthly), graceful fallback (returns null when API unavailable)
- **socialHighlight schema removed**: Deleted schema + SocialGrid component, replaced by live Instagram feed
- **Navbar redesign**: Premium typography (`tracking-[0.12em]`, uppercase), animated underline hover, cinematic mobile menu with staggered entrance animations
- **Testimonials hidden**: Removed from homepage + events page rendering (schema + CMS data preserved for future use)
- **SEO URL unification**: All fallback URLs unified to `smile-amigo.vercel.app`. `NEXT_PUBLIC_SITE_URL` is the single point of change for domain migration
- **Dodeca footer credit**: "Built by Dodeca" link added below copyright
- **Studio crash fix**: Stale Vercel build cache after schema deletion — resolved with `vercel --prod --force` from parent directory

## Brand
- Display: "Smile Amigo"
- Instagram: @bigbanuz (real IG handle, intentional)
- Email: iambigbanuz@gmail.com (temporary)
- Logo: current Sanity asset (basic, client upgrading later)
- Domain: `smile-amigo.vercel.app` (currently). `smile-amigo.com` pending purchase. Single env var swap when ready.
