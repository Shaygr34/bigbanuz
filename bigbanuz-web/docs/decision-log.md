# Decision Log

## 2026-03-09 — V3 M0: Stabilize

### Revalidation fix
- **Decision**: Webhook needed in Sanity dashboard (manual step for Shay)
- **Rationale**: `/api/revalidate` route and `{ next: { tags: ["sanity"] } }` cache tags are correctly wired. Only missing link is the webhook POST from Sanity on publish.

### Dead code removal
- Deleted `app/contact/loading.tsx` (outside `[locale]`, never served)
- Removed `aboutPageQuery`, `allGalleryQuery`, `featuredGalleryQuery` from queries.ts (unused)
- Added `siteSettingsSeoQuery` to replace `aboutPageQuery` with SEO-aware projection

### CMS population strategy
- Populated `siteSettings`, `pageHome`, `packages` with real content
- Testimonials and stories marked as placeholders for Amit to replace
- Gallery "Destinations" category: kept schema, hide empty filter in UI later

### siteSettings SEO wiring
- Layout `generateMetadata` now fetches `siteSettings.seoDefaults` from CMS
- Falls back to hardcoded strings if CMS empty — no breaking change
