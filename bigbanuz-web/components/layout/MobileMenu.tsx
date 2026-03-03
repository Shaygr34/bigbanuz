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
      className="fixed inset-0 z-[60] bg-charcoal flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={t("mobileNav")}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
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
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-h2 font-heading font-bold text-white hover:text-accent transition-colors duration-normal"
          >
            {t(link.labelKey)}
          </Link>
        ))}

        <div className="mt-8">
          <a
            href={buildWhatsAppUrlSimple()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              analytics.whatsappClick("nav");
              onClose();
            }}
            className="inline-flex items-center px-8 py-4 bg-sun-gradient text-white text-body font-semibold rounded-full shadow-sun-glow hover:bg-sun-gradient-hover hover:shadow-sun-glow-lg hover:-translate-y-0.5 transition-all duration-normal"
          >
            {t("getInTouch")}
          </a>
        </div>
      </div>
    </div>
  );
}
