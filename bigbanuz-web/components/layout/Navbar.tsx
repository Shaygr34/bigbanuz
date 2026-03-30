"use client";

import { useState, useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/lib/utils/constants";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

// Pages with full-viewport dark hero images where nav starts transparent with white text
const DARK_HERO_PAGES = ["/", "/work", "/about"];

export default function Navbar() {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-deep/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.1)]"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label={t("mainNav")}
      >
        <div className="max-w-wide mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[4.5rem] lg:h-[5rem]">
            {/* Logo — text mark */}
            <Link
              href="/"
              className="group flex items-center"
            >
              <span className="font-heading text-[1.35rem] lg:text-[1.5rem] font-bold tracking-[-0.03em] text-white transition-colors duration-500">
                Amit Banuz
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10 lg:gap-12">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group relative text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                      isActive
                        ? "text-ocean"
                        : "text-white/70 hover:text-ocean-light"
                    }`}
                  >
                    {t(link.labelKey)}
                    {/* Animated underline */}
                    <span className={`absolute -bottom-1 left-0 h-[1.5px] transition-all duration-300 ease-out ${
                      isActive
                        ? "w-full bg-ocean"
                        : "w-0 group-hover:w-full bg-ocean-light"
                    }`} />
                  </Link>
                );
              })}

              {/* Language switcher */}
              <div className="flex items-center ml-2">
                <LanguageSwitcher />
              </div>

              {/* CTA */}
              <a
                href={buildWhatsAppUrlSimple()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="inline-flex items-center px-5 py-2 bg-ocean hover:bg-ocean-dark text-white text-[0.8rem] font-semibold uppercase tracking-[0.08em] rounded-full shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ocean/40 focus:ring-offset-2"
              >
                {t("cta")}
              </a>
            </div>

            {/* Mobile: Language + Hamburger */}
            <div className="flex items-center gap-1.5 md:hidden">
              <LanguageSwitcher />
              <button
                type="button"
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean"
                onClick={() => setMobileOpen(true)}
                aria-label={t("openMenu")}
                aria-expanded={mobileOpen}
              >
                <svg
                  className="w-6 h-6 text-white transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 7h16M4 12h12M4 17h16"
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
