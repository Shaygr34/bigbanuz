# Smile Amigo — CLAUDE.md

> Tetra v0.2 standard. Last updated: March 17, 2026.

---

## Project

Photography portfolio + brand site for Amit Banuz (@bigbanuz / Smile Amigo).
Dual-lane business: Events (Israel, Hebrew-primary) + Surf (international, English-primary).
Site is LIVE on Vercel — you are iterating, not rebuilding.

## Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js | 14.2.5 | App Router, React Server Components |
| CMS | Sanity | v3.36.4 | Embedded Studio at `/studio`, project `6q0h6ivm`, dataset `production` |
| Styling | Tailwind CSS | 3.4.3 | Config via `tailwind.config.ts` |
| i18n | next-intl | 4.8.0 | EN + HE, RTL support, `prefix: always` |
| Email | Resend | 3.2.0 | Form notification delivery |
| Analytics | GA4 | — | Custom events via `lib/utils/analytics.ts` |
| Deploy | Vercel | — | Auto-deploy on push to `main` |

## Key Paths

```
app/[locale]/              → Pages (6 routes × 2 locales)
app/studio/[[...index]]/   → Embedded Sanity Studio
app/api/revalidate/        → ISR webhook endpoint
components/sections/       → Page section components
components/ui/             → Reusable UI components
components/layout/         → Navbar, MobileMenu, Footer
components/analytics/      → GA4 script loader
lib/sanity/client.ts       → Read + write Sanity clients
lib/sanity/queries.ts      → All GROQ queries
lib/sanity/image.ts        → urlFor() + blur placeholders
lib/instagram.ts           → Instagram Graph API v21.0 client (ISR 1hr)
lib/actions/               → Server actions (contact, collab, event leads)
lib/utils/                 → Constants, WhatsApp helper, analytics events
app/api/cron/refresh-instagram/ → Long-lived token refresh (1st/15th monthly)
vercel.json                → Cron schedule config
sanity/schemas/            → All 10 schema types
messages/en.json           → English i18n strings
messages/he.json           → Hebrew i18n strings
app/globals.css            → CSS custom properties + animations
tailwind.config.ts         → Extended design system tokens
CODEBASE_REPORT.md         → 902-line V2 ground truth audit
```

## Brand

- **Display name**: "Smile Amigo" (all user-facing)
- **Instagram**: @bigbanuz (stays — this is the real IG handle)
- **Email**: iambigbanuz@gmail.com (temporary — smile-amigo email incoming)
- **Logo**: Current asset in Sanity siteSettings (basic, client upgrading later)
- **Domain**: Currently `smile-amigo.vercel.app`. `smile-amigo.com` pending purchase. Single env var swap (`NEXT_PUBLIC_SITE_URL`) when ready.

## Nav Structure
Gallery (/) | Stories (/stories) | About (/about) | Contact (/contact)
Driven by `NAV_LINKS` in `lib/utils/constants.ts`. Events/Surf routes still exist but not in nav.

## V3-Final Status (March 2026)
- **Instagram Graph API**: Live feed via SocialFeed component (async RSC, self-fetching), token refresh cron
- **socialHighlight schema removed**: Replaced by live Instagram feed
- **Navbar redesign**: Premium typography, animated underline hover, cinematic mobile menu
- **Testimonials hidden**: Removed from rendering (schema + CMS data preserved)
- **SEO URLs unified**: All fallback URLs → `smile-amigo.vercel.app`
- **Dodeca footer credit**: "Built by Dodeca" link below copyright
- **Studio crash fix**: Stale Vercel cache after schema deletion → `vercel --prod --force`

---

## OPERATIONAL RULES

### Decision-Making Authority

**Proceed without asking:**
- Font size tweaks, spacing adjustments, color shade variations within the defined palette
- Package version decisions when spec says "X+" (use latest stable)
- File/folder naming within the established project structure
- Fixing lint/build errors
- Committing and pushing to main
- Setting env vars you generated or already have (Sanity project ID, dataset, tokens via CLI)
- Creating Sanity webhooks via Management API or CLI
- Creating/updating Sanity documents programmatically via write client
- Setting Vercel env vars via `vercel env add` for all environments
- Retry on transient errors (API timeouts, network issues)
- Removing dead/orphaned code identified in CODEBASE_REPORT.md
**Stop and ask:**
- API key choices or service selections that cost money (e.g., Resend key, GA4 ID)
- Domain decisions
- Content changes to client-supplied copy (Amit's actual words)
- Anything that changes the public-facing URL structure
- Adding new npm dependencies not in the spec
- Changing CMS schema structure after content exists (migration risk)
- Any action that sends email or messages to the client
- Deleting Sanity documents that contain real client content

### Environment Variables

**Set any env var you can generate or already have.** Push to Vercel via `vercel env add` programmatically for all environments (development, preview, production). Don't wait for human input.

```bash
# Example: setting a generated revalidation secret
vercel env add SANITY_REVALIDATE_SECRET production preview development
```

**Human-provided credentials (stop and ask):**
- `RESEND_API_KEY` — requires Resend account
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` — requires GA4 property
- `NEXT_PUBLIC_WHATSAPP_PHONE` — requires client's number
- Any third-party service API key not generated during build

### Git Configuration

```bash
git config user.email "shaygriever34@gmail.com"
git config user.name "Shay Greenberg"
```
---

## SANITY REVALIDATION

### Architecture
ISR with on-demand revalidation: Sanity webhook → `/api/revalidate?secret=<SECRET>` → `revalidateTag("sanity")`.

All fetches use `{ next: { tags: ["sanity"] } }` — consistent across every page.

### Webhook Setup (YOUR JOB, NOT HUMAN'S)

Create the webhook programmatically via Sanity Management API:

```bash
curl -X POST "https://api.sanity.io/v2021-10-04/hooks/projects/6q0h6ivm" \
  -H "Authorization: Bearer $SANITY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "document",
    "name": "Revalidate Next.js",
    "url": "https://<VERCEL_URL>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>",
    "httpMethod": "POST",
    "apiVersion": "2024-01-01",
    "includeDrafts": false,
    "dataset": "production",
    "rule": { "on": ["create", "update", "delete"] },
    "projection": "{_type}"
  }'
```

If the token lacks webhook management permissions, use:
```bash
npx sanity hook create
```

**After domain migration**: Update webhook URL to match `NEXT_PUBLIC_SITE_URL`.
### Verification
After creating webhook: publish any document in Sanity Studio → confirm live site updates within ~10 seconds.

---

## SANITY EMBEDDED STUDIO — MANDATORY CHECKLIST

This prevents the most common Sanity Studio failure. Follow exactly.

### Configuration (sanity/sanity.config.ts)
```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  basePath: '/studio',  // ← CRITICAL: without this, "Tool not found" error
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6q0h6ivm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

### Studio Route (app/studio/[[...index]]/page.tsx)
```tsx
'use client'  // ← REQUIRED: Sanity uses createContext at module level
```

### CORS
After any new Vercel URL (domain change, project rename), add to Sanity CORS origins:
```bash
npx sanity cors add https://your-project.vercel.app --credentials
```
### Verification Gate
**Before marking any Studio-touching milestone as complete:**
1. Deploy to Vercel
2. Open `/studio` in a real browser (not curl, not build check)
3. Verify: Structure tab loads, all document types visible, can create/edit a test document
4. If it fails: debug in browser console, fix, redeploy, reverify

---

## DEPLOYMENT VERIFICATION GATES

After ANY deployment, verify all public routes load correctly:

| Route | EN | HE | Check |
|-------|----|----|-------|
| `/` | ☐ | ☐ | Split gateway, featured gallery, press, CTA |
| `/events` | ☐ | ☐ | Packages from CMS, gallery (not in nav) |
| `/surf` | ☐ | ☐ | Gallery with filters, locations strip (not in nav) |
| `/stories` | ☐ | ☐ | Instagram feed (SocialFeed) + story cards |
| `/about` | ☐ | ☐ | Bio, approach, locations from CMS |
| `/contact` | ☐ | ☐ | Form, social cards, WhatsApp link |
| `/studio` | ☐ | — | Structure tab loads, all schemas visible |

**Dark mode**: Spot-check at least homepage + events in dark mode.

**CLI pre-check** (not sufficient alone for client-rendered routes):
```bash
for route in "" "events" "surf" "stories" "about" "contact"; do
  echo "$route: $(curl -s -o /dev/null -w '%{http_code}' https://<URL>/en/$route)"
done
```
---

## DESIGN SPRINT

Between final build milestone and handoff, execute a Design Sprint. Not optional polish — it's the product surface.

### Three Tiers

**Tier 1 — Load-Bearing Visuals:**
- Hero sections (images, overlays, headlines)
- Page transitions and scroll behavior
- Gallery presentation (lightbox, hover states)

**Tier 2 — Brand-Defining Elements:**
- Typography hierarchy (H1 dramatic, H2/H3 supportive)
- Color system application (amber primary, ocean secondary, charcoal backgrounds)
- Icon/illustration consistency
- Section rhythm and spacing

**Tier 3 — Polish:**
- Form states (focus, error, success)
- Footer completeness
- Loading skeletons match design
- Favicon, OG images, web manifest
- Nav states (scroll, mobile, active page)

### Constraints
- No new dependencies without justification
- No layout changes that break existing responsive behavior
- Performance budget: don't degrade Lighthouse scores
---

## CMS CONTENT RULES

### Bilingual Strategy
- All CMS documents use `coalesce()` in GROQ for bilingual fields
- English is populated first; Hebrew when client provides
- Missing Hebrew falls back to English gracefully — no breakage
- i18n message files (`messages/*.json`) handle UI chrome only

### Content Population
- All content operations use the Sanity write client programmatically
- No manual Sanity Studio edits required for initial population
- Placeholder content must be clearly marked: `[PLACEHOLDER — Amit to replace]`
- Real content replaces placeholders when available from client

### Schema Changes
Before any schema modification:
- [ ] `cd sanity && npx sanity@latest schema deploy`
- [ ] Studio loads at `/studio` without errors
- [ ] Existing documents still validate
- [ ] If schema change affects existing documents, migrate them programmatically

---

## FEATURE LEDGER (DO NOT BUILD)

These are confirmed future features. Schema scaffolding may exist. Leave as-is.

| Feature | Target | Current State |
|---|---|---|
| Print Store (editions, counters, sold-out) | V4+ | `productPrint` schema exists, no UI |
| Custom Print Request (`/custom-print`) | V4+ | Nothing built |
| Email Subscription / Newsletter | V4+ | Nothing built |
| Events Booking Form | V4+ | `submitEventLead` action exists, no UI |
| Domain Migration (`smile-amigo.com`) | Post-V3 | Pending purchase |
---

## REFERENCE

- **CODEBASE_REPORT.md** — 902-line V2 audit (in repo root). Read before modifying any file.
- **docs/decision-log.md** — All build decisions. Update after every significant change.
- **docs/v3-scope.md** — What V3 delivered.
- **docs/links-hub.md** — Live URLs, dashboards, repo links.

---

*Tetra v0.2 standard. This file is the permanent operating context for Claude Code on this project.*