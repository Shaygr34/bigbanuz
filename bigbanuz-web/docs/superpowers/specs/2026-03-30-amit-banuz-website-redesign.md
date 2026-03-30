# Amit Banuz Website Redesign — Design Spec

**Date:** 2026-03-30
**Status:** Approved
**Approach:** Redesign-in-place on existing V3 codebase (Next.js 14 + Sanity v3 + Tailwind 3)
**Repo:** `~/Dev/Tetra/smile-amigo/bigbanuz-web/`

---

## Context

The current Smile Amigo website presents Amit Banuz as a dual-lane photographer (surf + events) with a corporate-feeling portfolio. The brand is pivoting to a creator-first personal brand where Amit himself is the product. The website must reflect this: lead with his visual style, show personality, convert visitors to WhatsApp inquiries.

Key constraints:
- Redesign in place on the V3 codebase — no stack migration
- Bilingual (HE primary, EN secondary) — existing i18n infrastructure preserved
- Sanity CMS (project `6q0h6ivm`, dataset `production`) — extend schemas, don't replace
- Morocco trip content (March 2026, with Ido Hajaj / WSL) arriving soon — hero placeholder needed
- Australia visa deadline September 27, 2026 — English presence matters

---

## 1. Information Architecture

### Navigation

```
Logo (Amit Banuz)    Work    About    Stories    Contact    [EN|עב]    WhatsApp CTA
```

### Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Hero + work grid + mini-about + Instagram feed + CTA | Redesigned |
| `/work` | Unified portfolio, tag-filtered (ocean, golden hour, people, energy, travel) | New (replaces `/events` + `/surf`) |
| `/about` | Short personal story, photo of Amit, locations strip | Simplified |
| `/stories` | Content hub — trip reports, BTS. Morocco first entry. | Repurposed |
| `/stories/[slug]` | Individual story page | Existing (story schema) |
| `/contact` | WhatsApp-first, simple form | Simplified |
| `/studio` | Sanity CMS (hidden from nav) | Unchanged |

### Killed Routes
- `/events` — removed, content absorbed into `/work` with tags
- `/surf` — removed, content absorbed into `/work` with tags

### Redirects (next.config.js)
- `/events` → `/work?tag=events` (301 permanent)
- `/surf` → `/work?tag=ocean` (301 permanent)
- Preserves any existing search engine indexing or shared links.

---

## 2. Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--ocean` | `#0A8A8F` | Primary accent, links, CTAs |
| `--ocean-light` | `#0FB5BA` | Hover states, highlights |
| `--ocean-dark` | `#076E72` | Active states |
| `--golden` | `#D4943A` | Warm accent, secondary CTA |
| `--golden-light` | `#E8B06A` | Hover on warm elements |
| `--sand` | `#F5F0E8` | Page background |
| `--sand-dark` | `#E8E0D0` | Cards, subtle borders |
| `--deep` | `#1A2E3E` | Dark sections, footer, navbar on scroll |
| `--deep-light` | `#243D50` | Dark section hover |
| `--ink` | `#1A1A1A` | Primary text |
| `--ink-muted` | `#5A5A5A` | Secondary text |
| `--white` | `#FAFAFA` | Text on dark backgrounds |

Killed: orange `#FACC15`, charcoal `#1A1A2E`, grey system. Dark mode removed — single warm-sand light theme.

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Headings (EN) | DM Sans | 700 | clamp scale |
| Body (EN) | Inter | 400/500 | 1rem base |
| Headings (HE) | Heebo | 700 | clamp scale |
| Body (HE) | Heebo | 400 | 1rem base |
| Hero display | DM Sans / Heebo | 700 | clamp(2.5rem, 5vw, 4rem) |

Type scale:
- Hero: `clamp(2.5rem, 5vw, 4rem)`
- H1: `clamp(2rem, 3.5vw, 3rem)`
- H2: `clamp(1.5rem, 2.5vw, 2rem)`
- H3: `1.25rem`
- Body: `1rem`
- Small: `0.875rem`

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section gap | `clamp(3rem, 6vw, 6rem)` | Between homepage sections |
| Content max-width | `1280px` | Main container |
| Gallery gap | `4px` | Tight mosaic grid |
| Text max-width | `640px` | Readable text blocks |
| Border radius | `2px` | Editorial, almost sharp |

### Motion

| Pattern | Spec | Notes |
|---------|------|-------|
| Page entry | Fade in, 0.4s ease-out | Fluid, ocean-like |
| Scroll reveal | opacity 0→1, translateY 20px→0, 0.5s [0.22, 1, 0.36, 1] | Tetra standard, short distance |
| Gallery hover | Scale 1.02, brightness +5% | Subtle |
| Stagger | 60ms between items | Fast for grids |
| Hero | No animation — instant render | Rule #1: content appears fast |
| Nav scroll | Transparent → `--deep` bg, 0.3s ease | Color transition |

Killed: shimmer skeletons, cinematic mobile menu stagger.

---

## 3. Component Architecture

### Homepage Sections (scroll order)

#### Hero
- Full-viewport height image or video
- Amit's name centered: "אמיט בנוז" / "Amit Banuz"
- Subtitle: "צלם · יוצר · גולש" / "Photographer · Creator · Surfer"
- Scroll indicator (chevron or line)
- Navbar transparent over hero, text white
- Data: `pageHome.heroImage` (existing) + `pageHome.heroVideo` (new, optional, priority over image)
- Replaces: `SplitGateway.tsx`

#### WorkGrid
- 6-9 curated photos in tight grid (3 cols desktop, 2 mobile)
- Mixed content from all domains
- "View all →" link to `/work`
- Data: `pageHome.featuredWork` (renamed from `featuredGallery`)
- Replaces: `FeaturedGallery.tsx`

#### MiniAbout
- Two-column: Amit photo (left/start) + short text + locations strip (right/end)
- RTL-aware layout
- "More about me →" link
- Data: `pageHome.miniAboutImage` (new) + pulls from `pageAbout` fields
- Replaces: empty dark navy section

#### InstagramFeed
- Existing `SocialFeed.tsx` component
- 8 posts, 4-column grid (2 mobile)
- "Follow @bigbanuz" link
- Graceful fallback if no token
- No changes needed to component logic — just needs tokens provisioned

#### CTA
- "בואו נדבר" / "Let's Talk"
- WhatsApp button (large, prominent, `--ocean` colored)
- Secondary: link to contact page
- Sand background
- Replaces: existing `CtaSection.tsx` (simplified)

### Killed Components
- `SplitGateway.tsx` — dual-lane hero
- `PressSection.tsx` — empty
- `TestimonialsSection.tsx` — no data
- `TrustSection.tsx` — no data
- `PackagesSection.tsx` — no pricing on new site
- `VideoReel.tsx` — replaced by hero video

### Modified Components
- `Navbar.tsx` — "Amit Banuz" text logo, new nav links, transparent→deep transition, new palette
- `Footer.tsx` — simplified: name, IG + WhatsApp links, Dodeca credit, `--deep` bg
- `MobileMenu.tsx` — simplified animation, new nav items, new palette

### New Pages

#### `/work` — Unified Portfolio
- Tag filter bar: All | Ocean | Golden Hour | People | Energy | Travel
- Masonry grid of individual images extracted from `gallery` documents (GROQ unwinds `images[]` from tagged galleries, flattens into single image array)
- Filtering is client-side (URL query param `?tag=ocean`, JS filter on loaded images) — simpler for a portfolio with < 500 images
- Tags are on gallery documents, not individual images — a gallery tagged "ocean" means all its images appear under ocean filter
- Lightbox on click (existing UI component reused)
- i18n: tag labels translated in messages files

#### `/stories` — Content Hub
- Grid of story cards: cover image, title, date, short description
- Links to `/stories/[slug]` (existing dynamic route)
- Uses existing `story` schema unchanged
- Morocco trip = first content entry (when assets arrive)

#### `/contact` — Simplified
- WhatsApp button (hero-sized, impossible to miss)
- Simple form below: name + email + "tell me about your moment" + phone (email kept — needed for non-WhatsApp follow-up)
- Instagram link
- Email link
- Uses existing `lead` schema for form submissions

---

## 4. Sanity Schema Changes

### Modified Schemas

#### `pageHome`
- **Add:** `heroVideo` — `{ type: 'url', title: 'Hero Video URL', description: 'Optional MP4 URL (self-hosted in /public/videos/ or external CDN). Takes priority over hero image. Max ~5MB for performance. Component renders with muted, autoplay, playsinline, loop attributes + poster image fallback from heroImage.' }`
- **Add:** `miniAboutImage` — `{ type: 'image', title: 'Mini About Photo', options: { hotspot: true } }`
- **Add:** `miniAboutText` — `{ type: 'object', fields: [{ name: 'en', type: 'text', rows: 3 }, { name: 'he', type: 'text', rows: 3 }] }`
- **Hide from Studio:** `eventsPreview`, `surfPreview` fields (keep in schema)
- **Rename display:** `featuredGallery` → keep field name, update Studio title to "Featured Work"

#### `gallery`
- **Add:** `tags` — `{ type: 'array', of: [{ type: 'string' }], options: { list: ['ocean', 'golden-hour', 'people', 'energy', 'travel', 'events', 'surf'] } }`
- **Modify:** `lane` field — remove `required()` validation, set `initialValue: 'mixed'`, hide from Studio (keep in schema for backward compat)
- **Hide from Studio:** `category` field (coexists with tags but hidden to avoid editor confusion)

#### `siteSettings`
- Update default `siteName` to "Amit Banuz"
- Update default `siteDescription` to reflect new positioning

### Unchanged Schemas
- `story` — already complete (title, slug, cover, body, language, publishedAt)
- `lead` — form submissions, works as-is
- `pageAbout` — CMS-editable, bilingual, locations array
- `testimonial` — stays hidden
- `packages` — stays in schema, hidden from Studio
- `productPrint` — stays in schema for future use
- `feature` — stays in schema

### No New Schemas
All 10 existing types are sufficient. No new document types needed.

---

## 5. Data Flow

### Gallery/Work Flow
```
Sanity gallery docs (with tags)
  → GROQ query filtered by tag param
  → /work page renders masonry grid
  → Lightbox on click
```

### Homepage Flow
```
pageHome singleton
  → heroImage/heroVideo, featuredWork refs, miniAbout fields
  → + pageAbout fields for mini-about section
  → + Instagram API for feed section
  → Render in section order
```

### Contact Flow
```
User fills form → server action → creates lead doc in Sanity → sends notification via Resend
WhatsApp button → direct link to wa.me/{number}
```

### Stories Flow
```
story documents in Sanity → /stories list page (sorted by publishedAt) → /stories/[slug] detail
```

---

## 6. Files Affected (Estimated)

### Design System
- `tailwind.config.ts` — new color tokens, font families, remove `darkMode: "class"`
- `app/globals.css` — new CSS variables, remove all `html.dark` / dark mode vars, remove shimmer animation
- `app/[locale]/layout.tsx` — replace Space Grotesk import with DM Sans, remove Rubik, remove dark mode init script

### Components (Modified)
- `components/layout/Navbar.tsx` — new logo, colors, nav links
- `components/layout/Footer.tsx` — simplified
- `components/layout/MobileMenu.tsx` — simplified
- `components/sections/SocialFeed.tsx` — minor styling updates

### Components (Rewritten)
- `components/sections/Hero.tsx` — existing file, complete rewrite to full-viewport hero (replaces SplitGateway usage)

### Components (New)
- `components/sections/WorkGrid.tsx` — homepage work preview
- `components/sections/MiniAbout.tsx` — homepage about section
- `components/sections/SimpleCTA.tsx` — WhatsApp-forward CTA

### Components (Deleted)
- `components/sections/SplitGateway.tsx`
- `components/sections/PressSection.tsx`
- `components/sections/TestimonialsSection.tsx`
- `components/sections/TrustSection.tsx`
- `components/sections/PackagesSection.tsx`
- `components/sections/VideoReel.tsx`

### Pages (Modified)
- `app/[locale]/page.tsx` — new homepage composition
- `app/[locale]/about/page.tsx` — simplified layout
- `app/[locale]/contact/page.tsx` — WhatsApp-first
- `app/[locale]/stories/page.tsx` — story list layout

### Pages (New)
- `app/[locale]/work/page.tsx` — unified portfolio

### Pages (Removed)
- `app/[locale]/events/page.tsx`
- `app/[locale]/surf/page.tsx`

### Sanity
- `sanity/schemas/pageHome.ts` — new fields
- `sanity/schemas/gallery.ts` — tags field
- `sanity/schemas/siteSettings.ts` — updated defaults

### Queries
- `lib/sanity/queries.ts` — new work query with tag filter, updated homepage query

### i18n
- `messages/en.json` — new/updated keys:
  - `Nav.work` (replaces `Nav.gallery`), `Nav.stories`, `Nav.about`, `Nav.contact`, `Nav.cta` ("Let's Talk")
  - `Work.tagAll`, `Work.tagOcean`, `Work.tagGoldenHour`, `Work.tagPeople`, `Work.tagEnergy`, `Work.tagTravel`
  - `Home.subtitle` ("Photographer · Creator · Surfer")
  - `Home.miniAboutMore` ("More about me")
  - `Home.ctaTitle`, `Home.ctaButton`
  - `Footer.brand` ("Amit Banuz"), `Footer.tagline`
  - Remove: `Nav.gallery`, `Nav.events`, `Nav.surf`, `Theme.*` (dark mode labels)
- `messages/he.json` — Hebrew equivalents of all the above

### Post-deploy CMS Migration
- Update `siteSettings` document: change siteName to "Amit Banuz", update description
- Populate `pageHome` new fields: `miniAboutImage`, `miniAboutText`
- Add `tags` to existing gallery documents (manual in Studio or via script)
- Update CLAUDE.md files (both parent and inner) to reflect new IA, nav, routes

---

## 7. What's NOT in Scope

- Domain purchase/migration (future — just update `NEXT_PUBLIC_SITE_URL`)
- Instagram token provisioning (infrastructure task, not code)
- Morocco content population (waiting for Amit's assets)
- E-commerce / print store (Tier 2 revenue, future)
- Content engine / OS hub (Track 3, separate project)
- Summit CRM setup (Track 4, separate session)
- TikTok / YouTube / Google Business Profile (operational, not code)
- Brand logo design (text logo for now)

---

## 8. Success Criteria

- [ ] Homepage loads with full-bleed hero, no split gateway
- [ ] Navigation shows: Work, About, Stories, Contact
- [ ] `/work` displays unified gallery with tag filtering
- [ ] Color palette is ocean/golden/sand throughout — no orange, no charcoal
- [ ] Typography is DM Sans + Heebo — no Space Grotesk
- [ ] "Amit Banuz" appears as site identity, not "Smile Amigo"
- [ ] WhatsApp CTA is prominent on every page
- [ ] Instagram feed section renders (with graceful fallback)
- [ ] Mobile experience feels native to an Instagram audience
- [ ] No pricing displayed anywhere
- [ ] No events/surf split anywhere
- [ ] All pages work in both EN and HE
- [ ] Lighthouse: ≥90 Performance, ≥95 Accessibility
