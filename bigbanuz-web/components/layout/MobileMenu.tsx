"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/utils/constants";
import { buildWhatsAppUrlSimple } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
      className="fixed inset-0 z-[60] bg-ocean-deep flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-golden"
          aria-label="Close menu"
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
            className="text-h2 font-heading font-bold text-white hover:text-golden transition-colors duration-normal"
          >
            {link.label}
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
            className="inline-flex items-center px-8 py-4 bg-golden text-ocean-deep text-body font-semibold rounded-md hover:bg-[#c4955e] transition-colors duration-normal"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
