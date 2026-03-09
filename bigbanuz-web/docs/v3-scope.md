# V3 Scope

## Milestones

| # | Name | Status | Commit |
|---|------|--------|--------|
| M0 | Stabilize & Integrate | Done | `592fe38` |
| M1 | Brand Rename | Done | `a27e777` |
| M2 | CMS Liberation | Done | `22cb4e5` |
| M3 | Visual Refresh | Done | `c10975d` |
| M4 | Social Integration | Done | `14afe3d` |
| M5 | Design Sprint | Done | `02df770` |
| M6 | Verification & Handoff | Done | (this commit) |

## Manual Steps for Shay
- [ ] Create Sanity webhook → `/api/revalidate` with `SANITY_REVALIDATE_SECRET`
- [ ] Add `RESEND_API_KEY` to Vercel env vars
- [ ] Add `NEXT_PUBLIC_SITE_URL` to Vercel env vars
- [ ] Rename Vercel project → `smile-amigo`
- [ ] Replace `/public/og-default.jpg` with branded OG image
- [ ] Replace `/public/icon.svg` with final brand favicon
- [ ] Add socialHighlight documents in Sanity Studio (with thumbnails)
- [ ] Populate pageAbout document in Sanity Studio

## Out of Scope (Post-V3)
- Print Store (editions, counters)
- Custom Print Request
- Email Subscription
- Events Booking Form
- Domain Migration to smile-amigo.com
