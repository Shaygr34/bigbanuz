# Amit Banuz Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Smile Amigo photographer portfolio into an Amit Banuz creator-brand personal site.

**Architecture:** Redesign-in-place on existing Next.js 14 + Sanity v3 + Tailwind 3 codebase. Replace the design system (colors, fonts, motion), restructure the IA (kill split gateway, unify portfolio), update Sanity schemas, and rewrite page compositions. No new dependencies except `@next/font` entry for DM Sans.

**Tech Stack:** Next.js 14.2.5, Sanity v3.36.4, Tailwind CSS 3.4.3, next-intl 4.8.0, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-30-amit-banuz-website-redesign.md`

---

## Chunk 1: Design System + Configuration

### Task 1: Update Tailwind config with new design tokens

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace color system, fonts, and remove dark mode**

Replace the entire `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: "#0A8A8F",
          light: "#0FB5BA",
          dark: "#076E72",
        },
        golden: {
          DEFAULT: "#D4943A",
          light: "#E8B06A",
        },
        sand: {
          DEFAULT: "#F5F0E8",
          dark: "#E8E0D0",
        },
        deep: {
          DEFAULT: "#1A2E3E",
          light: "#243D50",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#5A5A5A",
        },
        white: "#FAFAFA",
        overlay: {
          dark: "rgba(26, 46, 62, 0.55)",
          light: "rgba(26, 46, 62, 0.30)",
        },
      },
      fontFamily: {
        heading: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h1: ["clamp(2rem, 3.5vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        h3: ["1.25rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },
      spacing: {
        section: "clamp(3rem, 6vw, 6rem)",
      },
      maxWidth: {
        content: "1280px",
        text: "640px",
        wide: "1440px",
      },
      gap: {
        gallery: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 46, 62, 0.08)",
        "card-hover": "0 4px 12px rgba(26, 46, 62, 0.15)",
      },
      borderRadius: {
        sm: "2px",
        md: "4px",
        lg: "8px",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to top, rgba(26, 46, 62, 0.7) 0%, rgba(26, 46, 62, 0.3) 40%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: replace design system with ocean/golden/sand palette, remove dark mode"
```

---

### Task 2: Update CSS custom properties

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace entire globals.css**

Replace with new design system — removes dark mode, shimmer, updates fonts:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  /* === COLORS === */
  --color-ocean: #0A8A8F;
  --color-ocean-light: #0FB5BA;
  --color-ocean-dark: #076E72;
  --color-golden: #D4943A;
  --color-golden-light: #E8B06A;
  --color-sand: #F5F0E8;
  --color-sand-dark: #E8E0D0;
  --color-deep: #1A2E3E;
  --color-deep-light: #243D50;
  --color-ink: #1A1A1A;
  --color-ink-muted: #5A5A5A;
  --color-white: #FAFAFA;

  /* === TYPOGRAPHY === */
  --font-heading: var(--font-dm-sans), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;

  --text-hero: clamp(2.5rem, 5vw, 4rem);
  --text-h1: clamp(2rem, 3.5vw, 3rem);
  --text-h2: clamp(1.5rem, 2.5vw, 2rem);
  --text-h3: 1.25rem;
  --text-body: 1rem;
  --text-small: 0.875rem;

  /* === SPACING === */
  --space-section: clamp(3rem, 6vw, 6rem);
  --max-width-content: 1280px;
  --max-width-text: 640px;
  --gallery-gap: 4px;

  /* === EFFECTS === */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --radius-sm: 2px;
  --radius-md: 4px;
}

/* ============================================================
   BASE STYLES
   ============================================================ */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  scroll-behavior: smooth;
}

html, body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: var(--color-ink);
  background: var(--color-sand);
  font-family: var(--font-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Skip to content link for accessibility */
.skip-to-content {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-deep);
  color: var(--color-white);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  z-index: 100;
  transition: top var(--transition-fast);
}

.skip-to-content:focus {
  top: 1rem;
}

/* ============================================================
   PAGE TRANSITION
   ============================================================ */
@keyframes page-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-transition {
  animation: page-fade-in 0.4s ease-out;
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
@keyframes menu-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes menu-item {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-menu-enter {
  animation: menu-enter 0.25s ease-out;
}

.animate-menu-item {
  opacity: 0;
  animation: menu-item 0.3s ease-out forwards;
}

/* ============================================================
   HEBREW / RTL FONT OVERRIDE
   ============================================================ */
html[lang="he"] {
  --font-heading: var(--font-heebo), var(--font-dm-sans), system-ui, sans-serif;
  --font-body: var(--font-heebo), var(--font-inter), system-ui, sans-serif;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: new CSS tokens — ocean/sand palette, remove dark mode and shimmer"
```

---

### Task 3: Update layout — fonts, remove dark mode script

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Replace font imports**

In `app/[locale]/layout.tsx`, replace lines 2 and 14-36 (font imports and declarations):

Replace:
```ts
import { Inter, Space_Grotesk, Heebo, Rubik } from "next/font/google";
```
With:
```ts
import { Inter, DM_Sans, Heebo } from "next/font/google";
```

Replace the font declarations (lines 14-36):
```ts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
});
```
With:
```ts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});
```

- [ ] **Step 2: Update font variables in body**

Replace the `fontVars` section (lines 146-148):
```ts
  const fontVars = isHe
    ? `${heebo.variable} ${rubik.variable} ${inter.variable} ${spaceGrotesk.variable}`
    : `${inter.variable} ${spaceGrotesk.variable} ${heebo.variable} ${rubik.variable}`;
```
With:
```ts
  const fontVars = `${inter.variable} ${dmSans.variable} ${heebo.variable}`;
```

- [ ] **Step 3: Remove dark mode init script**

Remove the dark mode script from `<head>` (lines 191-195):
```tsx
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
```

Remove `suppressHydrationWarning` from the `<html>` tag.

- [ ] **Step 4: Update SEO fallbacks to "Amit Banuz"**

Replace the SEO title fallback (line 71-73):
```ts
  const seoTitle = seoSettings?.seoDefaults?.title || (isHe
    ? "Smile Amigo — צילום גלישה ואירועים מאת עמית בנוז"
    : "Smile Amigo — Surf & Event Photography by Amit Banuz");
```
With:
```ts
  const seoTitle = seoSettings?.seoDefaults?.title || (isHe
    ? "עמית בנוז — צלם · יוצר · גולש"
    : "Amit Banuz — Photographer · Creator · Surfer");
```

Update `siteName` fallback (line 100):
```ts
      siteName: seoSettings?.siteName || "Smile Amigo",
```
With:
```ts
      siteName: seoSettings?.siteName || "Amit Banuz",
```

Update JSON-LD `alternateName` (line 169):
```ts
    alternateName: "Smile Amigo",
```
With:
```ts
    alternateName: "Bigbanuz",
```

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: DM Sans font, remove dark mode, rebrand to Amit Banuz"
```

---

### Task 4: Update constants and add redirects

**Files:**
- Modify: `lib/utils/constants.ts`
- Modify: `next.config.mjs`

- [ ] **Step 1: Update constants**

Replace entire `lib/utils/constants.ts`:

```ts
export const SITE_NAME = "Amit Banuz";
export const SITE_DESCRIPTION =
  "Photographer · Creator · Surfer. Based in Israel, shooting worldwide.";

export const WHATSAPP_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "972548194361";

export const INSTAGRAM_URL = "https://www.instagram.com/bigbanuz/";

export const EMAIL_ADDRESS = "iambigbanuz@gmail.com";

export const NAV_LINKS = [
  { labelKey: "work", href: "/work" },
  { labelKey: "about", href: "/about" },
  { labelKey: "stories", href: "/stories" },
  { labelKey: "contact", href: "/contact" },
] as const;
```

- [ ] **Step 2: Add redirects to next.config.mjs**

Replace entire `next.config.mjs`:

```mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:locale/events',
        destination: '/:locale/work?tag=events',
        permanent: true,
      },
      {
        source: '/:locale/surf',
        destination: '/:locale/work?tag=ocean',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 3: Commit**

```bash
git add lib/utils/constants.ts next.config.mjs
git commit -m "feat: rebrand constants, new nav links, add redirects for killed routes"
```

---

### Task 5: Update i18n message files

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/he.json`

- [ ] **Step 1: Replace en.json**

Replace entire `messages/en.json` — removes Events, Surf, Packages, Trust, Theme sections; adds Work section; updates Nav, Footer, Home, About, Contact:

```json
{
  "Nav": {
    "work": "Work",
    "stories": "Stories",
    "about": "About",
    "contact": "Contact",
    "cta": "Let's Talk",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "mainNav": "Main navigation",
    "mobileNav": "Mobile navigation",
    "skipToContent": "Skip to content"
  },
  "Footer": {
    "brand": "Amit Banuz",
    "tagline": "Photographer · Creator · Surfer",
    "followInstagram": "Follow on Instagram",
    "contactWhatsApp": "Contact on WhatsApp",
    "copyright": "© {year} Amit Banuz. All rights reserved.",
    "followTheJourney": "Follow the journey"
  },
  "Home": {
    "metaTitle": "Amit Banuz — Photographer · Creator · Surfer",
    "metaDescription": "Visual storytelling by Amit Banuz. Surf photography, events, and creative content. Based in Israel, shooting worldwide.",
    "name": "Amit Banuz",
    "subtitle": "Photographer · Creator · Surfer",
    "workTitle": "Selected Work",
    "workViewAll": "View all work",
    "miniAboutMore": "More about me",
    "instagramTitle": "Latest from Instagram",
    "instagramFollow": "Follow @bigbanuz",
    "ctaTitle": "Let's Talk",
    "ctaButton": "WhatsApp Me",
    "ctaSecondary": "Or drop me a line"
  },
  "Work": {
    "metaTitle": "Work | Amit Banuz",
    "metaDescription": "Photography portfolio by Amit Banuz — surf, golden hour, people, energy, and travel.",
    "title": "Work",
    "tagAll": "All",
    "tagOcean": "Ocean",
    "tagGoldenHour": "Golden Hour",
    "tagPeople": "People",
    "tagEnergy": "Energy",
    "tagTravel": "Travel",
    "tagEvents": "Events",
    "tagSurf": "Surf"
  },
  "Stories": {
    "metaTitle": "Stories | Amit Banuz",
    "metaDescription": "Stories from the field — behind-the-scenes, travel adventures, and the moments that make every shoot unique.",
    "title": "Stories",
    "subtitle": "Behind the scenes, on the road, in the water.",
    "empty": "Stories coming soon. Stay tuned!",
    "allStories": "All Stories"
  },
  "About": {
    "metaTitle": "About Amit Banuz",
    "metaDescription": "The story behind the lens. Amit Banuz — combat veteran turned photographer and creator. Based in Israel, shooting worldwide.",
    "heroHeadline": "About Amit",
    "heroSubline": "The story behind the lens",
    "heroImageAlt": "Amit Banuz — Photographer and Creator",
    "locationsTitle": "Where I Shoot",
    "ctaHeadline": "Let's work together",
    "ctaGetInTouch": "Get in Touch"
  },
  "Contact": {
    "metaTitle": "Contact | Amit Banuz",
    "metaDescription": "Get in touch with Amit Banuz. Available for photography, content creation, and brand collaborations.",
    "heroTitle": "Let's Talk",
    "heroSubtitle": "Tell me about your moment.",
    "whatsapp": "WhatsApp",
    "whatsappDesc": "Fastest way to reach me.",
    "email": "Email",
    "instagram": "Instagram",
    "instagramDesc": "DM me @bigbanuz",
    "formTitle": "Or drop me a line",
    "nameLabel": "Name",
    "namePlaceholder": "Your name",
    "emailLabel": "Email",
    "emailPlaceholder": "your@email.com",
    "phoneLabel": "Phone",
    "phonePlaceholder": "Your phone number",
    "messageLabel": "What's it about?",
    "messagePlaceholder": "Tell me about your moment...",
    "successTitle": "Sent!",
    "successMessage": "I'll get back to you soon.",
    "sending": "Sending...",
    "sendMessage": "Send",
    "errorDefault": "Something went wrong. Please try again."
  },
  "Locations": {
    "title": "Locations",
    "comingSoon": "Coming Soon"
  },
  "NotFound": {
    "title": "Page Not Found",
    "description": "This wave has passed — let's get you back to shore.",
    "backHome": "Back to Home",
    "getInTouch": "Get in Touch"
  },
  "LanguageSwitcher": {
    "en": "EN",
    "he": "עב",
    "switchLanguage": "Switch language"
  }
}
```

- [ ] **Step 2: Create corresponding he.json**

Replace entire `messages/he.json` with Hebrew equivalents (matching the same key structure).

- [ ] **Step 3: Commit**

```bash
git add messages/en.json messages/he.json
git commit -m "feat: rebrand i18n messages — Amit Banuz, new nav, Work section, remove packages/events/surf"
```

---

### Task 6: Update Sanity schemas

**Files:**
- Modify: `sanity/schemas/pageHome.ts`
- Modify: `sanity/schemas/gallery.ts`
- Modify: `sanity/schemas/siteSettings.ts`

- [ ] **Step 1: Add new fields to pageHome schema**

In `sanity/schemas/pageHome.ts`, add after the `heroHeadline` field (after line 19):

```ts
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
      description: "Optional MP4 URL. Takes priority over hero image. Max ~5MB.",
    }),
```

Add `hidden: true` to `eventsPreview` field (line 29) and `surfPreview` field (line 58).

Add before `featuredGallery` field:

```ts
    defineField({
      name: "miniAboutImage",
      title: "Mini About Photo",
      type: "image",
      options: { hotspot: true },
      description: "Photo of Amit for the homepage about section.",
    }),
    defineField({
      name: "miniAboutText",
      title: "Mini About Text",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
        defineField({ name: "he", title: "Hebrew", type: "text", rows: 3 }),
      ],
    }),
```

Update `featuredGallery` field title to "Featured Work".

- [ ] **Step 2: Add tags to gallery schema, hide lane and category**

In `sanity/schemas/gallery.ts`:

Add new `tags` field after `lane` (after line 32):
```ts
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Ocean", value: "ocean" },
          { title: "Golden Hour", value: "golden-hour" },
          { title: "People", value: "people" },
          { title: "Energy", value: "energy" },
          { title: "Travel", value: "travel" },
          { title: "Events", value: "events" },
          { title: "Surf", value: "surf" },
        ],
      },
    }),
```

On the `lane` field: remove `validation: (Rule) => Rule.required()`, add `initialValue: "mixed"`, add `hidden: true`.

On the `category` field: add `hidden: true`.

- [ ] **Step 3: Commit**

```bash
git add sanity/schemas/pageHome.ts sanity/schemas/gallery.ts
git commit -m "feat: schema updates — heroVideo, miniAbout, gallery tags, hide lane/category"
```

---

### Task 7: Update GROQ queries

**Files:**
- Modify: `lib/sanity/queries.ts`

- [ ] **Step 1: Update homePageQuery and add work queries**

Update `homePageQuery` to include new fields:
```ts
export const homePageQuery = groq`
  *[_type == "pageHome"][0] {
    heroImage,
    heroVideo,
    "heroHeadline": coalesce(heroHeadline[$locale], heroHeadline),
    "heroSubline": coalesce(heroSubline[$locale], heroSubline),
    "miniAboutText": coalesce(miniAboutText[$locale], miniAboutText.en),
    miniAboutImage,
    featuredGallery[]-> {
      _id,
      "title": coalesce(title[$locale], title),
      tags,
      images[] {
        image {
          asset,
          hotspot,
          crop
        },
        "alt": coalesce(alt[$locale], alt),
        "caption": coalesce(caption[$locale], caption),
        location,
        featured
      }
    },
    "bottomCtaText": coalesce(bottomCtaText[$locale], bottomCtaText)
  }
`;
```

Add new query for the `/work` page (fetches all galleries with their tags):
```ts
export const allGalleriesQuery = groq`
  *[_type == "gallery"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    tags,
    lane,
    images[] {
      _key,
      image {
        asset,
        hotspot,
        crop
      },
      "alt": coalesce(alt[$locale], alt),
      "caption": coalesce(caption[$locale], caption),
      location,
      featured
    }
  }
`;
```

- [ ] **Step 2: Commit**

```bash
git add lib/sanity/queries.ts
git commit -m "feat: updated GROQ queries — homepage miniAbout/heroVideo, allGalleries for /work"
```

---

## Chunk 2: Layout Components (Navbar, Footer, MobileMenu)

### Task 8: Rewrite Navbar

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Update Navbar**

Rewrite Navbar to:
- Display "Amit Banuz" text logo instead of "Smile Amigo" + image logo
- Use new `NAV_LINKS` (work, about, stories, contact)
- Transparent navbar over hero → `--deep` background on scroll
- New color scheme (ocean accent, sand/deep backgrounds)
- WhatsApp CTA button in nav (ocean colored)
- Remove dark mode toggle
- Update i18n key references from `Nav.gallery` to `Nav.work`, `Nav.getInTouch` to `Nav.cta`

Key changes: remove `logoUrl` prop (text-only logo), remove ThemeToggle import, update scroll background from charcoal to deep, update CTA color from sun/accent to ocean.

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: navbar rebrand — Amit Banuz text logo, ocean palette, remove dark mode toggle"
```

---

### Task 9: Rewrite Footer

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Simplify Footer**

Rewrite Footer to:
- "Amit Banuz" as brand name
- "Photographer · Creator · Surfer" tagline
- Instagram + WhatsApp social links only
- "Built by Dodeca" credit
- `--deep` background, `--white` text
- Remove "Surf · Events · Energy" tagline
- Use new i18n keys: `Footer.brand`, `Footer.tagline`, `Footer.copyright`

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: footer rebrand — simplified, Amit Banuz, deep ocean background"
```

---

### Task 10: Update MobileMenu

**Files:**
- Modify: `components/layout/MobileMenu.tsx`

- [ ] **Step 1: Update MobileMenu**

- Update nav links from `NAV_LINKS` (already imports from constants — should auto-update)
- Simplify animation (remove cinematic stagger, use simpler menu-item animation)
- Update colors: deep background, ocean accents, sand text
- Update CTA text to use `Nav.cta` key
- Remove dark mode toggle if present

- [ ] **Step 2: Commit**

```bash
git add components/layout/MobileMenu.tsx
git commit -m "feat: mobile menu — new nav links, simplified animation, ocean palette"
```

---

## Chunk 3: Homepage Sections

### Task 11: Rewrite Hero component

**Files:**
- Modify: `components/sections/Hero.tsx` (complete rewrite)

- [ ] **Step 1: Rewrite Hero**

Full-viewport hero component:
- Accepts: `heroImage` (Sanity image), `heroVideo` (optional URL), `name` (string), `subtitle` (string)
- Full viewport height (`h-screen`)
- If `heroVideo`: render `<video muted autoPlay playsInline loop>` with poster from `heroImage`
- If only `heroImage`: render with `next/image` fill + priority
- Gradient overlay (hero-gradient from tailwind config)
- Centered text: name (text-hero, font-heading, white) + subtitle (text-h3, white/80)
- Scroll indicator at bottom (animated chevron)
- No animation on the hero itself (instant render)

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: hero — full-viewport image/video with centered name and subtitle"
```

---

### Task 12: Create WorkGrid component

**Files:**
- Create: `components/sections/WorkGrid.tsx`

- [ ] **Step 1: Create WorkGrid**

Homepage work preview:
- Accepts: `images` (array of {url, alt, blurDataURL}), `title` (string), `viewAllLabel` (string), `viewAllHref` (string)
- Section with sand background, max-width-content centered
- Title (h2, font-heading) + "View all →" link (ocean color)
- 3-column grid (desktop), 2-column (mobile), gap-gallery (4px)
- Images use `next/image` with hover: scale 1.02, brightness +5%
- Stagger animation: 60ms between items using CSS animation-delay

- [ ] **Step 2: Commit**

```bash
git add components/sections/WorkGrid.tsx
git commit -m "feat: WorkGrid homepage section — curated photo grid with hover effects"
```

---

### Task 13: Create MiniAbout component

**Files:**
- Create: `components/sections/MiniAbout.tsx`

- [ ] **Step 1: Create MiniAbout**

Homepage about preview:
- Accepts: `image` (Sanity image URL), `text` (string), `moreLabel` (string), `moreHref` (string), `locations` (array of {name, status})
- Two-column layout (RTL-aware using `flex-row-reverse` for RTL)
- Left: Amit photo (rounded, aspect-square, object-cover)
- Right: short text + locations strip (horizontal pills) + "More about me →" link
- Sand-dark background for contrast

- [ ] **Step 2: Commit**

```bash
git add components/sections/MiniAbout.tsx
git commit -m "feat: MiniAbout homepage section — photo + text + locations"
```

---

### Task 14: Create SimpleCTA component

**Files:**
- Create: `components/sections/SimpleCTA.tsx`

- [ ] **Step 1: Create SimpleCTA**

WhatsApp-forward CTA:
- Accepts: `title` (string), `buttonLabel` (string), `secondaryLabel` (string), `secondaryHref` (string)
- Centered section, sand background
- Title (h2, font-heading)
- Primary: large WhatsApp button (ocean bg, white text, WhatsApp icon)
- Secondary: text link to contact page
- WhatsApp link uses `WHATSAPP_PHONE` from constants

- [ ] **Step 2: Commit**

```bash
git add components/sections/SimpleCTA.tsx
git commit -m "feat: SimpleCTA section — WhatsApp-first call to action"
```

---

### Task 15: Rewrite homepage page.tsx

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Replace homepage composition**

Rewrite the homepage to use new sections in order:
1. Hero (heroImage/heroVideo from CMS, name from i18n, subtitle from i18n)
2. WorkGrid (featured images from `featuredGallery`, flattened)
3. MiniAbout (miniAboutImage + miniAboutText from CMS + locations from pageAbout)
4. SocialFeed (existing Instagram component — import, render with graceful fallback)
5. SimpleCTA (WhatsApp CTA)

Remove imports: `SplitGateway`, `VideoReel`, `FeaturedGallery`, `PressSection`, `CtaSection`
Add imports: `Hero`, `WorkGrid`, `MiniAbout`, `SimpleCTA`, `SocialFeed`

Update the data fetch to use updated `homePageQuery` (which now includes `heroVideo`, `miniAboutImage`, `miniAboutText`). Also fetch `pageAbout` for locations.

Remove fetches for: `galleryByLaneQuery` (events/surf), `featuresQuery`.

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: homepage rewrite — Hero, WorkGrid, MiniAbout, Instagram, CTA"
```

---

## Chunk 4: New & Updated Pages

### Task 16: Create /work page

**Files:**
- Create: `app/[locale]/work/page.tsx`

- [ ] **Step 1: Create unified portfolio page**

`/work` page:
- Fetches all galleries using `allGalleriesQuery`
- Flattens all images from all galleries, attaching parent gallery's `tags` to each image
- Client-side tag filtering via URL search param `?tag=ocean`
- Tag filter bar at top: buttons for each tag, "All" default, uses i18n `Work.tag*` keys
- Masonry-style grid (CSS columns: 3 desktop, 2 tablet, 1 mobile)
- Each image: `next/image`, hover scale 1.02 + brightness, click opens lightbox (reuse existing `ImageLightbox` component from `components/ui/`)
- Page metadata from `Work.metaTitle` / `Work.metaDescription`

This page needs to be a client component for the tag filtering interactivity, or use a wrapper pattern (server component for data fetching, client component for filter UI).

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/work/page.tsx
git commit -m "feat: /work page — unified portfolio with tag filtering"
```

---

### Task 17: Simplify /about page

**Files:**
- Modify: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Simplify about page**

Rewrite about page:
- Keep hero with image + headline/subline from CMS
- Shorten story section: use bio from CMS (pageAbout.bio), display as short text not multiple paragraphs
- Keep locations strip (styled as visual cards, not a list)
- Keep approach section but simplified
- Update CTA to use SimpleCTA (WhatsApp-first)
- Remove references to events-specific CTAs
- Use new color palette: sand background, deep for hero overlay, ocean for links

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/about/page.tsx
git commit -m "feat: about page simplified — shorter copy, ocean palette, WhatsApp CTA"
```

---

### Task 18: Simplify /contact page

**Files:**
- Modify: `app/[locale]/contact/page.tsx`

- [ ] **Step 1: Rewrite contact page**

WhatsApp-first contact:
- Giant WhatsApp button at top (impossible to miss)
- Simple form below: name, email, phone, message ("Tell me about your moment")
- Remove subject dropdown (was Event/Surf/Other — no more split)
- Instagram link + email link as secondary options
- Use existing server action for form submission (creates Sanity lead doc)
- New color palette

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/contact/page.tsx
git commit -m "feat: contact page — WhatsApp-first, simplified form, no subject dropdown"
```

---

### Task 19: Update /stories page

**Files:**
- Modify: `app/[locale]/stories/page.tsx`

- [ ] **Step 1: Update stories as content hub**

- Update metadata to use new `Stories.metaTitle` / `Stories.metaDescription`
- Keep story card grid (cover image, title, date, short description)
- Update styling to new palette (sand background, ocean accents)
- Remove Instagram feed from stories page (it's now on homepage)
- If no stories exist, show "Stories coming soon" message

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/stories/page.tsx
git commit -m "feat: stories page — content hub styling, new palette"
```

---

## Chunk 5: Cleanup & Deploy

### Task 20: Delete killed components and pages

**Files:**
- Delete: `components/sections/SplitGateway.tsx`
- Delete: `components/sections/PressSection.tsx`
- Delete: `components/sections/TestimonialsSection.tsx`
- Delete: `components/sections/TrustSection.tsx`
- Delete: `components/sections/PackagesSection.tsx`
- Delete: `components/sections/VideoReel.tsx`
- Delete: `app/[locale]/events/` (entire directory)
- Delete: `app/[locale]/surf/` (entire directory)

- [ ] **Step 1: Delete files**

```bash
cd /Users/shay/Dev/Tetra/smile-amigo/bigbanuz-web
rm components/sections/SplitGateway.tsx
rm components/sections/PressSection.tsx
rm components/sections/TestimonialsSection.tsx
rm components/sections/TrustSection.tsx
rm components/sections/PackagesSection.tsx
rm components/sections/VideoReel.tsx
rm -rf app/\[locale\]/events
rm -rf app/\[locale\]/surf
```

- [ ] **Step 2: Check for orphaned imports**

Search codebase for any remaining imports of deleted components. Fix any that remain.

```bash
grep -r "SplitGateway\|PressSection\|TestimonialsSection\|TrustSection\|PackagesSection\|VideoReel" --include="*.tsx" --include="*.ts" .
```

- [ ] **Step 3: Remove ThemeToggle component if it exists**

Check for and delete any ThemeToggle/DarkModeToggle component.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: delete killed components (SplitGateway, Press, Testimonials, Trust, Packages, VideoReel) and events/surf pages"
```

---

### Task 21: Build verification

- [ ] **Step 1: Run build**

```bash
cd /Users/shay/Dev/Tetra/smile-amigo/bigbanuz-web
npm run build
```

Expected: Build succeeds with no errors. Fix any TypeScript or import errors.

- [ ] **Step 2: Run dev server and verify all routes**

```bash
npm run dev
```

Verify in browser:
- `/en` — Hero renders, work grid shows (or empty gracefully), Instagram section (graceful fallback), CTA
- `/en/work` — Tag filter bar, gallery grid loads
- `/en/about` — Simplified about page
- `/en/stories` — Story cards or "coming soon" message
- `/en/contact` — WhatsApp button prominent, form works
- `/he` — All above in Hebrew/RTL
- `/en/events` — Redirects to `/en/work?tag=events`
- `/en/surf` — Redirects to `/en/work?tag=ocean`
- `/studio` — Sanity Studio loads

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: build verification fixes"
```

---

### Task 22: Update Navbar logoUrl handling in layout

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Remove logo fetch from layout**

Since we're using text-only logo now, remove the logo fetch block (lines 150-160 in current layout.tsx) and remove `logoUrl` prop from `<Navbar>`:

Replace:
```tsx
<Navbar logoUrl={logoUrl} />
```
With:
```tsx
<Navbar />
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "fix: remove logo fetch from layout — text-only logo"
```

---

### Task 23: Deploy and verify

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

Vercel auto-deploys on push.

- [ ] **Step 2: Verify deployed site**

Check all routes on the live Vercel URL in both EN and HE locales. Verify:
- No orange/charcoal colors remain
- No "Smile Amigo" text appears (except perhaps in Sanity CMS data — update via Studio)
- Sand background, ocean accents
- Mobile responsive
- WhatsApp CTA visible on every page

- [ ] **Step 3: Update CLAUDE.md files**

Update both parent and inner CLAUDE.md to reflect new IA, nav structure, killed routes, new brand identity.

---

### Task 24: Update Sanity CMS content

- [ ] **Step 1: Deploy schema**

```bash
cd /Users/shay/Dev/Tetra/smile-amigo/bigbanuz-web/sanity
npx sanity@latest schema deploy
```

- [ ] **Step 2: Update siteSettings document**

Via Sanity Studio or MCP: update siteName to "Amit Banuz", siteDescription to "Photographer · Creator · Surfer".

- [ ] **Step 3: Populate new pageHome fields**

Via Sanity Studio: add miniAboutImage (photo of Amit) and miniAboutText (EN + HE).

- [ ] **Step 4: Tag existing galleries**

Add `tags` to existing gallery documents to enable filtering on `/work`.
