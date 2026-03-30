"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/lib/utils/constants";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("Nav");

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      dir="ltr"
      className="fixed inset-0 z-[60] bg-deep flex flex-col animate-menu-enter"
      role="dialog"
      aria-modal="true"
      aria-label={t("mobileNav")}
    >
      {/* Close button — top right, generous touch target */}
      <div className="flex justify-end p-5">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="p-2.5 text-white/60 hover:text-white rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ocean"
          aria-label={t("closeMenu")}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Nav links — staggered entrance */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="group relative"
            style={{ animationDelay: `${80 + i * 60}ms` }}
          >
            <span className="block font-heading text-[2rem] sm:text-[2.5rem] font-bold uppercase tracking-[0.08em] text-white/90 group-hover:text-ocean-light transition-all duration-300 animate-menu-item">
              {t(link.labelKey)}
            </span>
            {/* Hover line — slides in from center */}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-ocean transition-all duration-300 ease-out" />
          </Link>
        ))}

        {/* CTA */}
        <div className="mt-6 animate-menu-item" style={{ animationDelay: `${80 + NAV_LINKS.length * 60 + 60}ms` }}>
          <a
            href={buildWhatsAppUrlSimple()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              analytics.whatsappClick("nav");
              onClose();
            }}
            className="inline-flex items-center px-8 py-3.5 bg-ocean hover:bg-ocean-dark text-white text-[0.85rem] font-semibold uppercase tracking-[0.1em] rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {t("cta")}
          </a>
        </div>
      </div>

      {/* Bottom brand whisper */}
      <div className="pb-8 text-center animate-menu-item" style={{ animationDelay: `${80 + NAV_LINKS.length * 60 + 120}ms` }}>
        <p className="text-white/20 text-[0.7rem] uppercase tracking-[0.2em]">Amit Banuz</p>
      </div>
    </div>
  );
}
