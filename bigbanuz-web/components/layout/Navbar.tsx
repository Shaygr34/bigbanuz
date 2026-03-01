"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/utils/constants";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    analytics.whatsappClick("nav");
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${
          scrolled
            ? "bg-[var(--color-white)]/95 backdrop-blur-sm shadow-card"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-normal ${
                scrolled ? "text-ocean-deep" : "text-white"
              }`}
            >
              bigbanuz
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-small font-medium transition-colors duration-normal hover:opacity-80 ${
                    scrolled ? "text-ocean-deep" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppUrlSimple()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center px-5 py-2.5 bg-golden text-ocean-deep text-small font-medium rounded-md hover:bg-[#c4955e] transition-colors duration-normal focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2"
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-mid"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  scrolled ? "text-ocean-deep" : "text-white"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
