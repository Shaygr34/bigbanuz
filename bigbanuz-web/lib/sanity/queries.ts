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
    miniAboutImage,
    "miniAboutText": coalesce(miniAboutText[$locale], miniAboutText.en),
    featuredPosts[] { url, platform },
    featuredGallery[]-> {
      _id,
      "title": coalesce(title[$locale], title),
      tags,
      images[] {
        image {
          asset-> {
            _id,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          },
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



// All galleries for /work page
export const allGalleriesQuery = groq`
  *[_type == "gallery"] | order(sortOrder asc) {
    _id,
    "title": coalesce(title[$locale], title),
    tags,
    images[] {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
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



// About page
export const pageAboutQuery = groq`
  *[_type == "pageAbout"][0] {
    "headline": coalesce(headline[$locale], headline.en),
    "subline": coalesce(subline[$locale], subline.en),
    "bio": coalesce(bio[$locale], bio.en),
    "approachTitle": coalesce(approachTitle[$locale], approachTitle.en),
    "approach": coalesce(approach[$locale], approach.en),
    heroImage {
      asset,
      hotspot,
      crop
    }
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
