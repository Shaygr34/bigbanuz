// groq is just a tagged template literal for syntax highlighting
const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  String.raw({ raw: strings }, ...values);

// ---------------------------------------------------------------------------
// Locale-aware projection helpers
// coalesce(field[$locale], field) works with both:
//   - current flat strings: field[$locale] → null, falls back to field
//   - future localized objects {en, he}: field[$locale] → resolved value
// ---------------------------------------------------------------------------

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    "siteName": coalesce(siteName[$locale], siteName),
    "siteDescription": coalesce(siteDescription[$locale], siteDescription),
    logo,
    socialLinks,
    "ctaWhatsappMessage": coalesce(ctaWhatsappMessage[$locale], ctaWhatsappMessage),
    seoDefaults,
    analyticsId
  }
`;

// Homepage
export const homePageQuery = groq`
  *[_type == "pageHome"][0] {
    heroImage,
    "heroHeadline": coalesce(heroHeadline[$locale], heroHeadline),
    "heroSubline": coalesce(heroSubline[$locale], heroSubline),
    eventsPreview,
    surfPreview,
    featuredGallery[]-> {
      _id,
      "title": coalesce(title[$locale], title),
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

// Packages — title, priceDisplay, inclusions, ctaText are translatable
export const packagesQuery = groq`
  *[_type == "packages"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    slug,
    priceILS,
    "priceDisplay": coalesce(priceDisplay[$locale], priceDisplay),
    "inclusions": coalesce(inclusions[$locale], inclusions),
    featured,
    sortOrder,
    "ctaText": coalesce(ctaText[$locale], ctaText)
  }
`;

// Gallery by lane
export const galleryByLaneQuery = groq`
  *[_type == "gallery" && lane == $lane] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    slug,
    lane,
    category,
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
    },
    sortOrder
  }
`;

// All gallery images (for surf page with filtering)
export const allGalleryQuery = groq`
  *[_type == "gallery"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    slug,
    lane,
    category,
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
    },
    sortOrder
  }
`;

// Featured gallery images
export const featuredGalleryQuery = groq`
  *[_type == "gallery" && images[].featured == true] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    images[featured == true] {
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

// Testimonials — quote and context are translatable
export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(sortOrder asc) {
    _id,
    "quote": coalesce(quote[$locale], quote),
    name,
    "context": coalesce(context[$locale], context),
    avatar,
    sourceLink,
    lane,
    featured,
    sortOrder
  }
`;

export const testimonialsByLaneQuery = groq`
  *[_type == "testimonial" && lane == $lane && featured == true] | order(sortOrder asc) {
    _id,
    "quote": coalesce(quote[$locale], quote),
    name,
    "context": coalesce(context[$locale], context),
    avatar,
    sourceLink,
    lane
  }
`;

// Stories — document-level localization (language field)
// When language field exists, filters by locale; otherwise returns all
export const storiesQuery = groq`
  *[_type == "story" && (!defined(language) || language == $locale)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    image,
    shortDescription,
    publishedAt,
    location,
    language
  }
`;

export const storyBySlugQuery = groq`
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image,
    shortDescription,
    body,
    publishedAt,
    location,
    language
  }
`;

// Features & Collaborations — title and excerpt are translatable
export const featuresQuery = groq`
  *[_type == "feature" && featured == true] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    author,
    date,
    url,
    image,
    imageUrl,
    "excerpt": coalesce(excerpt[$locale], excerpt),
    featured,
    sortOrder
  }
`;

// About page
export const aboutPageQuery = groq`
  *[_type == "siteSettings"][0] {
    "siteName": coalesce(siteName[$locale], siteName),
    "siteDescription": coalesce(siteDescription[$locale], siteDescription)
  }
`;
