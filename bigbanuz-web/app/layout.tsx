import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Smile Amigo — Surf & Event Photography by Amit Banuz",
  description:
    "Premium surf photography and event coverage with instant magnet prints. Based in Israel, shooting worldwide. Philippines · Sri Lanka · Australia.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.com"
  ),
  openGraph: {
    title: "Smile Amigo — Surf & Event Photography by Amit Banuz",
    description:
      "Premium surf photography and event coverage with instant magnet prints. Based in Israel, shooting worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Smile Amigo",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Smile Amigo — Surf & Event Photography by Amit Banuz",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amit Banuz",
  alternateName: "Smile Amigo",
  jobTitle: "Photographer",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.com",
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.com"}/og-default.jpg`,
  sameAs: ["https://www.instagram.com/bigbanuz/"],
  knowsAbout: ["Surf Photography", "Event Photography", "Photo Magnets"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let logoUrl = "";
  try {
    const settings = await client.fetch<{ logo?: { asset?: { _ref?: string } } }>(
      '*[_type == "siteSettings"][0]{logo}',
      {},
      { next: { tags: ["sanity"] } }
    );
    if (settings?.logo?.asset?._ref) {
      logoUrl = urlFor(settings.logo).width(120).quality(90).auto("format").url();
    }
  } catch {
    // fallback to text logo
  }

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar logoUrl={logoUrl} />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
