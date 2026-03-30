"use client";

import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";
import { analytics } from "@/lib/utils/analytics";

interface PackageCardProps {
  title: string;
  priceDisplay: string;
  inclusions: string[];
  ctaText?: string;
  featured?: boolean;
}

export default function PackageCard({
  title,
  priceDisplay,
  inclusions,
  ctaText,
  featured,
}: PackageCardProps) {
  const t = useTranslations("Events");
  const whatsappUrl = buildWhatsAppUrl({
    type: "event",
    packageName: title,
  });

  const handleClick = () => {
    analytics.packageClick(title.toLowerCase());
    analytics.whatsappClick("events");
  };

  return (
    <div
      className={`relative rounded-lg p-6 lg:p-8 flex flex-col transition-shadow duration-normal ${
        featured
          ? "bg-deep text-white shadow-card-hover border-t-4 border-ocean"
          : "bg-sand-light border border-gray-200 dark:border-white/10 shadow-card hover:shadow-card-hover"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ocean text-white text-caption font-bold px-3 py-1 rounded-full">
          {t("popular")}
        </div>
      )}

      {/* Package name */}
      <h3 className={`text-h3 font-heading font-bold ${featured ? "text-white" : "text-black"}`}>
        {title}
      </h3>

      {/* Price */}
      <p className={`mt-3 text-h1 font-mono font-bold ${featured ? "text-white" : "text-black"}`}>
        {priceDisplay}
      </p>

      {/* Inclusions */}
      <ul className="mt-6 flex-1 space-y-3">
        {inclusions.map((item, i) => (
          <li
            key={i}
            className={`flex items-start gap-2 text-body ${featured ? "text-gray-300" : "text-ink-muted"}`}
          >
            <svg
              className="w-5 h-5 text-ocean mt-0.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        <Button
          href={whatsappUrl}
          variant={featured ? "primary" : "outline"}
          size="lg"
          className="w-full"
          onClick={handleClick}
        >
          {ctaText || t("bookPackage")}
        </Button>
      </div>
    </div>
  );
}
