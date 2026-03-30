# Bigbanuz Web — Codebase Audit Report

> Generated: 2026-03-04
> Purpose: Ground-truth context for V3 design rehaul
> Scope: Every file in the repository was read; nothing was skipped or summarized from filenames alone.

---

## 1. Project Overview

| Field | Value |
|---|---|
| **Name** | Bigbanuz Web |
| **Description** | Photography portfolio & booking site for Amit Banuz — events + surf photography |
| **Framework** | Next.js 14.2.5 (App Router, React Server Components) |
| **React** | 18.3.1 |
| **CMS** | Sanity v3.36.4 (embedded Studio at `/studio`) |
| **Styling** | Tailwind CSS 3.4.3 |
| **i18n** | next-intl 4.8.0 (EN + HE), RTL support |
| **Deploy** | Vercel (auto-deploy on push to `main`) |
| **Repo** | `git@github.com:Shaygr34/bigbanuz.git` |
| **Branch** | `main` (direct push) |
| **Sanity Project** | `6q0h6ivm`, dataset `production`, workspace `smile-amigo` |
| **Node** | >=18 (inferred from Next.js 14 requirements) |

### Dependencies (package.json)

**Runtime:**
- `next` 14.2.5, `react` / `react-dom` 18.3.1
- `sanity` 3.36.4, `@sanity/client` 6.15.3, `@sanity/image-url` 1.0.2, `next-sanity` 9.0.11
- `next-intl` 4.8.0
- `resend` 3.2.0 (email delivery)
- `styled-components` 6.1.11 (Sanity Studio dependency)

**Dev:**
- `typescript` 5.4.5
- `tailwindcss` 3.4.3, `postcss` 8.4.38, `autoprefixer` 10.4.19
- `eslint` 8.57.0, `eslint-config-next` 14.2.5
- `@types/node` 20.12.12, `@types/react` 18.3.3, `@types/react-dom` 18.3.0

---

## 2. File Tree

```
bigbanuz-web/
├── app/
│   ├── globals.css                        # CSS custom properties, animations, Hebrew font override
│   ├── robots.ts                          # Allow all, disallow /studio/ and /api/
│   ├── sitemap.ts                         # Static sitemap: 6 routes × 2 locales
│   ├── [locale]/
│   │   ├── layout.tsx                     # Root locale layout (metadata, JSON-LD, fonts, nav, footer)
│   │   ├── page.tsx                       # Homepage
│   │   ├── loading.tsx                    # Home loading skeleton
│   │   ├── not-found.tsx                  # 404 page
│   │   ├── events/
│   │   │   ├── page.tsx                   # Events photography page
│   │   │   └── loading.tsx                # Events loading skeleton
│   │   ├── surf/
│   │   │   ├── page.tsx                   # Surf photography page
│   │   │   └── loading.tsx                # Surf loading skeleton
│   │   ├── stories/
│   │   │   ├── page.tsx                   # Stories listing
│   │   │   ├── loading.tsx                # Stories loading skeleton
│   │   │   └── [slug]/
│   │   │       └── page.tsx               # Story detail (dynamic)
│   │   ├── about/
│   │   │   ├── page.tsx                   # About page
│   │   │   └── loading.tsx                # About loading skeleton
│   │   └── contact/
│   │       └── page.tsx                   # Contact page
│   ├── contact/
│   │   └── loading.tsx                    # ⚠ MISPLACED — outside [locale] folder
│   ├── studio/
│   │   └── [[...index]]/
│   │       ├── page.tsx                   # Sanity Studio (client component)
│   │       └── layout.tsx                 # Standalone Studio layout
│   └── api/
│       ├── revalidate/
│       │   └── route.ts                   # ISR webhook: POST ?secret=...
│       └── seed/
│           └── route.ts                   # Idempotent CMS seed data
├── components/
│   ├── sections/
│   │   ├── SplitGateway.tsx               # Homepage split-screen hero
│   │   ├── VideoReel.tsx                  # Two autoplay video cards
│   │   ├── FeaturedGallery.tsx            # Gallery grid wrapper
│   │   ├── PressSection.tsx               # Features & Collaborations
│   │   ├── PackagesSection.tsx            # Event packages (card/table toggle)
│   │   ├── TrustSection.tsx               # 4 trust items with icons
│   │   ├── SurfGallery.tsx                # Gallery with category filter
│   │   ├── LocationsStrip.tsx             # Horizontal location cards
│   │   ├── TestimonialsSection.tsx         # Testimonial grid
│   │   ├── CtaSection.tsx                 # Dark CTA with WhatsApp/IG/email
│   │   └── Hero.tsx                       # Full-viewport hero image
│   ├── ui/
│   │   ├── Button.tsx                     # Polymorphic button (3 variants, 3 sizes)
│   │   ├── GalleryGrid.tsx                # CSS columns masonry + Lightbox trigger
│   │   ├── Lightbox.tsx                   # Fullscreen image viewer (keyboard, swipe)
│   │   ├── ScrollReveal.tsx               # IntersectionObserver reveal animation
│   │   ├── ContactForm.tsx                # General contact form
│   │   ├── CollabForm.tsx                 # Surf collaboration form
│   │   ├── PackageCard.tsx                # Single package card
│   │   ├── PackageComparisonTable.tsx     # Package comparison table
│   │   ├── CategoryFilter.tsx             # Tab-style filter (a11y tablist)
│   │   ├── LanguageSwitcher.tsx           # EN|עב toggle
│   │   ├── ThemeToggle.tsx                # Dark mode toggle
│   │   ├── ScrollToTop.tsx                # Scroll-to-top FAB
│   │   ├── StoryCard.tsx                  # Story listing card
│   │   ├── TestimonialCard.tsx            # Quote card with avatar
│   │   └── ViewToggle.tsx                 # Cards/Compare toggle
│   ├── layout/
│   │   ├── Navbar.tsx                     # Fixed nav (transparent → solid)
│   │   ├── MobileMenu.tsx                 # Full-screen mobile overlay
│   │   └── Footer.tsx                     # Dark footer with socials
│   └── analytics/
│       └── GoogleAnalytics.tsx            # Conditional GA4 script
├── lib/
│   ├── sanity/
│   │   ├── client.ts                      # Read client + write client
│   │   ├── image.ts                       # urlFor() + blur data URL
│   │   └── queries.ts                     # All GROQ queries (12 queries)
│   ├── actions/
│   │   ├── submitContactLead.ts           # Server action: general contact
│   │   ├── submitCollabLead.ts            # Server action: surf collab
│   │   └── submitEventLead.ts             # Server action: events contact ⚠ NO UI
│   └── utils/
│       ├── constants.ts                   # Site name, URLs, nav links
│       ├── whatsapp.ts                    # WhatsApp deep link builder
│       └── analytics.ts                   # GA4 event helpers (7 events)
├── sanity/
│   ├── sanity.config.ts                   # Studio config (workspace: smile-amigo)
│   └── schemas/
│       ├── index.ts                       # Schema registry (9 types)
│       ├── siteSettings.ts
│       ├── pageHome.ts
│       ├── packages.ts
│       ├── gallery.ts
│       ├── testimonial.ts
│       ├── lead.ts
│       ├── productPrint.ts                # V2-ready, no UI
│       ├── story.ts
│       └── feature.ts
├── i18n/
│   ├── routing.ts                         # Locales: en, he; prefix: always
│   ├── navigation.ts                      # createNavigation exports
│   └── request.ts                         # getRequestConfig
├── messages/
│   ├── en.json                            # English translations (all namespaces)
│   └── he.json                            # Hebrew translations (all namespaces)
├── public/
│   ├── og-default.jpg                     # 1200×630 OG image (92KB)
│   ├── surf-reel.mp4                      # Surf video
│   └── drone-reel.mp4                     # Drone video
├── middleware.ts                           # next-intl middleware
├── next.config.mjs                        # Image domains, next-intl plugin
├── tailwind.config.ts                     # Extended design system
├── tsconfig.json                          # Strict mode, path alias @/*
├── postcss.config.mjs                     # Tailwind + autoprefixer
├── .eslintrc.json                         # next/core-web-vitals
├── .env.local.example                     # All env vars documented
├── package.json
├── package-lock.json
├── CLAUDE.md                              # Project context doc
└── CODEBASE_REPORT.md                     # This file
```

---

## 3. Routes & Pages

### Static Routes (6 routes × 2 locales = 12 URLs in sitemap)

| Route | Server/Client | Data Fetching | Cache Strategy |
|---|---|---|---|
| `/[locale]` | Server | `homePageQuery`, `galleryByLaneQuery` ×2, `testimonialsQuery`, `featuresQuery` via `Promise.all` | `next: { tags: ["sanity"] }` (ISR) |
| `/[locale]/events` | Server | `packagesQuery`, `galleryByLaneQuery("events")`, `testimonialsByLaneQuery("events")` via `Promise.all` | `next: { tags: ["sanity"] }` |
| `/[locale]/surf` | Server | `galleryByLaneQuery("surf")` | `next: { tags: ["sanity"] }` |
| `/[locale]/stories` | Server | `storiesQuery` (locale-filtered) | `next: { tags: ["sanity"] }` |
| `/[locale]/about` | Server | `galleryByLaneQuery("surf")` (hero image only) | `next: { tags: ["sanity"] }` |
| `/[locale]/contact` | Server | None — static form + contact cards | Static |

### Dynamic Routes

| Route | Data Fetching | Notes |
|---|---|---|
| `/[locale]/stories/[slug]` | `storyBySlugQuery` by slug param | No `generateStaticParams` — fully dynamic |

### Special Routes

| Route | Purpose |
|---|---|
| `/studio/[[...index]]` | Embedded Sanity Studio (client-only, standalone layout) |
| `/api/revalidate` | POST webhook — validates `?secret=`, calls `revalidateTag("sanity")` |
| `/api/seed` | GET — idempotent seed of CMS demo data |

### Loading Skeletons

| Path | Status |
|---|---|
| `app/[locale]/loading.tsx` | Shimmer: hero + video + gallery + press + testimonials |
| `app/[locale]/events/loading.tsx` | Shimmer: hero + packages + gallery |
| `app/[locale]/surf/loading.tsx` | Shimmer: hero + filter + gallery |
| `app/[locale]/stories/loading.tsx` | Shimmer: header + 6 cards |
| `app/[locale]/about/loading.tsx` | Shimmer: hero + story + locations |
| `app/contact/loading.tsx` | **Misplaced** — outside `[locale]`, never served by Next.js routing |

---

## 4. Component Inventory

### Section Components (`components/sections/`)

| Component | Client/Server | Props | Behavior |
|---|---|---|---|
| **SplitGateway** | `"use client"` | `eventsImage`, `surfImage`, `eventsHeadline`, `eventsSubline`, `eventsCta`, `surfHeadline`, `surfSubline`, `surfCta` | Split-screen hero. Two `Lane` sub-components. Analytics: `trackEvent(laneClick)`. Hover zoom effect. |
| **VideoReel** | `"use client"` | `title`, `subtitle` | Two video cards (surf-reel.mp4, drone-reel.mp4). `<video autoPlay muted loop playsInline>`. Play button overlay toggles play/pause. |
| **FeaturedGallery** | Server | `images: GalleryImage[]`, `title`, `subtitle`, `viewAllLabel` | Wraps `GalleryGrid` with heading. Returns `null` when `images.length === 0`. |
| **PressSection** | Server | `features: PressFeature[]`, `title`, `readArticleLabel` | `isSingle` branch: 1 feature → `SingleFeatureCard` (horizontal hero layout), 2+ → `GridFeatureCard` grid (md:2, lg:3 columns). Returns `null` when empty. |
| **PackagesSection** | `"use client"` | `packages`, `title`, `subtitle`, `viewMode` labels | Card/table toggle via `ViewToggle`. Maps packages to `PackageCard` or `PackageComparisonTable`. |
| **TrustSection** | Server | `items` (with defaults), `title` | 4 trust items: Fast Delivery, Premium Quality, Personal Attention, Instant Magnets. Inline SVG icons. |
| **SurfGallery** | `"use client"` | `galleries`, `allLabel` | `CategoryFilter` (All, Action, Lifestyle, Destinations, Behind the Lens) + `GalleryGrid`. Client-side filtering by `gallery.category`. |
| **LocationsStrip** | Server | `locations` (with defaults), `title` | Horizontal scroll strip. 4 location cards (Philippines, Sri Lanka, Israel, Australia "Coming Soon"). Gradient overlays. |
| **TestimonialsSection** | Server | `testimonials`, `title` | Grid of `TestimonialCard` (md:2, lg:3). Returns `null` when empty. |
| **CtaSection** | Server | `headline`, `whatsappLabel`, `emailLabel?`, `instagramLabel?`, `instagramHref?` | Dark charcoal background. WhatsApp CTA (always), optional email and Instagram buttons. |
| **Hero** | Server | `image`, `headline`, `subline?`, `primaryCta?`, `secondaryCta?`, `overlayOpacity?`, `minHeight?` | Full-viewport hero. `priority` image loading. Gradient overlay from bottom. |

### UI Components (`components/ui/`)

| Component | Client/Server | Key Details |
|---|---|---|
| **Button** | Server | Polymorphic: renders `<a>` when `href` provided, `<button>` otherwise. Variants: `primary` (sun gradient), `secondary` (charcoal gradient), `outline`. Sizes: `sm`, `md`, `lg`. External links get `target="_blank"` + `rel="noopener noreferrer"`. |
| **GalleryGrid** | `"use client"` | CSS `columns` masonry (2/3/4 cols by breakpoint). Click opens `Lightbox`. Hover overlay shows caption + location. `blurDataURL` placeholders. Uses `next/image` with `fill`. |
| **Lightbox** | `"use client"` | Fullscreen viewer. Keyboard: Escape (close), ←/→ (navigate). Touch: swipe left/right. Focus trap. `document.body.style.overflow = "hidden"` scroll lock. Counter overlay. |
| **ScrollReveal** | `"use client"` | `IntersectionObserver` (threshold 0.15). Respects `prefers-reduced-motion: reduce`. Directions: up (default), down, left, right. Configurable `delay`. |
| **ContactForm** | `"use client"` | Fields: name (required), email (required), subject (select: General/Event/Collaboration/Other), message (required). Calls `submitContactLead`. Success state with green check. GA4 `emailSubmit` event. |
| **CollabForm** | `"use client"` | Fields: name (required), email (required), company, project description (textarea, required), budget range (select: Under $1K / $1K-$5K / $5K-$10K / $10K+). Calls `submitCollabLead`. GA4 `collabSubmit` event. |
| **PackageCard** | Server | Package display. Featured variant: dark bg, border accent, "POPULAR" badge. Inclusions as checklist. WhatsApp CTA with package context message. |
| **PackageComparisonTable** | Server | Builds union of all inclusions across packages. Packages as columns, inclusions as rows. ✓/— indicators. Featured column highlighted. |
| **CategoryFilter** | `"use client"` | `role="tablist"` with `role="tab"` buttons. Active state: sun gradient background. |
| **LanguageSwitcher** | `"use client"` | `EN|עב` toggle. Uses `useRouter().replace()` from next-intl navigation. |
| **ThemeToggle** | `"use client"` | Sun/moon SVG icon with rotation animation. Reads/writes `localStorage("theme")`. Toggles `dark` class on `<html>`. |
| **ScrollToTop** | `"use client"` | Fixed bottom-right button. Appears after 500px scroll. `window.scrollTo({ top: 0, behavior: "smooth" })`. |
| **StoryCard** | Server | Card with optional image (Sanity CDN), date (formatted), location badge, title, description (line-clamp-2). Links to `/stories/{slug}`. |
| **TestimonialCard** | Server | Decorative `"` quote mark. Avatar image or initial-letter fallback (first letter of name). Name + context. |
| **ViewToggle** | `"use client"` | Two-button toggle (Cards / Compare) with `role="tablist"`. Active state styling. |

### Layout Components (`components/layout/`)

| Component | Client/Server | Key Details |
|---|---|---|
| **Navbar** | `"use client"` | Fixed position. Transparent on dark hero pages (checks `isHeroPage` for `/`, `/events`, `/surf`), transitions to solid on scroll (50px threshold). Logo fetched from Sanity `siteSettings`. Desktop: nav links + LanguageSwitcher + ThemeToggle + WhatsApp CTA. Mobile: hamburger → MobileMenu. |
| **MobileMenu** | `"use client"` | Full-screen overlay (`fixed inset-0 z-50`). Escape key closes. Focus trap (first/last focusable element loop). `body.style.overflow = "hidden"`. Nav links + WhatsApp CTA + language/theme controls. |
| **Footer** | Server | Dark charcoal background. Brand tagline text. Instagram + WhatsApp icon links. Copyright with dynamic year. |

### Analytics (`components/analytics/`)

| Component | Details |
|---|---|
| **GoogleAnalytics** | Conditionally renders GA4 `<Script>` tags when `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set. Uses `next/script` with `afterInteractive` strategy. |

---

## 5. Design System & Tokens

### Color Tokens (CSS Custom Properties)

Defined in `app/globals.css`, consumed via `tailwind.config.ts`:

```css
/* Light mode (default) */
:root {
  --color-bg: 255 255 255;         /* white */
  --color-fg: 23 23 23;            /* near-black */
  --color-muted: 115 115 115;      /* gray */
  --color-border: 229 229 229;     /* light gray */
  --color-card: 250 250 250;       /* off-white */
  --color-accent: 245 158 11;      /* amber-500 (sun) */
  --color-accent-hover: 217 119 6; /* amber-600 */
}

/* Dark mode */
.dark {
  --color-bg: 23 23 23;
  --color-fg: 250 250 250;
  --color-muted: 163 163 163;
  --color-border: 64 64 64;
  --color-card: 38 38 38;
  --color-accent: 251 191 36;      /* amber-400 */
  --color-accent-hover: 245 158 11;
}
```

### Fixed Colors (Tailwind config)

```js
charcoal: "#1a1a2e"        // Dark sections, footer, CTA backgrounds
sun: "#f59e0b"             // Primary accent (amber-500)
"sun-light": "#fbbf24"     // Hover accent (amber-400)
"sun-dark": "#d97706"      // Active accent (amber-600)
overlay: "rgba(0,0,0,0.6)" // Image overlays
"white-pure": "#ffffff"     // Card backgrounds
"gray-mid": "#737373"       // Secondary text
```

### Typography

**Font Families (Google Fonts):**

| Role | English | Hebrew |
|---|---|---|
| Heading (`font-heading`) | Space Grotesk (700) | Rubik (700) |
| Body (`font-body`) | Inter (400, 500, 600, 700) | Heebo (400, 500, 600, 700) |

Hebrew override in `globals.css`:
```css
html[lang="he"] {
  --font-heading: "Rubik", sans-serif;
  --font-body: "Heebo", sans-serif;
}
```

**Font Sizes (fluid, clamp-based):**

```js
h1: ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }]
h2: ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }]
h3: ["clamp(1.25rem, 2.5vw, 1.75rem)", { lineHeight: "1.3" }]
body: ["clamp(1rem, 1.5vw, 1.125rem)", { lineHeight: "1.7" }]
small: ["0.875rem", { lineHeight: "1.5" }]
caption: ["0.75rem", { lineHeight: "1.4" }]
```

### Spacing

```js
section: "clamp(4rem, 8vw, 8rem)"   // Vertical section padding
```

### Max Widths

```js
content: "1200px"   // Main content
text: "680px"       // Prose/text blocks
wide: "1440px"      // Full-width sections
```

### Shadows

```js
card: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)"
"card-hover": "0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)"
"sun-glow": "0 0 20px rgba(245,158,11,0.3)"
```

### Gradients (via backgroundImage)

```js
"gradient-hero": "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)"
"gradient-sun": "linear-gradient(135deg, #f59e0b, #fbbf24)"
"gradient-charcoal": "linear-gradient(135deg, #1a1a2e, #2d2d44)"
```

### Animations

```css
/* globals.css */
@keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
@keyframes page-fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
```

### Breakpoints

```js
sm: "640px", md: "768px", lg: "1024px", xl: "1280px"
```

### Dark Mode

Class-based (`darkMode: "class"` in Tailwind config). Inline script in `layout.tsx` checks `localStorage.theme` and `prefers-color-scheme` before paint to prevent flash.

---

## 6. Sanity CMS State

### Studio Configuration

- **Config file**: `sanity/sanity.config.ts`
- **Workspace name**: `smile-amigo`
- **Project ID**: `6q0h6ivm`
- **Dataset**: `production`
- **Plugins**: structureTool, visionTool
- **Access**: Embedded at `/studio` via `next-sanity` `NextStudio`

### Schema Types (9 registered)

#### `siteSettings` (singleton)
| Field | Type | Notes |
|---|---|---|
| `siteName` | string | |
| `siteDescription` | text | |
| `logo` | image | Hotspot enabled |
| `socialLinks` | object | `instagram` (url), `whatsapp` (string), `email` (email) |
| `ctaWhatsappMessage` | string | |
| `seoDefaults` | object | `title` (string), `description` (text), `ogImage` (image) |
| `analyticsId` | string | |

#### `pageHome` (singleton)
| Field | Type | Notes |
|---|---|---|
| `heroImage` | image | Required, hotspot |
| `heroHeadline` | string | |
| `heroSubline` | string | |
| `eventsPreview` | object | `image`, `headline`, `bullets` (string[]), `ctaText` |
| `surfPreview` | object | Same structure as eventsPreview |
| `featuredGallery` | array of references | → `gallery` |
| `bottomCtaText` | string | |

#### `packages`
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Source: title |
| `priceILS` | number | Required, min 0 |
| `priceDisplay` | string | e.g. "₪2,500" |
| `inclusions` | array of strings | |
| `featured` | boolean | |
| `sortOrder` | number | |
| `ctaText` | string | |

#### `gallery`
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Source: title |
| `lane` | string | Options: events, surf, mixed. Required. |
| `category` | string | Options: action, lifestyle, destinations, behind-the-lens, events |
| `images` | array of objects | Each: `image` (required, hotspot), `alt` (required), `caption`, `location`, `featured` (boolean) |
| `sortOrder` | number | |
| `seo` | object | `title`, `description` |

#### `testimonial`
| Field | Type | Notes |
|---|---|---|
| `quote` | text | Required |
| `name` | string | Required |
| `context` | string | e.g. "Bar Mitzvah, Tel Aviv" |
| `avatar` | image | Hotspot |
| `sourceLink` | url | |
| `lane` | string | Options: events, surf, general |
| `featured` | boolean | |
| `sortOrder` | number | |

#### `lead`
| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `email` | string | |
| `phone` | string | |
| `source` | string | Options: events-contact, surf-collab, general-contact |
| `packageInterest` | string | |
| `projectDescription` | text | |
| `budgetRange` | string | |
| `status` | string | Options: new (default), contacted, converted, archived |
| `notes` | text | |

#### `productPrint` (V2-ready — no UI in V1)
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `image` | image | Required, hotspot |
| `sizeOptions` | array of objects | Each: `label`, `dimensions`, `priceILS` |
| `currency` | string | Default: "ILS" |
| `available` | boolean | Default: true |
| `fulfillmentProviderId` | string | |
| `slug` | slug | Source: title |

#### `story`
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Required, source: title |
| `image` | image | Hotspot |
| `shortDescription` | text | Max 200 chars |
| `body` | text | Rows: 20 |
| `publishedAt` | datetime | |
| `location` | string | |

Note: `story` uses document-level localization (no `language` field in schema but query filters by it). The `body` field is plain text, not Portable Text.

#### `feature`
| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `author` | string | Required |
| `date` | string | |
| `url` | url | Required |
| `image` | image | Hotspot |
| `imageUrl` | url | External image fallback |
| `excerpt` | text | |
| `featured` | boolean | Default: true |
| `sortOrder` | number | |

### GROQ Queries (12 total in `lib/sanity/queries.ts`)

| Query | Filter | i18n | Used By |
|---|---|---|---|
| `siteSettingsQuery` | `_type == "siteSettings"` | coalesce: siteName, siteDescription, ctaWhatsappMessage | `layout.tsx` (Navbar logo) |
| `homePageQuery` | `_type == "pageHome"` | coalesce: heroHeadline, heroSubline, title, alt, caption, bottomCtaText | `page.tsx` (home) |
| `packagesQuery` | `_type == "packages"` | coalesce: title, priceDisplay, inclusions, ctaText | `events/page.tsx` |
| `galleryByLaneQuery` | `_type == "gallery" && lane == $lane` | coalesce: title, alt, caption | `page.tsx` (home), `events/page.tsx`, `surf/page.tsx`, `about/page.tsx` |
| `allGalleryQuery` | `_type == "gallery"` | coalesce: title, alt, caption | Not used in current pages |
| `featuredGalleryQuery` | `_type == "gallery" && images[].featured == true` | coalesce: title, alt, caption | Not used in current pages |
| `testimonialsQuery` | `_type == "testimonial" && featured == true` | coalesce: quote, context | `page.tsx` (home) |
| `testimonialsByLaneQuery` | `_type == "testimonial" && lane == $lane && featured == true` | coalesce: quote, context | `events/page.tsx` |
| `storiesQuery` | `_type == "story" && (!defined(language) \|\| language == $locale)` | None (document-level) | `stories/page.tsx` |
| `storyBySlugQuery` | `_type == "story" && slug.current == $slug` | None | `stories/[slug]/page.tsx` |
| `featuresQuery` | `_type == "feature" && featured == true` | coalesce: title, excerpt | `page.tsx` (home) |
| `aboutPageQuery` | `_type == "siteSettings"` | coalesce: siteName, siteDescription | Not used (about page uses gallery query + i18n strings) |

### Sanity Clients (`lib/sanity/client.ts`)

```ts
// Read client — public, CDN-cached
const client = createClient({
  projectId: "6q0h6ivm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Write client — token-authenticated, no CDN
const writeClient = createClient({
  projectId: "6q0h6ivm",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```

### Image Handling (`lib/sanity/image.ts`)

```ts
// URL builder
function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

// Blur placeholder (24px wide, quality 20, blur 50 → base64 data URL)
async function getBlurDataURL(image: SanityImageSource): Promise<string> {
  const url = urlFor(image).width(24).quality(20).blur(50).auto("format").url();
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const mimeType = response.headers.get("content-type") || "image/jpeg";
  return `data:${mimeType};base64,${base64}`;
}
```

---

## 7. Forms & Server Actions

### Forms

| Form | Location | Fields | Server Action | Analytics Event |
|---|---|---|---|---|
| **ContactForm** | `components/ui/ContactForm.tsx` | name*, email*, subject (select), message* | `submitContactLead` | `emailSubmit` |
| **CollabForm** | `components/ui/CollabForm.tsx` | name*, email*, company, projectDescription*, budgetRange (select) | `submitCollabLead` | `collabSubmit` |
| *(no UI)* | — | — | `submitEventLead` | — |

### Server Actions

All three actions follow the same pattern:

1. Parse form data
2. Create Sanity `lead` document via `writeClient.create()`
3. Send email notification via Resend API
4. Return `{ success: boolean, error?: string }`

| Action | Source Tag | Sanity Doc Fields | Email |
|---|---|---|---|
| `submitContactLead` | `"general-contact"` | name, email, source, notes (subject + message) | From: `Smile Amigo <noreply@bigbanuz.com>`, To: `NOTIFICATION_EMAIL` |
| `submitCollabLead` | `"surf-collab"` | name, email, source, projectDescription, budgetRange | Same sender/recipient pattern |
| `submitEventLead` | `"events-contact"` | name, email, phone, source, packageInterest, notes | Same sender/recipient pattern |

**Issue:** `submitEventLead` exists but no form component calls it. The events page has no inline booking form — it relies on WhatsApp CTA links instead.

---

## 8. SEO & Metadata

### Layout-Level Metadata (`app/[locale]/layout.tsx`)

```ts
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: { default: "Bigbanuz Photography | Amit Banuz", template: "%s | Bigbanuz Photography" },
    description: t("siteDescription"),
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName: "Bigbanuz Photography",
      images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Bigbanuz Photography" }],
    },
    twitter: { card: "summary_large_image", images: ["/og-default.jpg"] },
    alternates: { canonical: `/${locale}`, languages: { en: "/en", he: "/he" } },
    robots: { index: true, follow: true },
  };
}
```

### Page-Level Metadata

| Page | `generateMetadata` | OG Image | Alternates | JSON-LD |
|---|---|---|---|---|
| Layout (all) | Yes — default title, description, OG, Twitter | `/og-default.jpg` | `en`, `he` | `Person` (Amit Banuz, photographer) |
| Events | Yes — custom title/description | `/og-default.jpg` | `en`, `he` | `Product` (for each package: name, price, currency) |
| Surf | Yes — custom title/description | `/og-default.jpg` | `en`, `he` | None |
| Stories listing | Yes — custom title/description | `/og-default.jpg` | `en`, `he` | None |
| Story detail | Yes — dynamic from story data | Story image or fallback | `en`, `he` | None |
| About | Yes — custom title/description | `/og-default.jpg` | `en`, `he` | None |
| Contact | Yes — custom title/description | `/og-default.jpg` | `en`, `he` | None |

### robots.ts

```ts
rules: { userAgent: "*", allow: "/", disallow: ["/studio/", "/api/"] }
sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
```

### sitemap.ts

Static sitemap with 6 routes × 2 locales. Each entry has `alternates.languages` for `en` and `he`. Uses `NEXT_PUBLIC_SITE_URL` env var.

### Observations

- `siteSettings.seoDefaults` (title, description, ogImage) exists in schema but is **not consumed** by `layout.tsx` — the layout uses hardcoded strings and `/og-default.jpg`.
- No per-page dynamic OG images (all share the same default).
- Story detail pages dynamically set the story image as OG image when available.
- JSON-LD Person schema is on every page (via layout). Product schema only on events page.

---

## 9. Analytics

### Google Analytics 4

- **Component**: `components/analytics/GoogleAnalytics.tsx`
- **Env var**: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- **Loading strategy**: `next/script` with `afterInteractive`
- **Conditional**: Only renders script tags when env var is set

### Custom Events (`lib/utils/analytics.ts`)

```ts
function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}
```

| Event Name | Triggered By | Parameters |
|---|---|---|
| `whatsapp_click` | WhatsApp CTA clicks | `context` (event/surf/general) |
| `email_submit` | ContactForm submission | — |
| `ig_click` | Instagram link clicks | — |
| `collab_submit` | CollabForm submission | — |
| `package_click` | Package card CTA click | `package_name` |
| `gallery_view` | Gallery lightbox open | `image_alt` |
| `lane_click` | SplitGateway lane click | `lane` (events/surf) |

### Integration Points

- `SplitGateway.tsx` → `laneClick`
- `ContactForm.tsx` → `emailSubmit`
- `CollabForm.tsx` → `collabSubmit`
- `PackageCard.tsx` → `packageClick`, `whatsappClick`
- `GalleryGrid.tsx` → `galleryView`
- `CtaSection.tsx` → `whatsappClick`, `igClick`
- Various WhatsApp buttons → `whatsappClick`

---

## 10. Performance & Image Handling

### Next.js Image Configuration (`next.config.mjs`)

```js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "cdn.sanity.io" },
    { protocol: "https", hostname: "vampiresurfclub.com" },
    { protocol: "https", hostname: "cdn.shopify.com" },
  ],
}
```

### Image Resolution Chain

Used across all pages that fetch CMS images:

```ts
function getSanityImageUrl(image?: SanityImage, width = 1920): string {
  if (!image?.asset?._ref) return "";
  try {
    return urlFor(image).width(width).quality(85).auto("format").url();
  } catch {
    return "";
  }
}
```

Fallback chain in feature mapping: `getSanityImageUrl(f.image, 800) || f.imageUrl || ""`

### Blur Placeholders

Generated server-side via `getBlurDataURL()`:
- Fetches 24px-wide image from Sanity CDN with quality 20 and blur 50
- Converts to base64 data URL
- Passed as `blurDataURL` prop to `next/image` `placeholder="blur"`
- Only used for gallery images on the homepage (not universally applied)

### Image Sizes Patterns

| Context | `sizes` Attribute |
|---|---|
| Hero / full-width | `100vw` |
| Split gateway lanes | `(max-width: 768px) 100vw, 50vw` |
| Gallery grid | `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw` |
| Press grid cards | `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw` |
| Story cards | `(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw` |

### Loading Strategy

- Hero images use `priority` prop for LCP optimization
- All other images use default lazy loading
- Video files (`surf-reel.mp4`, `drone-reel.mp4`) are in `/public/` — no CDN optimization

### Caching

- Sanity reads use `useCdn: true` for edge caching
- All CMS fetches tagged with `next: { tags: ["sanity"] }` for ISR
- Revalidation via `/api/revalidate?secret=...` POST endpoint

---

## 11. Brand References

Comprehensive grep of brand-related strings across the codebase:

### "bigbanuz"

| File | Context |
|---|---|
| `lib/utils/constants.ts` | `INSTAGRAM_URL = "https://www.instagram.com/bigbanuz/"` |
| `lib/actions/submitContactLead.ts` | `from: "Smile Amigo <noreply@bigbanuz.com>"` |
| `lib/actions/submitCollabLead.ts` | `from: "Smile Amigo <noreply@bigbanuz.com>"` |
| `lib/actions/submitEventLead.ts` | `from: "Smile Amigo <noreply@bigbanuz.com>"` |
| `app/[locale]/layout.tsx` | `"Bigbanuz Photography | Amit Banuz"`, `"Bigbanuz Photography"` (OG site name) |
| `app/[locale]/events/page.tsx` | `"Bigbanuz Photography"` in JSON-LD |
| `messages/en.json` | `"followBigbanuz": "Follow @Bigbanuz"` |
| `messages/he.json` | `"followBigbanuz": "עקבו אחרי @Bigbanuz"` |
| `CLAUDE.md` | Project description |
| `package.json` | `"name": "bigbanuz-web"` |

### "Amit Banuz"

| File | Context |
|---|---|
| `app/[locale]/layout.tsx` | Title template, JSON-LD Person `name` |
| `app/[locale]/events/page.tsx` | JSON-LD `provider.name`, `brand.name` |
| `messages/en.json` | About section, story text |
| `messages/he.json` | About section, story text |
| `components/sections/SplitGateway.tsx` | Alt text: `"Events photography by Amit Banuz"`, `"Surf photography by Amit Banuz"` |
| `api/seed/route.ts` | Seed data testimonials |

### "Smile Amigo"

| File | Context |
|---|---|
| `lib/actions/submitContactLead.ts` | Email sender: `"Smile Amigo <noreply@bigbanuz.com>"` |
| `lib/actions/submitCollabLead.ts` | Same |
| `lib/actions/submitEventLead.ts` | Same |
| `app/api/seed/route.ts` | `siteName: "Smile Amigo Photography"` |

### "iambigbanuz"

| File | Context |
|---|---|
| `lib/utils/constants.ts` | `EMAIL_ADDRESS = "iambigbanuz@gmail.com"` |
| `messages/en.json` | Contact email display |
| `messages/he.json` | Contact email display |
| `app/[locale]/layout.tsx` | JSON-LD Person `email` |
| `app/api/seed/route.ts` | Seed data email |

---

## 12. Gaps, Issues & Observations

### Bugs / Misconfigurations

| # | Severity | Description |
|---|---|---|
| 1 | **Medium** | `app/contact/loading.tsx` is outside the `[locale]` folder — it will never be served by Next.js App Router. Should be at `app/[locale]/contact/loading.tsx`. |
| 2 | **Low** | `siteSettings.seoDefaults` (ogImage, title, description) defined in schema but not consumed by `layout.tsx` `generateMetadata`. Layout uses hardcoded strings. |
| 3 | **Low** | `aboutPageQuery` in `queries.ts` is defined but not imported or used anywhere. |
| 4 | **Low** | `allGalleryQuery` and `featuredGalleryQuery` are defined but not used in any page. |

### Unused / Orphaned Code

| Item | Location | Status |
|---|---|---|
| `submitEventLead` server action | `lib/actions/submitEventLead.ts` | Exists but no form component calls it |
| `aboutPageQuery` | `lib/sanity/queries.ts` | Defined, never imported |
| `allGalleryQuery` | `lib/sanity/queries.ts` | Defined, never imported |
| `featuredGalleryQuery` | `lib/sanity/queries.ts` | Defined, never imported |
| `productPrint` schema | `sanity/schemas/productPrint.ts` | Schema exists, no documents, no page — intentionally deferred to V2 |

### Schema vs. Code Mismatches

| Observation |
|---|
| `story` schema has no `language` field defined, but `storiesQuery` filters by `language == $locale`. Works because GROQ gracefully handles undefined fields, but this is implicit behavior. |
| `story.body` is plain `text` type, not Portable Text (`blockContent`). Story detail renders with `whitespace-pre-line` CSS — no rich text formatting capability. |

### Infrastructure Gaps

| # | Item | Status |
|---|---|---|
| 1 | Sanity API token lacks `create` permission — `writeClient` cannot create documents (forms & seed route will fail) | Token needs regeneration with Editor role |
| 2 | Revalidation webhook route exists at `/api/revalidate` but no webhook is configured in Sanity dashboard | Manual setup required |
| 3 | `FALLBACK_PACKAGES` hardcoded in `events/page.tsx` as safety net when CMS is empty — functional but creates maintenance burden | Intentional fallback |

### V2-Ready Items (intentionally deferred)

| Item | Notes |
|---|---|
| Print Products page | `productPrint` schema ready, no documents, no page route |
| Events booking form | `submitEventLead` action ready, no form UI |
| i18n localized objects | GROQ `coalesce()` pattern supports future `{en, he}` object fields — currently all fields are flat strings |

---

## 13. Deployment & Configuration

### Vercel Deployment

- **Trigger**: Auto-deploy on push to `main`
- **Build command**: `npx next build` (via `npm run build`)
- **Framework preset**: Next.js (inferred)
- **Output**: Static + serverless (ISR via revalidation tags)

### Environment Variables

From `.env.local.example`:

| Variable | Type | Usage |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public | Sanity client (also hardcoded as `"6q0h6ivm"`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Sanity client (also hardcoded as `"production"`) |
| `SANITY_API_TOKEN` | Secret | Write client for leads & seed |
| `SANITY_REVALIDATE_SECRET` | Secret | Webhook authentication |
| `RESEND_API_KEY` | Secret | Email delivery |
| `NOTIFICATION_EMAIL` | Secret | Lead notification recipient |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Public | Google Analytics 4 |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Public | WhatsApp deep links |
| `NEXT_PUBLIC_SITE_URL` | Public | Sitemap, OG URLs |

**Note:** `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are referenced in `.env.local.example` but the actual `client.ts` uses hardcoded values `"6q0h6ivm"` and `"production"`. The env vars are not consumed.

### NPM Scripts

```json
"dev": "next dev",
"build": "npx next build",
"start": "next start",
"lint": "next lint"
```

### Schema Deployment

```bash
cd sanity && npx sanity@latest schema deploy
```

Deploys schema manifest to Sanity cloud under workspace `smile-amigo`.

### Middleware

`middleware.ts` runs next-intl internationalized routing. Matcher excludes:
- `/api/*`
- `/_next/*`
- `/studio/*`
- Static files (`*.ico`, `*.jpg`, `*.png`, `*.svg`, `*.mp4`, `*.webp`, `*.webmanifest`)

---

*End of report. This document reflects the exact state of the repository as of 2026-03-04.*
