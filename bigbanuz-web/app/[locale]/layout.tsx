import type { Metadata } from "next";
import { Inter, Space_Grotesk, Heebo, Rubik } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { siteSettingsSeoQuery } from "@/lib/sanity/queries";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface SiteSettingsSeo {
  siteName?: string;
  siteDescription?: string;
  seoDefaults?: {
    title?: string;
    description?: string;
    ogImage?: { asset?: { _ref?: string } };
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHe = locale === "he";

  let seoSettings: SiteSettingsSeo | null = null;
  try {
    seoSettings = await client.fetch<SiteSettingsSeo>(
      siteSettingsSeoQuery,
      { locale },
      { next: { tags: ["sanity"] } }
    );
  } catch {
    // fallback to hardcoded
  }

  const seoTitle = seoSettings?.seoDefaults?.title || (isHe
    ? "Smile Amigo — צילום גלישה ואירועים מאת עמית בנוז"
    : "Smile Amigo — Surf & Event Photography by Amit Banuz");

  const seoDescription = seoSettings?.seoDefaults?.description || (isHe
    ? "צילום גלישה מקצועי וצילום אירועים עם מגנטים מיידיים. מבוסס בישראל, מצלם בכל העולם."
    : "Premium surf photography and event coverage with instant magnet prints. Based in Israel, shooting worldwide. Philippines · Sri Lanka · Australia.");

  let ogImageUrl = "/og-default.jpg";
  if (seoSettings?.seoDefaults?.ogImage?.asset?._ref) {
    try {
      ogImageUrl = urlFor(seoSettings.seoDefaults.ogImage).width(1200).height(630).quality(80).auto("format").url();
    } catch {
      // fallback to default
    }
  }

  return {
    title: seoTitle,
    description: seoDescription,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.vercel.app"
    ),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      locale: isHe ? "he_IL" : "en_US",
      alternateLocale: [isHe ? "en_US" : "he_IL"],
      siteName: seoSettings?.siteName || "Smile Amigo",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      languages: {
        en: "/en",
        he: "/he",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  const isHe = locale === "he";
  const fontVars = isHe
    ? `${heebo.variable} ${rubik.variable} ${inter.variable} ${spaceGrotesk.variable}`
    : `${inter.variable} ${spaceGrotesk.variable} ${heebo.variable} ${rubik.variable}`;

  let logoUrl = "";
  try {
    const settings = await client.fetch<{
      logo?: { asset?: { _ref?: string } };
    }>('*[_type == "siteSettings"][0]{logo}', {}, { next: { tags: ["sanity"] } });
    if (settings?.logo?.asset?._ref) {
      logoUrl = urlFor(settings.logo).width(120).quality(90).auto("format").url();
    }
  } catch {
    // fallback to text logo
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amit Banuz",
    alternateName: "Smile Amigo",
    jobTitle: isHe ? "צלם" : "Photographer",
    url: siteUrl,
    image: `${siteUrl}/og-default.jpg`,
    sameAs: ["https://www.instagram.com/bigbanuz/"],
    knowsAbout: isHe
      ? ["צילום גלישה", "צילום אירועים", "מגנטי תמונות"]
      : ["Surf Photography", "Event Photography", "Photo Magnets"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
    },
  };

  return (
    <html
      lang={locale}
      dir={isHe ? "rtl" : "ltr"}
      className={fontVars}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <a href="#main-content" className="skip-to-content">
            {isHe ? "דלג לתוכן" : "Skip to content"}
          </a>
          <Navbar logoUrl={logoUrl} />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
