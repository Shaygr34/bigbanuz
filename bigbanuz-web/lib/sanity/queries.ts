import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    socialLinks,
    ctaWhatsappMessage,
    seoDefaults,
    analyticsId
  }
`;

// Homepage
export const homePageQuery = groq`
  *[_type == "pageHome"][0] {
    heroImage,
    heroHeadline,
    heroSubline,
    eventsPreview,
    surfPreview,
    featuredGallery[]-> {
      _id,
      title,
      images[] {
        image {
          asset->,
          hotspot,
          crop
        },
        alt,
        caption,
        location,
        featured
      }
    },
    bottomCtaText
  }
`;

// Packages
export const packagesQuery = groq`
  *[_type == "packages"] | order(sortOrder asc) {
    _id,
    title,
    slug,
    priceILS,
    priceDisplay,
    inclusions,
    featured,
    sortOrder,
    ctaText
  }
`;

// Gallery by lane
export const galleryByLaneQuery = groq`
  *[_type == "gallery" && lane == $lane] | order(sortOrder asc) {
    _id,
    title,
    slug,
    lane,
    category,
    images[] {
      image {
        asset->,
        hotspot,
        crop
      },
      alt,
      caption,
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
    title,
    slug,
    lane,
    category,
    images[] {
      image {
        asset->,
        hotspot,
        crop
      },
      alt,
      caption,
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
    title,
    images[featured == true] {
      image {
        asset->,
        hotspot,
        crop
      },
      alt,
      caption,
      location,
      featured
    }
  }
`;

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(sortOrder asc) {
    _id,
    quote,
    name,
    context,
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
    quote,
    name,
    context,
    avatar,
    sourceLink,
    lane
  }
`;

// About page
export const aboutPageQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription
  }
`;
