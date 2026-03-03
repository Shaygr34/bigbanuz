"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/utils/constants";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface NavbarProps {
  logoUrl?: string;
}

// Pages with full-viewport dark hero images where nav starts transparent with white text
const DARK_HERO_PAGES = ["/", "/events", "/surf", "/about"];

export default function Navbar({ logoUrl }: NavbarProps) {
  const pathname = usePathname();
  const t = useTranslations("Nav");
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const [scrolled, setScrolled] = useState(!hasDarkHero);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!hasDarkHero) {
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDarkHero]);

  const handleWhatsAppClick = () => {
    analytics.whatsappClick("nav");
  };

  return (
    <>
      <nav
        dir="ltr"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${
          scrolled
            ? "bg-[var(--color-white-pure)]/95 backdrop-blur-sm shadow-card border-b border-gray-light/50"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label={t("mainNav")}
      >
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Smile Amigo"
                  width={40}
                  height={40}
                  className="rounded-full"
                  priority
                />
              ) : null}
              <span className={`text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-normal ${
                scrolled ? "text-black" : "text-white"
              }`}>
                Smile Amigo
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-small font-medium transition-colors duration-normal hover:opacity-80 ${
                    scrolled ? "text-black" : "text-white"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <LanguageSwitcher />
              <ThemeToggle />
              <a
                href={buildWhatsAppUrlSimple()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center px-5 py-2.5 bg-sun-gradient text-white text-small font-medium rounded-full shadow-sun-glow hover:bg-sun-gradient-hover hover:shadow-sun-glow-lg hover:-translate-y-0.5 transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-sun/40 focus:ring-offset-2"
              >
                {t("getInTouch")}
              </a>
            </div>

            {/* Mobile: Language + Theme Toggle + Hamburger */}
            <div className="flex items-center gap-1 md:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                type="button"
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              onClick={() => setMobileOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={mobileOpen}
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  scrolled ? "text-black" : "text-white"
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
        </div>
      </nav>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
