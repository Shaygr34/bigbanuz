import type { Metadata } from "next";
import { Inter, DM_Sans, Heebo } from "next/font/google";
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
    ? "עמית בנוז — צלם · יוצר"
    : "Amit Banuz — Photographer · Creator");

  const seoDescription = seoSettings?.seoDefaults?.description || (isHe
    ? "צלם · יוצר. מבוסס בישראל, מצלם בכל העולם."
    : "Photographer · Creator. Based in Israel, shooting worldwide.");

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
      process.env.NEXT_PUBLIC_SITE_URL || "https://smile-amigo.vercel.app"
    ),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      locale: isHe ? "he_IL" : "en_US",
      alternateLocale: [isHe ? "en_US" : "he_IL"],
      siteName: seoSettings?.siteName || "Amit Banuz",
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
  const fontVars = `${inter.variable} ${dmSans.variable} ${heebo.variable}`;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://smile-amigo.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Amit Banuz",
    alternateName: "Bigbanuz",
    jobTitle: isHe ? "צלם" : "Photographer",
    url: siteUrl,
    image: `${siteUrl}/og-default.jpg`,
    sameAs: ["https://www.instagram.com/bigbanuz/"],
    knowsAbout: isHe
      ? ["צילום", "גלישה", "יצירה"]
      : ["Photography", "Content Creation", "Creative Direction"],
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
    >
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
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
