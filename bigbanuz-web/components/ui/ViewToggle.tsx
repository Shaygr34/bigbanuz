"use client";

import { useTranslations } from "next-intl";

interface ViewToggleProps {
  view: "cards" | "table";
  onChange: (view: "cards" | "table") => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  const t = useTranslations("Events");

  return (
    <div className="flex justify-center gap-2 mb-10">
      <button
        onClick={() => onChange("cards")}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-small font-semibold transition-all duration-normal ${
          view === "cards"
            ? "bg-golden text-white shadow-card"
            : "bg-sand-dark text-ink-muted hover:text-black"
        }`}
        aria-pressed={view === "cards"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        {t("cards")}
      </button>
      <button
        onClick={() => onChange("table")}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-small font-semibold transition-all duration-normal ${
          view === "table"
            ? "bg-golden text-white shadow-card"
            : "bg-sand-dark text-ink-muted hover:text-black"
        }`}
        aria-pressed={view === "table"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 6h18M3 18h18" />
        </svg>
        {t("compare")}
      </button>
    </div>
  );
}
