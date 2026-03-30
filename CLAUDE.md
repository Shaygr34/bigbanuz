# Amit Banuz — CLAUDE.md

> Tetra v0.2 standard. Last updated: March 30, 2026.

---

## Project

**Creator-brand personal site for Amit Banuz (@bigbanuz).**
Pivoted from "Smile Amigo" dual-lane photographer portfolio to unified personal brand.
Brand identity: "Amit Banuz — צלם · יוצר" (Photographer · Creator).
Site is LIVE on Vercel at `bigbanuz.vercel.app` — auto-deploy on push to `main`.

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
app/[locale]/              → Pages (5 routes × 2 locales)
app/[locale]/work/         → Unified portfolio with tag filtering
app/studio/[[...index]]/   → Embedded Sanity Studio
app/api/revalidate/        → ISR webhook endpoint
components/sections/       → Hero, WorkGrid, MiniAbout, SocialShowcase, SimpleCTA, SocialFeed, WorkGallery
components/ui/             → Reusable UI components (Lightbox, ScrollReveal, etc.)
components/layout/         → Navbar, MobileMenu, Footer
lib/sanity/client.ts       → Read + write Sanity clients
lib/sanity/queries.ts      → All GROQ queries (homePageQuery, allGalleriesQuery, pageAboutQuery, etc.)
lib/sanity/image.ts        → urlFor() + blur placeholders
lib/instagram.ts           → Instagram Graph API v21.0 client (ISR 1hr)
lib/actions/               → Server actions (contact leads)
lib/utils/constants.ts     → SITE_NAME, NAV_LINKS, WHATSAPP_PHONE, INSTAGRAM_URL
app/api/cron/refresh-instagram/ → Long-lived token refresh (1st/15th monthly)
sanity/schemas/            → 10 schema types
messages/en.json           → English i18n strings
messages/he.json           → Hebrew i18n strings
app/globals.css            → CSS custom properties + animations
tailwind.config.ts         → Design system tokens
docs/superpowers/specs/    → Design spec
docs/superpowers/plans/    → Implementation plan
```

## Brand

- **Display name**: "Amit Banuz" (all user-facing)
- **Instagram**: @bigbanuz
- **Email**: iambigbanuz@gmail.com
- **Domain**: Currently `bigbanuz.vercel.app`. Target: `smile-amigo.com` ($100, not purchased). Single env var swap (`NEXT_PUBLIC_SITE_URL`) when ready.
- **No "Smile Amigo" anywhere** in user-facing content. The name may become the events sub-brand later.

## Nav Structure

Work (/work) | About (/about) | Stories (/stories) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts`.

**Killed routes:** `/events` and `/surf` — 301 redirect to `/work?tag=events` and `/work?tag=ocean` respectively (configured in `next.config.mjs`).

## Schema Types (10)

siteSettings, pageHome, pageAbout, packages (hidden), gallery, testimonial (hidden), lead, productPrint (hidden), story, feature

**Key schema additions (March 30, 2026):**
- `pageHome.heroVideo` — URL field for optional hero video
- `pageHome.miniAboutImage` — photo of Amit for homepage about section
- `pageHome.miniAboutText` — bilingual short bio (en/he object)
- `pageHome.featuredPosts` — array of social post URLs (Instagram/TikTok) for future embedding
- `gallery.tags` — array of strings (ocean, golden-hour, people, energy, travel, events, surf)
- `gallery.lane` — hidden (was required, now optional with initialValue "mixed")
- `gallery.category` — hidden

## Current State (V1.4 — March 30, 2026)

**35 commits shipped in this session.** Full redesign + 4 elevation passes.

### What's Live
- Full-viewport hero with wave photo + "עמית בנוז · צלם · יוצר"
- "היילייטס" photo grid (homepage featured work)
- MiniAbout with Hebrew bio + location pills (פיליפינים, סרי לנקה, ישראל, אוסטרליה ✦)
- Instagram "עקבו אחריי" CTA section (deep bg)
- "בואו נדבר" WhatsApp CTA
- `/work` unified portfolio with tag filtering (client-side, URL params)
- `/about` "הסיפור שלי" — casual Hebrew copy
- `/contact` WhatsApp-first, simplified form
- `/stories` social content hub + story cards
- Syne + Secular One typography (creative personality)
- Ocean/golden/sand color system, no dark mode
- Blur-up image placeholders, quality 90 hero / 85 gallery
- 301 redirects for killed /events and /surf routes
- Bilingual EN/HE with RTL support

### What's Blocked (Needs External Input)
- **Instagram tokens** — Amit's login credentials needed to provision Graph API tokens → `SocialFeed` component lights up. Code is built: `lib/instagram.ts`, `components/sections/SocialFeed.tsx`, Vercel cron for token refresh.
- **Morocco content** — hero video/reel, surf action photos for gallery diversification. Amit returning from Morocco March 30, has exclusive Ido Hajaj (WSL Challenger) content.
- **Photo of Amit** — for `pageHome.miniAboutImage` and About page hero
- **About page hero** — currently shows a woman, needs Amit-at-work photo
- **Story body content** — old stories reference "magnet" business, needs editing in Studio

### Instagram Embeds — DO NOT ATTEMPT
Instagram oEmbed/iframe embeds are broken by Meta policy (login wall + API lockdown since 2024-2025). The Graph API image fetch approach (SocialFeed component) is the correct production pattern. TikTok embeds work fine via oEmbed. See memory file `smile-amigo-pivot-session.md` for full research.

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
| `/` | ☐ | ☐ | Hero, highlights grid, mini-about, Instagram CTA, WhatsApp CTA |
| `/work` | ☐ | ☐ | Tag filters work, gallery loads without flickering, lightbox |
| `/about` | ☐ | ☐ | "הסיפור שלי", bio, locations in Hebrew, CTA |
| `/stories` | ☐ | ☐ | Instagram CTA, story cards if any |
| `/contact` | ☐ | ☐ | WhatsApp button, form, email/IG links |
| `/studio` | ☐ | — | Structure tab loads, all schemas visible |
| `/events` | ☐ | ☐ | Redirects to `/work?tag=events` |
| `/surf` | ☐ | ☐ | Redirects to `/work?tag=ocean` |

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
