# Instagram Graph API Integration — Claude Code Instructions

> **Context**: This replaces the M4 socialHighlight/Sanity-curated approach. We're using the official Instagram Graph API to auto-pull posts from @bigbanuz. No third-party widgets. No manual content management.

---

## Architecture

```
Instagram Graph API
    ↓ (server-side fetch, ISR cached)
lib/instagram.ts (fetch helper)
    ↓
SocialFeed.tsx (server component)
    ↓ (renders on /stories page, potentially homepage)
Clean grid of latest IG posts → each links to original post
```

## Env Vars (Shay provides values — you set them via vercel env add)

```
INSTAGRAM_ACCESS_TOKEN       # Long-lived token (60-day, auto-refreshed)
INSTAGRAM_USER_ID            # Amit's IG user ID (numeric)
META_APP_SECRET              # For token refresh endpoint
```

Build everything assuming these exist. Graceful fallback when they don't.
## What to Build

### 1. Instagram Fetch Helper: `lib/instagram.ts`

```typescript
async function getInstagramFeed(limit = 12) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const userId = process.env.INSTAGRAM_USER_ID
  if (!token || !userId) return []
  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${limit}&access_token=${token}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.data || []
  } catch { return [] }
}
```

Server-side only. ISR cached for 1 hour. Returns empty array on any failure.
Handle media types: IMAGE → media_url, VIDEO → thumbnail_url, CAROUSEL_ALBUM → media_url.
### 2. Token Refresh Cron: `/api/instagram/refresh-token`

Auto-refreshes the long-lived token before it expires (60-day lifespan).

```
GET https://graph.instagram.com/refresh_access_token
  ?grant_type=ig_refresh_token
  &access_token={existing-long-lived-token}
```

Add to vercel.json:
```json
{ "crons": [{ "path": "/api/instagram/refresh-token", "schedule": "0 0 1,15 * *" }] }
```

Runs 1st and 15th of every month. On success, log the new token. Optionally update Vercel env var via API if VERCEL_TOKEN is available.

### 3. Component: `components/sections/SocialFeed.tsx`

Server component. Fetches via lib/instagram.ts.

Layout:
- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns

Each cell:
- Square 1:1 crop (object-cover)
- Image fills cell, no borders, no cards, no shadows
- Hover: subtle dark overlay + Instagram icon + "View on Instagram"
- Entire cell links to post permalink (target="_blank")
- No captions in grid (clean, image-only)
- Tight grid gap: 4-8px
Below grid: "Follow @bigbanuz on Instagram" link with Instagram icon.

DESIGN REFERENCE: dinperlis.com energy. Clean, confident, minimal. Images speak, UI whispers.

### 4. Placement

**Primary**: `/stories` page — top section, above story cards.
Section title: "@bigbanuz" with Instagram icon. Or just the grid, no title.

**Optional**: Homepage — below SplitGateway, a 1-row strip (4-6 posts).

### 5. Fallback

If API returns empty (no token, expired, rate limit):
- Component renders nothing. Not an error state, just absent.
- Page works fine without it. It's additive, not structural.

### 6. Remove Old M4 Infrastructure

- Delete `socialHighlight` schema from `sanity/schemas/`
- Remove from `sanity/schemas/index.ts`
- Replace `SocialGrid.tsx` with new `SocialFeed.tsx`
- Run `cd sanity && npx sanity@latest schema deploy`
- Delete any socialHighlight documents in Sanity

### 7. Nav Update

**Current**: Events | Surf | Stories | About | Contact + Get in Touch CTA
**New**: Gallery | Stories | About | Contact + Get in Touch CTA

"Gallery" links to `/` (homepage). The SplitGateway IS the gallery entrance.

Update in:
- `lib/utils/constants.ts` (nav links)
- `messages/en.json` (nav labels — Gallery, גלריה)
- `messages/he.json`
- `components/layout/Navbar.tsx`
- `components/layout/MobileMenu.tsx`
### 8. Footer: Add Dodeca Credit

Add "Built by Dodeca" in footer. Small, tasteful, links to Dodeca URL.
Same pattern as Kuba-Niazov.

---

## Verification

- [ ] `/stories` page shows latest 12 IG posts in clean grid
- [ ] Each post links to original Instagram permalink
- [ ] Grid responsive: 2/3/4 columns
- [ ] Hover effect subtle and clean
- [ ] Empty state (no token) renders page normally without grid
- [ ] Token refresh cron configured in vercel.json
- [ ] Nav shows: Gallery | Stories | About | Contact
- [ ] Footer shows Dodeca credit
- [ ] socialHighlight schema removed from Sanity
- [ ] No external third-party scripts loaded

---

*This runs in parallel with other work. Build the infrastructure now — token drops in when Shay provides it.*