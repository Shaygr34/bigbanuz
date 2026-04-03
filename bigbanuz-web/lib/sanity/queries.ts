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
    heroVideo,
    "heroHeadline": coalesce(heroHeadline[$locale], heroHeadline),
    "heroSubline": coalesce(heroSubline[$locale], heroSubline),
    eventsPreview,
    surfPreview,
    miniAboutImage,
    "miniAboutText": coalesce(miniAboutText[$locale], miniAboutText.en),
    featuredPosts[] { url, platform },
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


// All galleries for /work page
export const allGalleriesQuery = groq`
  *[_type == "gallery"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    tags,
    lane,
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

// Stories — show all stories regardless of language.
// Photography stories are visual content; language is secondary to images.
export const storiesQuery = groq`
  *[_type == "story"] | order(publishedAt desc) {
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
export const pageAboutQuery = groq`
  *[_type == "pageAbout"][0] {
    "headline": coalesce(headline[$locale], headline.en),
    "subline": coalesce(subline[$locale], subline.en),
    "bio": coalesce(bio[$locale], bio.en),
    "approachTitle": coalesce(approachTitle[$locale], approachTitle.en),
    "approach": coalesce(approach[$locale], approach.en),
    locations[] {
      name,
      "description": coalesce(description[$locale], description.en),
      status
    },
    heroImage {
      asset,
      hotspot,
      crop
    }
  }
`;

// Video Reels — featured on homepage
export const videoReelsQuery = groq`
  *[_type == "videoReel" && featured == true] | order(sortOrder asc) {
    _id,
    title,
    "videoUrl": video.asset->url,
    thumbnail {
      asset,
      hotspot,
      crop
    },
    tag
  }
`;

// Brands
export const brandsQuery = groq`
  *[_type == "brand"] | order(sortOrder asc) {
    _id,
    name,
    logo {
      asset,
      hotspot,
      crop
    },
    url
  }
`;

// Site settings SEO (consumed by layout metadata)
export const siteSettingsSeoQuery = groq`
  *[_type == "siteSettings"][0] {
    "siteName": coalesce(siteName[$locale], siteName),
    "siteDescription": coalesce(siteDescription[$locale], siteDescription),
    seoDefaults {
      title,
      description,
      ogImage {
        asset,
        hotspot,
        crop
      }
    }
  }
`;
