import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amit Banuz — Surf & Event Photographer | bigbanuz",
  description:
    "Professional surf and event photography by Amit Banuz. Based in Israel, shooting worldwide. Event packages with instant magnet prints. Surf photography across Philippines, Sri Lanka, Israel, and Australia.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.com"
  ),
  openGraph: {
    title: "Amit Banuz — Surf & Event Photographer",
    description:
      "Professional surf and event photography by Amit Banuz. Event packages with instant magnet prints.",
    type: "website",
    locale: "en_US",
    siteName: "bigbanuz",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "bigbanuz — Amit Banuz Photography",
  description:
    "Professional surf and event photography by Amit Banuz. Event packages with instant magnet prints.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.com",
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bigbanuz.com"}/og-default.jpg`,
  sameAs: ["https://instagram.com/bigbanuz"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
