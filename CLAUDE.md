# Amit Banuz — CLAUDE.md

> Tetra v0.2 standard. Last updated: May 2, 2026.

---

## Project

**Events photography landing page for Amit Banuz (@bigbanuz).**
Pivoted May 2026 from surf/creator brand → events & magnets photography, targeting Israeli event clients.
Brand identity: "עמית בנוז — צלם אירועים" (Event Photographer).
Site is LIVE on Vercel at `bigbanuz.vercel.app` / `amitbanuz.com` — auto-deploy on push to `main`.
**Handoff sprint complete** — Amit manages content through Sanity Studio.

## Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 14.2.5 | App Router, React Server Components |
| CMS | Sanity | v3.36.4 | Embedded Studio at `/studio`, project `6q0h6ivm`, dataset `production`, workspace `smile-amigo` |
| Styling | Tailwind CSS | 3.4.3 | Config via `tailwind.config.ts` |
| i18n | next-intl | 4.8.0 | EN + HE, RTL support, `prefix: always` |
| Email | Resend | 3.2.0 | Form notification delivery |
| Analytics | GA4 | — | Custom events via `lib/utils/analytics.ts` |
| Deploy | Vercel | — | Auto-deploy on push to `main` |

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| Ocean | `#0A8A8F` | Primary accent, CTAs, links |
| Golden | `#D4943A` | Warm accent, coming-soon indicators |
| Sand | `#F5F0E8` | Page background |
| Deep | `#1A2E3E` | Dark sections, footer, nav on scroll |
| Ink | `#1A1A1A` | Primary text |

**Typography:**
- EN headings: **Syne** (creative, geometric with character)
- HE headings: **Secular One** (bold, modern, energetic)
- EN body: Inter
- HE body: Heebo
- No dark mode — single warm-sand light theme

## Key Paths

```
app/[locale]/              → Pages (4 routes × 2 locales: /, /work, /about, /contact)
app/[locale]/work/         → Masonry gallery with tag filtering
app/studio/[[...index]]/   → Embedded Sanity Studio
app/api/revalidate/        → ISR webhook endpoint
components/sections/       → Hero, WorkGrid (masonry), WorkGallery (masonry), MiniAbout, SocialShowcase, SimpleCTA
components/ui/             → Reusable UI components (Lightbox, ScrollReveal, etc.)
components/layout/         → Navbar, MobileMenu, Footer
lib/sanity/client.ts       → Read + write Sanity clients
lib/sanity/queries.ts      → All GROQ queries (homePageQuery, allGalleriesQuery, pageAboutQuery, etc.)
lib/sanity/image.ts        → urlFor() + blur placeholders
lib/instagram.ts           → Instagram Graph API v21.0 client (ISR 1hr)
lib/actions/               → Server actions (contact leads)
lib/utils/constants.ts     → SITE_NAME, NAV_LINKS, WHATSAPP_PHONE, INSTAGRAM_URL
app/api/cron/refresh-instagram/ → Long-lived token refresh (1st/15th monthly)
sanity/schemas/            → 9 active schema types (videoReel, brand added; testimonial, packages, productPrint removed from index)
messages/en.json           → English i18n strings
messages/he.json           → Hebrew i18n strings
app/globals.css            → CSS custom properties + animations
tailwind.config.ts         → Design system tokens
docs/superpowers/specs/    → Design spec
docs/superpowers/plans/    → Implementation plan
```

## Brand

- **Display name**: "עמית בנוז" / "Amit Banuz"
- **Tagline**: "צלם אירועים" / "Event Photographer"
- **Instagram**: @bigbanuz
- **Email**: iambigbanuz@gmail.com
- **WhatsApp**: 972548194361
- **Domain**: `bigbanuz.vercel.app` / `amitbanuz.com`
- **No "Smile Amigo" anywhere** in user-facing content.

## Nav Structure

Work (/work) | About (/about) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts`.

**301 Redirects (next.config.mjs):** /events → /work?tag=events, /surf → /work?tag=ocean, /stories → /, /stories/:slug → /

## Schema Types (5 active in Studio)

הגדרות האתר (siteSettings), עמוד הבית (pageHome), עמוד אודות (pageAbout), עבודות (gallery), פניות (lead)

**Removed from index.ts (files kept in repo):** videoReel, brand, feature, story, testimonial, packages, productPrint

**All schema fields have Hebrew titles + descriptions** — Reb Adam handoff standard. Each field explains WHERE on the site it appears.

**Key schemas (May 2, 2026):**
- `gallery` — titled "עבודות" in Studio. Tags: events, magnets, corporate, private, outdoor. Masonry display.
- `pageHome` — heroImage, heroVideo (URL), heroHeadline, heroSubline, miniAboutImage, miniAboutText (en/he), featuredGallery (refs), bottomCtaText
- `pageAbout` — heroImage, headline (en/he), subline (en/he), bio (en/he), approachTitle (en/he), approach (en/he). No locations.
- `lead` — name, email, phone, source (events/magnets/general), projectDescription, status, notes
- Schema deployed to Sanity cloud — MCP can read it.

## Current State (V2.0 — May 2, 2026)

**42 commits total.** V2.0: Full events photography pivot + handoff prep (May 2026).

### What's Live
- Full-viewport hero with "עמית בנוז · צלם אירועים"
- Masonry gallery preview (CSS columns, natural aspect ratios from Sanity metadata)
- MiniAbout section (circular photo + text)
- Instagram CTA section
- WhatsApp CTA ("רוצים צלם לאירוע?")
- `/work` masonry gallery with events-relevant tag filtering (events/magnets/corporate/private/outdoor) + lightbox
- `/about` simplified: bio + approach (2 sections, no locations strip)
- `/contact` WhatsApp-first + form
- Sanity Studio at `/studio` — all Hebrew fields, handoff-ready
- 301 redirects: /events, /surf, /stories, /stories/:slug
- Bilingual EN/HE with RTL support

### What Changed (V2.0)
- All copy pivoted from surf/creator to events photography
- Stories page removed entirely
- VideoReelGrid, BrandsBar, SocialFeed removed from homepage
- Gallery tags changed: ocean/golden-hour/surf → events/magnets/corporate/private/outdoor
- Masonry layout (CSS columns) replacing uniform aspect-ratio grid
- Schema reduced from 9 → 5 active types
- All schema fields have Hebrew titles + descriptions
- About page simplified: removed locations strip, reduced to 2 paragraphs
- 825 net lines deleted

### What's Blocked (Needs Amit)
- **New hero image** — needs events photo replacing ocean
- **Profile photo** — for miniAbout + About page hero
- **Event photography content** — re-tag galleries with new categories, upload new work
- **miniAboutText update** — CMS field needs events-focused Hebrew copy
- **Instagram tokens** — Amit's login credentials for Graph API

### Instagram Embeds — DO NOT ATTEMPT
Instagram oEmbed/iframe embeds are broken by Meta policy (login wall + API lockdown since 2024-2025). The Graph API image fetch approach is the correct pattern. See memory file `smile-amigo-pivot-session.md`.

---

## OPERATIONAL RULES

### Decision-Making Authority

**Proceed without asking:**
- Font size tweaks, spacing adjustments, color shade variations within the defined palette
- Fixing lint/build errors
- Committing and pushing to main
- Setting env vars via `vercel env add`
- Creating/updating Sanity documents programmatically via write client
- Removing dead code
- Image quality/size optimizations

**Stop and ask:**
- API key choices or service selections that cost money
- Domain decisions
- Content changes to Amit's actual words
- Adding new npm dependencies
- Changing CMS schema structure after content exists
- Any action that sends email or messages to the client

### Git Configuration

```bash
git config user.email "shaygriever34@gmail.com"
git config user.name "Shay Greenberg"
```

### Sanity Operations

- Workspace name: `smile-amigo` (not "default")
- Schema deploy: `cd sanity && npx sanity@latest schema deploy`
- All fetches tagged `{ next: { tags: ["sanity"] } }`
- GROQ i18n pattern: `coalesce(field[$locale], field)` for flat strings, `coalesce(field[$locale], field.en)` for bilingual objects
- MCP patch with `options.list` arrays has a validation bug — use Sanity Studio browser UI for gallery tags

### Image Quality Standards

- Hero: quality 90, width 2560
- Gallery thumbnails: quality 85, width 1200
- About/profile images: quality 85, width 512
- Always use `next/image` with proper `sizes` attribute
- Blur-up placeholders via `getBlurDataURL()` for all gallery images

---

## DEPLOYMENT VERIFICATION GATES

After ANY deployment, verify:

| Route | EN | HE | Check |
|-------|----|----|-------|
| `/` | ☐ | ☐ | Hero, masonry gallery, mini-about, Instagram CTA, WhatsApp CTA |
| `/work` | ☐ | ☐ | Tag filters work (events/magnets/corporate/private/outdoor), masonry layout, lightbox |
| `/about` | ☐ | ☐ | Bio + approach sections, CTA |
| `/contact` | ☐ | ☐ | WhatsApp button, form, email/IG links |
| `/studio` | ☐ | — | 5 schema types visible, all Hebrew fields |
| `/stories` | ☐ | ☐ | 301 redirects to `/` |
| `/events` | ☐ | ☐ | 301 redirects to `/work?tag=events` |
| `/surf` | ☐ | ☐ | 301 redirects to `/work?tag=ocean` |

---

## BUSINESS CONTEXT

- **Shay = biz dev partner**: 20% of gross above ₪5K ILS/month
- **Current revenue**: ~₪8,400/month. Target: ₪20-30K
- **Australia visa deadline**: September 27, 2026 (6 months)
- **Morocco trip**: March 2026, embedded with Ido Hajaj (first Israeli to WSL Challenger). Exclusive content.
- **Growth Engine v1**: Documented in Claude.ai Tetra project + memory. 7-stage content supply chain, batch session model, narrative arc model. Awaiting Amit meeting to operationalize.
- **Summit CRM**: Amit has separate account (not Bitan's). Needs browser login to set up pipeline.

## REFERENCE

- **Design spec**: `docs/superpowers/specs/2026-03-30-amit-banuz-website-redesign.md`
- **Implementation plan**: `docs/superpowers/plans/2026-03-30-amit-banuz-website-redesign.md`
- **Pivot context doc**: Generated by Claude.ai Tetra project (smile-amigo-pivot-context.md)
- **Creator Growth Engine v1**: Claude.ai Tetra project document
- **Memory**: `smile-amigo-pivot-session.md` + `amit-growth-engine.md` in Claude Code memory

---

*Tetra v0.2 standard. This file is the permanent operating context for Claude Code on this project.*
